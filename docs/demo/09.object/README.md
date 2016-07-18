1.属性的简洁表示法

    ES6允许直接写入变量和函数，作为对象的属性和方法

    如果某个方法的值是一个Generator函数，前面需要加上星号

2.属性名表达式

    ES6允许字面量定义对象时，把表达式放在方括号内

        let obj = {
            [propKey]: true,
            ['a' + 'bc']: 123
        };

    属性名表达式与简洁表示法，不能同时使用，会报错

        // 报错
        var foo = 'bar';
        var bar = 'abc';
        var baz = { [foo] };

        // 正确
        var foo = 'bar';
        var baz = { [foo]: 'abc'};

3.方法的name属性

    函数的name属性，返回函数名。对象方法也是函数，因此也有name属性

    有两种特殊情况：bind方法创造的函数，name属性返回“bound”加上原函数的名字；Function构造函数创造的函数，name属性返回“anonymous”

    对象的方法是一个Symbol值，那么name属性返回的是这个Symbol值的描述

        console.log((new Function()).name);     // anonymous
        var doSomething = function (){

        }
        console.log( doSomething.bind().name);  // bound doSomething

4.Object.is()

    ES6提出“Same-value equality”（同值相等）算法

    Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致

        +0 === -0 //true
        NaN === NaN // false

        Object.is(+0, -0) // false
        Object.is(NaN, NaN) // true

    不同之处只有两个：一是+0不等于-0，二是NaN等于自身

5.Object.assign()

    Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

    Object.assign方法的第一个参数是目标对象，后面的参数都是源对象

    如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性

    如果只有一个参数，Object.assign会直接返回该参数

    如果该参数不是对象，则会先转成对象，然后返回

    由于undefined和null无法转成对象，所以如果它们作为参数，就会报错

    如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错

    其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果

    布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，这个属性是不会被Object.assign拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝

    布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，这个属性是不会被Object.assign拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝

    Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）

    属性名为Symbol值的属性，也会被Object.assign拷贝

    Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用

    注意：

        Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用

        一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加

    用途：

        为对象添加属性

            class Point{
                constructor(x, y){
                    // Object.assign方法，将x属性和y属性添加到Point类的对象实例
                    return Object.assign(this, {x,y});
                }
            }

        为对象添加方法

            Obejct.assign(SomeClass.prototype, {
                someMethod(arg1, arg2){
                    ...
                },
                anotherMethod(){
                    ...
                }
            });

        克隆对象

            function clone(origin){
                return Obejct.assign({}, origin);
            }

        合并多个对象

            const  merge = (target, ...sources) => Object.assign(targer, ...sources);

        为指定属性设置默认值

            const DEFAULTS = {
                let options = Object.assign({}, DEFAULTS, options);
            }


6.属性的可枚举性

    Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象

    ES5有三个操作会忽略enumerable为false的属性。

        for...in循环：只遍历对象自身的和继承的可枚举的属性
        Object.keys()：返回对象自身的所有可枚举的属性的键名
        JSON.stringify()：只串行化对象自身的可枚举的属性

    ES6新增了一个操作Object.assign()，会忽略enumerable为false的属性

    ES6规定，所有Class的原型的方法都是不可枚举的

7.属性的遍历

    1. for...in

    2. Object.keys(obj)

    3. Object.getOwnPropertyNames(obj)

    4. Object.getOwnPropertySymbols(obj)

    5. Reflect.ownKeys(obj)

    首先遍历所有属性名为数值的属性，按照数字排序。
    其次遍历所有属性名为字符串的属性，按照生成时间排序。
    最后遍历所有属性名为Symbol值的属性，按照生成时间排序。


8.__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()

    1 __proto__属性

        __proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象

    2 Object.setPrototypeOf()

        Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象

            // 格式
            Object.setPrototypeOf(object, prototype)

            // 用法
            var o = Object.setPrototypeOf({}, null);

    3 Object.getPrototypeOf()

        该方法与setPrototypeOf方法配套，用于读取一个对象的prototype对象。

            Object.getPrototypeOf(obj);

9.Object.values()，Object.entries()
    
    1 Object.values()

        Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值

        Object.values会过滤属性名为Symbol值的属性

        Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组

        如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组

    2 Object.entries()

        Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组

        如果原对象的属性名是一个Symbol值，该属性会被省略。

        原对象有两个属性，Object.entries只输出属性名非Symbol值的属性。将来可能会有Reflect.ownEntries()方法，返回对象自身的所有属性

        Object.entries的基本用途是遍历对象的属性

        Object.entries方法的一个用处是，将对象转为真正的Map结构

            var obj = { foo: 'bar', baz: 42 };
            var map = new Map(Object.entries(obj));
            map // Map { foo: "bar", baz: 42 }

10.对象的扩展运算符

    Babel转码器已经支持这项功能

    1 Rest解构赋值

        由于Rest解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象

            let { x, y, ...z } = null; // 运行时错误
            let { x, y, ...z } = undefined; // 运行时错误

        Rest解构赋值必须是最后一个参数，否则会报错

            let { ...x, y, z } = obj; // 句法错误
            let { x, ...y, ...z } = obj; // 句法错误

        Rest解构赋值不会拷贝继承自原型对象的属性

    2 扩展运算符

        扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中

            let z = { a: 3, b: 4 };
            let n = { ...z };
            n // { a: 3, b: 4 }

            let aWithOverrides = { ...a, x: 1, y: 2 };
            // 等同于
            let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
            // 等同于
            let x = 1, y = 2, aWithOverrides = { ...a, x, y };
            // 等同于
            let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });

11.Object.getOwnPropertyDescriptors()  

    ES5有一个Object.getOwnPropertyDescriptor方法，返回某个对象属性的描述对象

    ES7有一个提案，提出了Object.getOwnPropertyDescriptors方法，返回指定对象所有自身属性（非继承属性）的描述对象

        Object.getOwnPropertyDescriptors方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象