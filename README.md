# babel-preset-env example

With Babel 6

```JS
// As .babelrc or as babel-loader options inside webpack.config.js
presets: [
  ['env', {
    targets: {
      browsers: ['> 1%']
    },
    useBuiltIns: true,
    debug: true // Outputs Babel targets/plugins used and why
  }]
]
```

```JS
// App.js
import 'babel-polyfill'
```

## Findings

- Always use `import 'babel-polyfill'`, without you don't get polyfills for `Object.assign()`, `Promise`... from [core-js](https://github.com/zloirock/core-js), only Babel `transform-*`
- Do not write inside webpack.config.js `entry: ['babel-polyfill', './App.js']` as suggested [here](https://babeljs.io/docs/usage/polyfill/#usage-in-node--browserify--webpack), use `import 'babel-polyfill'` + `entry: './App.js'`
- `useBuiltIns: true` includes what's needed given `targets: {browsers: [...]}` instead of including everything from [core-js](https://github.com/zloirock/core-js)
