1. let 命令

    1.1 变量声明

        let 用来声明变量， 与 var 类似

        只在所在的 代码块内有效

        {
            var a = 1;
            let b = 2;
        }

        console.log(b) // Uncaught ReferenceError: b is not defined

        在 for 循环中可以更好的使用

        for(let i = 0; i < 10; i++){
            console.log(i);
        }
        
        使用 var 声明的 i 在全局范围内都有效。所以每一次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。

        如果使用let，声明的变量仅在块级作用域内有效
        
    1.2 变量提升 

        let 不支持变量提升

        变量一定在声明后使用，否则报错

    1.3 暂时性死区 (不会被外部改变)

        只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

        存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错

        ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
       
        在代码块内，使用let命令声明变量之前，该变量都是不可用的。
        
        如果一个变量根本没有被声明，使用typeof反而不会报错。
      
        在没有let之前，typeof运算符是百分之百安全的，永远不会报错。
     
        暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

    1.5 不允许重复声明
     
        let不允许在相同作用域内，重复声明同一个变量。
     
        不能在函数内部重新声明参数 


2. 块级作用域

    2.1 使用块级作用域

        内层变量可能会覆盖外层变量

        用来计数的循环变量泄露为全局变量。  

    
    2.2 ES6 块级作用域

        let实际上为JavaScript新增了块级作用域。

        ES6允许块级作用域的任意嵌套。

            {{{{{let insane = 'Hello World'}}}}};

        外层作用域无法读取内层作用域的变量。

        {{{{
          {let insane = 'Hello World'}
          console.log(insane); // 报错
        }}}};

        内层作用域可以定义外层作用域的同名变量。

        {{{{
          let insane = 'Hello World';
          {let insane = 'Hello World'}
        }}}};

        ES6也规定，函数本身的作用域，在其所在的块级作用域之内。

        function f() { console.log('I am outside!'); }
        (function () {
          if(false) {
            // 重复声明一次函数f
            function f() { console.log('I am inside!'); }
          }

          f();
        }());

        上面代码在ES5中运行，会得到“I am inside!”，但是在ES6中运行，会得到“I am outside!”。这是因为ES5存在函数提升，不管会不会进入 if代码块，函数声明都会提升到当前作用域的顶部，得到执行；而ES6支持块级作用域，不管会不会进入if代码块，其内部声明的函数皆不会影响到作用域的外部。


        块级作用域外部，无法调用块级作用域内部定义的函数。

        {
            let a = "inside";
            function f(){
                console.log(a);
            }
        }
        f(); // 报错


        ES5的严格模式规定，函数只能在顶层作用域和函数内声明，其他情况（比如if代码块、循环代码块）的声明都会报错。

        // ES5
        'use strict';
        if (true) {
          function f() {} // 报错
        }


        ES6由于引入了块级作用域，这种情况可以理解成函数在块级作用域内声明，因此不报错，但是构成区块的大括号不能少，否则还是会报错。

        // 不报错
        'use strict';
        if (true) {
          function f() {}
        }

        // 报错
        'use strict';
        if (true)
          function f() {}
        
        这样声明的函数，在区块外是不可用的。

        'use strict';
        if (true) {
          function f() {}
        }
        f(); // ReferenceError: f is not defined

        上面代码中，函数f是在块级作用域内部声明的，外部是不可用的。


3. const

    3.1 const 声明一个只读的常量。一旦声明，常量的值就不能改变。

    3.2 const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值

    3.3 const的作用域与let命令相同：只在声明所在的块级作用域内有效。

    3.4 const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

    3.5 const声明的常量，也与let一样不可重复声明。

    3.6 对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变

        const a = [];
        a.push("Hello"); // 可执行
        a.length = 0;    // 可执行
        a = ["Dave"];    // 报错

    3.7 冻结对象 Object.freeze()

        const foo = Object.freeze({});
        // 常规模式时，下面一行不起作用；
        // 严格模式时，该行会报错
        foo.prop = 123;

4. 全局对象的属性

    全局对象是最顶层的对象，在浏览器环境指的是window对象，在Node.js指的是global对象。ES5之中，全局对象的属性与全局变量是等价的。

    未声明的全局变量，自动成为全局对象window的属性

    ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是全局对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。也就是说，从ES6开始，全局变量将逐步与全局对象的属性脱钩


    var a = 1;
    // 如果在Node的REPL环境，可以写成global.a
    // 或者采用通用方法，写成this.a
    window.a // 1

    let b = 1;
    window.b // undefined
