// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.
// https://github.com/bencodezen/vue-enterprise-boilerplate/blob/main/src/components/_globals.js

function install (Vue) {
  // https://webpack.js.org/guides/dependency-management/#require-context
  // https://webpack.docschina.org/guides/dependency-management/
  // https://regex101.com/

  const requireComponent = require.context(
    // 在 src/components 文件夹中查找文件
    '@/components',
    // 不查询其子目录
    false,
    // 仅仅包括 "Base" 开头的 .vue|js 文件
    /(Base)\w+\.(vue|js)$/
  )

  requireComponent.keys().forEach((fileName) => {
    // 获取组件配置选项对象
    const componentConfig = requireComponent(fileName)
    // console.log(componentConfig)

    // 获取驼峰版本的组件名称
    // './BaseButton.vue' => 'BaseButton'
    const componentName = fileName
      // 移除开头的 "./"
      .replace(/^\.\//, '')
      // 移除文件扩展名
      .replace(/\.\w+$/, '')
      .split('-')
      .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
      .join('')

    // 全局注册
    Vue.component(componentName, componentConfig.default || componentConfig)
  })
}

export default {
  install
}
