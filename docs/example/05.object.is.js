"use srtict";

// == ===
console.log(+0 == -0); // true
console.log(+0 === -0); // true
console.log(NaN == NaN); // false

// Object.is()
console.log( Object.is(NaN, NaN) ); // true
console.log( Object.is(+0, -0) ); // false
