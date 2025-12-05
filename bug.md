J'ai l'erreur suivante en important un wcs-input standalone dans un composant Angular

```
TypeError: def.resolveHostDirectives is not a function or its return value is not iterable
```

Si on regarde la trace on tombe sur cette fonction

https://github.com/angular/angular/blob/main/packages/core/src/render3/view/directives.ts#L58

```ts
export function resolveDirectives(
  tView: TView,
  lView: LView,
  tNode: TElementNode | TContainerNode | TElementContainerNode,
  localRefs: string[] | null,
  directiveMatcher: DirectiveMatcherStrategy,
): void {
  // Please make sure to have explicit type for `exportsMap`. Inferred type triggers bug in tsickle.
  ngDevMode && assertFirstCreatePass(tView);

  const exportsMap: Record<string, number> | null = localRefs === null ? null : {'': -1};
  const matchedDirectiveDefs = directiveMatcher(tView, tNode);

  if (matchedDirectiveDefs !== null) {
    let directiveDefs = matchedDirectiveDefs;
    let hostDirectiveDefs: HostDirectiveDefs | null = null;
    let hostDirectiveRanges: HostDirectiveRanges | null = null;

    for (const def of matchedDirectiveDefs) {
      if (def.resolveHostDirectives !== null) {
        [directiveDefs, hostDirectiveDefs, hostDirectiveRanges] =
          def.resolveHostDirectives(matchedDirectiveDefs);
        break;
      }
    }
```

Quand on débug cette fonction, on a les valeurs suivantes pour `matchedDirectiveDefs` et `def` :

```json
matchedDirectiveDefs = [

    {

        "providersResolver": null,

        "factory": null,

        "hostBindings": null,

        "hostVars": 0,

        "hostAttrs": null,

        "contentQueries": null,

        "declaredInputs": {

            "accept": "accept",

            "autocapitalize": "autocapitalize",

            "autocomplete": "autocomplete",

            "autocorrect": "autocorrect",

            "autofocus": "autofocus",

            "debounce": "debounce",

            "disabled": "disabled",

            "enterkeyhint": "enterkeyhint",

            "hidePasswordButtonAriaLabel": "hidePasswordButtonAriaLabel",

            "icon": "icon",

            "inputmode": "inputmode",

            "max": "max",

            "maxlength": "maxlength",

            "min": "min",

            "minlength": "minlength",

            "multiple": "multiple",

            "name": "name",

            "pattern": "pattern",

            "placeholder": "placeholder",

            "prefixLabel": "prefixLabel",

            "readonly": "readonly",

            "required": "required",

            "showPasswordButtonAriaLabel": "showPasswordButtonAriaLabel",

            "size": "size",

            "spellcheck": "spellcheck",

            "state": "state",

            "step": "step",

            "suffixLabel": "suffixLabel",

            "type": "type",

            "value": "value"

        },

        "exportAs": null,

        "standalone": true,

        "selectors": [

            [

                "wcs-input"

            ]

        ],

        "viewQuery": null,

        "features": [

            null

        ],

        "setInput": null,

        "findHostDirectiveDefs": null,

        "hostDirectives": null,

        "inputs": {

            "accept": "accept",

            "autocapitalize": "autocapitalize",

            "autocomplete": "autocomplete",

            "autocorrect": "autocorrect",

            "autofocus": "autofocus",

            "debounce": "debounce",

            "disabled": "disabled",

            "enterkeyhint": "enterkeyhint",

            "hidePasswordButtonAriaLabel": "hidePasswordButtonAriaLabel",

            "icon": "icon",

            "inputmode": "inputmode",

            "max": "max",

            "maxlength": "maxlength",

            "min": "min",

            "minlength": "minlength",

            "multiple": "multiple",

            "name": "name",

            "pattern": "pattern",

            "placeholder": "placeholder",

            "prefixLabel": "prefixLabel",

            "readonly": "readonly",

            "required": "required",

            "showPasswordButtonAriaLabel": "showPasswordButtonAriaLabel",

            "size": "size",

            "spellcheck": "spellcheck",

            "state": "state",

            "step": "step",

            "suffixLabel": "suffixLabel",

            "type": "type",

            "value": "value"

        },

        "outputs": {},

        "decls": 1,

        "vars": 0,

        "consts": null,

        "ngContentSelectors": [

            "*"

        ],

        "onPush": true,

        "directiveDefs": null,

        "pipeDefs": null,

        "dependencies": null,

        "data": {},

        "encapsulation": 2,

        "id": "c47",

        "styles": [],

        "_": null,

        "schemas": null,

        "tView": null

    }

]
```

