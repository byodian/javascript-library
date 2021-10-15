import initUse from "../../src/js/vue-plugin/use.mjs";

function Vue() {}
window.Vue = Vue

// 初始化 Vue.use 全局方法
initUse(Vue);

const pluginAsObject = {
  install(Vue, options = {}) {
    Vue.prototype.$sayHi = function () {
      const app = document.querySelector('#app');
      app.appendChild(
        createElement('h2', `Hello ${options.name || 'World!'}`)
      )
    };
  }
};

Vue.use(pluginAsObject, { name: "Vue!" });
// Vue.use(pluginAsObject);

const pluginAsFunc = function (Vue) {
  Vue.prototype.$sayBye = function () {
    console.log("Goodbye, take it easy!");
  };
};

Vue.use(pluginAsFunc);
console.dir(Vue);

const vm = new Vue();

vm.$sayHi();

/**
 * 返回一个元素节点
 * @param {String} tag HTML 标签
 * @param {String} text 文本
 * @returns 
 */
function createElement(tag = 'p', text) {
  const p = document.createElement(tag);
  p.textContent = text;
  return p
}