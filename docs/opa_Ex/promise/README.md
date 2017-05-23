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

        1. 参数是一个 Promise 实例，将不做任何修改，直接返回这个实例

        2. 参数是一个 thenable 对象, 返回新的 promise 对象

        3. 参数是一个 基本数据类型， 返回该数据类型的

        4. 参数是一个 空对象， 返回一个 promise 对象