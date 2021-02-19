##  1. 兼容问题

```
IE 下svg 不显示问题
给svg嵌套个父级并写上高度，就显示正常
```



## 2.1 简单解释

　　简单来说，escape是对字符串(string)进行编码(而另外两种是对URL)，作用是让它们在所有电脑上可读。
　　编码之后的效果是%XX或者%uXXXX这种形式。
　　其中 ASCII字母、数字、@*/+ ，这几个字符不会被编码，其余的都会。
　　最关键的是，当你需要对URL编码时，请忘记这个方法，这个方法是针对字符串使用的，不适用于URL。

## 2.2 encodeURI和encodeURIComponent

　　对URL编码是常见的事，所以这两个方法应该是实际中要特别注意的。
　　它们都是编码URL，唯一区别就是编码的字符范围，其中
　　encodeURI方法不会对下列字符编码 ASCII字母、数字、~!@#$&*()=:/,;?+'
　　encodeURIComponent方法不会对下列字符编码 ASCII字母、数字、~!*()'
也就是encodeURIComponent编码的范围更广，会将http://XXX中的//也编码，会导致URL不可用。(其实java中的URLEncoder.encode(str,char)也类似于这个方法，会导致URL不可用)

## 3  vue的watch监听数组和对象，监听到的新值旧值一样解决办法

```javascript
// 数组 注意监听数组的变更不需要 deep: true
watch: {
    messageData(newVal,oldVal) {
        console.log('newVal,oldVal', newVal, oldVal)
    }
},

computed: {
    messageData() {
        return [...this.messageList]
    }
}


// 对象 
// deep: true 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
watch: {
	messageData: {
		handler(newVal, oldVal) {
			console.log('newVal,oldVal', newVal, oldVal)
		},
		deep: true
	}
}

computed: {
    messageData() {
        return Json.parse(JSON.stringify(xxx))
    }
}
```
## 4.1 apply、call

在 javascript 中，call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 this 的指向。
JavaScript 的一大特点是，函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念。

```
function fruits() {}
 
fruits.prototype = {
    color: "red",
    say: function() {
        console.log("My color is " + this.color);
    }
}
 
var apple = new fruits;
apple.say();    //My color is red
```

但是如果我们有一个对象banana= {color : "yellow"} ,我们不想对它重新定义 say 方法，那么我们可以通过 call 或 apply 用 apple 的 say 方法：

```
banana = {
    color: "yellow"
}
apple.say.call(banana);     //My color is yellow
apple.say.apply(banana);    //My color is yellow
```

所以，可以看出 call 和 apply 是为了动态改变 this 而出现的，当一个 object 没有某个方法（本栗子中banana没有say方法），但是其他的有（本栗子中apple有say方法），我们可以借助call或apply用其它对象的方法来操作。

## 4.2 apply、call 区别

对于 apply、call 二者而言，作用完全一样，只是接受参数的方式不太一样。例如，有一个函数定义如下：

```
var func = function(arg1, arg2) {
     
};
```

就可以通过如下方式来调用：

```
func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2])
```

其中 this 是你想指定的上下文，他可以是任何一个 JavaScript 对象(JavaScript 中一切皆对象)，call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。　

## 4.3 apply、call、bind比较

那么 apply、call、bind 三者相比较，之间又有什么异同呢？何时使用 apply、call，何时使用 bind 呢。简单的一个栗子：

```
var obj = {
    x: 81,
};
 
var foo = {
    getX: function() {
        return this.x;
    }
}
 
console.log(foo.getX.bind(obj)());  //81
console.log(foo.getX.call(obj));    //81
console.log(foo.getX.apply(obj));   //81
```

三个输出的都是81，但是注意看使用 bind() 方法的，他后面多了对括号。

也就是说，区别是，当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用 bind() 方法。而 apply/call 则会立即执行函数。

再总结一下：

- apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
- apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
- apply 、 call 、bind 三者都可以利用后续参数传参；
- bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。

## 5.前端性能优化

