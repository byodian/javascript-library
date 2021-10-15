# Vue plugin (vue2.x)

Vue 插件本身内容很少，官方文档[插件介绍页](https://cn.vuejs.org/v2/guide/plugins.html)，

Vue 主要功能集中在[三个核心的模块](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/vue3-overview)，其他的功能如路由和全局状态交给相关的库并通过插件的形式引入。

三个核心模块

- 响应模块（Reactive Module）
- 编译模块 (Compiler Module)
- 渲染模块（Render Module）
  - 渲染阶段（Render Phase）
  - 挂载或者构建阶段（Mount or Create Phase）
  - 补丁或者更新阶段（Patch or Update Phase）

引入 vue-router 和 vuex

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(Vuex)
```

## 插件分类

在 Vue 世界中有三种类型的插件：

1. Vue 插件，为 Vue 提供全局层面的功能。
2. Vuex 插件，为 Vuex 添加新的功能。
3. Vue-CLI 插件，修改构建系统，为 Webpack 或 CLI Service 增加新的功能。

## 为什么要使用插件

1. Vue.use 会自动阻止多次注册相同插件，即使多次调用也只会注册一次该插件。
2. 保持代码一致性和可维护性

```js
// 入口文件 main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import 'src/styles/index.scss'
import 'src/components/form-generator/DynamicForm/styles/index.scss'

// 插件
import 'src/plugins'
import 'src/plugins/flexible'

import FormControls from 'src/components/form-generator/FormControls'
import { addSpaceData, editSpaceData } from "src/api/common"

// 全局资源
import 'src/components'
import 'src/directives'
import * as filters from './filters'
import 'src/icons'
import 'src/components/form-generator/DynamicForm/icons'

import './permission'

// 插件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Swiper, { Navigation, Autoplay, Thumbs } from 'swiper' 
import 'swiper/swiper-bundle.css'

import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'

import * as echarts from 'echarts'
import { echartsTheme } from 'src/assets/json/echart-theme'

Vue.prototype.$addSpaceData = addSpaceData
Vue.prototype.$editSpaceData = editSpaceData
Vue.prototype.$echarts = echarts
Vue.prototype.$echarts.registerTheme('zlplw', echartsTheme)

Swiper.use([Navigation, Autoplay, Thumbs])
Vue.use(contentmenu)
Vue.use(FormControls)
Vue.use(ElementUI, { size: 'small' })

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({ /*...*/ })
```

## Vue 插件

插件通常向 Vue 添加**全局级**的功能，它可以是 `Object`，需要提供 install 方法，也可以是一个 `Function`。

第一个参数是 `Vue` 构造器和第二个是可选的 `options` 对象参数。

```js
const myPlugin1 = {
  install(Vue, options) {
    // do something...
  }
}

function myPlugin2(Vue, options) {
  // do something...
}
```

## Vue 插件的功能

Vue 插件功能一般有以下几种：

1. 添加全局方法或者 property。

2. 添加全局资源：指令/过渡/过滤器等。从 Vue3.0 开始过滤器已移除，且不再支持。[官方建议使用方法调用或计算属性代替它们](https://v3.cn.vuejs.org/guide/migration/filters.html#%E8%BF%87%E6%BB%A4%E5%99%A8)。

3. 通过全局 mixin 来添加一些组件选项。([vue-router](https://github.com/vuejs/vue-router))

4. 添加全局实例方法，在 Vue2.x 中通过把它们添加到 `Vue.prototype` 上实现，从 Vue3.0 开始，把它们添加到 `config.globalProperties`上实现。

```js
MyPlugin.install = function (Vue, options) {
  
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () { 
    //...
  }

  // 2. 添加全局资源 - 指令/过滤器/过渡
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) { 
      //...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      //...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    //...
  }

  // 5. 注册全局组件
  Vue.component('my-component', {
    //...
  })
}
```

## 使用插件

通过全局方法 `Vue.use(plugin, options)` 使用插件。

```js
import Vue from 'vue'
import myPlugin from 'myPlugin'

// => 调用 myPlugin.install(Vue,{ someOption: true} ) 
// 或 myPlugin(Vue, { someOption: true})
Vue.use(myPlugin, { someOption: true})

