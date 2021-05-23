import { observe } from "./observe"; // rollup-plugin-node-resolve
import { isFunction } from "./utils";

export function initState(vm) {
  const opts = vm.$options;

  if (opts.data) {
    initData(vm);
  }

}
// 取值的时候做代理，不是暴力的把_data 属性赋予给vm
// 而且直接赋值会有命名冲突问题
function proxy(vm, key, source) {
  Object.defineProperty(vm, key, {
    get() {
      // vm._data.message 
      return vm[source][key];
    },
    set(newValue) {
      // vm._data.message = newValue
      vm[source][key] = newValue;
    }
  })
}
function initData(vm) {
  // 用户传入的数据
  let data = vm.$options.data;

  // 只有根实例可以data是一个对象
  data = vm._data = isFunction(data) ? data.call(vm) : data;

  // 需要将data变成响应式的
  // 观测对象中的属性
  observe(data);
  for (let key in data) { // vm.message => vm._data.message
    proxy(vm, key, '_data');// 代理vm上的取值和设置值 和  vm._data 没关系了
  }
}
