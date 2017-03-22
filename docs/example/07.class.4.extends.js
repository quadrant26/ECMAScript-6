"use strict";

// class
// extends

class Person{
    constructor(name, birthday){
        this.name = name;
        this.birthday = birthday;
    }

    intro() {
        return `${this.name}, ${this.birthday}`;
    }
}
class Chef extends Person{
    constructor(namr, birthday){
        super(name, birthday)
    }
}

let k = new Chef('king', '1989-08-18')
console.log(k.intro());
