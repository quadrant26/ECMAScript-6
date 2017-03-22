"use srtict";

// default parameter values

function super(desset='🍎', drink='tea'){
    return `${desset}, $(drink)`;
}

console.log(
    super(),
    super('甜甜圈', '🍺')
);