```json
def = {

    "providersResolver": null,

    "factory": null,

    "hostBindings": null,

    "hostVars": 0,

    "hostAttrs": null,

    "contentQueries": null,

    "declaredInputs": {

        "accept": "accept",

        "autocapitalize": "autocapitalize",

        "autocomplete": "autocomplete",

        "autocorrect": "autocorrect",

        "autofocus": "autofocus",

        "debounce": "debounce",

        "disabled": "disabled",

        "enterkeyhint": "enterkeyhint",

        "hidePasswordButtonAriaLabel": "hidePasswordButtonAriaLabel",

        "icon": "icon",

        "inputmode": "inputmode",

        "max": "max",

        "maxlength": "maxlength",

        "min": "min",

        "minlength": "minlength",

        "multiple": "multiple",

        "name": "name",

        "pattern": "pattern",

        "placeholder": "placeholder",

        "prefixLabel": "prefixLabel",

        "readonly": "readonly",

        "required": "required",

        "showPasswordButtonAriaLabel": "showPasswordButtonAriaLabel",

        "size": "size",

        "spellcheck": "spellcheck",

        "state": "state",

        "step": "step",

        "suffixLabel": "suffixLabel",

        "type": "type",

        "value": "value"

    },

    "exportAs": null,

    "standalone": true,

    "selectors": [

        [

            "wcs-input"

        ]

    ],

    "viewQuery": null,

    "features": [

        null

    ],

    "setInput": null,

    "findHostDirectiveDefs": null,

    "hostDirectives": null,

    "inputs": {

        "accept": "accept",

        "autocapitalize": "autocapitalize",

        "autocomplete": "autocomplete",

        "autocorrect": "autocorrect",

        "autofocus": "autofocus",

        "debounce": "debounce",

        "disabled": "disabled",

        "enterkeyhint": "enterkeyhint",

        "hidePasswordButtonAriaLabel": "hidePasswordButtonAriaLabel",

        "icon": "icon",

        "inputmode": "inputmode",

        "max": "max",

        "maxlength": "maxlength",

        "min": "min",

        "minlength": "minlength",

        "multiple": "multiple",

        "name": "name",

        "pattern": "pattern",

        "placeholder": "placeholder",

        "prefixLabel": "prefixLabel",

        "readonly": "readonly",

        "required": "required",

        "showPasswordButtonAriaLabel": "showPasswordButtonAriaLabel",

        "size": "size",

        "spellcheck": "spellcheck",

        "state": "state",

        "step": "step",

        "suffixLabel": "suffixLabel",

        "type": "type",

        "value": "value"

    },

    "outputs": {},

    "decls": 1,

    "vars": 0,

    "consts": null,

    "ngContentSelectors": [

        "*"

    ],

    "onPush": true,

    "directiveDefs": null,

    "pipeDefs": null,

    "dependencies": null,

    "data": {},

    "encapsulation": 2,

    "id": "c47",

    "styles": [],

    "_": null,

    "schemas": null,

    "tView": null

}
```



On voit que `def.resolveHostDirectives` n'est pas défini dans def. On a la propriété findHostDirectiveDefs qui est déclarée et on voit que c'est l'ancien nom donnée avant ce commit livré en v20 (https://github.com/angular/angular/commit/0362665c54d10c2d13565a2ffabd65bc3cb8890d#diff-4374dd238deae3e4714315fc97bb9983092ada87475d8e0b8d28e191571941deR648)

https://github.com/angular/angular/commit/0362665c54d10c2d13565a2ffabd65bc3cb8890d#diff-5a1a534119afa5645b17759d644e6f0f68e4dd3db4a588c70298979bc6d47ea3R76-R81

ce code a été ajoutée

```ts
for (const def of matchedDirectiveDefs) {
      if (def.resolveHostDirectives !== null) {
        [directiveDefs, hostDirectiveDefs, hostDirectiveRanges] =
          def.resolveHostDirectives(matchedDirectiveDefs);
        break;
      }
    }
```

