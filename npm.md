### npm 包管理器的常用命令

> 测试环境为node>=8.1.3&&npm>=5.0.3

1， 首先是安装命令

```
 //全局安装
 npm install 模块名 -g
 //本地安装
 npm install 模块名
 //一次性安装多个
 npm install 模块1 模块2 模块3 
 //安装开发时依赖包
 npm install 模块名 --save-dev
 //安装运行时依赖包
 npm install 模块名 --save
```

2， 查看安装的目录

```
 //查看项目中模块所在的目录
 npm root
 //查看全局安装的模块所在目录
 npm root -g
```

3， 查看npm的所有命令命令

```
 npm help
```

4，查看某个包的各种属性

```
//查看某个包对于各种包的依赖关系
 npm view 模块名 dependencies
```

5，查看包的源文件地址

```
 //查看包的源文件地址
 npm view 模块名 repository.url
```

6

- 查看当前模块依赖的node最低版本号

  ```
   npm view 模块名 engines
  ```

- 查看模块的当前版本号

  ```
   npm view 模块名 version
   //需要注意的是查看到的模块版本是该模块再远程仓库的版本号，并不是当前项目中所依赖的版本号。
   //查看当前项目中应用的某个模块的版本号的命令为
   npm list 模块名 version
  ```

- 查看模块的历史版本和当前版本

  ```
   npm view 模块名 versions
  ```

- 查看一个模块的所有信息

  ```
   npm view 模块名
  ```

7，查看npm使用的所有文件夹

```
 npm help folders
```

8，用于更改包内容后进行重建

```
 npm rebuild 模块名
```

9，检查包是否已经过时

```
 //此命令会列出所有已经过时的包，可以及时进行包的更新
 npm outdated
```

10，更新node模块

```
 npm update 模块名
 //当然你也可以update 该模块到指定版本
 npm update 模块名 @版本号
 //如果安装到最新版本可以使用以下命令
 npm install 模块名@latest 
 
 //如果当前的版本号为2.5.1，是没办法进行npm update 模块名 @2.3.1 将模块版本号变为2.3.1的，当然，你可以先uninstall，然后进行install @2.3.1
```

11，卸载node模块

```
 npm uninstall 模块名
```

12，访问package.json的字段文档

```
 npm help json
```

13，发布一个npm包的时候，需要检验某个包名是否已经存在

```
 npm search 模块名
```

14，npm init：引导你创建一个package.json文件，包括名称、版本、作者这些信息

- 清除npm的缓存

  ```
   npm cache clean
   //慎重使用改命令
  ```

15, npm root 查看当前包的安装路径，
   npm root -g 查看全局的包的安装路径

16，npm -v 查看npm的版本

17，查看某个模块的bugs列表界面

```
 npm bugs 模块名
 //例如运行npm bugs chai则会打开vue仓库的issue，效果如下图
```

