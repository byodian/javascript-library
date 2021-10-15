# vue-official-template1

## vue 开发常见问题

### 窗口宽度变化强制子组件重新渲染

子组件绑定 key 值，当发生 `resize` 事件且页面重新渲染后（使用 `$nextTick`），更新 key 值，使组件强制刷新。但这会造成边子组件同样被销毁重新渲染，这会带来额外的性能消耗，并导致组件状态丢失。

## 全局注册

```js
function install (Vue) {
// https://webpack.js.org/guides/dependency-management/#require-context
// https://webpack.docschina.org/guides/dependency-management/
// requireComponent <Function> => webpackContext
  const requireComponent = require.context(
  // Look for files in the current directory
    '@/components',
    // Do not look in subdirectories
    false,
    // Only include "App|Base-" prefixed .vue|js files
    /(Base)\w+\.(vue|js)$/
  )
  console.log(requireComponent)

  console.log(requireComponent.keys())

  // For each matching file name...
  requireComponent.keys().forEach((fileName) => {
  // Get the component config
    const componentConfig = requireComponent(fileName)
    // Get the PascalCase version of the component name
    const componentName = fileName
    // Remove the "./_" from the beginning
      .replace(/^\.\//, '')
    // Remove the file extension from the end
      .replace(/\.\w+$/, '')
    // Split up kebabs
      .split('-')
    // Upper case
      .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    // Concatenated
      .join('')

    // Globally register the component
    Vue.component(componentName, componentConfig.default || componentConfig)
  })
}
```
