1. 函数参数的默认值

    1.1 ES6允许为函数的参数设置默认值，即直接写在参数定义的后面
    
        function (x, y="world"){}
        
        参数变量是默认声明的，所以不能用let或const再次声明

        解构赋值

            foo({}) // undefined, 5
            
            foo({x: 1}) // 1, 5
            
            foo({x: 1, y: 2}) // 1, 2
            
            foo() // TypeError: Cannot read property 'x' of undefined

    1.2. 参数的默认位置

        定义了默认值的参数，应该是函数的尾参数

        如果非尾部的参数设置默认值，实际上这个参数是没法省略的

            function f2(x, y=5, z){

                console.log([x,y,z]);

            }
            
            // 无法只省略该参数，而不省略它后面的参数，除非显式输入undefined
            
            //f2(1,,2)    // error

        如果传入undefined，将触发该参数等于默认值，null则没有这个效果

    1.3. 函数的 length 属性

        指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真

        rest参数也不会计入length属性

        (function (...args){}).length


    1.4. 作用域

        如果参数默认值是一个变量，则该变量所处的作用域，与其他变量的作用域规则是一样的，即先是当前函数的作用域，然后才是全局作用域

        全局变量x不存在，就会报错
            
            function (y=x){

                let x = 2;
                console.log(y);

            }

        如果函数A的参数默认值是函数B，由于函数的作用域是其声明时所在的作用域，那么函数B的作用域不是函数A，而是全局作用域

    1.5. 应用

        利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误

        可以将参数默认值设为undefined，表明这个参数是可以省略的。


2. reset

    2.1 reset

        ES6引入rest参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中

        rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错

        函数的length属性，不包括rest参数

3. 扩展运算符

    3.1 扩展运算符（spread）是三个点（...）
        
        将一个数组转为用逗号分隔的参数序列

        该运算符主要用于函数调用

            function push(array, ...items) {
                
                array.push(...items);
            
            }

    3.2 替代数组的 apply 方法

        // ES5的写法
        function f(x, y, z) {
        // ...
        }
        var args = [0, 1, 2];
        f.apply(null, args);

        // ES6的写法
        function f(x, y, z) {
        // ...
        }
        var args = [0, 1, 2];
        f(...args);

        // ES6的写法
        Math.max(...[14, 3, 77])

        // 等同于
        Math.max(14, 3, 77);

    3.3 扩展运算符的应用

        1. 合并数组

            console.log([1,2,...[4,3]]);

        2. 解构赋值结合

            [a, ...rest] = list

                const [first, ...rest] = [1, 2, 3, 4, 5];
                first // 1
                rest  // [2, 3, 4, 5]

            扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错

                const [...butLast, last] = [1, 2, 3, 4, 5];
                const [first, ...middle, last] = [1, 2, 3, 4, 5];

        3. 函数的返回值

            var dateFields = readDateFields(database);
            var d = new Date(...dateFields);

        4. 字符串

            [..."hello"]

            能够正确识别32位的Unicode字符。

            'x\uD83D\uDE80y'.length // 4
            [...'x\uD83D\uDE80y'].length // 3

        5. 实现了Iterator接口的对象

            var nodeList = document.querySelectorAll('div');
            var array = [...nodeList];

        6. Map和Set结构，Generator函数

            let map = new Map([
                [1, 'one'],
                [2, 'two'],
                [3, 'three']
            ]);
            let arr = [...map];

            对没有iterator接口的对象，使用扩展运算符，将会报错
            
            var obj = { 1: 'a', 2 : 'b'}

4. name

    函数的name属性，返回该函数的函数名

    ES6对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5的name属性，会返回空字符串，而ES6的name属性会返回实际的函数名

        var func1 = function () {};

        // ES5
        func1.name // ""

        // ES6
        func1.name // "func1"

    Function构造函数返回的函数实例，name属性的值为“anonymous”
        
    bind返回的函数，name属性值会加上“bound ”前缀


5. 箭头函数

    5.1 ES6允许使用“箭头”（=>）定义函数

        var f = v => v;

    5.2 箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分

        var f = () => 5;
        // 等同于
        var f = function () { return 5 };

        var sum = (num1, num2) => num1 + num2;
        // 等同于
        var sum = function(num1, num2) {
            return num1 + num2;
        };

    5.3 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回

        var sum = (num1, num2) => { return num1 + num2; }

    5.4 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号

        var getTempItem = id => ({ id: id, name: "Temp" });
    
    5.5 箭头函数可以与变量解构结合使用

        const full = ({ first, last }) => first + ' ' + last;

        // 等同于
        function full(person) {
        return person.first + ' ' + person.last;
        }

    
    5.6 简化回调函数

        [1,2,3].map(x => x*x);
        var rsult = values.sort((a, b) => a-b));

        const numbers = (...nums) => nums;
        numbers(1, 2, 3, 4, 5)
        // [1,2,3,4,5]

        const headAndTail = (head, ...tail) => [head, tail];
        headAndTail(1, 2, 3, 4, 5)
        // [1,[2,3,4,5]]

6. 箭头函数使用注意

    6.1 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
        (this对象的指向是可变的，但是在箭头函数中，它是固定的)

        this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数

        除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target

        由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向

    6.2 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

	6.3 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

	6.4 不可以使用yield命令，因此箭头函数不能用作Generator函数


7. 函数绑定

    箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法（call、apply、bind）。但是，箭头函数并不适用于所有场合，所以ES7提出了“函数绑定”（function bind）运算符，用来取代call、apply、bind调用。虽然该语法还是ES7的一个提案，但是Babel转码器已经支持

    函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面

        foo::bar;
        // 等同于
        bar.bind(foo);

        foo::bar(...arguments);
        // 等同于
        bar.apply(foo, arguments);

    如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面

        var method = obj::obj.foo;
        // 等同于
        var method = ::obj.foo;

        let log = ::console.log;
        // 等同于
        var log = console.log.bind(console);

    由于双冒号运算符返回的还是原对象，因此可以采用链式写法

        // 例一
        import { map, takeWhile, forEach } from "iterlib";

        getPlayers()
        ::map(x => x.character())
        ::takeWhile(x => x.strength > 100)
        ::forEach(x => console.log(x));

        // 例二
        let { find, html } = jake;
        document.querySelectorAll("div.myClass")
        ::find("p")
        ::html("hahaha");

8. 尾调用优化

    尾调用 ： 某个函数的最后一步是调用另一个函数

    尾递归 ：函数调用自身，称为递归。如果尾调用自身，就称为尾递归

    递归的改写

        方法一是在尾递归函数之外，再提供一个正常形式的函数
        第二种方法就简单多了，就是采用ES6的函数默认值

    ES6的尾调用优化只在严格模式下开启，正常模式是无效的

        这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

        func.arguments：返回调用时函数的参数。
        func.caller：返回调用当前函数的那个函数

    正常模式：

        蹦床函数（trampoline）可以将递归执行转为循环执行。

        function trampoline(f) {
        while (f && f instanceof Function) {
            f = f();
        }
        return f;
        }

9. 尾逗号

    function clownsEverywhere(

        param1,

        param2,
        
    ) { /* ... */ }

    clownsEverywhere(

        'foo',

        'bar',

    );