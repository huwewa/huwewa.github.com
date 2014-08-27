---
layout: post
title: "android开发出现ADB异常的解决"
date: 2012-11-27 23:57
comments: true
categories: IT技术
---
**Eclipse**中运行android程序出现ADB server didn’t ACK异常的问题。Googel了一下，试过path环境变量的设置，adb进程和碗豆荚进程的查杀均没有解决问题。后来发现是Android SDK版本的问题。我的解决方法是： 


`将android project设置成android2.1。然后将android虚拟机设置成2.2。` 

问题得以解决。

通过升级Android SDK应该也能解决问题。这个我没有验证。

（完）
