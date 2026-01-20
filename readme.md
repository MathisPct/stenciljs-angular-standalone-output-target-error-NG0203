# Steps to reproduce

To launch project you need to run at the root of the project:

```bash
node ./launch.js
```

Steps:
1. npm run build (repo root)
2. npm install (./angular)
3. ng build --project {name} (./angular)
4. ng cache clean (./example/my-app)
5. ng serve (./example/my-app) -> keeps process open

It will launch an Angular application at: http://localhost:4200

Go to the browser and open the console to see this error 

```
RuntimeError: NG0203: The `ChangeDetectorRef` token injection failed. `inject()` function must be called from an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`. Find more at https://angular.dev/errors/NG0203
    at injectInjectorOnly (root_effect_scheduler-DCy1y1b8.mjs:937:15)
    at ɵɵinject (root_effect_scheduler-DCy1y1b8.mjs:957:42)
    at ɵɵdirectiveInject (debug_node-JnOYh9kg.mjs:12259:16)
    at NodeInjectorFactory.MyComponent_Factory [as factory] (proxies.ts:21:25)
    at getNodeInjectable (debug_node-JnOYh9kg.mjs:1974:44)
    at instantiateAllDirectives (debug_node-JnOYh9kg.mjs:7379:27)
    at createDirectivesInstances (debug_node-JnOYh9kg.mjs:7154:5)
    at ɵɵelementStart (debug_node-JnOYh9kg.mjs:22254:9)
    at Module.ɵɵelement (debug_node-JnOYh9kg.mjs:22309:5)
    at App_Template (app.html:1:1)
```

# Versions

- "@stencil/core": 4.38.3
- "@stencil/angular-output-target": 1.1.1

# How I solved it ?

Thanks to @johnjenkins https://github.com/stenciljs/output-targets/issues/702#issuecomment-3770026515, I changed the way I reference local packages. Indeed, I used local link resolution with "file:{path}" and it seems that it making things go wonky. Like he suggested, I used npm workspaces instead and now everything works fine.

I declare a parent package.json with workspaces declaration and in each package.json I reference other local packages with their version instead of "file:{path}". 

I tried with "workspace:*" too but it didn't work for me because I had this kind of error when I ran "npm install" at the root of the project:

```shell
npm install
npm error code EUNSUPPORTEDPROTOCOL
npm error Unsupported URL Type "workspace:": workspace:*
```

After the change, we does not have `NG0203` error anymore.
