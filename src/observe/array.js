// 获取数组的老的原型方法
let oldArrayPrototype = Array.prototype;

// 让arrayMethods 通过__proto__ 能获取到数组的方法
// 相当于 arrayMethods.__proto__ == oldArrayPrototype
export let arrayMethods = Object.create(oldArrayPrototype);

// 只有这七个方法 可以导致数组发生变化
let methods = [ 
    'push',
    'shift',
    'pop',
    'unshift',
    'reverse',
    'sort',
    'splice'
]

methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        // 数组新增的属性 要看一下是不是对象，如果是对象 继续进行劫持
        // 需要调用数组原生逻辑
        oldArrayPrototype[method].call(this, ...args)
        // todo... 可以添加自己逻辑 函数劫持 切片
        let inserted = null;
        let ob = this.__ob__;
        switch (method) {
            // 修改 删除  添加  arr.splice(0,0,100,200,300)
            case 'splice':
                // splice方法从第三个参数起 是增添的新数据
                inserted = args.slice(2);
                break;
            case 'push':
            case 'unshift':
                // 调用push 和 unshift 传递的参数就是新增的逻辑
                inserted = args;
                break;
        }
        // inserted[] 遍历数组 看一下它是否需要进行劫持
        if (inserted) ob.observeArray(inserted)
    }
});
