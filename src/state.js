import { isFunction } from "./utils";

export function initState(vm) {
    // 方便地从vm上取想要的数据
    const opts = vm.$options;

    if (opts.data) {
        initData(vm);
    }
}

function initData(vm) {
    let data = vm.$options.data;
    // 记得绑定data函数中的this
    isFunction(data) ? data.call(vm) : data;
}