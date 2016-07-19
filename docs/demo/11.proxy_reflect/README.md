1.Proxy概述

    Proxy用于修改某些操作的默认行为

    ES6原生提供Proxy构造函数，用来生成Proxy实例。

        var proxy = new Proxy(target, handler);
    
    new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为

    如果handler没有设置任何拦截，那就等同于直接通向原对象。

        var target = {};
        var handler = {};
        var proxy = new Proxy(target, handler);
        proxy.a = 'b';
        target.a // "b"

    一个技巧是将Proxy对象，设置到object.proxy属性，从而可以在object对象上调用。

        var object = { proxy: new Proxy(target, handler) };

    Proxy支持的拦截操作一览:

        1.1 get(target, propKey, receiver)

            拦截对象属性的读取，比如proxy.foo和proxy['foo']。
            最后一个参数receiver是一个对象

        1.2 set(target, propKey, value, receiver)

            拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值

        1.3 has(target, propKey)

            拦截propKey in proxy的操作，以及对象的hasOwnProperty方法，返回一个布尔值

        1.4 deleteProperty(target, propKey)

            拦截delete proxy[propKey]的操作，返回一个布尔值

        1.5 ownKeys(target)

            拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回对象所有自身的属性，而Object.keys()仅返回对象可遍历的属性

        1.6 getOwnPropertyDescriptor(target, propKey)

            拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象

        1.7 defineProperty(target, propKey, propDesc)

            拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值

        1.8 preventExtensions(target)

            拦截Object.preventExtensions(proxy)，返回一个布尔值

        1.9 getPrototypeOf(target)

            拦截Object.getPrototypeOf(proxy)，返回一个对象

        1.10 isExtensible(target)

            拦截Object.isExtensible(proxy)，返回一个布尔值

        1.11 setPrototypeOf(target, proto)

            拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。
            如果目标对象是函数，那么还有两种额外操作可以拦截

        1.12 apply(target, object, args)

            拦截Proxy实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)

        1.13 construct(target, args)

            拦截Proxy实例作为构造函数调用的操作，比如new proxy(...args)

2.Proxy实例的方法

    2.1 get()

    2.2 set()

    2.3 apply()

    2.4 has()

    2.5 construct()

    2.6 deleteProperty()

    2.7 defineProperty()

    2.8 getOwnPropertyDescriptor()

    2.9 getPrototypeOf()

    2.10 isExtensible()

    2.11 ownKeys()

    2.12 preventExtensions()

    2.13 setPrototypeOf()

3.Proxy.revocable()

    Proxy.revocable方法返回一个可取消的Proxy实例

    Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例

4.Reflect概述

    将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上

        Reflect.defineProperty(target, property, attributes)

    修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false

    让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为

        Reflect.has(Object, 'assign');

    Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为

5.Reflect对象的方法

    Reflect.apply(target,thisArg,args)
    Reflect.construct(target,args)
    Reflect.get(target,name,receiver)
    Reflect.set(target,name,value,receiver)
    Reflect.defineProperty(target,name,desc)
    Reflect.deleteProperty(target,name)
    Reflect.has(target,name)
    Reflect.ownKeys(target)
    Reflect.isExtensible(target)
    Reflect.preventExtensions(target)
    Reflect.getOwnPropertyDescriptor(target, name)
    Reflect.getPrototypeOf(target)
    Reflect.setPrototypeOf(target, prototype)

    5.1 Reflect.get(target, name, receiver)

        查找并返回target对象的name属性，如果没有该属性，则返回undefined。
        如果name属性部署了读取函数，则读取函数的this绑定receiver
    
    5.2 Reflect.set(target, name, value, receiver)

        设置target对象的name属性等于value。如果name属性设置了赋值函数，则赋值函数的this绑定receiver。

    5.3 Reflect.has(obj, name)

        等同于name in obj。

    5.4 Reflect.deleteProperty(obj, name)

        等同于delete obj[name]。

    5.5 Reflect.construct(target, args)

        等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。

    5.6 Reflect.getPrototypeOf(obj)

        读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。

    5.7 Reflect.setPrototypeOf(obj, newProto)

        设置对象的__proto__属性，对应Object.setPrototypeOf(obj, newProto)。

    5.8 Reflect.apply(fun,thisArg,args)

        等同于Function.prototype.apply.call(fun,thisArg,args)。一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种操作。

        需要注意的是，Reflect.set()、Reflect.defineProperty()、Reflect.freeze()、Reflect.seal()和Reflect.preventExtensions()返回一个布尔值，表示操作是否成功。它们对应的Object方法，失败时都会抛出错误。

        // 失败时抛出错误
        Object.defineProperty(obj, name, desc);
        // 失败时返回false
        Reflect.defineProperty(obj, name, desc);
