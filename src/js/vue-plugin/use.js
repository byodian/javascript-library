const toArray = function (list, start) {
  start = start || 0;
  let i = list.length - start;
  const ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
};

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

module.exports = {
  initUse
}