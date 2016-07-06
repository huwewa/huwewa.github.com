---
layout: post
title: "在第二台电脑部署octopress环境"
date: 2012-11-25 23:34
comments: true
categories: IT技术
---
**在**另一台ＰＣ机上部署octopress环境。在此记录一下。
##  安装MinGW  
安装完后把bin目录设置到环境变量path中。
## 安装Ruby 
版本要为1.9.3以上版本。安装完后把bin目录设置到环境变量path中。然后新增两个环境变量`LANG`和`LC`。google了一下，有的网友说是`LC_ALL`。而我新增了这三个环境变量，它们的值都是`zh_CN.UTF-8`。

- LANG=zh_CN.UTF-8
- LC=zh_CN.UTF-8
- LC_ALL=zh_CN.UTF-8

我增加这三个环境变量主要是为了解决不能`rake new_post[中文标题]`的问题。增加后这个问题解决了。
<!-- more -->
## 安装DevKit 
版本要为４.５以上版本。因为版本要与Ruby版本对应。安装方法如下：

```
cd <DEVKIT_INSTALL_DIR>
ruby dk.rb init
ruby dk.rb install
//检验是否成功
gem install rdiscount --platform=ruby
```

## 安装GitHub官方客户端 
安装GitHub官方客户端有一个好处，就是key不用自己去生成，然后手动上传到GitHub。这个客户端会帮你做这些工作。安装好后在客户端的设置里面设置`default storage directory`目录和`default shell`。`default shell`设置为`Git Bash`。

打开`Git Shell`使用以下命令clone GitHub上的octopress到本地。

```
git clone -b source git@github.com:username/username.github.com.git octopress
cd octopress
git clone git@github.com:username/username.github.com.git _deploy
```

## 安装依赖gems 

```
gem install bundler --pre 
bundle install
bundle update
```

有的网友说有`rake install`这一步，但是我试后提示我说已安装有一主题，是否要替换，当我选是后，`rake preview`后发现我的自定义主题没有了，只有默认的主题。我后来的操作把这一步去掉了，一切正常。
## 修改gems配置 
到Ruby的安装目录\lib\ruby\gems\1.9.1\gems\jekyll-0.11.0\lib\jekyll\找到convertible.rb这个文件，修改self.content = File.read(File.join(base, name))为self.content = File.read(File.join(base, name), :encoding => "utf-8")
## 从GitHub中的octopress更新source内容到本地 
因为是用两台电脑对同一个octopress写文章，所以就有同步的问题。每次写文章之前都应该从GitHub上拉取最新的`source`取本地。然后再写新文章。写完之后提交到GitHub。写文章之前执行以下命令：

```
cd _deploy
git pull origin master
cd ..
git pull origin source
```

`rake new_post[文章标题]`写完文章之后执行以下命令提交到GitHub：

```
git add .
git commit -m
git push origin source
```

在提交前输入下面命令：

- git config --global user.email "you@example.com"
-  git config --global user.name "Your Name"

参与文章：

- http://octopress.cn/q/9
- http://note.softrayn.com/blog/2012/07/two-pc-sync-octopress/
- http://hopes4.me/blog/how-to-configure-the-local-environment-of-octopress-with-github-on-second-pc/

（完）
