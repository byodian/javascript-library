# Vue plugin (vue2.x)

## 为什么要使用插件

1. Vue.use 会自动阻止多次注册相同插件，即使多次调用也只会注册一次该插件。

2. 保持代码一致性和可维护性

3. 如果你的插件功能支持跨项目使用，可以发布到 NPM 库，使用方便。

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

## 插件分类

在 Vue 世界中有三种类型的插件：

1. Vue 插件，为 Vue 提供全局层面的功能。

2. Vuex 插件，为 Vuex 添加新的功能。

3. Vue-CLI 插件，修改构建系统，为 Webpack 或 CLI Service 增加新的功能。

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

// => 调用 myPlugin.install(Vue) 或 myPlugin(Vue)
Vue.use(myPlugin， /* options */)

new Vue({
  //...
})
```

## 问题

根据以上内容我们提出下面三个问题：

1. 为什么 Vue 插件既可以是对象也可以是函数？
2. `Vue.use(plugin, options)` 参数 options 是如何传递给插件的第二个参数的
3. 写一个插件需要什么

## Vue.use 实现原理

```js
import { toArray } from '../util/index'

function initUse (Vue) {
  // * Vue 构造器静态方法
  Vue.use = function (plugin) {
    // this._installedPlugins = this._installedPlugins || []
    // const installPlugin = this._installedPlugins
    const installPlugins = this._installedPlugins || (this._installedPlugins = []);

    // * 确保插件只会被安装一次
    if (installPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // * Vue.use(plugin, options)
    // arguments <Arguments> => [plugin, options]
    // args <Array> => [options]
    const args = toArray(arguments, 1);
    console.log('arguments:', arguments);
    console.log('args:', args);

    // * args <Array> => [Vue, options]
    args.unshift(this);
    console.log('执行 args.unshift(this) 之后, args:', args);

    // * 1. plugin 作为对象且有 install 方法，调用 install 方法
    // * 2. plugin 作为函数，直接调用该函数
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

## Vue 3.0 插件的使用

> 我们定义的应用只是通过 `new Vue()` 创建的根 Vue 实例。从同一个 Vue 构造函数创建的每个根实例**共享相同的全局配置**。

```js
// 这会影响到所有根实例
Vue.mixin({
  /* ... */
})

const app1 = new Vue({ el: '#app-1' })
const app2 = new Vue({ el: '#app-2' })
```
