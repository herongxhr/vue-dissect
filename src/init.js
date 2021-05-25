import { initState } from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    // vm比this更容易理解代表什么
    const vm = this;
    // 将参数option挂载到vm上
    // 这样其它方法也可以方便取到options
    vm.$options = options;

    // vm上有很多数据，所以直接把vm传给方法
    initState(vm);

    if (vm.$options.el) {
      // 如果有元素,页面要挂载
      vm.$mount(vm.$options.el)
    }

  }

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const opts = vm.$options;
    el = document.querySelector(el);
    vm.$el = el;

    if (!opts.render) {
      // 模板编译
      let template = opts.template;
      if (!template) {
        template = el.outerHTML;
      }
      let render = compileToFunction(template)
      opts.render = render;
    }
  }
}