// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.
// https://github.com/bencodezen/vue-enterprise-boilerplate/blob/main/src/components/_globals.js

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

export default {
  install
}
