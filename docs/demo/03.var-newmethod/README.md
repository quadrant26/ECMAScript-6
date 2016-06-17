1. ES6 变量赋值的新方式
    1.1 基本解构
        var [a, b, c] = [1, 2, 3];
        a // 1
        b // 2
        c // 3
        可以从数组中提取值，按照对应位置，对变量赋值。
        这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
        
        
    1.2 模式匹配实例
        let [foo, [[bar], baz]] = [1, [[2], 3]];
        console.log(foo); // 1
        console.log(bar); // 2
        console.log(baz); // 3

        let [ , , third] = [1, 2, 3];
        console.log(third); // 3

        let [head, ...tail] = [1, 2, 3, 4];
        console.log(head); // 1
        console.log(tail); // array [2,3,4]
        
    1.3 解构不成功
        返回 undefinded
            let [foo2] = [];
            console.log(foo2);  // undefined
            
    1.4 不完全解构
        var [a, [b], c] = [1, [2, 3], 4];
        a // 1
        b // 2
        c // 4
        var [x, y] = [1, 2, 3]
        x // 1
        y // 2
    
    
    1.5 出错
        //如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
        let [foo] = 1;
        let [foo] = false;
        let [foo] = NaN;
        let [foo] = undefined;
        let [foo] = null;
        let [foo] = {};
        
    1.6 解构不仅适用于 var , 也适用于 let 和 const
        let [let1, ... ] = array;
        const [const1, ... ] = array;
        // set 结构
        let [x, y, z] = new Set(['a', 'b', 'c']);
        //只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。
        
    1.7 默认值
        1.7.1 解构赋值允许设置默认值
            var [foo = true ] = []
            foo // true
            [x, y = 'b'] = ['a']
            [x, y = 'b'] = ['a', undefined]
            ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
            
            var [x = 1] = [undefined];
            x // 1
            var [x = 1] = [null];
            x // null
            上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。
            
        1.7.2 对象设置默认值
            // 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
            
            function aaa(){
                console.log("aaa");
            }
            let [x1 = aaa()] = [1];
            console.log(x1); // 1 因为x能取到值，所以函数f根本不会执行。

            let x2;
            if( [1][0] === undefined ){
                x2 = aaa();
            }else{
                x2 = [1][0];
            }
            console.log(x2); // 1

            let [x3 = 1, y3 = x3] = [];
            console.log(x3,y3);  // 1, 1
            let [x4 = 1, y4 = x4 ] = [2];
            console.log(x4,y4);
            let [x5 = 1, y5 = x5] = [1, 2];
            console.log(x5,y5);  // 1, 2
            let [x6 = y6, y6 = 1 ] = [];   // ReferenceError 因为 y6 没有声明
            
2. 对象的解构赋值
    2.1 
        对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；
        而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
        var {foo, bar} = {foo:"aaa", bar : "bbb"};
        foo // "aaa"
        bar // "bbb"     
        
        // 变量没有对应的同名属性，导致取不到值，最后等于undefined。
        var {fo1, baz} = {foo : "aaa", bar : "bbb"};
        console.log(baz); // undefined
        
        // 如果变量名与属性名不一致, 可以写成这样
        var {foo :baz} = {foo : "aaa", bar : "bbb"};
        console.log(baz);
        
        var obj = {first : "hello", last : "world"};
        let {first : f, last : l} = obj;
        console.log(f,l)
        // 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
        
        采用这种写法时，变量的声明和赋值是一体的。对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。
        因为var命令允许重新声明，所以这个错误只会在使用let和const命令时出现。
        
    2.2 // 嵌套模式
        var obj = {
            p : [
                "hello",
                {
                    y : "world"
                }
            ]
        };
        // 这时p是模式，不是变量，因此不会被赋值。
        var {p : [x, {y}]} = obj;
        console.log(x,y); // x = hello, y = world
        
     2.3 默认值  
        var {x = 3} = {};
        // x = 3;
        var {x, y = 5} = {x : 1};
        //x = 1, y = 5
        默认值生效的条件是，对象的属性值严格等于undefined。
        属性等于null，就不严格相等于undefined，导致默认值不会生效。
        
     2.4 错误
        如果解构失败，变量的值等于undefined。
        如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
        
        如果要将一个已经声明的变量用于解构赋值，必须非常小心。
        // 错误的写法
        var x;
        {x} = {x: 1};
        // SyntaxError: syntax error
        // 正确的写法
        ({x} = {x: 1});
        
        // 解构赋值允许，等号左边的模式之中，不放置任何变量名。 
        这样的语法是合法的
        ({} = [true, false]);
        ({} = "abc");
        ({} = []);
        
        //对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
        let { log, sin, cos } = Math;
        console.log( sin(30) );
        
3. 字符串解构
    const [a, b, c, d, e] = "hello";
    a h ...
    const {length:len} = "hello";
    // len 5
        
4. Boolean 解构

    解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
    let {toString : s} = 123;
    console.log(s === Number.prototype.toString); // true
    解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。       
    
    let { prop: x } = undefined; // TypeError
    let { prop: y } = null; // TypeError
        
5. 函数内参 解构
    5.1 
        function add([x,y]){
            return x+y;
        }
        add([1,3]); // 4
        
    5.2
        [[1, 2], [3, 4]].map(([a,b]) => a + b)
        
    5.3 函数解构也可以用默认值
        function move([x = 0, y = 0]){
            return [x,y];
        }
        
        undefined就会触发函数参数的默认值。
        [1, undefined, 3].map((x = 'yes') => x);
        // [ 1, 'yes', 3 ]
        
6. 圆括号问题
    6.1 如果模式中出现圆括号怎么处理。ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号
        因此，建议只要有可能，就不要在模式中放置圆括号。
        
    6.2 不能使用圆括号的情况
        6.2.1  变量声明语句中不能带有圆括号
        6.2.2  函数参数中，模式不能带有圆括号
        6.2.3  赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
        
    6.3 可以使用圆括号
        可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。
        
7. 用法
    1. 交换值
        [x, y] = [y, x];
        
    2. 函数返回多个值
        function example(){
            return [1, 2, 3];
        }
        var [a, b, c] = example();
        var {foo, bar} = example(); // 返回变量的时候
        
    3. 函数参数的定义
        function f([x,y,z]){...}
        f([1,2,3])
        function f({x,y,z}){...}
        f({x:1, y:2, z:4})
        
    4. 提取json
        var json = {
            a : 1,
            b : 2,
            c : 3
        }
        let {a, b, c} = json;
        
    5. 函数参数的默认值
        jQuery.ajax = function (url, {
            async = true,
            beforeSend = function () {},
            cache = true,
            complete = function () {},
            crossDomain = false,
            global = true,
            // ... more config
        }) {
            // ... do stuff
        };
        
    6. 遍历 Map
        var map = new Map();
        map.set("first", "hello");
        map.set("last", "world");
        
        for(let [key, value] of map){
            console.log(key + 'is' + value);
        }
        // 只获取键名
        for(let [key, value] of map){
            console.log(key + 'is' + value);
        }
        // 只获取值
        for(let [key, value] of map){
            console.log(key + 'is' + value);
        }
        
    7. 模块的指定方法
        const {sourcename1, sourcename2} = require("module name");
     
        
        
        
        
        
        
        
        
        
