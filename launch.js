#!/usr/bin/env node
/**
 *
 * Steps:
 * 1. npm run build              (repo root)
 * 2. npm install                (./angular)
 * 3. ng build --project {name} (./angular)
 * 4. ng cache clean             (./example/my-app)
 * 5. ng serve                   (./example/my-app) -> keeps process open
 *
 *
 * Flags:
 *   --skip-core-build    Skip step 1
 *   --skip-angular-install Skip step 2
 *   --skip-angular-build  Skip step 3
 *   --skip-cache-clean    Skip step 4
 *   --dry                 Print commands without executing
 */

const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '.');
const angularDir = path.join(rootDir, 'angular');
const exampleDir = path.join(rootDir, 'example', 'my-app-angular-20');

const args = process.argv.slice(2);
const flags = new Set(args);
const dryRun = flags.has('--dry');

function log(msg) { console.log(`${msg}`); }

function run(cmd, cmdArgs, cwd, options = {}) {
    return new Promise((resolve, reject) => {
        const full = `${cmd} ${cmdArgs.join(' ')}`.trim();
        if (dryRun) {
            log(`DRY: Would run '${full}' in ${cwd}`);
            return resolve({ code: 0, skipped: true });
        }
        log(`Running: ${full} (cwd=${cwd})`);
        const child = spawn(cmd, cmdArgs, { cwd, stdio: 'inherit', shell: process.platform === 'win32', ...options });
        child.on('error', err => {
            log(`Error spawning ${full}: ${err.message}`);
            reject(err);
        });
        child.on('close', code => {
            if (code !== 0) {
                return reject(new Error(`Command failed (${code}): ${full}`));
            }
            resolve({ code });
        });
    });
}

async function main() {
    try {
        const steps = [
            {
                name: 'core build',
                flag: '--skip-core-build',
                fn: () => run('npm', ['run', 'build'], rootDir)
            },
            {
                name: 'angular npm install',
                flag: '--skip-angular-install',
                fn: () => run('npm', ['install'], angularDir)
            },
            {
                name: 'angular library build',
                flag: '--skip-angular-build',
                fn: () => run('ng', ['build', '--project', 'component-library'], angularDir)
            },
            {
                name: 'example cache clean',
                flag: '--skip-cache-clean',
                fn: () => run('ng', ['cache', 'clean'], exampleDir)
            },
            {
                name: 'example dev server',
                // no skip flag, this is the point of the script
                fn: () => run('ng', ['serve'], exampleDir, { /* keep open */ })
            }
        ];

        for (const step of steps) {
            if (step.flag && flags.has(step.flag)) {
                log(`Skipping step '${step.name}' due to flag ${step.flag}`);
                continue;
            }
            await step.fn();
        }
    } catch (err) {
        log(`Failed: ${err.message}`);
        process.exitCode = 1;
    }
}

main();
