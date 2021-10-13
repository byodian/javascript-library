import initUse from "../../src/js/vue-plugin/use.mjs";
function Vue() {}
// 初始化 Vue.use 全局方法
initUse(Vue);

const pluginAsObject = {
  install: function (Vue, options = {}) {
    Vue.prototype.$sayHi = function () {
      console.log('可选参数', options);
    };
  }
};

Vue.use(pluginAsObject, { size: "small" });

const pluginAsFunc = function (Vue) {
  Vue.prototype.$sayBye = function () {
    console.log("Goodbye, take it easy!");
  };
};

Vue.use(pluginAsFunc);
console.dir(Vue)

const vm = new Vue();

vm.$sayHi();
vm.$sayBye();