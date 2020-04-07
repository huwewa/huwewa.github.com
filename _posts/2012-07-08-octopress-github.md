---
layout: post
title: "octopress在github中的代码分支里文件删除的问题"
date: 2012-07-08 16:06
comments: true
categories: IT技术
---
**搭**的博客是octopress.发布在github上。在上面也开了个分支`source`备份代码用。之前写了几篇博客，也在`_post`文件夹里生成了相应的`markdown`文件。提交到`source`分支后想把一些博客删了。但使用以下git命令后，`source`分支里的相应文件并没有删除。
	
``` shell
git add .
git commit -m 'delete post'
git push origin source
```

google后在[stackoverflow](http://stackoverflow.com/questions/1402776/how-do-i-commit-all-deleted-files-in-git)上找到了方法。
> git add -u
> 
> This tells git to automatically stage tracked files -- including deleting the previously tracked files.

要把`source`分支里相应的文件也删除，就可以使用下面命令

``` shell
git add -u
git commit -m 'delete post'
git push origin source
```
