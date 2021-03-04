nvm： 

Node Version Manager，用于管理多个活动node.js版本的简单bash脚本
适用场景：

接手**祖传**旧代码，node版本太高导致无法运行成功。或同时需要使用多个版本node。

注意点：

1. 安装时尽量不要更改安装路径，默认安装在c盘下就可以了，我第一次安装更改了安装路径，下载node使用都提示OK，node相关命令失效
2. 安装node版本的同时会安装对应的npm包管理工具

有时候会出现安装node或者npm失败的情况，假如出现此问题



**验证方法**：

nvm use 指定版本后

node -v 查看版本成功

npm -v 失败，

**解决办法：**打开nvm的安装文件夹，修改settings文件中的

node_mirror: https://npm.taobao.org/mirrors/node/

npm_mirror: https://npm.taobao.org/mirrors/npm/

（理由：改成淘宝镜像，增加成功率)

修改完成之后，在cmd中使用nvm 卸载当前指定的node版本

nvm uninstall 指定版本号

使用nvm ls（ls是list的别名） 查询是否卸载成功

成功后

使用 nvm install xx 安装指定版本

再次使用 nvm ls 查询安装成功

使用 nvm use xx 启用该版本的node

再次查询 node -v 和 npm -v

成功得到版本号，问题解决

