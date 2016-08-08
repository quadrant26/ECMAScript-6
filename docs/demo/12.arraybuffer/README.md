数据类型	字节长度	含义				对应的C语言类型

Int8		1		8位带符号整数			signed char

Uint8		1		8位不带符号整数		unsigned char

Uint8C		1		8位不带符号整数（自动过滤溢出）  unsigned char

Int16		2		16位带符号整数			short

Uint16		2		16位不带符号整数		unsigned short

Int32		4		32位带符号整数			int

Uint32		4		32位不带符号的整数		unsigned int

Float32		4		32位浮点数			float

Float64		8		64位浮点数			double


1. ArrayBuffer对象

    ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。

    ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域


    // 分别建立两种视图：32位带符号整数（Int32Array构造函数）和8位不带符号整数（Uint8Array构造函数）。由于两个视图对应的是同一段内存，一个视图修改底层内存，会影响到另一个视图

    var buf1 = new ArrayBuffer(12);
    var x1 = new Int32Array(buf1);
    x1[0] = 1;
    var x2 = new Uint8Array(buf1);
    x2[0] = 2;
    console.log(x1[0]);

    1.1 ArrayBuffer.prototype.byteLength

        var buffer = new ArrayBuffer(32);
        console.log(buffer.byteLength);         // 32

    1.2 ArrayBuffer.prototype.slice()

        slice方法其实包含两步，第一步是先分配一段新内存，第二步是将原来那个ArrayBuffer对象拷贝过去

        第一个参数表示拷贝开始的字节序号（含该字节），第二个参数表示拷贝截止的字节序号（不含该字节）。如果省略第二个参数，则默认到原ArrayBuffer对象的结尾

        var buffer = new ArrayBuffer(8);
        var newBuffer = buffer.slice(0, 3);

    1.3 ArrayBuffer.isView()

        ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例

        var buffer = new ArrayBuffer(8);
        ArrayBuffer.isView(buffer) // false

        var v = new Int32Array(buffer);
        ArrayBuffer.isView(v) // true

2. TypedArray视图

    2.1 TypedArray视图一共包括9种类型，每一种视图都是一种构造函数。

            Int8Array：8位有符号整数，长度1个字节。
            Uint8Array：8位无符号整数，长度1个字节。
            Uint8ClampedArray：8位无符号整数，长度1个字节，溢出处理不同。
            Int16Array：16位有符号整数，长度2个字节。
            Uint16Array：16位无符号整数，长度2个字节。
            Int32Array：32位有符号整数，长度4个字节。
            Uint32Array：32位无符号整数，长度4个字节。
            Float32Array：32位浮点数，长度4个字节。
            Float64Array：64位浮点数，长度8个字节。

        都有length属性，都能用方括号运算符（[]）获取单个元素，所有数组的方法，在它们上面都能使用

            TypedArray数组的所有成员，都是同一种类型。
            TypedArray数组的成员是连续的，不会有空位。
            TypedArray数组成员的默认值为0。比如，new Array(10)返回一个普通数组，里面没有任何成员，只是10个空位；new Uint8Array(10)返回一个TypedArray数组，里面10个成员都是0。
            TypedArray数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性

    2.2 构造函数

        2.2.1 TypedArray(buffer, byteOffset=0, length?)

            视图的构造函数可以接受三个参数：

                第一个参数（必需）：视图对应的底层ArrayBuffer对象。
                第二个参数（可选）：视图开始的字节序号，默认从0开始。
                第三个参数（可选）：视图包含的数据个数，默认直到本段内存区域结束。
        
        2.2.2 TypedArray(length)

            var f64a = new Float64Array(8);
            f64a[0] = 10;
            f64a[1] = 20;
            f64a[2] = f64a[0] + f64a[1];

        2.2.3 TypedArray(typedArray)

            var typedArray = new Int8Array(new Uint8Array(4));
        
        2.2.4 TypedArray(arrayLikeObject)

            构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例
            这时TypedArray视图会重新开辟内存，不会在原数组的内存上建立视图

            var typedArray = new Uint8Array([1, 2, 3, 4]);

    2.3 方法
        
        TypedArray数组没有concat方法

        TypedArray数组与普通数组一样，部署了Iterator接口，所以可以被遍历

    2.4 字节序

    2.5 BYTES_PER_ELEMENT属性

        每一种视图的构造函数，都有一个BYTES_PER_ELEMENT属性，表示这种数据类型占据的字节数

            Int8Array.BYTES_PER_ELEMENT // 1
            Uint8Array.BYTES_PER_ELEMENT // 1
            Int16Array.BYTES_PER_ELEMENT // 2
            Uint16Array.BYTES_PER_ELEMENT // 2
            Int32Array.BYTES_PER_ELEMENT // 4
            Uint32Array.BYTES_PER_ELEMENT // 4
            Float32Array.BYTES_PER_ELEMENT // 4
            Float64Array.BYTES_PER_ELEMENT // 8

    2.7 溢出

        TypedArray数组的溢出处理规则，简单来说，就是抛弃溢出的位，然后按照视图类型进行解释

            正向溢出（overflow）：当输入值大于当前数据类型的最大值，结果等于当前数据类型的最小值加上余值，再减去1。
            负向溢出（underflow）：当输入值小于当前数据类型的最小值，结果等于当前数据类型的最大值减去余值，再加上1

    2.8 TypedArray.prototype.buffer

        TypedArray实例的buffer属性，返回整段内存区域对应的ArrayBuffer对象。该属性为只读属性

    2.9 TypedArray.prototype.byteLength，TypedArray.prototype.byteOffset

        byteLength属性返回TypedArray数组占据的内存长度，单位为字节。byteOffset属性返回TypedArray数组从底层ArrayBuffer对象的哪个字节开始


    2.10 TypedArray.prototype.length

        length属性表示TypedArray数组含有多少个成员。注意将byteLength属性和length属性区分，前者是字节长度，后者是成员长度

    2.11 TypedArray.prototype.set()

        TypedArray数组的set方法用于复制数组（普通数组或TypedArray数组），也就是将一段内容完全复制到另一段内存

            var a = new Uint8Array(8);
            var b = new Uint8Array(8);
            b.set(a);

        set方法还可以接受第二个参数，表示从b对象的哪一个成员开始复制a对象

             b.set(a, 2);

    2.12 TypedArray.prototype.subarray()

        subarray方法的第一个参数是起始的成员序号，第二个参数是结束的成员序号（不含该成员），如果省略则包含剩余的全部成员

    2.13 TypedArray.prototype.slice()

        slice方法的参数，表示原数组的具体位置，开始生成新数组。负值表示逆向的位置，即-1为倒数第一个位置，-2表示倒数第二个位置，以此类推

    2.14 TypedArray.of()

        用于将参数转为一个TypedArray实例

        // 方法一
        let tarr = new Uint8Array([1,2,3]);

        // 方法二
        let tarr = Uint8Array.of(1,2,3);

        // 方法三
        let tarr = new Uint8Array(3);
        tarr[0] = 0;
        tarr[1] = 1;
        tarr[2] = 2;

    2.15 TypedArray.from()

        静态方法from接受一个可遍历的数据结构（比如数组）作为参数，返回一个基于这个结构的TypedArray实例

        var ui16 = Uint16Array.from(Uint8Array.of(0, 1, 2));
        ui16 instanceof Uint16Array // true

        from方法还可以接受一个函数，作为第二个参数，用来对每个元素进行遍历，功能类似map方法



