Promise

1. new Promise(cb)

    cb(resolve, reject)

2. Promise 状态

    pending ( waiting )  =>  resolved  ( 成功 )

    pending ( waiting )  =>  rejected  ( 失败 )

3. 原型方法

    Promise.prototype.then()

    Promise.prototype.catch()

4. 静态方法

    promise.all()

        arguments => Array

        只有所有的 Promise 对象的返回值都为 resolved, Promise.all 的状态才会 变成 resolved， 返回一个数组， 传递给 then 中的 resolve 函数

        只要捕获到一个 reject， Promise.all 的状态就会变成 reject。 第一个 reject 的实例的返回值， 会返回一个回调函数

    promise.resolve()