new Vue({
  //...
})
```

## 问题

根据以上内容：

1. 为什么 Vue 插件既可以是对象也可以是函数？

2. `Vue.use(plugin, options)` options 是如何传递给插件的第二个参数

## Vue.use 实现原理

此方法定义在 vue/src/core/global-api/use.js 中，`use` 是 Vue 的一个[静态方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/static)，此方法直接赋值给 Vue 构造器，与具体的类实例无关。

执行 `Vue.use(plugin, options)`，会调用插件的 `install` 方法或者插件自身。

- `Vue.use` 方法维护一个 `_installedPlugins` 数组来存储所有已注册的插件，调用插件之前判断该插件是否已被注册。
- 然后根据插件的类型（对象或者函数），执行不同的代码。
- 最后将已注册的插件保存在 `_installedPlugins` 数组中。

```js
import { toArray } from '../util/index'

function initUse (Vue) {
  // * Vue 构造器静态方法
  Vue.use = function (plugin) {
    // Vue 静态属性 _installedPlugins - 存储插件
    const installPlugins = this._installedPlugins || (this._installedPlugins = []);

    // this._installedPlugins = this._installedPlugins || []
    // const installPlugin = this._installedPlugins

    // 插件已安装，直接返回 Vue 构造器
    if (installPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // Vue.use(plugin, options)
    // arguments <Arguments> => [plugin, options]
    const args = toArray(arguments, 1);   // args <Array> => [options]
    args.unshift(this);                   // args <Array> => [Vue, options]

    // 判断插件类型，执行相应的函数
    if (typeof plugin.install === "function") {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === "function") {
      plugin.apply(null, args);
    }

    // * 缓存已经安装的插件
    installPlugins.push(plugin);
    return this;
  };
}
```

### Vue.use 使用案例

- use.mjs
- example/vue-use/index.html
- example/vue-use/main.js

### 函数是第一类对象

javascript 语言中，函数是第一类对象 (first-class objects) 或者它们被称为一等公民 (first-class citizens)。

javascript 中函数拥有对象的所有能力，函数可以实现以下功能。

- 通过字面量创建

  ```js
  function func() {{}
  ```

- 赋值给变量，数组项或其他对象的属性

  ```js
  const foo = function() {};
  arr.push(fucntion () {})
  obj.data = function () {}
  ```

- 作为函数的参数来传递

  ```js
  function callFunction(func) {
    func()
  }
  ```

- 作为函数的返回值

  ```js
  function returnNewFuntion() {
    return function() {}
  }
  ```

- 具有动态创建和分配的属性

  ```js
  var ninja = {}
  ninja.name = 'Hanzo'
  ```

### 构造函数返回值

> 构造函数的目的是初始化新创建的对象，并且新构造的对象会作为构造函数的调用结果（通过 new 运算符）返回。但当构造函数自身有返回值时会是什么结果？

```js
function Ninja() {
  this.skulk = function () {
    return true;
  };

  return 1;
}

new Ninja()

function Emperor() {
  this.rules = true;
  return function() {}
}

new Emperor()
```

### 自记忆函数

> 当函数计算得到结果时就将该结果按照参数存储起来。采用这种方式时，如果另外一个调用也使用相同的参数，我们则可以直接返回上次存储的结果而不是再计算一遍。像这样避免既重复又复杂的计算可以显著地提高性能。**对于动画中的计算、搜索不经常变化的数据或任何耗时的数学计算来说，记忆化这种方式是十分有用的**。

缺点:

- 提高性能的代价是牺牲性能。
- 缓存逻辑和业务逻辑混合在一起

```js
// 质数：除了 1 和自身外不能被其他自然数整除，
function isPrime(value) {
  // 创建缓存
  const answers = isPrime.answers || (isPrime.answers = {});

  if (answers[value] !== undefined) {
    return answers[value];
  }

  let prime = value !== 0 && value !== 1;

  for (var i = 2; i < value; i++) {
    if (value % i === 0) {
      prime = false;
      break;
    }
  }

  return answers[value] = prime;
}
```

## 如何写一个插件

- 全局API
  - `Vue.mixin`
  - `Vue.directive`
  - `Vue.filter`
  - `Vue.component`
- 实例 property
  - `vm.$options`
- 实例方法
  - `vm.$watch`
  - `vm.$set`

### Element UI install 方法

```js
// 组件 install 方法
// https://github.com/ElemeFE/element/blob/dev/packages/button/index.js
import ElButton from './src/button';

ElButton.install = function(Vue) {
  Vue.component(ElButton.name, ElButton);
};

export default ElButton;

// Element UI 完整引入使用的 install 方法
// https://github.com/ElemeFE/element/blob/dev/src/index.js
const install = function(Vue, opts = {}) {
  // ...
  components.forEach(component => {
    Vue.component(component.name, component);
  })
  // ...

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  }

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$notify = Notification
  Vue.prototype.$message = Message
};

export default {
  install
}
```

### [基础组件的自动化全局注册](https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)

> 可能你的许多组件只是包裹了一个输入框或按钮之类的元素，是相对通用的。我们有时候会把它们称为基础组件，它们会在各个组件中被频繁的用到。

1. 使用 Element UI 的方法
2. 自动化全局注册

使用 webpack [require.context](https://webpack.docschina.org/guides/dependency-management/#requirecontext) 方法创建一个上下文模块。

`require.context` 接受三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。

执行 require.context() 会导出一个函数，此函数有三个属性：`resolve`, `keys`, `id`。

- `resolve` 是一个函数，它返回 request 被解析后得到的模块 id。
- `keys` 也是一个函数，它返回一个数组，所有可能的模块组成。

```js
function install (Vue) {
  const requireComponent = require.context(
    // 在 src/components 文件夹中查找文件
    '@/components',
    // 不查询其子目录
    false,
    // https://regex101.com/
    // 仅仅包括 "Base" 开头的 .vue|js 文件
    /(Base)\w+\.(vue|js)$/
  )

  requireComponent.keys().forEach((fileName) => {
  // 获取组件配置选项对象
    const componentConfig = requireComponent(fileName)
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
```

### vue-router install 方法

[install源码](https://github.com/vuejs/vue-router/blob/dev/src/install.js)

```js
export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        // 在 new Vue({ router }) 传入
        this._router = this.$options.router
        // 初始化 router
        this._router.init(this)

        // this._route 变成响应式对象
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }

      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  // 在组件实例上可以访问 this.$router 以及 this.$route
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```

## `Vue.mixin` 案例

使用全局 Vue.mixin() 获取

> 请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项，就像上面示例一样。推荐将其作为插件发布，以避免重复应用混入。

- 轮播图
- 表单验证  

## 启动 Vue 源码项目

```shell
# 安装
yarn
```

## 参考

- [vue-router源码分析](https://liyucang-git.github.io/2019/08/15/vue-router%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/)
- [插件v2.x](https://cn.vuejs.org/v2/guide/plugins.html)
- [插件v3.x](https://v3.cn.vuejs.org/guide/plugins.html)
- [vue3-overview](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/vue3-overview/)
- [Vue Enterprise Boilerplate](https://github.com/bencodezen/vue-enterprise-boilerplate)
- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
- [依赖管理](https://webpack.docschina.org/guides/dependency-management/)
- [Production-Grade Vue](https://production-grade-vue.bencodezen.io/)
- [私有 property](https://cn.vuejs.org/v2/style-guide/#%E7%A7%81%E6%9C%89-property-%E5%90%8D%E5%BF%85%E8%A6%81)
- [基础组件名](https://cn.vuejs.org/v2/style-guide/#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E5%90%8D%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)
- [紧密耦合的组件名](https://cn.vuejs.org/v2/style-guide/#%E7%B4%A7%E5%AF%86%E8%80%A6%E5%90%88%E7%9A%84%E7%BB%84%E4%BB%B6%E5%90%8D%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)
- [组件名中的单词顺序](https://cn.vuejs.org/v2/style-guide/#%E7%BB%84%E4%BB%B6%E5%90%8D%E4%B8%AD%E7%9A%84%E5%8D%95%E8%AF%8D%E9%A1%BA%E5%BA%8F%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)
- [regex101](https://regex101.com/)
