---
layout: post
title: "自用笔记本电脑安装黑苹果备忘"
date: 2013-08-27 20:58
comments: true
categories: IT技术
---
前段时间折腾了黑苹果（我的本是acer 4741ZG）。折腾了两周，终于把网卡，声卡，显卡都驱动上了。但是目前还有些小问题，比如用不了iMessage和Facetime。也不能正常休眠。但是这些并不影响我正常使用。

装了黑苹果后自己也买了omnifocus的Mac端和iphone端。现在只想把mac osx当主要自用系统使用。近期也没有买苹果本的打算。故做下备忘，以防黑苹果崩溃重装。

<!-- more -->

### 前期安装环境准备
参考远景贴子 http://bbs.pcbeta.com/viewthread-1169005-1-1.html

买一个无线网卡（磊科NW336）。主要是用来连接互联网更新系统。我安装的是懒人版10.8.3。懒人版10.8.4写不进硬盘，有网友说是懒人版10.8.4打包有点问题。所以我采取的是曲线救国的道路，先安装10.8.3再升级为10.8.4。用这个无线网卡的原因是，10.8.3版本的内置网卡即使安装上了也连不上互联网。这个是系统的bug，10.8.4版本将它修复了。这也是我要升级到10.8.4的主要原因。

磊科NW336 Mac版本的驱动下载地址
http://www.realtek.com.tw/downloads/downloadsView.aspx?Langid=1&PFid=48&Level=5&Conn=4&ProdID=231&DownTypeID=3&GetDown=false&Downloads=true#2747
找到“RTL8188CUS”，然后下载对应版本。

### 安装时注意事项
* 安装时使用“busratio=20 -v npci=0x2000”命令
* 安装成功后使用win7的U盘引导盘修复win引导，然后进入win7系统，删除Mac系统盘的SLE下的N开头的text（做好备份，这些是N卡驱动）
* 在Mac安装盘的E文件夹下找到“AppleACPIPS2Nub.kext”和“ApplePS2Controller.kext”，把它们拷到Mac系统盘的SLE下
* 使用“-v npci=0x2000”启动系统
* 启动系统后完成系统配置并安装黑苹果的常用工具

### 安装变色龙后在E文件夹下使用“Chameleon Wizard”新建名为“org.chameleon.Boot.plist”的启动文件，要勾选的选项有
* Verbose mode(-v)
* npci=0x2000
* Ethernet Built In
* Graphics Enabler

### 使用Kext Wizard安装驱动，安装驱动后重建缓存
* 安装磊科无线网卡驱动
* 安装万能声卡驱动，因为安装的是万能声卡，所以要删除SLE下的AppleHDA.kext
* 安装内置网卡驱动
* 安装N卡驱动（之前备份的N卡驱动）
* 更新FakeSMC.kext
* 安装关机重启不断电补丁“EvOreboot.kext”

### 安装完驱动后重启，使用磊科无线网卡连接上互联网，然后升级系统。升级完后再使用内置网卡连接互联网。

至此黑苹果安装结束。这些是我凭记忆写下的，可能与当时的实际操作有些许出入，但大致流程是这样子。

另：如果有网友也是使用我这款笔记本电脑，并且需要这些驱动的话，可以联系我 huwewa at gmail

（完）