Alors qu'avant ce commit, le code était

```ts
const hostDirectiveResolution = resolveHostDirectives(matchedDirectiveDefs);
```

La fonction [`resolveHostDirectives`](https://github.com/angular/angular/commit/0362665c54d10c2d13565a2ffabd65bc3cb8890d#diff-5a1a534119afa5645b17759d644e6f0f68e4dd3db4a588c70298979bc6d47ea3L136-L212) n'appelait pas `def.resolveHostDirectives` mais utilisait `def.findHostDirectiveDefs` qui est bien défini dans `def` qu'on a plus haut.

```ts
function resolveHostDirectives(matches: DirectiveDef<unknown>[]): HostDirectiveResolution | null {
  let componentDef: ComponentDef<unknown> | null = null;
  let hasHostDirectives = false;

  // Having host directives is the less common scenario. Make an initial
  // validation pass so we don't allocate memory unnecessarily.
  for (let i = 0; i < matches.length; i++) {
    const def = matches[i];

    // Given that we may need this further down, we can resolve it already while validating.
    if (i === 0 && isComponentDef(def)) {
      componentDef = def;
    }

    if (def.findHostDirectiveDefs !== null) {
      hasHostDirectives = true;
      break;
    }
  }

  // If there's at least one def with host directive, we can't bail out of this function.
  if (!hasHostDirectives) {
    return null;
  }

  const allDirectiveDefs: DirectiveDef<unknown>[] = [];
  let hostDirectiveDefs: HostDirectiveDefs | null = null;
  let hostDirectiveRanges: HostDirectiveRanges | null = null;

  // Components are inserted at the front of the matches array so that their lifecycle
  // hooks run before any directive lifecycle hooks. This appears to be for ViewEngine
  // compatibility. This logic doesn't make sense with host directives, because it
  // would allow the host directives to undo any overrides the host may have made.
  // To handle this case, the host directives of components are inserted at the beginning
  // of the array, followed by the component. As such, the insertion order is as follows:
  // 1. Host directives belonging to the selector-matched component.
  // 2. Selector-matched component.
  // 3. Host directives belonging to selector-matched directives.
  // 4. Selector-matched dir
  for (const def of matches) {
    if (def.findHostDirectiveDefs !== null) {
      hostDirectiveDefs ??= new Map();
      hostDirectiveRanges ??= new Map();
      resolveHostDirectivesForDef(def, allDirectiveDefs, hostDirectiveRanges, hostDirectiveDefs);
    }

    // Component definition needs to be pushed early to maintain the correct ordering.
    if (def === componentDef) {
      allDirectiveDefs.push(def);
    }
  }

  if (componentDef === null) {
    allDirectiveDefs.push(...matches);
  } else {
    allDirectiveDefs.push(...matches.slice(1));
  }

  return [allDirectiveDefs, hostDirectiveDefs, hostDirectiveRanges];
}

function resolveHostDirectivesForDef(
  def: DirectiveDef<unknown>,
  allDirectiveDefs: DirectiveDef<unknown>[],
  hostDirectiveRanges: HostDirectiveRanges,
  hostDirectiveDefs: HostDirectiveDefs,
) {
  ngDevMode && assertDefined(def.findHostDirectiveDefs, 'Expected host directive resolve function');
  const start = allDirectiveDefs.length;
  // TODO(pk): probably could return matches instead of taking in an array to fill in?
  def.findHostDirectiveDefs!(def, allDirectiveDefs, hostDirectiveDefs);

  // Note that these indexes are within the offset by `directiveStart`. We can't do the
  // offsetting here, because `directiveStart` hasn't been initialized on the TNode yet.
  hostDirectiveRanges.set(def, [start, allDirectiveDefs.length - 1]);
}
```


Ce qu'apporte le passage en 1.0.0 de stencil angular output target

https://github.com/stenciljs/output-targets/pull/497

> Angular is able to verifty types on input properties and show jsDocs:

Il y a un fix qui est a été mergé sur main mais qui est pas encore livré

https://github.com/stenciljs/output-targets/commit/16f1fd18d63754dc1efdddc2cebdf1b9ba5137d6