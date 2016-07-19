1.Set

    ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值

    Set本身是一个构造函数，用来生成Set数据结构

    Set函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化

    也展示了一种去除数组重复成员的方法

        [...new Set(array)]
    
    向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set内部判断两个值是否不同，使用的算法叫做“Same-value equality”，它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身

        let set4 = new Set();
        let a = NaN;
        let b = NaN;
        set4.add(a);
        set4.add(b);
        console.log(set4); // Set {NaN}

    两个对象总是不相等的

        let set5 = new Set();
        set5.add({});
        console.log(set5.size); //1
        set5.add({})
        console.log(set5.size); //2

    Set 的属性和方法

        属性

            Set.prototype.constructor：构造函数，默认就是Set函数。
            
            Set.prototype.size：返回Set实例的成员总数

        方法

            add(value)：添加某个值，返回Set结构本身。
            delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
            has(value)：返回一个布尔值，表示该值是否为Set的成员。
            clear()：清除所有成员，没有返回值。

    Array.from() Array.from方法可以将Set结构转为数组

    遍历操作

        keys()：返回键名的遍历器

        values()：返回键值的遍历器

        entries()：返回键值对的遍历器

            key方法、value方法、entries方法返回的都是遍历器对象（详见《Iterator对象》一章）。由于Set结构没有键名，只有键值（或者说键名和键值是同一个值），所以key方法和value方法的行为完全一致

            entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等

            Set结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。

                Set.prototype[Symbol.iterator] === Set.prototype.values
                // true

            直接用for...of循环遍历Set

        forEach() 使用回调函数遍历每个成员

            Set结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值

        
        
    遍历的应用

        扩展运算符（...）内部使用for...of循环，所以也可以用于Set结构

            [...set]

        去重

            new Set(array)

        交集和并集

            new Set([...arr1, ...arr2])   // 并集

            new Set([...a].filter(x => b.has(x)));  // 交集

            new Set([...a].filter(x => !b.has(x))); // 差集

        map 和 filter

    如果想在遍历操作中，同步改变原来的Set结构，目前没有直接的方法，但有两种变通方法。一种是利用原Set结构映射出一个新的结构，然后赋值给原来的Set结构；另一种是利用Array.from方法


2.WeakSet

    WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别
    WeakSet的成员只能是对象，而不能是其他类型的值

    WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的

        var ws = new WeakSet();
        ws.add(1);  // TypeError
        ws.add(Symbol()) // TypeError

    WeakSet是一个构造函数，可以使用new命令，创建WeakSet数据结构

        WeakSet可以接受一个数组或类似数组的对象作为参数

        WeakSet 中添加的数组的成员只能是对象

    方法  

        WeakSet.prototype.add(value)：向WeakSet实例添加一个新成员。

        WeakSet.prototype.delete(value)：清除WeakSet实例的指定成员。

        WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在

    WeakSet没有size属性，没有办法遍历它的成员

        console.log(ws3.size);          // undefined
        console.log(ws3.forEach);       // undefined

    WeakSet的一个用处，是储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄漏

3.Map

    介绍 
        ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适

        Map也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组

        Map构造函数接受数组作为参数，实际上执行的是下面的算法

            var items = [
                ['name', '张三'],
                ['title', 'Author']
            ];
            var map = new Map();
            items.forEach(([key, value]) => map.set(key, value));

        如果对同一个键多次赋值，后面的值将覆盖前面的值

        如果读取一个未知的键，则返回undefined

        只有对同一个对象的引用，Map结构才将其视为同一个键

        同样的值的两个实例，在Map结构中被视为两个键

        Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名

        如果Map的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map将其视为一个键，包括0和-0。另外，虽然NaN不严格相等于自身，但Map将其视为同一个键
    
    属性和方法

        1. size 

            size属性返回Map结构的成员总数

        2. set(key, value)

            set方法设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键

            可以采用链式写法

        3. get(key)

            get方法读取key对应的键值，如果找不到key，返回undefined

        4. has(key)

            has方法返回一个布尔值，表示某个键是否在Map数据结构中

        5. delete(key)

            delete方法删除某个键，返回true。如果删除失败，返回false
        
        6. clear()

            clear方法清除所有成员，没有返回值

    遍历方法

        keys()：返回键名的遍历器。

        values()：返回键值的遍历器。

        entries()：返回所有成员的遍历器。

            Map结构的默认遍历器接口（Symbol.iterator属性），就是entries方法

            map[Symbol.iterator] === map.entries

        forEach()：遍历Map的所有成员

            map.forEach(function(value, key, map) {
                console.log("Key: %s, Value: %s", key, value);
            });
        
            绑定 this

            var reporter = {
                report: function(key, value) {
                    console.log("Key: %s, Value: %s", key, value);
                }
            };

            map.forEach(function(value, key, map) {
            this.report(key, value);
            }, reporter);

    与其他数据结构的互相转换

        1. Map转为数组

            使用扩展运算符（...）

        2. 数组转为Map

            将数组转入Map构造函数，就可以转为Map

        3. Map转为对象

        4. 对象转为Map

        5. Map转为JSON

        6. JSON转为Map

4.WeakMap

    唯一的区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制

    如果将1和Symbol作为WeakMap的键名，都会报错

    键名是对象的弱引用（垃圾回收机制不将该引用考虑在内），所以其所对应的对象可能会被自动回收。当对象被回收后，WeakMap自动移除对应的键值对。典型应用是，一个对应DOM元素的WeakMap结构，当某个DOM元素被清除，其所对应的WeakMap记录就会自动被移除。基本上，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏

    WeakMap与Map在API上的区别主要是两个:
    
        一是没有遍历操作（即没有key()、values()和entries()方法），也没有size属性；
        
        二是无法清空，即不支持clear方法。这与WeakMap的键不被计入引用、被垃圾回收机制忽略有关。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()

