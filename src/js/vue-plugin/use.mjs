const toArray = function (list, start) {
  start = start || 0;
  let i = list.length - start;
  const ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
};

export default function initUse (Vue) {
  // * Vue 构造器静态方法
  Vue.use = function (plugin) {
    const installPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installPlugins.indexOf(plugin) > -1) {
      return this;
    }

    const args = toArray(arguments, 1);

    args.unshift(this);

    if (typeof plugin.install === "function") {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === "function") {
      plugin.apply(null, args);
    }

    installPlugins.push(plugin);
    return this;
  };
}