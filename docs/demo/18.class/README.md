1.  Class

    console.log(typeof Point);  // Function
    console.log(Point === Point.prototype.constructor);  // true

    类的内部所有定义的方法，都是不可枚举的（non-enumerable）

    Object.keys(Point.prototype)
    // []
    Object.getOwnPropertyNames(Point.prototype)
    // ["constructor","toString"]

    1.2. constructor
    
        constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加

        constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象


        可以通过实例的__proto__属性为Class添加方法

        point.hasOwnProperty('toString') // false
        point.__proto__.hasOwnProperty('toString') // true
        p1.__proto__ === p2.__proto__ // true

    1.3 class 表达式

        这个类的名字是MyClass而不是Me，Me只在Class的内部代码可用，指代当前类

        const MyClass = class Me {
            getClassName() {
                return Me.name;
            }
        };

2. 继承

    2.1 super


        子类必须在constructor方法中调用super方法，否则新建实例时会报错.这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象

        在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错
        
        用法：

            1. 作为函数调用时（即super(...args)），super代表父类的构造函数

            2. 作为对象调用时（即super.prop或super.method()），super代表父类。注意，此时super即可以引用父类实例的属性和方法，也可以引用父类的静态方法
    
    2.2 prototype and __proto__

        1.子类的__proto__属性，表示构造函数的继承，总是指向父类。

        2.子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性

        A:
            class A{}
            class B extends A{}
            B.__proto__ === A    // true
            B.prototype.__proto__ === A.prototype // true
        
        B:
            class A{}
            class B{}

            // B的实例继承A的实例
            Object.setPrototypeOf(B.prototype, A.prototype);

            // B继承A的静态属性
            Object.setPrototypeOf(B, A);

    2.3 继承目标

        2.3.1 子类继承Object类
        
            class A extends Object {
            }

            A.__proto__ === Object // true
            A.prototype.__proto__ === Object.prototype // true

        2.3.2 不存在任何继承
        
            class A {
            }

            A.__proto__ === Function.prototype // true
            A.prototype.__proto__ === Object.prototype // true

        2.3.3 特殊情况，子类继承null

            class A extends null {
            }

            A.__proto__ === Function.prototype // true
            A.prototype.__proto__ === undefined // true

    2.4 Object.getPrototypeOf()

        Object.getPrototypeOf方法可以用来从子类上获取父类

        Object.getPrototypeOf(ColorPoint) === Point // true

3. 原生构造函数的继承

    ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承

4. Class的取值函数（getter）和存值函数（setter）

    class CustomHTMLElement {
    constructor(element) {
        this.element = element;
    }

    get html() {
        return this.element.innerHTML;
    }

    set html(value) {
        this.element.innerHTML = value;
    }
    }

    var descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype, "html");
    "get" in descriptor  // true
    "set" in descriptor  // true

5. Class的Generator方法

    class Foo {
    constructor(...args) {
        this.args = args;
    }
    * [Symbol.iterator]() {
        for (let arg of this.args) {
        yield arg;
        }
    }
    }

    for (let x of new Foo('hello', 'world')) {
    console.log(x);
    }
    // hello
    // world


6. Class的静态方法
    
    static

    表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法

    父类的静态方法，可以被子类继承

    静态方法也是可以从super对象上调用的

7. Class的静态属性和实例属性

    Class.propname

    ES6明确规定，Class内部只有静态方法，没有静态属性。

        // 以下两种写法都无效
        class Foo {
        // 写法一
        prop: 2

        // 写法二
        static prop: 2
        }

8. new.target属性

    ES6为new命令引入了一个new.target属性，（在构造函数中）返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的

    Class内部调用new.target，返回当前Class

    子类继承父类时，new.target会返回子类。



