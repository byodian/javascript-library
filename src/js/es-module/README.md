# ES6 module

The export statement is used when creating JavaScript modules to export live bindings to `functions`, `objects`, or primitive values from the module.

## There are two types of exports

1. Named Exports (Zero or more exports per module)
2. Default Exports (One per module)

## Native ES modules can be bad for performance

Modern browsers can load ES modules natively. But, native ES modules create performance issues in a two ways.

1. When a browser download a JavaScript file, it has to be parsed and compiled before it can run. With native ES modules, the functions you `import` can't be used (and the file can't run) until the browser parsers and compiles file.
2. Additionally, with native ES modules, when you `import` a function or variable, the entire file for that module has to be downloaded.

So, using a module bundler before shipping your code to production allows you to overcome both of these issues.

## rollup.js

The simplest and most problem-free to use.

## Examples

```js
// Exporting individual features
export let age = 1, age1 = 12, age2 = 23;

export let name1 = name2 = 'Jimmy';

export function sayHi() {
  console.log('Hello World');
}

export class Person {}
```

```js
// Export list
export { name1, name2, name3 }
```

```js
// Renaming exports
export { Variable1 as name1, variable2 as name2 };
```

```js
// Exporting destructured assignments with renaming
export const { name, age, name2: bar } = o
```

```js
// default exports
export default expression
export default function () {}
export default function name1() {}
export { name as default, name1, name2}
```

```js
// Aggregating module
export * from './hooks';
export * as name1 from './hooks'
export { name1, name2, name3 } from './hooks';
export { import1 as name1, import2 as name2 } from './hooks'
export { default, name1, name2 } from './hooks';
```
