"use srtict";

// 多行字符串
let dessert = '🎂',
    drink = 'tea';

let breakfast = kitchen`今天的早餐是\n
 ${dessert} 与 ${drink} !`;

// 模版字符串
function kitchen(strings, ...values){
  console.log(strings);
  console.log(values);

  let result = '';
  for (var i = 0; i < values.length; i++){
    result += strings[i];
    result += valus[i];
  }
  result += strings[strings.length - 1];

  return result;
}
