var a = [1, 2, 3, 4]

Object.entries(a).forEach(([k, v]) => {
    Object.defineProperty(a, k, {
        get() {
            // 闭包，此vaule会向上层的value进行查找

            return v + 1;
        },
        set(newValue) {
            v = newValue;
        }
    })
})

console.log(a[1])