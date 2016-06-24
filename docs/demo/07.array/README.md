1. Array.from

    1.1 基础用法 

        Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）

        let arrayLike = {
            '0': 'a',
            '1': 'b',
            '2': 'c',
            length: 3
        };
        // ES5的写法
        var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
        // ES6的写法
        let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

        常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。

        只有将这个对象转为真正的数组，才能使用forEach方法

        // Nodelist
        let ps = document.querySelectorAll("p");
        Array.from(ps).forEach(function (p){
            console.log(console.log(p) );
        })
        // arguments
        function foo(){
            var args = Array.from(arguments);
        }

        只要是部署了Iterator接口的数据结构，Array.from都能将其转为数组

        Array.from('hello');
        Array.from(new Set(['a', 'b']))

        如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组

        扩展运算符（...）也可以将某些数据结构转为数组
        
        [...arguments]
        [...docuemnt.querySelectorAll("p")]

        Array.from方法则是还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。
        因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换

        Array.from({length : 3})

        实现

        const toArray = (() =>
            Array.from ? Array.from : obj => [].slice.call(obj)
        )();
    
    1.2 第二个参数

        可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组

        console.log(Array.from(arrlike, x => x * x));
        // 等同于
        console.log(Array.from(arrlike).map(x => x * x));

        // nodelist
        let spans = document.querySelectorAll("span");
        console.log(Array.from(spans, s => s.textContent));
        console.log(Array.prototype.map.call(spans, s => s.textContent));

        如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this

        Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。
        因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug

2. Array.of

    2.1 用于将一组值，转换为数组

        Array.of(3, 11, 8) // [3,11,8]
        Array.of(3) // [3]
        Array.of(3).length // 1

        没有参数时，返回一个空数组

        只有一个参数时返回一个长度为n的空数组

        只有当参数个数不少于2个时，Array()才会返回由参数组成的新数组

        function ArrayOf(){
            return [].slice.call(arguments);
        }

3. copyWith

    在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组

    Array.prototype.copyWithin(target, start = 0, end = this.length)

    target（必需）：从该位置开始替换数据。

    start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。

    end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
    
    这三个参数都应该是数值，如果不是，会自动转为数值

4. find()  findIndex()

    4.1 find

        数组实例的find方法，用于找出第一个符合条件的数组成员。

        它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。

        如果没有符合条件的成员，则返回undefined

        let arrar = [1, 4, -5, 10];
        arrar.find(function (value, index, arr){...})

        find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组

    4.2 findIndex

        返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

        indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到

        都可以接受第二个参数，用来绑定回调函数的this对象


5. fill()

    fill方法使用给定值，填充一个数组

    console.log([1, 2, 3].fill(7));    // [7, 7, 7]
    console.log(new Array(3).fill(7)); // [7, 7, 7] 

    fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置

6. entries()，keys()  values()

    ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象

    可以用for...of循环进行遍历，
    
    keys()是对键名的遍历、
    
    values()是对键值的遍历，
    
    entries()是对键值对的遍历

    如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历

7. includes

    Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持

    该方法的第二个参数表示搜索的起始位置，默认为0。
    
    如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始

    indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。
    二是，它内部使用严格相当运算符（===）进行判断，这会导致对NaN的误判

    Map和Set数据结构有一个has方法，需要注意与includes区分

        Map结构的has方法，是用来查找键名的
            Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)

        Set结构的has方法，是用来查找值的
            Set.prototype.has(value)、WeakSet.prototype.has(value)

8. 数组的空位

    数组的空位指，数组的某一个位置没有任何值

    空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值

    0 in [undefined, undefined, undefined] // true
    0 in [, , ,] // false

    ES5对空位的处理

        forEach(), filter(), every() 和some()都会跳过空位。

        map()会跳过空位，但会保留这个值

        join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串
        

        // forEach方法
        [,'a'].forEach((x,i) => log(i)); // 1

        // filter方法
        ['a',,'b'].filter(x => true) // ['a','b']

        // every方法
        [,'a'].every(x => x==='a') // true

        // some方法
        [,'a'].some(x => x !== 'a') // false

        // map方法
        [,'a'].map(x => 1) // [,1]

        // join方法
        [,'a',undefined,null].join('#') // "#a##"

        // toString方法
        [,'a',undefined,null].toString() // ",a,,"

    ES6则是明确将空位转为undefined

        Array.from方法会将数组的空位，转为undefined

        扩展运算符（...）也会将空位转为undefined

        copyWithin()会连空位一起拷贝

        fill()会将空位视为正常的数组位置

        for...of循环也会遍历空位

        map方法遍历，空位是会跳过的

        entries()、keys()、values()、find()和findIndex()会将空位处理成undefined


















