1.字符串的 Unicode

    表示字符 \uxxxx 范围 \u0000 -- \uFFFF

    超过范围的可以使用 两个双字节表示 \uxxxx\uxxxxx

        \u20BB7 => \u20BB + 7

        \u{20BB7}

    ES6 改进： 将码点放入大括号内可以进行正常解析
    
        \u{41}\u{42}\u{43}   

        ABC

        '\u{1F680}' === '\uD83D\uDE80' true

    有六种方法表示一个字符

        '\z' === 'z'  // true

        '\172' === 'z' // true

        '\x7A' === 'z' // true

        '\u007A' === 'z' // true

        '\u{7A}' === 'z' // true


2. codePointAt()

    JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。

    对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。


    ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。

    codePointAt方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString方法转换一下。

    var s = '𠮷a';
    s.codePointAt(0).toString(16) // "20bb7"
    s.charCodeAt(2).toString(16) // "61"

    codePointAt() 参数在字符串种是不正确的，汉字在占两个字符

    字符a在字符串s的正确位置序号应该是1，但是必须向charCodeAt方法传入2。解决这个问题的一个办法是使用for...of循环，

    codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。


    function is32Bit(c) {
        return c.codePointAt(0) > 0xFFFF;
    }
    is32Bit("𠮷") // true
    is32Bit("a") // false


3. String.fromCodePoint

    ES5提供String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别32位的UTF-16字符（Unicode编号大于0xFFFF）。

    String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'

    如果String.fromCodePoint方法有多个参数，则它们会被合并成一个字符串返回。

    fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。

4. 字符串的遍历器接口

    for(let code of str){
        console.log(code);
    }
    这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。


5. at

    ES5对字符串对象提供charAt方法，返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。

    'abc'.charAt(0) // "a"
    '𠮷'.charAt(0) // "\uD842"

6. normalize

    为了表示语调和重音符号，Unicode提供了两种方法。一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。

    另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。
    
    normalize方法可以接受四个参数。

        NFC，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
       
        NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
       
        NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，normalize方法不能识别中文。）
       
        NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

    normalize方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过Unicode编号区间判断。


7. includes()  startsWith() endsWith()

    includes()：返回布尔值，表示是否找到了参数字符串。

    startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。

    endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。

    这三个方法都支持第二个参数，表示开始搜索的位置。

    endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

8. repeat

    epeat方法返回一个新字符串，表示将原字符串重复n次。

    参数如果为空 返回空        'na'.repeat()  // ''

    参数如果是小数，会被取整。 'na'.repeat(2.8) //nana

    如果repeat的参数是负数或者Infinity，会报错。

    如果参数是0到-1之间的小数，则等同于0，这是因为会先进行取整运算。
    
    0到-1之间的小数，取整以后等于-0，repeat视同为0。

    参数NaN等同于0。

    如果repeat的参数是字符串，则会先转换成数字。  

        'na'.repeat('na') // ""
        'na'.repeat('3') // "nanana"

9. padStart() padEnd()

    padStart用于头部补全，padEnd用于尾部补全。

    padStart和padEnd一共接受两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。

    如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。

    如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。

    如果省略第二个参数，则会用空格补全长度。

10. 模板字符串

    模板字符串（template string）是增强版的字符串，用反引号（`）标识。

    // 普通字符串
    `In JavaScript '\n' is a line-feed.`

    // 多行字符串
    `In JavaScript this is
    not legal.`

    console.log(`string text line 1
    string text line 2`);

    // 字符串中嵌入变量
    var name = "Bob", time = "today";
    `Hello ${name}, how are you ${time}?`

    如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。

    模板字符串中嵌入变量，需要将变量名写在${}之中

    模板字符串之中还能调用函数。

    function fn() {
    return "Hello World";
    }
    `foo ${fn()} bar`

    如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。

    如果模板字符串中的变量没有声明，将报错


12. 标签模板

    它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能

    alert`123` === alert(123)

    标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数

13. String.raw()

    ES6还为原生的String对象，提供了一个raw方法。

    String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。

    如果原字符串的斜杠已经转义，那么String.raw不会做任何处理。

    String.raw方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

    String.raw = function (strings, ...values) {
    var output = "";
        for (var index = 0; index < values.length; index++) {
            output += strings.raw[index] + values[index];
        }

        output += strings.raw[index]
        return output;
    }
    
    String.raw方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。
