# babel-preset-env example

With Babel 6

```JS
// As .babelrc or as babel-loader options inside webpack.config.js
presets: [
  ['env', {
    targets: {
      browsers: ['> 1% in FR']
    },
    useBuiltIns: true, // Default is false, see https://babeljs.io/docs/plugins/preset-env#usebuiltins
    debug: true // Outputs Babel's targets/plugins/polyfills used and why
  }]
]
```

```JS
// App.js
import 'babel-polyfill'
```

## Findings

- Always use `import 'babel-polyfill'`, without you don't get polyfills for `Object.assign()`, `Promise`... from [core-js](https://github.com/zloirock/core-js), only Babel plugins (e.g `transform-*`)
- Do not write inside webpack.config.js `entry: ['babel-polyfill', './App.js']` as suggested [here](https://babeljs.io/docs/usage/polyfill/#usage-in-node--browserify--webpack), use `import 'babel-polyfill'` + `entry: './App.js'`
- `useBuiltIns: true` includes what's needed given `targets: {browsers: [...]}` instead of including everything from [core-js](https://github.com/zloirock/core-js)

## Output

### Without `babel-polyfill`

<details>
<summary>$ yarn build:babel</summary>

```
Using targets:
{
  "chrome": "65",
  "edge": "16",
  "firefox": "59",
  "ie": "11",
  "ios": "10.3",
  "safari": "11"
}

Modules transform: commonjs

Using plugins:
  check-es2015-constants {"ie":"11"}
  transform-es2015-arrow-functions {"ie":"11"}
  transform-es2015-block-scoping {"ie":"11"}
  transform-es2015-classes {"ie":"11"}
  transform-es2015-computed-properties {"ie":"11"}
  transform-es2015-destructuring {"edge":"16","ie":"11"}
  transform-es2015-duplicate-keys {"ie":"11"}
  transform-es2015-for-of {"ie":"11"}
  transform-es2015-function-name {"edge":"16","ie":"11"}
  transform-es2015-literals {"ie":"11"}
  transform-es2015-object-super {"ie":"11"}
  transform-es2015-parameters {"ie":"11"}
  transform-es2015-shorthand-properties {"ie":"11"}
  transform-es2015-spread {"ie":"11"}
  transform-es2015-sticky-regex {"ie":"11"}
  transform-es2015-template-literals {"ie":"11"}
  transform-es2015-typeof-symbol {"ie":"11"}
  transform-es2015-unicode-regex {"ie":"11"}
  transform-regenerator {"ie":"11"}
  transform-exponentiation-operator {"ie":"11"}
  transform-async-to-generator {"ie":"11"}
  syntax-trailing-function-commas {"ie":"11"}
```
</details>

<details>
<summary>build/App.js</summary>

```JavaScript
'use strict';

require('./index.html');

// Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

var object1 = {
  a: 1,
  b: 2,
  c: 3
};

var object2 = Object.assign({ c: 4, d: 5 }, object1);

console.log(object2.c, object2.d);

// Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

console.log(promise1);
```
</details>


### Without `useBuiltIns`

<details>
<summary>$ yarn build:babel</summary>

```
Using targets:
{
  "chrome": "65",
  "edge": "16",
  "firefox": "59",
  "ie": "11",
  "ios": "10.3",
  "safari": "11"
}

Modules transform: commonjs

Using plugins:
  check-es2015-constants {"ie":"11"}
  transform-es2015-arrow-functions {"ie":"11"}
  transform-es2015-block-scoping {"ie":"11"}
  transform-es2015-classes {"ie":"11"}
  transform-es2015-computed-properties {"ie":"11"}
  transform-es2015-destructuring {"edge":"16","ie":"11"}
  transform-es2015-duplicate-keys {"ie":"11"}
  transform-es2015-for-of {"ie":"11"}
  transform-es2015-function-name {"edge":"16","ie":"11"}
  transform-es2015-literals {"ie":"11"}
  transform-es2015-object-super {"ie":"11"}
  transform-es2015-parameters {"ie":"11"}
  transform-es2015-shorthand-properties {"ie":"11"}
  transform-es2015-spread {"ie":"11"}
  transform-es2015-sticky-regex {"ie":"11"}
  transform-es2015-template-literals {"ie":"11"}
  transform-es2015-typeof-symbol {"ie":"11"}
  transform-es2015-unicode-regex {"ie":"11"}
  transform-regenerator {"ie":"11"}
  transform-exponentiation-operator {"ie":"11"}
  transform-async-to-generator {"ie":"11"}
  syntax-trailing-function-commas {"ie":"11"}
```
</details>

<details>
<summary>build/App.js</summary>

```JavaScript
'use strict';

require('babel-polyfill');

require('./index.html');

// Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

var object1 = {
  a: 1,
  b: 2,
  c: 3
};

var object2 = Object.assign({ c: 4, d: 5 }, object1);

console.log(object2.c, object2.d);

// Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

console.log(promise1);
```
</details>

### With `useBuiltIns`

<details>
<summary>$ yarn build:babel</summary>

```
Using targets:
{
  "chrome": "65",
  "edge": "16",
  "firefox": "59",
  "ie": "11",
  "ios": "10.3",
  "safari": "11"
}

Modules transform: commonjs

Using plugins:
  check-es2015-constants {"ie":"11"}
  transform-es2015-arrow-functions {"ie":"11"}
  transform-es2015-block-scoping {"ie":"11"}
  transform-es2015-classes {"ie":"11"}
  transform-es2015-computed-properties {"ie":"11"}
  transform-es2015-destructuring {"edge":"16","ie":"11"}
  transform-es2015-duplicate-keys {"ie":"11"}
  transform-es2015-for-of {"ie":"11"}
  transform-es2015-function-name {"edge":"16","ie":"11"}
  transform-es2015-literals {"ie":"11"}
  transform-es2015-object-super {"ie":"11"}
  transform-es2015-parameters {"ie":"11"}
  transform-es2015-shorthand-properties {"ie":"11"}
  transform-es2015-spread {"ie":"11"}
  transform-es2015-sticky-regex {"ie":"11"}
  transform-es2015-template-literals {"ie":"11"}
  transform-es2015-typeof-symbol {"ie":"11"}
  transform-es2015-unicode-regex {"ie":"11"}
  transform-regenerator {"ie":"11"}
  transform-exponentiation-operator {"ie":"11"}
  transform-async-to-generator {"ie":"11"}
  syntax-trailing-function-commas {"ie":"11"}

Using polyfills:
  es6.typed.array-buffer {"ie":"11"}
  es6.typed.int8-array {"ie":"11"}
  es6.typed.uint8-array {"ie":"11"}
  es6.typed.uint8-clamped-array {"ie":"11"}
  es6.typed.int16-array {"ie":"11"}
  es6.typed.uint16-array {"ie":"11"}
  es6.typed.int32-array {"ie":"11"}
  es6.typed.uint32-array {"ie":"11"}
  es6.typed.float32-array {"ie":"11"}
  es6.typed.float64-array {"ie":"11"}
  es6.map {"ie":"11"}
  es6.set {"ie":"11"}
  es6.weak-map {"ie":"11"}
  es6.weak-set {"ie":"11"}
  es6.reflect.apply {"ie":"11"}
  es6.reflect.construct {"ie":"11"}
  es6.reflect.define-property {"ie":"11"}
  es6.reflect.delete-property {"ie":"11"}
  es6.reflect.get {"ie":"11"}
  es6.reflect.get-own-property-descriptor {"ie":"11"}
  es6.reflect.get-prototype-of {"ie":"11"}
  es6.reflect.has {"ie":"11"}
  es6.reflect.is-extensible {"ie":"11"}
  es6.reflect.own-keys {"ie":"11"}
  es6.reflect.prevent-extensions {"ie":"11"}
  es6.reflect.set {"ie":"11"}
  es6.reflect.set-prototype-of {"ie":"11"}
  es6.promise {"ie":"11"}
  es6.symbol {"edge":"16","ie":"11"}
  es6.object.freeze {"ie":"11"}
  es6.object.seal {"ie":"11"}
  es6.object.prevent-extensions {"ie":"11"}
  es6.object.is-frozen {"ie":"11"}
  es6.object.is-sealed {"ie":"11"}
  es6.object.is-extensible {"ie":"11"}
  es6.object.get-own-property-descriptor {"ie":"11"}
  es6.object.get-prototype-of {"ie":"11"}
  es6.object.keys {"ie":"11"}
  es6.object.get-own-property-names {"ie":"11"}
  es6.object.assign {"ie":"11"}
  es6.object.is {"ie":"11"}
  es6.function.name {"edge":"16","ie":"11"}
  es6.string.raw {"ie":"11"}
  es6.string.from-code-point {"ie":"11"}
  es6.string.code-point-at {"ie":"11"}
  es6.string.repeat {"ie":"11"}
  es6.string.starts-with {"ie":"11"}
  es6.string.ends-with {"ie":"11"}
  es6.string.includes {"ie":"11"}
  es6.regexp.flags {"edge":"16","ie":"11"}
  es6.regexp.match {"edge":"16","ie":"11"}
  es6.regexp.replace {"edge":"16","ie":"11"}
  es6.regexp.split {"edge":"16","ie":"11"}
  es6.regexp.search {"edge":"16","ie":"11"}
  es6.array.from {"ie":"11"}
  es6.array.of {"ie":"11"}
  es6.array.copy-within {"ie":"11"}
  es6.array.find {"ie":"11"}
  es6.array.find-index {"ie":"11"}
  es6.array.fill {"ie":"11"}
  es6.array.iterator {"ie":"11"}
  es6.number.is-finite {"ie":"11"}
  es6.number.is-integer {"ie":"11"}
  es6.number.is-safe-integer {"ie":"11"}
  es6.number.is-nan {"ie":"11"}
  es6.number.epsilon {"ie":"11"}
  es6.number.min-safe-integer {"ie":"11"}
  es6.number.max-safe-integer {"ie":"11"}
  es6.math.acosh {"ie":"11"}
  es6.math.asinh {"ie":"11"}
  es6.math.atanh {"ie":"11"}
  es6.math.cbrt {"ie":"11"}
  es6.math.clz32 {"ie":"11"}
  es6.math.cosh {"ie":"11"}
  es6.math.expm1 {"ie":"11"}
  es6.math.fround {"ie":"11"}
  es6.math.hypot {"ie":"11"}
  es6.math.imul {"ie":"11"}
  es6.math.log1p {"ie":"11"}
  es6.math.log10 {"ie":"11"}
  es6.math.log2 {"ie":"11"}
  es6.math.sign {"ie":"11"}
  es6.math.sinh {"ie":"11"}
  es6.math.tanh {"ie":"11"}
  es6.math.trunc {"ie":"11"}
  es7.array.includes {"ie":"11"}
  es7.object.values {"ie":"11"}
  es7.object.entries {"ie":"11"}
  es7.object.get-own-property-descriptors {"ie":"11"}
  es7.string.pad-start {"ie":"11"}
  es7.string.pad-end {"ie":"11"}
  web.timers {"chrome":"65","edge":"16","firefox":"59","ie":"11","ios":"10.3","safari":"11"}
  web.immediate {"chrome":"65","edge":"16","firefox":"59","ie":"11","ios":"10.3","safari":"11"}
  web.dom.iterable {"chrome":"65","edge":"16","firefox":"59","ie":"11","ios":"10.3","safari":"11"}
```
</details>

<details>
<summary>build/App.js</summary>

```JavaScript
'use strict';

require('core-js/modules/es6.typed.array-buffer');

require('core-js/modules/es6.typed.int8-array');

require('core-js/modules/es6.typed.uint8-array');

require('core-js/modules/es6.typed.uint8-clamped-array');

require('core-js/modules/es6.typed.int16-array');

require('core-js/modules/es6.typed.uint16-array');

require('core-js/modules/es6.typed.int32-array');

require('core-js/modules/es6.typed.uint32-array');

require('core-js/modules/es6.typed.float32-array');

require('core-js/modules/es6.typed.float64-array');

require('core-js/modules/es6.map');

require('core-js/modules/es6.set');

require('core-js/modules/es6.weak-map');

require('core-js/modules/es6.weak-set');

require('core-js/modules/es6.reflect.apply');

require('core-js/modules/es6.reflect.construct');

require('core-js/modules/es6.reflect.define-property');

require('core-js/modules/es6.reflect.delete-property');

require('core-js/modules/es6.reflect.get');

require('core-js/modules/es6.reflect.get-own-property-descriptor');

require('core-js/modules/es6.reflect.get-prototype-of');

require('core-js/modules/es6.reflect.has');

require('core-js/modules/es6.reflect.is-extensible');

require('core-js/modules/es6.reflect.own-keys');

require('core-js/modules/es6.reflect.prevent-extensions');

require('core-js/modules/es6.reflect.set');

require('core-js/modules/es6.reflect.set-prototype-of');

require('core-js/modules/es6.promise');

require('core-js/modules/es6.symbol');

require('core-js/modules/es6.object.freeze');

require('core-js/modules/es6.object.seal');

require('core-js/modules/es6.object.prevent-extensions');

require('core-js/modules/es6.object.is-frozen');

require('core-js/modules/es6.object.is-sealed');

require('core-js/modules/es6.object.is-extensible');

require('core-js/modules/es6.object.get-own-property-descriptor');

require('core-js/modules/es6.object.get-prototype-of');

require('core-js/modules/es6.object.keys');

require('core-js/modules/es6.object.get-own-property-names');

require('core-js/modules/es6.object.assign');

require('core-js/modules/es6.object.is');

require('core-js/modules/es6.function.name');

require('core-js/modules/es6.string.raw');

require('core-js/modules/es6.string.from-code-point');

require('core-js/modules/es6.string.code-point-at');

require('core-js/modules/es6.string.repeat');

require('core-js/modules/es6.string.starts-with');

require('core-js/modules/es6.string.ends-with');

require('core-js/modules/es6.string.includes');

require('core-js/modules/es6.regexp.flags');

require('core-js/modules/es6.regexp.match');

require('core-js/modules/es6.regexp.replace');

require('core-js/modules/es6.regexp.split');

require('core-js/modules/es6.regexp.search');

require('core-js/modules/es6.array.from');

require('core-js/modules/es6.array.of');

require('core-js/modules/es6.array.copy-within');

require('core-js/modules/es6.array.find');

require('core-js/modules/es6.array.find-index');

require('core-js/modules/es6.array.fill');

require('core-js/modules/es6.array.iterator');

require('core-js/modules/es6.number.is-finite');

require('core-js/modules/es6.number.is-integer');

require('core-js/modules/es6.number.is-safe-integer');

require('core-js/modules/es6.number.is-nan');

require('core-js/modules/es6.number.epsilon');

require('core-js/modules/es6.number.min-safe-integer');

require('core-js/modules/es6.number.max-safe-integer');

require('core-js/modules/es6.math.acosh');

require('core-js/modules/es6.math.asinh');

require('core-js/modules/es6.math.atanh');

require('core-js/modules/es6.math.cbrt');

require('core-js/modules/es6.math.clz32');

require('core-js/modules/es6.math.cosh');

require('core-js/modules/es6.math.expm1');

require('core-js/modules/es6.math.fround');

require('core-js/modules/es6.math.hypot');

require('core-js/modules/es6.math.imul');

require('core-js/modules/es6.math.log1p');

require('core-js/modules/es6.math.log10');

require('core-js/modules/es6.math.log2');

require('core-js/modules/es6.math.sign');

require('core-js/modules/es6.math.sinh');

require('core-js/modules/es6.math.tanh');

require('core-js/modules/es6.math.trunc');

require('core-js/modules/es7.array.includes');

require('core-js/modules/es7.object.values');

require('core-js/modules/es7.object.entries');

require('core-js/modules/es7.object.get-own-property-descriptors');

require('core-js/modules/es7.string.pad-start');

require('core-js/modules/es7.string.pad-end');

require('core-js/modules/web.timers');

require('core-js/modules/web.immediate');

require('core-js/modules/web.dom.iterable');

require('regenerator-runtime/runtime');

require('./index.html');

// Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

var object1 = {
  a: 1,
  b: 2,
  c: 3
};

var object2 = Object.assign({ c: 4, d: 5 }, object1);

console.log(object2.c, object2.d);

// Example taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

console.log(promise1);
```
</details>

