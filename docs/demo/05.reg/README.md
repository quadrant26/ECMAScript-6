1. 正则表达式的声明

    1.1 var re = new RegExp('xyz', i);  // ES5不允许此时使用第二个参数，添加修饰符，否则会报错。

    1.2 var re = new RegExp(/xyz/i);

    都等价于 var re = /xyz/i;

    ES6改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。

    而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

    new RegExp(/abc/ig, 'i').flags
    // "i"

2. 字符串的正则方法

    match()

    replace()

    search()

    split()

3. u 修饰符

    ES6对正则表达式添加了u修饰符，含义为“Unicode模式”，用来正确处理大于\uFFFF的Unicode字符。

    也就是说，会正确处理四个字节的UTF-16编码。

    3.1 (.) 点字符

        点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。

        对于码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符。
    
    3.2 Unicode字符表示法

        /\u{61}/.test('a') // false

        /\u{61}/u.test('a') // true

        /\u{20BB7}/u.test('𠮷') // true

    3.3 量词

        使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的Unicode字符。

            /a{2}/.test('aa') // true

            /a{2}/u.test('aa') // true

            /𠮷{2}/.test('𠮷𠮷') // false

            /𠮷{2}/u.test('𠮷𠮷') // true

        另外，只有在使用u修饰符的情况下，Unicode表达式当中的大括号才会被正确解读，否则会被解读为量词。

    3.4 预定义模式

        \S

        /^\S$/.test('𠮷') // false

        /^\S$/u.test('𠮷') // true

        上面代码的\S是预定义模式，匹配所有不是空格的字符。只有加了u修饰符，它才能正确匹配码点大于0xFFFF的Unicode字符。

    3.5 i 修饰符

        有些Unicode字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K。

4. y 粘连(sticky)修饰符

    y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。

    不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，
    
    4.1 lastIndex

        const REGEX = /a/g;

        REGEX.lastIndex = 2;
        const match = REGEX.exec('xaya');
        console.log(match, match.index); // match.index = 3

        REGEX.lastIndex = 4;
        console.log(REGEX.exec('xaxa')); // null
        lastIndex属性指定每次搜索的开始位置，g修饰符从这个位置开始向后搜索，直到发现匹配为止。

    4.2 y lastIndex 

        y修饰符同样遵守lastIndex属性，但是要求必须在lastIndex指定的位置发现匹配。

        const REGEX2 = /a/y;
        
        // 指定位置为 2 开始搜索

        REGEX2.lastIndex = 2;

        console.log(REGEX2.exec('xaxa')) // 不是粘连，匹配失败 null

        // 指定位置为 3 开始搜索

        REGEX2.lastIndex = 3;

        const match2 = REGEX2.exec('xaxa')

        console.log(match2, match2.index, REGEX2.lastIndex) // 3号位置是粘连，匹配成功

        进一步说，y修饰符号隐含了头部匹配的标志^。

        console.log(/b/y.exec('aba'));

    4.3 y split

        在split方法中使用y修饰符，原字符串必须以分隔符开头。这也意味着，只要匹配成功，数组的第一个成员肯定是空字符串。

        'x##'.split(/#/y) // 没有找到匹配

        '##x'.split(/#/y) // 找到两个匹配

        后续的分隔符只有紧跟前面的分隔符，才会被识别


        console.log('#x#'.split(/#/y)); // [ '', 'x#' ]
        console.log( '##'.split(/#/y)); // ["", "", ""]

    4.4 y replace 


        const REGEX = /a/gy;
        'aaxa'.replace(REGEX, '-') // '--xa'

5. sticky

    ES6的正则对象多了sticky属性，表示是否设置了y修饰符。

    var r =/abc/y

    r.sticky   == > true

6. flags

    ES6为正则表达式新增了flags属性，会返回正则表达式的修饰符。

    source 返回正则表达式的正文

7. RegExp.escape()

    字符串必须转义，才能作为正则模式。

    function escapeRegExp(str){
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+?\.\\\^\$\|]/, '\\$&');
    }

8. 后行断言 lookbehind

    V8引擎4.9版已经支持，Chrome浏览器49版打开”experimental JavaScript features“开关（地址栏键入about:flags），就可以使用这项功能。

    ”先行断言“指的是，x只有在y前面才匹配，必须写成/x(?=y)/。比如，只匹配百分号之前的数字，要写成/\d+(?=%)/。

    ”先行否定断言“指的是，x只有不在y前面才匹配，必须写成/x(?!y)/。比如，只匹配不在百分号之前的数字，要写成/\d+(?!%)/。

    /\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]

    /\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]

    ”先行断言“括号之中的部分（(?=%)），是不计入返回结果的

    "后行断言"正好与"先行断言"相反，x只有在y后面才匹配，必须写成/(?<=y)x/。

    只匹配美元符号之后的数字，要写成/(?<=\$)\d+/。

    ”后行否定断言“则与”先行否定断言“相反，x只有不在y后面才匹配，必须写成/(?<!y)x/。

    只匹配不在美元符号后面的数字，要写成/(?<!\$)\d+/。

    "后行断言"的实现，需要先匹配/(?<=y)x/的x，然后再回到左边，匹配y的部分。
    
    这种"先右后左"的执行顺序，与所有其他正则操作相反，导致了一些不符合预期的行为。







