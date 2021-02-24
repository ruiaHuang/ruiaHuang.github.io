```bash
git branch -r       #查看远程所有分支

git branch           #查看本地所有分支

git branch -a       #查看本地及远程的所有分支，如下图

git fetch   #将某个远程主机的更新，全部取回本地：

git branch -a  #查看远程分支

git branch  #查看本地分支：

git checkout 分支 #切换分支：

git push origin -d 分支名  #删除远程分支: 

 git branch -d 分支名  #删除本地分支

git remote show origin  #查看远程分支和本地分支的对应关系

git remote prune origin #删除远程已经删除过的分支
```

以上是常用的命令

情景1：同步别人新增到远程的分支



```css
  1.git branch查看一下本地分支，再git branch -a查看一下远程分支，对比下，远程存在哪些本地没有的新分支.
  2.将某个远程主机的更新，全部取回本地：git fetch
  3.再次查看远程分支：git branch -a 发现远程的分支已经可以看见了
  4.拉取远程分支到本地：git checkout -b 远程分支名
```

情景2：本地删除了分支，远程也想删除
 2.1:本地想要删除某个分支，远程仓库的这个分支也要删掉怎么办？



```undefined
  a.使用git branch -d 分支名来删除本地分支。
  b.使用git push origin -d 分支名直接来删除远程分支。在次使用git branch -a,发现分支已经不存在了。
or
   a.使用git branch -d 分支名来删除本地分支。
    b.最简单的解决办法就是直接到gitlab/github进行删除.
```

2.2:只把远程的删除掉怎么办？



```undefined
a.使用git push origin -d 分支名直接来删除远程分支。此时删除的只是远程的分支，本地仍然存在
or
a.直接到gitlab/github进行删除.
```

2.3:远程删除了分支，本地也想删除
 eg:直接到gitlab/github删除了某个分支，我在本地使用git branch -a查看远程分支，依然存在并且可以切换使用。我本地也想把远程分支记录删除怎么办？



```csharp
1.git branch -a查看远程分支，红色的是本地远程远程分支记录。

2.执行下面命令查看远程仓库分支和本地仓库的远程分支记录的对应关系：

  git remote show origin  

3.会看到：
 
 refs/remotes/origin/远程仓库已经删除的分支名              stale (use 'git remote prune' to remove)

 其中：

 Local refs configured for 'git push':  命令下面的分支是本地仓库的远程分支记录中仍存在的分支，但远程仓库已经不存在。

4.输入git remote prune origin来删除远程仓库已经删除过的分支

5.验证 git branch -a

  此时可以看到本地远程分支记录已经和远程仓库保持一致了。
```