3. 复合视图

    由于视图的构造函数可以指定起始位置和长度，所以在同一段内存之中，可以依次存放不同类型的数据，这叫做“复合视图”




4. DataView视图

    DataView视图提供更多操作选项，而且支持设定字节序。本来，在设计目的上，ArrayBuffer对象的各种TypedArray视图，是用来向网卡、声卡之类的本机设备传送数据，所以使用本机的字节序就可以了；而DataView视图的设计目的，是用来处理网络设备传来的数据，所以大端字节序或小端字节序是可以自行设定的

    DataView视图本身也是构造函数，接受一个ArrayBuffer对象作为参数，生成视图

        DataView(ArrayBuffer buffer [, 字节起始位置 [, 长度]]);

        var buffer = new ArrayBuffer(24);
        var dv = new DataView(buffer);

    属性

        DataView.prototype.buffer：返回对应的ArrayBuffer对象
        DataView.prototype.byteLength：返回占据的内存字节长度
        DataView.prototype.byteOffset：返回当前视图从对应的ArrayBuffer对象的哪个字节开始

    方法 

        getInt8：读取1个字节，返回一个8位整数。
        getUint8：读取1个字节，返回一个无符号的8位整数。
        getInt16：读取2个字节，返回一个16位整数。
        getUint16：读取2个字节，返回一个无符号的16位整数。
        getInt32：读取4个字节，返回一个32位整数。
        getUint32：读取4个字节，返回一个无符号的32位整数。
        getFloat32：读取4个字节，返回一个32位浮点数。
        getFloat64：读取8个字节，返回一个64位浮点数。

        get方法的参数都是一个字节序号（不能是负数，否则会报错），表示从哪个字节开始读取

    如果一次读取两个或两个以上字节，就必须明确数据的存储方式，到底是小端字节序还是大端字节序。默认情况下，DataView的get方法使用大端字节序解读数据，如果需要使用小端字节序解读，必须在get方法的第二个参数指定true

    方法(写入内存)

        setInt8：写入1个字节的8位整数。
        setUint8：写入1个字节的8位无符号整数。
        setInt16：写入2个字节的16位整数。
        setUint16：写入2个字节的16位无符号整数。
        setInt32：写入4个字节的32位整数。
        setUint32：写入4个字节的32位无符号整数。
        setFloat32：写入4个字节的32位浮点数。
        setFloat64：写入8个字节的64位浮点数。

        这一系列set方法，接受两个参数，第一个参数是字节序号，表示从哪个字节开始写入，第二个参数为写入的数据。对于那些写入两个或两个以上字节的方法，需要指定第三个参数，false或者undefined表示使用大端字节序写入，true表示使用小端字节序写入



5. 二进制数组的应用

    

















