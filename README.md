# @babel/preset-env example

With Babel 7

- Main documentation: https://babeljs.io/docs/en/babel-preset-env
- @babel/polyfill documentation: https://babeljs.io/docs/en/babel-polyfill
- Browserslist: https://github.com/browserslist/browserslist

```.rc
# .browserslistrc
> 1% in FR
```

```JS
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        debug: true
      }
    ]
  ]
};
```

```JS
// First line inside your app (App.js for this example)
// Not needed with useBuiltIns: 'usage'
//import '@babel/polyfill'
```

## Findings

- Specify a file `.browserslistrc` instead of babel.config.js `browsers: [...]`: will be reused by Autoprefixer and other tools

- `useBuiltIns: 'usage'` includes polyfills given .browserslistrc and your source code (Babel analyses it - might not always perfectly work depending on your app and its dependencies) instead of including everything from [core-js](https://github.com/zloirock/core-js)

- `useBuiltIns: 'entry'` includes polyfills given .browserslistrc (safest option)

- `useBuiltIns: false` includes all polyfills, no use of .browserslistrc (not what you want)

- Use `useBuiltIns: 'entry'` + `import '@babel/polyfill'` **or** `useBuiltIns: 'usage'` without `import '@babel/polyfill'`

- Do not use `last n versions`, prefer something like [`> 2% in US`](https://browserl.ist/?q=%3E+2%25+in+US), see https://github.com/browserslist/browserslist/tree/4.4.1#best-practices and https://jamie.build/last-2-versions

- Do not write inside webpack.config.js `entry: ['@babel/polyfill', './App.js']` as suggested [here](https://babeljs.io/docs/en/babel-polyfill#usage-in-node-browserify-webpack), use `import '@babel/polyfill'` + `entry: './App.js'`

## Output

### `useBuiltIns: 'usage'` without `import '@babel/polyfill'`

Includes only the polyfills needed by .browserslistrc and your source code

#### Webpack output

```
$ yarn build:webpack:dev
...
build/App.js    145 KiB
...
```

#### Babel output

<details>
<summary>$ yarn build:babel</summary>

```
Using targets:
{
  "chrome": "70",
  "edge": "17",
  "firefox": "63",
  "ie": "11",
  "ios": "11.3",
  "safari": "12"
}

Using modules transform: auto

Using plugins:
  transform-template-literals { "ie":"11" }
  transform-literals { "ie":"11" }
  transform-function-name { "edge":"17", "ie":"11" }
  transform-arrow-functions { "ie":"11" }
  transform-classes { "ie":"11" }
  transform-object-super { "ie":"11" }
  transform-shorthand-properties { "ie":"11" }
  transform-duplicate-keys { "ie":"11" }
  transform-computed-properties { "ie":"11" }
  transform-for-of { "ie":"11" }
  transform-sticky-regex { "ie":"11" }
  transform-dotall-regex { "edge":"17", "firefox":"63", "ie":"11" }
  transform-unicode-regex { "ie":"11", "ios":"11.3" }
  transform-spread { "ie":"11" }
  transform-parameters { "edge":"17", "ie":"11" }
  transform-destructuring { "edge":"17", "ie":"11" }
  transform-block-scoping { "ie":"11" }
  transform-typeof-symbol { "ie":"11" }
  transform-new-target { "ie":"11" }
  transform-regenerator { "ie":"11" }
  transform-exponentiation-operator { "ie":"11" }
  transform-async-to-generator { "ie":"11" }
  proposal-async-generator-functions { "edge":"17", "ie":"11", "ios":"11.3" }
  proposal-object-rest-spread { "edge":"17", "ie":"11" }
  proposal-unicode-property-regex { "edge":"17", "firefox":"63", "ie":"11" }
  proposal-json-strings { "edge":"17", "ie":"11", "ios":"11.3" }
  proposal-optional-catch-binding { "edge":"17", "ie":"11" }
  transform-named-capturing-groups-regex { "edge":"17", "firefox":"63", "ie":"11" }

Using polyfills with `usage` option:

[babel-preset-env-example/App.js] Added following polyfills:
  es6.object.assign { "ie":"11" }
  es6.promise { "ie":"11" }
Done in 0.39s.
```

</details>

<details>
<summary>build/App.js</summary>

```JavaScript
"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.assign");

require("./index.html");

// Not needed with useBuiltIns: 'usage'
//import '@babel/polyfill';
// Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
var object1 = {
  a: 1,
  b: 2,
  c: 3
};
var object2 = Object.assign({
  c: 4,
  d: 5
}, object1);
console.log(object2.c, object2.d); // Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});
console.log(promise1);
```

</details>

### `useBuiltIns: 'entry'` + `import '@babel/polyfill'`

Includes polyfills given .browserslistrc

#### Webpack output

```
$ yarn build:webpack:dev
...
build/App.js    806 KiB
...
```

#### Babel output

<details>
<summary>$ yarn build:babel</summary>

```
Using targets:
{
  "chrome": "70",
  "edge": "17",
  "firefox": "63",
  "ie": "11",
  "ios": "11.3",
  "safari": "12"
}

Using modules transform: auto

Using plugins:
  transform-template-literals { "ie":"11" }
  transform-literals { "ie":"11" }
  transform-function-name { "edge":"17", "ie":"11" }
  transform-arrow-functions { "ie":"11" }
  transform-classes { "ie":"11" }
  transform-object-super { "ie":"11" }
  transform-shorthand-properties { "ie":"11" }
  transform-duplicate-keys { "ie":"11" }
  transform-computed-properties { "ie":"11" }
  transform-for-of { "ie":"11" }
  transform-sticky-regex { "ie":"11" }
  transform-dotall-regex { "edge":"17", "firefox":"63", "ie":"11" }
  transform-unicode-regex { "ie":"11", "ios":"11.3" }
  transform-spread { "ie":"11" }
  transform-parameters { "edge":"17", "ie":"11" }
  transform-destructuring { "edge":"17", "ie":"11" }
  transform-block-scoping { "ie":"11" }
  transform-typeof-symbol { "ie":"11" }
  transform-new-target { "ie":"11" }
  transform-regenerator { "ie":"11" }
  transform-exponentiation-operator { "ie":"11" }
  transform-async-to-generator { "ie":"11" }
  proposal-async-generator-functions { "edge":"17", "ie":"11", "ios":"11.3" }
  proposal-object-rest-spread { "edge":"17", "ie":"11" }
  proposal-unicode-property-regex { "edge":"17", "firefox":"63", "ie":"11" }
  proposal-json-strings { "edge":"17", "ie":"11", "ios":"11.3" }
  proposal-optional-catch-binding { "edge":"17", "ie":"11" }
  transform-named-capturing-groups-regex { "edge":"17", "firefox":"63", "ie":"11" }

Using polyfills with `entry` option:

[babel-preset-env-example/App.js] Replaced `@babel/polyfill` with the following polyfills:
  es6.array.copy-within { "ie":"11" }
  es6.array.fill { "ie":"11" }
  es6.array.find { "ie":"11" }
  es6.array.find-index { "ie":"11" }
  es6.array.from { "ie":"11" }
  es7.array.includes { "ie":"11" }
  es6.array.iterator { "ie":"11" }
  es6.array.of { "ie":"11" }
  es6.array.species { "ie":"11" }
  es6.date.to-primitive { "ie":"11" }
  es6.function.has-instance { "ie":"11" }
  es6.function.name { "ie":"11" }
  es6.map { "ie":"11" }
  es6.math.acosh { "ie":"11" }
  es6.math.asinh { "ie":"11" }
  es6.math.atanh { "ie":"11" }
  es6.math.cbrt { "ie":"11" }
  es6.math.clz32 { "ie":"11" }
  es6.math.cosh { "ie":"11" }
  es6.math.expm1 { "ie":"11" }
  es6.math.fround { "ie":"11" }
  es6.math.hypot { "ie":"11" }
  es6.math.imul { "ie":"11" }
  es6.math.log1p { "ie":"11" }
  es6.math.log10 { "ie":"11" }
  es6.math.log2 { "ie":"11" }
  es6.math.sign { "ie":"11" }
  es6.math.sinh { "ie":"11" }
  es6.math.tanh { "ie":"11" }
  es6.math.trunc { "ie":"11" }
  es6.number.constructor { "ie":"11" }
  es6.number.epsilon { "ie":"11" }
  es6.number.is-finite { "ie":"11" }
  es6.number.is-integer { "ie":"11" }
  es6.number.is-nan { "ie":"11" }
  es6.number.is-safe-integer { "ie":"11" }
  es6.number.max-safe-integer { "ie":"11" }
  es6.number.min-safe-integer { "ie":"11" }
  es6.number.parse-float { "ie":"11" }
  es6.number.parse-int { "ie":"11" }
  es6.object.assign { "ie":"11" }
  es7.object.define-getter { "ie":"11" }
  es7.object.define-setter { "ie":"11" }
  es7.object.entries { "ie":"11" }
  es6.object.freeze { "ie":"11" }
  es6.object.get-own-property-descriptor { "ie":"11" }
  es7.object.get-own-property-descriptors { "ie":"11" }
  es6.object.get-own-property-names { "ie":"11" }
  es6.object.get-prototype-of { "ie":"11" }
  es7.object.lookup-getter { "edge":"17", "ie":"11" }
  es7.object.lookup-setter { "edge":"17", "ie":"11" }
  es6.object.prevent-extensions { "ie":"11" }
  es6.object.is { "ie":"11" }
  es6.object.is-frozen { "ie":"11" }
  es6.object.is-sealed { "ie":"11" }
  es6.object.is-extensible { "ie":"11" }
  es6.object.keys { "ie":"11" }
  es6.object.seal { "ie":"11" }
  es7.object.values { "ie":"11" }
  es6.promise { "ie":"11" }
  es7.promise.finally { "edge":"17", "ie":"11" }
  es6.reflect.apply { "ie":"11" }
  es6.reflect.construct { "ie":"11" }
  es6.reflect.define-property { "ie":"11" }
  es6.reflect.delete-property { "ie":"11" }
  es6.reflect.get { "ie":"11" }
  es6.reflect.get-own-property-descriptor { "ie":"11" }
  es6.reflect.get-prototype-of { "ie":"11" }
  es6.reflect.has { "ie":"11" }
  es6.reflect.is-extensible { "ie":"11" }
  es6.reflect.own-keys { "ie":"11" }
  es6.reflect.prevent-extensions { "ie":"11" }
  es6.reflect.set { "ie":"11" }
  es6.reflect.set-prototype-of { "ie":"11" }
  es6.regexp.constructor { "edge":"17", "ie":"11" }
  es6.regexp.flags { "edge":"17", "ie":"11" }
  es6.regexp.match { "edge":"17", "ie":"11" }
  es6.regexp.replace { "edge":"17", "ie":"11" }
  es6.regexp.split { "edge":"17", "ie":"11" }
  es6.regexp.search { "edge":"17", "ie":"11" }
  es6.regexp.to-string { "edge":"17", "ie":"11" }
  es6.set { "ie":"11" }
  es6.symbol { "edge":"17", "ie":"11" }
  es7.symbol.async-iterator { "edge":"17", "ie":"11", "ios":"11.3" }
  es6.string.anchor { "ie":"11" }
  es6.string.big { "ie":"11" }
  es6.string.blink { "ie":"11" }
  es6.string.bold { "ie":"11" }
  es6.string.code-point-at { "ie":"11" }
  es6.string.ends-with { "ie":"11" }
  es6.string.fixed { "ie":"11" }
  es6.string.fontcolor { "ie":"11" }
  es6.string.fontsize { "ie":"11" }
  es6.string.from-code-point { "ie":"11" }
  es6.string.includes { "ie":"11" }
  es6.string.italics { "ie":"11" }
  es6.string.iterator { "ie":"11" }
  es6.string.link { "ie":"11" }
  es7.string.pad-start { "ie":"11" }
  es7.string.pad-end { "ie":"11" }
  es6.string.raw { "ie":"11" }
  es6.string.repeat { "ie":"11" }
  es6.string.small { "ie":"11" }
  es6.string.starts-with { "ie":"11" }
  es6.string.strike { "ie":"11" }
  es6.string.sub { "ie":"11" }
  es6.string.sup { "ie":"11" }
  es6.typed.array-buffer { "ie":"11" }
  es6.typed.int8-array { "ie":"11" }
  es6.typed.uint8-array { "ie":"11" }
  es6.typed.uint8-clamped-array { "ie":"11" }
  es6.typed.int16-array { "ie":"11" }
  es6.typed.uint16-array { "ie":"11" }
  es6.typed.int32-array { "ie":"11" }
  es6.typed.uint32-array { "ie":"11" }
  es6.typed.float32-array { "ie":"11" }
  es6.typed.float64-array { "ie":"11" }
  es6.weak-map { "ie":"11" }
  es6.weak-set { "ie":"11" }
  web.timers { "chrome":"70", "edge":"17", "firefox":"63", "ie":"11", "ios":"11.3", "safari":"12" }
  web.immediate { "chrome":"70", "edge":"17", "firefox":"63", "ie":"11", "ios":"11.3", "safari":"12" }
  web.dom.iterable { "chrome":"70", "edge":"17", "firefox":"63", "ie":"11", "ios":"11.3", "safari":"12" }
Done in 0.43s.
```

</details>

<details>
<summary>build/App.js</summary>

```JavaScript
"use strict";

require("core-js/modules/es6.array.copy-within");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.array.of");

require("core-js/modules/es6.array.species");

require("core-js/modules/es6.date.to-primitive");

require("core-js/modules/es6.function.has-instance");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.map");

require("core-js/modules/es6.math.acosh");

require("core-js/modules/es6.math.asinh");

require("core-js/modules/es6.math.atanh");

require("core-js/modules/es6.math.cbrt");

require("core-js/modules/es6.math.clz32");

require("core-js/modules/es6.math.cosh");

require("core-js/modules/es6.math.expm1");

require("core-js/modules/es6.math.fround");

require("core-js/modules/es6.math.hypot");

require("core-js/modules/es6.math.imul");

require("core-js/modules/es6.math.log1p");

require("core-js/modules/es6.math.log10");

require("core-js/modules/es6.math.log2");

require("core-js/modules/es6.math.sign");

require("core-js/modules/es6.math.sinh");

require("core-js/modules/es6.math.tanh");

require("core-js/modules/es6.math.trunc");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.epsilon");

require("core-js/modules/es6.number.is-finite");

require("core-js/modules/es6.number.is-integer");

require("core-js/modules/es6.number.is-nan");

require("core-js/modules/es6.number.is-safe-integer");

require("core-js/modules/es6.number.max-safe-integer");

require("core-js/modules/es6.number.min-safe-integer");

require("core-js/modules/es6.number.parse-float");

require("core-js/modules/es6.number.parse-int");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.object.define-getter");

require("core-js/modules/es7.object.define-setter");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.object.get-own-property-descriptor");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.object.get-own-property-names");

require("core-js/modules/es6.object.get-prototype-of");

require("core-js/modules/es7.object.lookup-getter");

require("core-js/modules/es7.object.lookup-setter");

require("core-js/modules/es6.object.prevent-extensions");

require("core-js/modules/es6.object.is");

require("core-js/modules/es6.object.is-frozen");

require("core-js/modules/es6.object.is-sealed");

require("core-js/modules/es6.object.is-extensible");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.seal");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.promise.finally");

require("core-js/modules/es6.reflect.apply");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.reflect.define-property");

require("core-js/modules/es6.reflect.delete-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.reflect.get-own-property-descriptor");

require("core-js/modules/es6.reflect.get-prototype-of");

require("core-js/modules/es6.reflect.has");

require("core-js/modules/es6.reflect.is-extensible");

require("core-js/modules/es6.reflect.own-keys");

require("core-js/modules/es6.reflect.prevent-extensions");

require("core-js/modules/es6.reflect.set");

require("core-js/modules/es6.reflect.set-prototype-of");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.flags");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.set");

require("core-js/modules/es6.symbol");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.anchor");

require("core-js/modules/es6.string.big");

require("core-js/modules/es6.string.blink");

require("core-js/modules/es6.string.bold");

require("core-js/modules/es6.string.code-point-at");

require("core-js/modules/es6.string.ends-with");

require("core-js/modules/es6.string.fixed");

require("core-js/modules/es6.string.fontcolor");

require("core-js/modules/es6.string.fontsize");

require("core-js/modules/es6.string.from-code-point");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.string.italics");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.string.link");

require("core-js/modules/es7.string.pad-start");

require("core-js/modules/es7.string.pad-end");

require("core-js/modules/es6.string.raw");

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.string.small");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.string.strike");

require("core-js/modules/es6.string.sub");

require("core-js/modules/es6.string.sup");

require("core-js/modules/es6.typed.array-buffer");

require("core-js/modules/es6.typed.int8-array");

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.typed.uint8-clamped-array");

require("core-js/modules/es6.typed.int16-array");

require("core-js/modules/es6.typed.uint16-array");

require("core-js/modules/es6.typed.int32-array");

require("core-js/modules/es6.typed.uint32-array");

require("core-js/modules/es6.typed.float32-array");

require("core-js/modules/es6.typed.float64-array");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.weak-set");

require("core-js/modules/web.timers");

require("core-js/modules/web.immediate");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

require("./index.html");

// Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
var object1 = {
  a: 1,
  b: 2,
  c: 3
};
var object2 = Object.assign({
  c: 4,
  d: 5
}, object1);
console.log(object2.c, object2.d); // Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});
console.log(promise1);
```

</details>

### `useBuiltIns: false` + `import '@babel/polyfill'`

All polyfills included, no use of .browserslistrc

#### Webpack output

```
$ yarn build:webpack:dev
...
build/App.js    859 KiB
...
```

#### Babel output

<details>
<summary>$ yarn build:babel</summary>

```
Using targets:
{
  "chrome": "70",
  "edge": "17",
  "firefox": "63",
  "ie": "11",
  "ios": "11.3",
  "safari": "12"
}

Using modules transform: auto

Using plugins:
  transform-template-literals { "ie":"11" }
  transform-literals { "ie":"11" }
  transform-function-name { "edge":"17", "ie":"11" }
  transform-arrow-functions { "ie":"11" }
  transform-classes { "ie":"11" }
  transform-object-super { "ie":"11" }
  transform-shorthand-properties { "ie":"11" }
  transform-duplicate-keys { "ie":"11" }
  transform-computed-properties { "ie":"11" }
  transform-for-of { "ie":"11" }
  transform-sticky-regex { "ie":"11" }
  transform-dotall-regex { "edge":"17", "firefox":"63", "ie":"11" }
  transform-unicode-regex { "ie":"11", "ios":"11.3" }
  transform-spread { "ie":"11" }
  transform-parameters { "edge":"17", "ie":"11" }
  transform-destructuring { "edge":"17", "ie":"11" }
  transform-block-scoping { "ie":"11" }
  transform-typeof-symbol { "ie":"11" }
  transform-new-target { "ie":"11" }
  transform-regenerator { "ie":"11" }
  transform-exponentiation-operator { "ie":"11" }
  transform-async-to-generator { "ie":"11" }
  proposal-async-generator-functions { "edge":"17", "ie":"11", "ios":"11.3" }
  proposal-object-rest-spread { "edge":"17", "ie":"11" }
  proposal-unicode-property-regex { "edge":"17", "firefox":"63", "ie":"11" }
  proposal-json-strings { "edge":"17", "ie":"11", "ios":"11.3" }
  proposal-optional-catch-binding { "edge":"17", "ie":"11" }
  transform-named-capturing-groups-regex { "edge":"17", "firefox":"63", "ie":"11" }

Using polyfills: No polyfills were added, since the `useBuiltIns` option was not set.
Done in 0.38s.
```

</details>

<details>
<summary>build/App.js</summary>

```JavaScript
"use strict";

require("@babel/polyfill");

require("./index.html");

// Not needed with useBuiltIns: 'usage'
// Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
var object1 = {
  a: 1,
  b: 2,
  c: 3
};
var object2 = Object.assign({
  c: 4,
  d: 5
}, object1);
console.log(object2.c, object2.d); // Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});
console.log(promise1);
```

</details>

### `useBuiltIns: false` without `import '@babel/polyfill'`

No polyfill included

#### Webpack output

```
$ yarn build:webpack:dev
...
build/App.js   6.48 KiB
...
```

#### Babel output

<details>
<summary>$ yarn build:babel</summary>

```
Using targets:
{
  "chrome": "70",
  "edge": "17",
  "firefox": "63",
  "ie": "11",
  "ios": "11.3",
  "safari": "12"
}

Using modules transform: auto

Using plugins:
  transform-template-literals { "ie":"11" }
  transform-literals { "ie":"11" }
  transform-function-name { "edge":"17", "ie":"11" }
  transform-arrow-functions { "ie":"11" }
  transform-classes { "ie":"11" }
  transform-object-super { "ie":"11" }
  transform-shorthand-properties { "ie":"11" }
  transform-duplicate-keys { "ie":"11" }
  transform-computed-properties { "ie":"11" }
  transform-for-of { "ie":"11" }
  transform-sticky-regex { "ie":"11" }
  transform-dotall-regex { "edge":"17", "firefox":"63", "ie":"11" }
  transform-unicode-regex { "ie":"11", "ios":"11.3" }
  transform-spread { "ie":"11" }
  transform-parameters { "edge":"17", "ie":"11" }
  transform-destructuring { "edge":"17", "ie":"11" }
  transform-block-scoping { "ie":"11" }
  transform-typeof-symbol { "ie":"11" }
  transform-new-target { "ie":"11" }
  transform-regenerator { "ie":"11" }
  transform-exponentiation-operator { "ie":"11" }
  transform-async-to-generator { "ie":"11" }
  proposal-async-generator-functions { "edge":"17", "ie":"11", "ios":"11.3" }
  proposal-object-rest-spread { "edge":"17", "ie":"11" }
  proposal-unicode-property-regex { "edge":"17", "firefox":"63", "ie":"11" }
  proposal-json-strings { "edge":"17", "ie":"11", "ios":"11.3" }
  proposal-optional-catch-binding { "edge":"17", "ie":"11" }
  transform-named-capturing-groups-regex { "edge":"17", "firefox":"63", "ie":"11" }

Using polyfills: No polyfills were added, since the `useBuiltIns` option was not set.
Done in 0.38s.
```

</details>

<details>
<summary>build/App.js</summary>

```JavaScript
"use strict";

require("./index.html");

// Not needed with useBuiltIns: 'usage'
//import '@babel/polyfill';
// Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
var object1 = {
  a: 1,
  b: 2,
  c: 3
};
var object2 = Object.assign({
  c: 4,
  d: 5
}, object1);
console.log(object2.c, object2.d); // Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});
console.log(promise1);
```

</details>
