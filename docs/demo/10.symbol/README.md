1.概述

    ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。它是JavaScript语言的第七种数据类型

    Symbol值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型。凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突

    Symbol函数前不能使用new命令，否则会报错.这是因为生成的Symbol是一个原始类型的值，不是对象。也就是说，由于Symbol值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型

    Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分

    Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的

        console.log(Symbol() === Symbol());             // false
        console.log(Symbol("foo") === Symbol("foo"));   // false

    Symbol值不能与其他类型的值进行运算，会报错

        console.log("my Symbol is: " + s2); //TypeError: Cannot convert a Symbol value to a string

    Symbol值可以显式转为字符串

        console.log( String(s2) );
        console.log( s2.toString() );

    Symbol值也可以转为布尔值，但是不能转为数值

        var sym = Symbol();
        console.log(Boolean(sym)) // true
        console.log(!sym)  // false

        Number(sym) // TypeError
        sym + 2 // TypeError

2.作为属性名的Symbol

        let mysymbol = Symbol();

        // one
        // var a = {};
        // a[mysymbol] = "hello";

        // two
        // var a = {
        //     [mysymbol] : "hello"
        // }

        // three
        var a = {};
        Object.defineProperty(a, mysymbol, {value:'hello'});

    Symbol值作为对象属性名时，不能用点运算符

        var mySymbol = Symbol();
        var a = {};

        a.mySymbol = 'Hello!';
        a[mySymbol] // undefined
        a['mySymbol'] // "Hello!"

    在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中

    Symbol类型还可以用于定义一组常量，保证这组常量的值都是不相等的


3.实例：消除魔术字符串

    魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值

    常用的消除魔术字符串的方法，就是把它写成一个变量


4.属性名的遍历

    Symbol作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有Symbol属性名

    Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的Symbol值

    Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和Symbol键名

5.Symbol.for()，Symbol.keyFor()

    我们希望重新使用同一个Symbol值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值

    Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30次，每次都会返回同一个Symbol值，但是调用Symbol("cat")30次，会返回30个不同的Symbol值

        console.log(　Symbol.for("bar") === Symbol.for("bar") );// true
        console.log(　 Symbol("bar") === Symbol("bar") );// false

    Symbol.keyFor方法返回一个已登记的Symbol类型值的key

    Symbol.for为Symbol值登记的名字，是全局环境的，可以在不同的iframe或service worker中取到同一个值

6.内置的Symbol值

    ES6还提供了11个内置的Symbol值，指向语言内部使用的方法

    1. Symbol.hasInstance

        对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)

    2. Symbol.isConcatSpreadable

        对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象使用Array.prototype.concat()时，是否可以展开

        数组的默认行为是可以展开。Symbol.isConcatSpreadable属性等于true或undefined 都有这个效果
            let arr1 = ['c', 'd'];
            ['a', 'b'].concat(arr1, 'e');
            console.log(arr1[Symbol.isConcatSpreadable]) // undifined

        类似数组的对象也可以展开，但它的Symbol.isConcatSpreadable属性默认为false，必须手动打开

            let arr2 = ['c', 'd'];
            arr2[Symbol.isConcatSpreadable] = false;
            ['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

        对于一个类来说，Symbol.isConcatSpreadable属性必须写成实例的属性
    
    3. Symbol.species § ⇧

        对象的Symbol.species属性，指向一个方法。该对象作为构造函数创造实例时，会调用这个方法。即如果this.constructor[Symbol.species]存在，就会使用这个属性作为构造函数，来创造新的实例对象

            static get [Symbol.species]() {
                return this;
            }

    4. Symbol.match

        对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值

            String.prototype.match(regexp)
            // 等同于
            regexp[Symbol.match](this)

    5. Symbol.replace

        对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值

            String.prototype.replace(searchValue, replaceValue)
            // 等同于
            searchValue[Symbol.replace](this, replaceValue)

    6. Symbol.search

        对象的Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值

            String.prototype.search(regexp)
            // 等同于
            regexp[Symbol.search](this)

    7. Symbol.split

        对象的Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值

            String.prototype.split(separator, limit)
            // 等同于
            separator[Symbol.split](this, limit)


    8. Symbol.iterator

        对象的Symbol.iterator属性，指向该对象的默认遍历器方法
            
            var myIterable = {};
            myIterable[Symbol.iterator] = function* () {
                yield 1;
                yield 2;
                yield 3;
            };
            [...myIterable] // [1, 2, 3]

        对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器

    9. Symbol.toPrimitive

        对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值

        Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

            Number：该场合需要转成数值

            String：该场合需要转成字符串

            Default：该场合可以转成数值，也可以转成字符串

    10. Symbol.toStringTag

        对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串

            JSON[Symbol.toStringTag]：'JSON'
            Math[Symbol.toStringTag]：'Math'
            Module对象M[Symbol.toStringTag]：'Module'
            ArrayBuffer.prototype[Symbol.toStringTag]：'ArrayBuffer'
            DataView.prototype[Symbol.toStringTag]：'DataView'
            Map.prototype[Symbol.toStringTag]：'Map'
            Promise.prototype[Symbol.toStringTag]：'Promise'
            Set.prototype[Symbol.toStringTag]：'Set'
            %TypedArray%.prototype[Symbol.toStringTag]：'Uint8Array'等
            WeakMap.prototype[Symbol.toStringTag]：'WeakMap'
            WeakSet.prototype[Symbol.toStringTag]：'WeakSet'
            %MapIteratorPrototype%[Symbol.toStringTag]：'Map Iterator'
            %SetIteratorPrototype%[Symbol.toStringTag]：'Set Iterator'
            %StringIteratorPrototype%[Symbol.toStringTag]：'String Iterator'
            Symbol.prototype[Symbol.toStringTag]：'Symbol'
            Generator.prototype[Symbol.toStringTag]：'Generator'
            GeneratorFunction.prototype[Symbol.toStringTag]：'GeneratorFunction'

            
    11. Symbol.unscopables

        对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除

        






















