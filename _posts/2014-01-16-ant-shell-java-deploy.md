---
layout: post
title: 使用ant和脚本实现java项目发布流程
date: 2014-01-16 16:58:42
categories: IT技术
tags:
---
##项目ant配置文件##
文件名`build.xml`
<!-- more -->
{% gist 7868981 %}

##java项目启动脚本##
文件名`start.sh`

{% gist 7870491 %}

##单个项目启动脚本##
文件名`do.sh`

{% gist 7870542 %}

##所有项目启动脚本##
文件名`doAll.sh`

{% gist 7870605 %}

##文件解压脚本##
文件名`unzip.sh`

{% gist 7869464 %}

（完）
