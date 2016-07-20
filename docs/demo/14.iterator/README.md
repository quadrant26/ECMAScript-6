1.Iterator（遍历器）的概念

    Iterator的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费

    Iterator的遍历过程是这样的。

        （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

        （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

        （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

        （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置

        每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束

2.数据结构的默认Iterator接口

    在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构

    一个对象如果要有可被for...of循环调用的Iterator接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）


3.调用Iterator接口的场合

    1. 解构赋值

        对数组和Set结构进行解构赋值时，会默认调用Symbol.iterator方法
    
    2. 扩展运算符

        扩展运算符（...）也会调用默认的iterator接口

    3. yield*

        yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口

            let generator = function* (){
                yield 1;
                yield* [2,3,4];
                yield 5;
            }

            var iterator = generator();
            console.log(iterator.next());   // Object {value: 1, done: false}

    4. 其他

        for...of

        Array.from()

        Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）

        Promise.all()

        Promise.race()

4.字符串的Iterator接口

    可以覆盖原生的Symbol.iterator方法
        
        var str = new String('hi');
        console.log([...str]); // ['h', 'i']

        str[Symbol.iterator] = function (){
            return {
                next : function (){
                    if(this._first){
                        this._first = false;
                        return {value : 'bye', done : false};
                    }else{
                        return { done : true};
                    }
                },
                _first : true
            }
        };
        console.log([...str])  // ['bye']
        console.log(str);       // hi


5.Iterator接口与Generator函数

    let obj = {
        * [Symbol.iterator](){
            yield 'hello';
            yield 'world';
        }
    }
    for(let x of obj){
        console.log(x);     // hello, world
    }

6.遍历器对象的return()，throw()

    遍历器对象除了具有next方法，还可以具有return方法和throw方法。如果你自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的

    return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句或continue语句），就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法

7.for...of循环

    一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法

    for...of循环可以使用的范围包括数组、Set和Map结构、某些类似数组的对象（比如arguments对象、DOM NodeList对象）、Generator对象，以及字符串

    数组

        for...in循环读取键名，for...of循环读取键值。如果要通过for...of循环，获取数组的索引，可以借助数组实例的entries方法和keys方法

    Set Map

        遍历的顺序是按照各个成员被添加进数据结构的顺序。其次，Set结构遍历时，返回的是一个值，而Map结构遍历时，返回的是一个数组，该数组的两个成员分别为当前Map成员的键名和键值

    计算生成的数据结构

        let arr = ['a', 'b', 'c'];
        for(let pair of arr.entries()){
            console.log(pair);  // [0, "a"] [1, "b"] [2, "c"]
        }

    类似数组的对象

        字符串、DOM NodeList对象、arguments对象
        
        所有类似数组的对象都具有iterator接口，一个简便的解决方法，就是使用Array.from方法将其转为数组

    对象

        对于普通的对象，for...of结构不能直接使用，会报错，必须部署了iterator接口后才能使用。但是，这样情况下，for...in循环依然可以用来遍历键名

        一种解决方法是，使用Object.keys方法将对象的键名生成一个数组，然后遍历这个数组

            for(var key of Object.keys(es6)){
                console.log(key + ":" + es6[key]);
                // edition:6 committee:TC39 standard:ECMA-262
            }

        另一个方法是使用Generator函数将对象重新包装一下

            function* entries(obj) {
                for (let key of Object.keys(obj)) {
                    yield [key, obj[key]];
                }
            }

            for (let [key, value] of entries(es6)) {
                console.log(key, "->", value);
            }

    Array.forEach(function (element, index){}) 无法中途跳出forEach循环，break命令或return命令都不能奏效

    for...in循环有几个缺点。 （不适用于遍历数组）

        数组的键名是数字，但是for...in循环是以字符串作为键名“0”、“1”、“2”等等。

        for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。

        某些情况下，for...in循环会以任意顺序遍历键名

    for...of循环相比上面几种做法，有一些显著的优点

        有着同for...in一样的简洁语法，但是没有for...in那些缺点。

        不同用于forEach方法，它可以与break、continue和return配合使用。

        提供了遍历所有数据结构的统一操作接口
