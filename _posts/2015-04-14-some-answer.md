---
layout: post
title: 问与答
date: 2015-04-14 18:05:00
categories: IT技术
tags:
---

## Web Dev

***

### Q:为什么Struts的Action中接收过来的字段中文乱码?

A:可能是在Tomcat的配置文件`server.xml`中没有配置`URIEncoding="utf-8"`

原:

```
<Connector port="9876" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" />
```

修改后:

```
<Connector port="9876" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" URIEncoding="utf-8" />
```

### Q:为什么我的Tomcat日志`catalina.out`没有按天分割?

A:可能是没有安装`cronolog`并在`catalina.sh`做分割配置.

### Q:java中打印数组的最佳方式是什么?

A:使用以下方式可以打印多维数组

```
Arrays.deepToString(arr);
```

## Tools

***

### Q:怎样在vim中关掉所有buff,且保留窗口?

A:使用命令`:bufdo bdelete`

### Q:xshell中tail后怎么清屏?

A:点击右键出来的菜单里面有。多看软件操作选项。

### Q:在Windows中怎样轻松创建USB启动盘?

A:使用[Rufus](https://rufus.akeo.ie/?locale=zh_CN)一键创建。[Rufus项目地址](https://github.com/pbatard/rufus)

### Q:`sudo apt-get install ia32-libs`出错是为什么？

A:有可能是有些依赖条件不满足。输入以下命令
```
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install ia32-libs
```

### Q:Gvim中使用不了fcitx输入法怎么办?

A:可能是因为输入法的快捷键和Gvim中的快捷键冲突了。禁用`fcitx`里全局配置里的`额外的激活输入法快捷键`.

### Q:怎样在eclipse中使用vi?

A:安装`viPlugin`插件。配置`Path to vim executable`选项到外部安装的`vim`。执行命令`:vim`可在eclipse中调用外部vim。[人穷志不短 :(](http://lshang.diandian.com/post/2014-03-22/40061318328)

### Q:如何在Debian上简单地安装并使用shadowsocks客户端？

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

### Q:如何在vim中使用正则表达式进行匹配替换?

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

### Q:Debian上怎样移除卸载`lantern`后在桌面遗留的程序图标？

A:删除`/usr/share/applications/lantern.desktop`.

### Q:怎样在python中把时间戳转换为日期?

A:

```
import datetime
print(datetime.datetime.fromtimestamp(int("1284101485")).strftime('%Y-%m-%d %H:%M:%S'))
```

### Q:linux中如何根据文件内容查找文件?

A:例

```
find / -name '*.txt' | xargs grep 'bjl_texas'
```

### Q:在git中怎样查看一个文件的修改记录?

A: 查看文件的修改记录

```
git log -p filename
```

查看目前文件每一行是哪个提交最后的改动

```
git blame filename
```

### Q:怎样在vim中删除空白行?

A:

```
:g/^$/d
```

### Q:怎样查看linux上运行的是什么版本?

A:

```
$ cat /proc/version
```

### Q:怎样在Mysql中查看某个数据库里各个表的数据大小?

A:

```
SELECT table_name AS "Tables", 
round(((data_length + index_length) / 1024 / 1024), 2) "Size in MB" 
FROM information_schema.TABLES 
WHERE table_schema = "database_name"
ORDER BY (data_length + index_length) DESC;
```
### Q:在Mysql中怎样导出查询结果集到txt文件？

A:

```
SELECT  * FROM table WHERE id<100 INTO  OUTFILE '/tmp/table.txt'
```

### Q:怎样在Vim中删除匹配的行和删除不匹配的行?

A:

```
g/xxx/d 删除包含xxx的行
v/xxx/d 删除不含xxx的行
```

### Q:怎样在Vim中统计匹配的个数?

A:

```
:%s/xxx//gn n表示只报告匹配的个数，不进行实际替换
```

### Q:Linux中怎样查看文件夹大小?

A:

```
du -sh *
```

### Q:在Linux中怎样修改文件的所有者和所属组?

A:

```
chown user:group filename
```

### Q:在Linux中怎样查看文件大小?

A:

```
du -sh *
```

### Q:怎样在linux中添加软链接?

A:

```
ln -s /home/wywon/idea-IU-135.1306/bin/* /bin
```
### Q:在Linux上的eclipse导入windows下的eclipse项目出现乱码，怎么解决?

A:

eclipse->Window->Preferences->General->Content Types，右侧选择Java Source File，然后在下面的defaut encoding中写入gbk，update即可。

### Q:Debian的根目录满了怎么办?

A:

下载[GParted](http://gparted.org/liveusb.php)镜像，然后安装[Tuxboot](http://tuxboot.org/)。把镜像做成U盘启动盘。再从U盘启动，打开GParted进行分区调整。

### Q:怎样在Linux中查看大文件?

A:

```
find / -size +100M -exec ls -lh {} \;
```

### Q:怎样显示匹配行的前面几行和后面几行?

A:

```
grep -B 2 -A 2  text
```

### Q:在Vim中编辑的文本在记事本中不换行，怎么办?

A: 在Vim中设置文本格式

```
:set ff=dos
```

### Q:在Mysql中怎样统计某个字值取各个值的次数?

A:

```
SELECT DATE_FORMAT(regTime,"%Y-%m-%d"),SUM(CASE WHEN comeFrom=0 THEN 1 ELSE 0 END),SUM(CASE WHEN comeFrom=1 THEN 1 ELSE 0 END),SUM(CASE WHEN comeFrom=2 THEN 1 ELSE 0 END)  FROM t_user_detail  GROUP BY DATE_FORMAT(regTime,"%Y-%m-%d");
```

### Q:在Vim中怎样转换文本的大小写?

A:

```
Toggle case "HellO" to "hELLo" with `g~` then a movement.
Uppercase "HellO" to "HELLO" with `gU` then a movement.
Lowercase "HellO" to "hello" with `gu` then a movement.
```

### Q:怎样从本地拷贝文件夹到远程主机?

A:

```
scp -r -P22 redis-2.6.11 root@xx.xx.xx.xx:/opt/
```

### Q:如何建立目录软链接?

A:

```
[root@MyCloudServer tomcat]# pwd
/log/tomcat

[root@MyCloudServer log]# pwd
/home/log
[root@MyCloudServer log]# ll
total 8
drwxr-xr-x 2 root root 4096 Jun 12 14:50 tomcat-gameserver
drwxr-xr-x 2 root root 4096 Jun 12 14:50 tomcat-webserver

[root@MyServer bin]# ln -s /home/log/tomcat-gameserver /log/tomcat

[root@MyCloudServer tomcat]# pwd
/log/tomcat
[root@MyCloudServer tomcat]# ll
total 0
lrwxrwxrwx 1 root root 27 Jun 12 14:51 tomcat-gameserver -> /home/log/tomcat-gameserver
lrwxrwxrwx 1 root root 26 Jun 12 14:51 tomcat-webserver -> /home/log/tomcat-webserver
```

### Q:Redis的主从复制?

A:在从实例里配置`redis.conf`

```
slaveof <masterip> <masterport>
```

### Q:Nginx中怎样重定向根域名至带www的子域名?

A:在`nginx.conf`中的server段加入以下代码

```
if ($host = 'xxx.com' ) {
    rewrite ^/(.*)$  http://www.xxx.com/$1   permanent;
}
```

### Q:Nginx中出现http302时要注意什么?

A:在`nginx.conf`中检查是否做了端口代理。如

```
proxy_pass http://127.0.0.1:9001;
```

### Q:如何在VIM中自定义快捷输入?

A:

```
nnore ,[ a//---------------------- start ----------------------
inore ,[ //--------------------- start ------------------------
nnore ,] a//---------------------- end ----------------------
inore ,] //--------------------- end ------------------------
```

### Q:怎样grep二进制文件?

A:

```
grep -a
```

### Q:怎样查看linux上命令的使用频率?

A:

```
 history | awk '{CMD[$2]++;count++;} END { for (a in CMD )print CMD[ a ]" " CMD[ a ]/count*100 "% " a }' | grep -v "./" | column -c3 -s " " -t |sort -nr | nl | head -n10
```

### Q:Oracle中查询两个日期差的毫秒数?

A:

```
 select Round(TO_NUMBER(sysdate-LastAccessTime) * 24 * 60 * 60 * 1000) from userpoint where userid=1158321;
```

### Q:怎样在Vim中使用宏?

A:

```
 样本：101 aa.
 想要实现效果：101 aa.
               102 aa.
               103 aa.
               ...

 先输入样本行`101 aa.`
 退出到普通模式。输入`qa`开始录制宏。
 `yy`复制样本行。
 `p`粘贴到新的一行。
 `Ctrl A`数字加1。
 `q`退出宏。
 `15@a`操作15次。
```

### Q:Oracle中怎样同时插入3张表?

A:

```
 insert all 
 into usermsg(msgid,fromuserid,fromway,touserid,boxid,msgtype,status,flag,createtime,subject,msgiconid,msgdata) 
 values(usermsg_seq.nextval,0,2,userid,3,1,1,0,sysdate,'第n封邮件',2,'') 
 into usermsgparam(MsgID,MsgSubType,Response,ReferID1,ReferID2) 
 values(usermsg_seq.nextval,0,0,0,userid)
 into usermsgcontent(msgid,Content) 
 values(usermsg_seq.nextval,'这是一封邮件，是一封邮件。')
 select 1158321 as userid from dual;
```
