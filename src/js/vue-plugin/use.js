const toArray = function(list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)

  while(i--) {
    ret[i] = list[i + start]
  }

  return ret
}

const Vue = function() {}

function initUse(Vue) {
  // The static method of Vue constructor
  Vue.use = function(plugin) {
    // this._installedPlugins = this._installedPlugins || []
    // const installPlugin = this._installedPlugins
    const installPlugins = (this._installedPlugins || (this._installedPlugins = []))

    // 确保插件只会被安装一次
    if (installPlugins.indexOf(plugin) > -1) {
      return this
    }

    // 除了 plugin 之外其余的参数
    const args = toArray(arguments, 1)

    // 设置 Vue 构造函数为 args 的第一个参数
    // install 方法接受两个参数，第一个是 Vue，第二个是 options 可选项
    args.unshift(this)

    // 1. plugin 作为对象且具有 install 方法，调用 install 方法
    // 2. plugin 作为函数，直接调用该函数
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }

    // 缓存已经安装的插件
    installPlugins.push(plugin)
    return this
  }
}

const pluginAsObj = {
  install: function(Vue, opt = {}) {
    Vue.prototype.sayHi= function () {
      console.log('Hello World')
      console.log(opt)
    }
  }
}

const pluginAsFunc = function (Vue, opt = {}) {
  Vue.prototype.sayBye = function () {
    console.log('Goodbye, take it easy!')
  }
}

initUse(Vue);
Vue.use(pluginAsObj, {size: 'small'});
Vue.use(pluginAsFunc, {size: 'small'});

const vm = new Vue()
vm.sayHi()
vm.sayBye()
