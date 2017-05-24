Class

1. constructor

2. setters and getters

    set variable(argument){
        this._value = argument
    }

    get variable(){
        return this._value
    }

3. extends

    Class之间可以通过extends关键字实现继承

4. super

    super关键字，它在这里表示父类的构造函数，用来新建父类的this对象

    子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象

5. static

    在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

        class People{
            static fnname(){

            }
        }

        used : People.fnname

    父类的静态方法，可以被子类继承

        class Person extends People{

        }

        used : Person.fnname
