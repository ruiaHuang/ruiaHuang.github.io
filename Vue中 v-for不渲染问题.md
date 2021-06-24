### 问题：

​	Vue中v-for 不渲染问题

![image-20210624093703312](C:\Users\huangrui\AppData\Roaming\Typora\typora-user-images\image-20210624093703312.png)

### 描述：

​	v-for假如放在中间的位置，smileList改变，v-for不会重新渲染dom， 没有v-for的会重新渲染

### 解决方案：

​	修改v-for的位置，放在父元素的 第一个子元素位置上，或者外面套一层父元素。即可解决问题

![image-20210624094041526](C:\Users\huangrui\AppData\Roaming\Typora\typora-user-images\image-20210624094041526.png)