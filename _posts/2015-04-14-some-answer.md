---
layout: post
title: 问与答
date: 2015-04-14 18:05:00
categories: IT技术
tags:
---

##Web Dev##

***

###Q:为什么Struts的Action中接收过来的字段中文乱码?###

A:可能是在Tomcat的配置文件`server.xml`中没有配置`URIEncoding="utf-8"`

原:

```
<Connector port="9876" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" />
```

修改后:

```
<Connector port="9876" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" URIEncoding="utf-8" />
```

###Q:为什么我的Tomcat日志`catalina.out`没有按天分割?###

A:可能是没有安装`cronolog`并在`catalina.sh`做分割配置.

###Q:java中打印数组的最佳方式是什么?###

A:使用以下方式可以打印多维数组

```
Arrays.deepToString(arr);
```

##Tools##

***

###Q:怎样在vim中关掉所有buff,且保留窗口?###

A:使用命令`:bufdo bdelete`

###Q:xshell中tail后怎么清屏?###

A:点击右键出来的菜单里面有。多看软件操作选项。

###Q:在Windows中怎样轻松创建USB启动盘?###

A:使用[Rufus](https://rufus.akeo.ie/?locale=zh_CN)一键创建。[Rufus项目地址](https://github.com/pbatard/rufus)

###Q:`sudo apt-get install ia32-libs`出错是为什么？###

A:有可能是有些依赖条件不满足。输入以下命令
```
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install ia32-libs
```

###Q:Gvim中使用不了fcitx输入法怎么办?###

A:可能是因为输入法的快捷键和Gvim中的快捷键冲突了。禁用`fcitx`里全局配置里的`额外的激活输入法快捷键`.

###Q:怎样在eclipse中使用vi?###

A:安装`viPlugin`插件。配置`Path to vim executable`选项到外部安装的`vim`。执行命令`:vim`可在eclipse中调用外部vim。[人穷志不短 :(](http://lshang.diandian.com/post/2014-03-22/40061318328)

###Q:如何在Debian上简单地安装并使用shadowsocks客户端？###

A:安装`pip`

```
apt-get install python-pip
```

接着安装`shadowsocks`

```
pip install shadowsocks
```

启动`shadowsocks`客户端

```
sslocal -s server_ip -p server_port  -l 1080 -k password -m rc4-md5
```

其中`server_ip`为服务器地址，`server_port`为端口，`1080`为本地端口，`password`为密码，`rc4-md5`为加密方式。

###Q:如何在vim中使用正则表达式进行匹配替换?###

A:例 

```
http://124.com/
```

更改成

```
http://abc.cn/
```

执行

```
:%s/[0-9]*.com/abc.cn/g
```

###Q:Debian上怎样移除卸载`lantern`后在桌面遗留的程序图标？###

A:删除`/usr/share/applications/lantern.desktop`.

###Q:怎样在python中把时间戳转换为日期?###

A:

```
import datetime
print(datetime.datetime.fromtimestamp(int("1284101485")).strftime('%Y-%m-%d %H:%M:%S'))
```

###Q:linux中如何根据文件内容查找文件?###

A:例

```
find / -name '*.txt' | xargs grep 'bjl_texas'
```

###Q:在git中怎样查看一个文件的修改记录?###

A: 查看文件的修改记录

```
git log -p filename
```

查看目前文件每一行是哪个提交最后的改动

```
git blame filename
```

###Q:怎样在vim中删除空白行?###

A:

```
:g/^$/d
```

###Q:怎样查看linux上运行的是什么版本?###

A:

```
$ cat /proc/version
```

###Q:怎样在Mysql中查看某个数据库里各个表的数据大小?###

A:

```
SELECT table_name AS "Tables", 
round(((data_length + index_length) / 1024 / 1024), 2) "Size in MB" 
FROM information_schema.TABLES 
WHERE table_schema = "database_name"
ORDER BY (data_length + index_length) DESC;
```
###Q:在Mysql中怎样导出查询结果集到txt文件？###

A:

```
SELECT  * FROM table WHERE id<100 INTO  OUTFILE '/tmp/table.txt'
```

###Q:怎样在Vim中删除匹配的行和删除不匹配的行?###

A:

```
g/xxx/d 删除包含xxx的行
v/xxx/d 删除不含xxx的行
```

###Q:怎样在Vim中统计匹配的个数?###

A:

```
:%s/xxx//gn n表示只报告匹配的个数，不进行实际替换
```

###Q:Linux中怎样查看文件夹大小?###

A:

```
du -sh *
```

###Q:在Linux中怎样修改文件的所有者和所属组?###

A:

```
chown user:group filename
```

###Q:在Linux中怎样查看文件大小?###

A:

```
du -sh *
```

###Q:怎样在linux中添加软链接?###

A:

```
ln -s /home/wywon/idea-IU-135.1306/bin/* /bin
```
###Q:Debian的根目录满了怎么办?###

A:

下载[GParted](http://gparted.org/liveusb.php)镜像，然后安装[Tuxboot](http://tuxboot.org/)。把镜像做成U盘启动盘。再从U盘启动，打开GParted进行分区调整。