[引用地址](https://segmentfault.com/a/1190000022205291) 



### 使用位操作
JavaScript 中的数字都使用 IEEE-754 标准以 64 位格式存储。但是在位操作中，数字被转换为有符号的 32 位格式。即使需要转换，位操作也比其他数学运算和布尔操作快得多。
#### 取模
由于偶数的最低位为 0，奇数为 1，所以取模运算可以用位操作来代替。
```
if (value % 2) {
    // 奇数
} else {
    // 偶数 
}
// 位操作
if (value & 1) {
    // 奇数
} else {
    // 偶数
}
```
#### 取整
```
~~10.12 // 10
~~10 // 10
~~'1.5' // 1
~~undefined // 0
~~null // 0
```
#### 位掩码
```
const a = 1
const b = 2
const c = 4
const options = a | b | c
```
通过定义这些选项，可以用按位与操作来判断 a/b/c 是否在 options 中。
```
// 选项 b 是否在选项中
if (b & options) {
    ...
}
```
## 6 媒体查询
```
先看下面的代码,这是从bootstrap中遍历出来的，min-width来确认分别是768、992、1200。
当然了过去也有些设备宽度是600 480的，哪些小分辨率的我们都归类为小于767的。
为什么是小于767而不是768呢，那是因为在css中@media (min-width: 768px)表示最小是768也就是>=768，
这里有等于，所以我们判断更小的设备用@media (max-width: 767px)这边表示<=767就不会有冲突了 
运用@media实现网页自适应中的几个关键分辨率 
从上面我们可以看出有几个临界点的分辨率，那么我们就可以轻松的来写自己的自适应代码了
@media (min-width: 768px){ //>=768的设备 }
@media (min-width: 992px){ //>=992的设备 }
@media (min-width: 1200){ //>=1200的设备 }
注意下顺序，如果你把@media (min-width: 768px)写在了下面那么很悲剧，
@media (min-width: 1200){ //>=1200的设备 }
@media (min-width: 992px){ //>=992的设备 }
@media (min-width: 768px){ //>=768的设备 }
因为如果是1440,由于1440>768那么你的1200就会失效。
所以我们用min-width时，小的放上面大的在下面，同理如果是用max-width那么就是大的在上面，小的在下面
@media (max-width: 1199){ //<=1199的设备 }
@media (max-width: 991px){ //<=991的设备 }
@media (max-width: 767px){ //<=768的设备 }
经过了上面的入门学习，我们就可以灵活的来点高级的混合应用了
@media screen and (min-width:1200px){
	#page{ width: 1100px; }
	#content,.div1{width: 730px;}
	#secondary{width:310px} 
} 
@media screen and (min-width: 960px) and (max-width: 1199px) { 
	#page{ width: 960px; }
	#content,.div1{width: 650px;}
	#secondary{width:250px}
	select{max-width:200px} 
}
 @media screen and (min-width: 768px) and (max-width: 959px) { 
 	#page{ width: 900px; }
 	#content,.div1{width: 620px;}
 	#secondary{width:220px}
 	select{max-width:180px} 
 }
 @media only screen and (min-width: 480px) and (max-width: 767px){ 
 	#page{ width: 450px; }
 	#content,.div1{width: 420px;position: relative; }
 	#secondary{display:none}
 	#access{width: 450px; }
 	#access a {padding-right:5px}
 	#access a img{display:none}
 	#rss{display:none}
 	#branding #s{display:none}
 } 
@media only screen and (max-width: 479px) {
	#page{ width: 300px; }
	#content,.div1{width: 300px;}
	#secondary{display:none}
	#access{width: 330px;} 
	#access a {padding-right:10px;padding-left:10px}
	#access a img{display:none}
	#rss{display:none}
	#branding #s{display:none}
	#access ul ul a{width:100px} 
}
4
上面的代码中用到了 screen这里指定了显示器为显示设备，也可以是print打印机等其他设备，一般我们用screen。或者干脆省略。如果想看详细的关于media的说明可以百度一下关于media query的知识
```

## 7  Vue中 onmouseenter,onmouseleave,onmouseover,onmouseout的区别
```javascript
1.onmouseenter和onmouseleave是一组：当鼠标进入指定区域的时候触发，但是不支持冒泡，进入或者离开子组件都不触发
下图中，onmouseenter和onmouseleave相当于绑定的区域为A+B
```


![](D:\GitProject\github\ruiaHuang.github.io\images\mouse1.png)
```
2.onmouseover和onmouseout是一组：当鼠标进入指定区域的时候触发，进入或者离开子组件也都触发

下图中，onmouseover和onmouseout相当于绑定的区域为A(不包含B)

```

![](D:\GitProject\github\ruiaHuang.github.io\images\mouse2.png)




## 8. 如何在多个分隔符上分割字符串
```
// 用逗号(,)和分号(;)分开。

const list = "apples,bananas;cherries"
const fruits = list.split(/[,;]/)
console.log(fruits); // ["apples", "bananas", "cherries"]
```

## 9. 防抖、节流及使用场景
```
函数防抖(debounce): 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
函数节流(throttle): 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
1.总结
函数防抖和函数节流都是防止某一时间频繁触发，但是这两兄弟之间的原理却不一样。
函数防抖是某一段时间内只执行一次，而函数节流是间隔时间执行。
2. 使用场景
debounce
 search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
 window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
throttle
 鼠标不断点击触发，mousedown(单位时间内只触发一次)
 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
```
## 10. JSON.parse(JSON.stringify(obj))实现深拷贝的弊端
1. 深拷贝:将数据中所有的数据拷贝下来，对拷贝之后的数据进行修改不会影响到原数据。
2. 浅拷贝 ： 只是将数据中所有的数据引用下来，依旧指向同一个存放地址，拷贝之后的数据修改之后，也会影响到原数据的中的对象数据。例如:Object.assign(),…扩展运算符

### JSON.parse(JSON.stringify(obj))深拷贝的问题
1.	如果obj里面存在时间对象,JSON.parse(JSON.stringify(obj))之后，时间对象变成了字符串。
2.	如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象。
3.	如果obj里有函数，undefined，则序列化的结果会把函数， undefined丢失。
4.	如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null。
5.	JSON.stringify()只能序列化对象的可枚举的自有属性。如果obj中的对象是有构造函数生成的，
则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor。
如果对象中存在循环引用的情况也无法正确实现深拷贝。
```
function Person (name) {
    this.name = 20
}

const lili = new Person('lili')

let a = {
    data0: '1',
    date1: [new Date('2020-03-01'), new Date('2020-03-05')],
    data2: new RegExp('\\w+'),
    data3: new Error('1'),
    data4: undefined,
    data5: function () {
    	console.log(1)
    },
    data6: NaN,
    data7: lili
}
let b = JSON.parse(JSON.stringify(a))
```
### 可以使用 lodash 库 cloneDeep 方法来解决
```
let c = _.cloneDeep(a)
```

## 11. SASS- 局部文件(Partial)

Sass源文件中可以通过`@import`指令导入其他Sass源文件，被导入的文件就是局部文件，局部文件让Sass模块化编写更加容易。

如果一个目录正在被Sass程序监测，目录下的所有scss/sass源文件都会被编译，但通常不希望局部文件被编译，因为局部文件是用来被导入到其他文件的。如果不想局部文件被编译，文件名可以以下划线 （_）开头。

### 举例说明

假设我们有一个局部文件： _colors.scss，该文件会被导入到styles.scss文件，然后styles.scss会被编译为styles.css。

_colors.scss文件内容：

```scss
$primary-color: orange;
$secondary-color: gold;
```

复制

使用`@import`导入局部文件，styles.scss内容如下：

```scss
@import "colors";

body {
  color: $primary-color;
  background: $secondary-color;
}
```

复制

可以看到在使用`@import`导入局部文件_color.scss时，省略了下划线和扩展名，这是允许的。

styles.scss编译后的CSS文件内容如下：

```scss
body {
  color: orange;
  background: gold; }
```

转载自 https://www.qikegu.com/docs/2580