![npm bugs](http://blogpic.blackgan.cn/npmBugs2.PNG)

18，打开某个模块的仓库界面

```
 npm repo 模块名
 //例如运行npm repo vue则会打开vue线上仓库，效果如下图
```

![npm bugs](http://blogpic.blackgan.cn/npmRepo.PNG)

- 打开某个模块的文档

  ```
   npm docs 模块名
   //例如运行npm docs vue则会打开vue的readme.md文档
  ```

- 打开某个模块的主页

  ```
   npm home 模块名
   //例如运行npm home vue则会打开vue模块的主页
  ```

- 查看当前已经安装的模块

  ```
   npm list
   //当然我们也可以限制输入的模块层级，例如
   npm list --depth=0
  ```

  ![npm list](http://blogpic.blackgan.cn/npmList.PNG)

- 清除未被使用到的模块

  ```
   //有时在我们使用npm list的时候，可能会碰到一些问题，就是有些模块并没有被项目引用使用，我们还是安装了这些模块，那么我们可以一键清除这些没有使用到的模块
   npm prune
  ```

#### 版本控制

我们使用node开发时，经常需要依赖一些模块，我们进行了下载之后，便一直在该版本的模块环境下进行开发，但是线上的服务器一般都是根据依赖来配置文件，重新下载各个模块，但是保不齐某个模块的版本已经更新了，这时线上的包会更新到最新的版本，但你的代码还是依据老版本来写的，这时可能会产生一些不知名的Bug,

首先看npm包的版本号的格式X.Y.Z,版本好的格式遵循semver 2.0规范，其中X为主版本号，只有更新了不向下兼容的API时进行修改主版本号，Y为次版本号，当模块增加了向下兼容的功能时进行修改，Z为修订版本号，当模块进行了向下兼容的bug修改后进行修改,这就是“语义化的版本控制”。

> > 默认情况下，当用--save或者--save-dev安装一个模块时，npm通过脱字符(^)来限定所安装模块的主版本号，而该脱字符对于不同的版本号有不同的更新机制
> >
> > - ^1.2.1 代表的更新版本范围为 >=1.2.1 && < 2.0.0
> > - ^0.2.1 代表的更新版本范围为 >=0.2.1 && < 0.3.0
> > - ^0.0.2 代表的更新版本范围为 0.0.2（相当于锁定为了0.0.2版本）

## ##### 对于上述字符的版本控制，我们可以来进行一个尝试:

首先可以看到package.json中对于vuex的版本依赖为^2.3.1

![version1](http://blogpic.blackgan.cn/version1.PNG)

然后查看以下项目中安装的vuex模块的版本号

![version2](http://blogpic.blackgan.cn/version2.PNG)

果然没错，改版本号为2.3.1，接下来我们看一下vuex的历史版本（npm view vuex versions）

![version3](http://blogpic.blackgan.cn/version3.PNG)

可以看到2.3.1-2.5.0之后到了3.0.0，接下来运行npm update vuex,查看以下更新后的版本

![version3](http://blogpic.blackgan.cn/version4.PNG)

现在我们看到更新后的vuex版本号为2.5.0 < 3.0.0,可以验证第一条规范。

我们再来验证下主版本号为0的版本控制情况，[先将当前项目依赖的vuex版本改为@0.6.1版本](mailto:先将当前项目依赖的vuex版本改为@0.6.1版本).

```
npm uninstall vuex
//卸载vuex成功
npm install vuex@0.6.1 --save
//安装vuex0.6.1版本成功
```

![version5](http://blogpic.blackgan.cn/version5.PNG)

然后更新当前项目中的vuex版本，执行代码 npm update vuex

![version5](http://blogpic.blackgan.cn/version6.PNG)

可以通过npm view vuex versions看到vuex的版本历程，在0.6.3之上为0.7.0，所以当使用脱字符(^)来控制版本号时，当主版本号为0，即代表该模块在快速构建中时，更新项目时的版本范围只能更新修订版本号Z。

对于第三种情况，当主版本和此版本都为0时，代表着该模块处于一个极其不稳定的状态，在执行update时并不会进行版本更新。

------

> > 波浪号(~)是限定模块的次要版本，（以下规则测试方法同上，便不一 一测试）
> >
> > - ~1.5.1允许安装版本号大于1.5.1但小于1.6.0版本的模块
> > - ~0.5.1允许安装版本号为0.6.0

------

> > 当主版本号/次版本号/修订版本号为X or x or *时，那么update或install是会下载该分支最新的版本号
> >
> > - (*)跟新或安装模块时会安装>=0.0.0的最新版本
> > - 1.x 表示的更新范围为>=1.0.0&&< 2.0.0
> > - 1.2.x 表示的更新范围为>=1.2.0&&< 1.3.0

[更多版本规范](https://github.com/npm/npm/blob/latest/doc/misc/semver.md)

1，当然我们也可以把项目依赖的包固定在某一个版本，强制大家安装相同的依赖树，如下所示：

```
 npm install react --save -E
 //此命令会将react的版本号进行固定，但是该方式只能控制项目中直接依赖的包的版本，无法控制项目模块中依赖的包的版本号，所以这种方式也无法让不同的使用者得到相同的依赖树。
```

2，此外我们还可以使用npm shrinkwrap,可以将项目中的模块版本进行精确锁定：

这时候只需要运行命令 npm shrinkwrap,便会产生一个npm-shrinkwrap.json文件，这个文件保存了所有当前使用的依赖模块的版本：把该文件提交到git仓库中，这样其他人在clone你的项目的时候，执行npm install命令时，npm检测到该文件中的信息会完整的还原出完全相同的依赖树，具体的使用方法如下：

```
npm install --save-dev react //安装react
npm prune    //清除未被使用的模块
npm shrinkwrap
```

> 但是使用这种方法，安装一个模块包的方式比较繁琐。

3，使用yarn我们也可以得到模块包精确控制的结果

yarn是一个与npm兼容的node包管理器，使用它安装npm包，会自动在项目目录创建一个yarn.lock文件，该文件包含了当前项目中所安装的依赖包的版本信息，其他人在使用yarn安装项目的依赖包时就可以通过该文件创建一个完全相同的依赖环境。

使用方法如下：

```
 yarn init  //使用yarn创建一个项目
 yarn add 模块名  //使用yarn 安装一个包
 //还有很多yarn命令
```

> 此外，yarn除了可以自动帮我们锁定依赖包的版本，yarn还在本地缓存已经安装过的包，当再次安装时，直接从本地读取即可。安装速度得到大大提升。但yarn的使用需要整个团队都去使用，还是有一定的成本的。

综上所述，目前大多数项目中较为简单的使用规范，在项目中依赖各个模块时，对于主版本号和次版本号都为0的不稳定的项目，我们可以使用精确版本（exact）,对于主版本号为0次版本号不为0的模块和主版本号不为0的模块，使用caret Range即脱字符(^)来控制版本。当然，我们也可以对项目依赖模块的版本进行精确锁定。

#### [SemVer(Semantic Versioning) 2.0.0](https://github.com/mojombo/semver/blob/master/semver.md)

SemVer是一个对npm包版本进行规范的模块，它对于npm包的版本号有着一系列的规则，以下为摘抄自SemVer 2.0.0中的规则：

1. 在版本控制环节我们已经说过了，模块的版本号采用X.Y.Z的格式，且都必须为非负的正整数，依次为主版本号、次版本号，修改版本号。
2. 当规定版本的模块进行发布之后，对于该模块的任何修改，都必须发布新版本。
3. 主版本号为0.X.Y的模块处于开发阶段，模块并不稳定。
4. 主版本号在有不向下兼容的API发布时必须修改，在主版本号递增时，次版本号和修订版本号必须重新归零。
5. 次版本号再有向下兼容的API发布时进行递增修改，在模块中有API被弃用时也必须递增次版本号，当此版本号递增改变时，修订版本号Z必须归零。
6. 版本的优先级就是各个版本的排序规则，判断版本优先级时，必须把版本号从左至右分为主版本号、此版本号、修订版本号、以及先行版本号来进行比较