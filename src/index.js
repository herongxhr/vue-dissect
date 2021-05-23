import { initMixin } from "./init";

function Vue(options) {
    this._init(options);
}

// 对原型链进行拓展
initMixin(Vue)

export default Vue;