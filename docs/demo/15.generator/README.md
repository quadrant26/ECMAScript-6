1. 简介

    执行Generator函数会返回一个遍历器对象, 使用 next() 方法进行遍历 返回一个 对象

        {value: value, done: false}

    如果遍历完成或者遇到 ruturn 就会返回 {value: undefined , done: true}

    Generator函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield语句，定义不同的内部状态（yield语句在英语里的意思就是“产出”）

    ES6没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过

        function * foo(x, y) { ··· }

        function *foo(x, y) { ··· }

        function* foo(x, y) { ··· }

        function*foo(x, y) { ··· }


    yield 语句

        由于Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield语句就是暂停标志

        1. 遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。

        2. 下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。

        3. 如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

        4. 如果该函数没有return语句，则返回的对象的value属性值为undefined

        Generator函数可以不用yield语句，这时就变成了一个单纯的暂缓执行函数

        yield语句不能用在普通函数中，否则会报错

            (function (){
                yield 1;
            })()
            // SyntaxError: Unexpected number

        yield语句如果用在一个表达式之中，必须放在圆括号里面

            console.log('Hello' + (yield));
            console.log('Hello' + (yield 123));

        yield语句用作函数参数或赋值表达式的右边，可以不加括号。

            foo(yield 'a', yield 'b'); // OK

            let input = yield; // OK

    与Iterator接口的关系

        可以把Generator赋值给对象的Symbol.iterator属性，从而使得该对象具有Iterator接口


2. next方法的参数

    yield句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值

    next方法的参数表示上一个yield语句的返回值，所以第一次使用next方法时，不能带有参数。V8引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数

3. for...of循环

    for...of循环可以自动遍历调用Generator函数时生成的Iterator对象，且此时不再需要调用next方法

    return语句返回的 , 不包括在for...of循环之中

    原生的JavaScript对象没有遍历接口，无法使用for...of循环，通过Generator函数为它加上这个接口


4. Generator.prototype.throw()

    Generator函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在Generator函数体内捕获

    throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例

    注意，不要混淆遍历器对象的throw方法和全局的throw命令。上面代码的错误，是用遍历器对象的throw方法抛出的，而不是用throw命令抛出的。后者只能被函数体外的catch语句捕获

    如果Generator函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获

    如果Generator函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行

    throw方法被捕获以后，会附带执行下一条yield语句。也就是说，会附带执行一次next方法

    throw命令与g.throw方法是无关的，两者互不影响


5. Generator.prototype.return()

    Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数

    遍历器对象g调用return方法后，返回值的value属性就是return方法的参数foo。并且，Generator函数的遍历就终止了，返回值的done属性为true，以后再调用next方法，done属性总是返回true

    return方法调用时，不提供参数，则返回值的value属性为undefined

    如果Generator函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行



6. yield*语句

    如果在Generater函数内部，调用另一个Generator函数，默认情况下是没有效果的

    如果yield命令后面跟的是一个遍历器对象，需要在yield命令后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*语句

    如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员

    任何数据结构只要有Iterator接口，就可以被yield*遍历


7. 作为对象属性的Generator函数

    如果一个对象的属性是Generator函数，可以简写成下面的形式

        let obj = {
            * myGeneratorMethod() {
            ···
            // myGeneratorMethod属性前面有一个星号，表示这个属性是一个Generator函数
            }
        };



8. Generator函数的this

    Generator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，也继承了Generator函数的prototype对象上的方法

    如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象

    Generator函数也不能跟new命令一起用，会报错





9. 含义





10.应用

    1. 异步操作的同步化表达

    2. 控制流管理

    3. 部署iterator接口

    4. 作为数据结构
