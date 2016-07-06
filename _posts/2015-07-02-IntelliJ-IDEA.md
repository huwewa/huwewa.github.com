---
layout: post
title: IntelliJ IDEA
date: 2015-07-02 12:31:00
categories: IT技术
tags:
---

### 快捷键

 - Ctrl + F12 类似Eclipse中的 Ctrl + o 快速索引本类中的方法

 - Ctrl + F7 查看类方法在本类中的调用，按F3选择

 - Ctrl + N 快速打开类文件，类似Eclipse中的Ctrl + Shift + T

 - Ctrl + Shift + N 快速打开文件

 - Alt + Q 查看当前光标所在方法的声明

 - Ctrl + F 文件内查找

 - Ctrl + Shift + Alt + N 全局查找类中的方法和变量

 - Ctrl + H 显示类的继承结构

 - Alt + Left/Right 导航栏上的前一个文件/后一个文件

 - Alt + Up/Down 类中的上一个方法/下一个方法

 - Alt + F1 定位当前文件的位置

 - Alt + F7 全局查找某个类在全局中的调用

 - Ctrl + U 转到父类

 - Ctrl + Alt + B 跳到方法的实现

 - Alt + Shift + Up/Down 上移行或下移行

 - Alt + ~ VCS操作菜单

 - F11 标记为书签

 - Shift + F11 打开书签

 - Ctrl + / 快速注释

 - Ctrl + Alt + H 查看方法的调用层级

 - Ctrl + E 查看最近编辑的文件

 - Alt + Insert 生成Getter和Setter方法

 - Ctrl + Shift + U 大小写转换

 - Alt + 6 显示todo (可结合正则表达式配置自定义视图: 如 `\btodo\b.*\bhuangww\b.*`)

 - Ctrl + Alt + Space 补全当前行

 - Ctrl + Shift + V 调出最近复制的N份内容

 - Ctrl + [/] 快速定位到方法头/方法尾

### 问题

 - 编译从Eclipse导入的项目报非法转义字符

     Settings->Project Setting->Compiler->Java Complier->Use complier选择Eclipse

 - SVN的checkout错误

    Uncheking the "Use command-line client" option from Subversion settings.
