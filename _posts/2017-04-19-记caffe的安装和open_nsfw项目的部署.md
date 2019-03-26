---
layout: post
title: 记caffe的安装和open_nsfw项目的部署
date: 2017-04-19 15:06:46
categories: 
tags: IT技术
---


# open_nsfw_web 安装文档

## caffe的python环境安装前准备

### 所需文件列表

<blockquote>
{% highlight shell %}
~ require_softwear/
    Anaconda2-4.3.1-Linux-x86_64.sh
    boost_1_63_0.tar.gz
    caffe-master.zip
    gflags-2.1.2.tar.gz
    glog-0.3.4.tar.gz
    lmdb-LMDB_0.9.18.tar.gz
    open_nsfw_web.zip
    opencv.tar.gz
    protobuf-cpp-3.1.0.tar.gz
    Python-2.7.8.tar.xz
    setuptools-1.4.2.tar.gz
{% endhighlight %}
</blockquote>

### 查看系统版本


> [root@host132 ~]# cat /proc/version 
> Linux version 2.6.32-504.12.2.el6.x86_64 (mockbuild@c6b9.bsys.dev.centos.org) (gcc version 4.4.7 20120313 (Red Hat 4.4.7-11) (GCC) ) #1 SMP Wed Mar 11 22:03:14 UTC 2015


### 版本要求

- OpenCV >= 2.4 including 3.0
- Python >= 2.7
- Boost >= 1.55

### 安装前准备

将`require_softwear`目录下的所有文件放到`/opt`目录下面

## caffe的python环境安装

### 安装Python2.7

1 进入`/opt`目录，解压`Python-2.7.8.tar.xz`

> [root@host132 ~]# tar -xvf Python-2.7.8.tar.xz

如果出现下面信息：

{% highlight shell %}
[root@host132 opt]# tar -xvf Python-2.7.8.tar.xz 
tar (child): xz：无法 exec: 没有那个文件或目录
tar (child): Error is not recoverable: exiting now
tar: Child returned status 2
tar: Error is not recoverable: exiting now
{% endhighlight %}

说明需要安装 `xz`，安装 `xz` ：

> [root@host132 opt]# yum install xz

然后执行以下命令安装`Python-2.7.8`

> [root@host132 opt]# tar -xvf Python-2.7.8.tar.xz
> [root@host132 opt]# cd Python-2.7.8
> [root@host132 Python-2.7.8]# ./configure --prefix=/usr/local/Python2.7 --enable-shared cFLAGS=-fPIC
> [root@host132 Python-2.7.8]# make
> [root@host132 Python-2.7.8]# make install

安装完成后，查看当前的`python`

> [root@host132 Python-2.7.8]# python
> Python 2.6.6 (r266:84292, Jan 22 2014, 09:42:36) 
> [GCC 4.4.7 20120313 (Red Hat 4.4.7-4)] on linux2
> Type "help", "copyright", "credits" or "license" for more information.
> \>>> 

发现指现的依然是旧版本(`Python2.6.6版本`)，建立新版本的软链接：

> [root@host132 ~]# ln -s /usr/local/Python2.7/bin/python2.7 /usr/bin/python
> ln: 创建符号链接 "/usr/bin/python": 文件已存在

发现链接已存在，当然是旧版本的啦。这时`mv`掉`/usr/bin/python`:

> [root@host132 ~]# mv /usr/bin/python /tmp
> [root@host132 ~]# ln -s /usr/local/Python2.7/bin/python2.7 /usr/bin/python

此时再查看一下`python`，发现：

> [root@host132 ~]# python
> python: error while loading shared libraries: libpython2.7.so.1.0: cannot open shared object file: No such file or directory

这是因为编译`Python`时加了`--enable-shared `，此时在`/etc/ld.so.conf`中加入`/usr/local/Python2.7/lib`

> [root@host132 ~]# vim /etc/ld.so.conf

```
include ld.so.conf.d/*.conf
/usr/local/Python2.7/lib
```

然后执行以下命令：

> [root@host132 ~]# /sbin/ldconfig 

这时再查看`python`，发现是新版本了：

> [root@host132 ~]# python
> Python 2.7.8 (default, Apr 18 2017, 17:09:58) 
> [GCC 4.4.7 20120313 (Red Hat 4.4.7-11)] on linux2
> Type "help", "copyright", "credits" or "license" for more information.
> \>>> 

### 修复`yum`

这个时候运行`yum`，会得到如下信息：

> [root@host132 ~]# yum
> There was a problem importing one of the Python modules
> required to run yum. The error leading to this problem was:
> 
>    No module named yum
> 
> Please install a package which provides this module, or
> verify that the module is installed correctly.
> 
> It's possible that the above module doesn't match the
> current version of Python, which is:
> 2.7.8 (default, Apr 18 2017, 17:09:58) 
> [GCC 4.4.7 20120313 (Red Hat 4.4.7-11)]
> 
> If you cannot solve this problem yourself, please go to 
> the yum faq at:
>   http://yum.baseurl.org/wiki/Faq

这是因为`yum`与`python2.7`不兼容的缘故，此时需设置`yum`继续使用`python2.6`：

> [root@host132 ~]# which yum
> /usr/bin/yum
> [root@host132 ~]# vim /usr/bin/yum

把第一行的

```
#!/usr/bin/python
```

修改为

```
#!/usr/bin/python2.6
```

###  安装`pip`

> [root@host132 python]# curl  https://bootstrap.pypa.io/get-pip.py | python -

`pip`安装后路径为`/usr/local/Python2.7/bin/pip`

把

```
export PATH="/usr/local/Python2.7/bin:$PATH"
```

添加到`/etc/profile`文件的最后一行，然后使环境变量生效：

> [root@host132 python]# source /etc/profile

### 安装`Anaconda`

> [root@host132 ~]# cd /opt
> [root@host132 ~]# bash Anaconda2-4.3.1-Linux-x86_64.sh

一路按回车默认安装，默认安装路径为`/root/anaconda2`


在`/etc/ld.so.conf`中加入`/root/anaconda2/lib`

> [root@host132 ~]# vim /etc/ld.so.conf

```
include ld.so.conf.d/*.conf
/usr/local/Python2.7/lib
/root/anaconda2/lib
```

然后执行以下命令：

> [root@host132 ~]# /sbin/ldconfig 


### 安装`ATLAS `

> [root@host132 opt]# yum install atlas-devel

### 安装`glog`

> [root@host132 opt]# tar -xvf glog-0.3.4.tar.gz 
> [root@host132 opt]# cd glog-0.3.4
> [root@host132 glog-0.3.4]# ./configure
> [root@host132 glog-0.3.4]# make && make install

### 安装`cmake`

> [root@host132 build]# yum install cmake


### 安装`gflags`

> [root@host132 opt]# tar -xvf gflags-2.1.2.tar.gz 
> [root@host132 opt]# cd gflags-2.1.2
> [root@host132 gflags-2.1.2]# mkdir build && cd build
> [root@host132 build]# export CXXFLAGS="-fPIC" && cmake .. && make VERBOSE=1
> [root@host132 build]# make && make install


### 安装`lmdb`

> [root@host132 opt]# tar -xvf lmdb-LMDB_0.9.18.tar.gz 
> [root@host132 opt]# cd lmdb-LMDB_0.9.18/libraries/liblmdb
> [root@host132 liblmdb]# make && make install

### 安装`opencv2`

> [root@host132 opt]# tar -xvf opencv.tar.gz 
> [root@host132 opt]# cd opencv
> [root@host132 opencv]# mkdir release && cd release
> [root@host132 release]# cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local ..
> [root@host132 release]# make
> [root@host132 release]# make install

### 安装`boost`

> [root@host132 opt]# tar -xvf boost_1_63_0.tar.gz 
> [root@host132 opt]# cd boost_1_63_0
> [root@host132 boost_1_63_0]# ./bootstrap.sh --prefix=/usr/local
> [root@host132 boost_1_63_0]# ./b2
> [root@host132 boost_1_63_0]# ./b2 install 

### 安装`protobuf`

> [root@host132 opt]# tar -xvf protobuf-cpp-3.1.0.tar.gz 
> [root@host132 opt]# cd protobuf-3.1.0/
> [root@host132 protobuf-3.1.0]# yum install autoconf automake libtool curl make g++ unzip
> [root@host132 protobuf-3.1.0]# ./autogen.sh
> [root@host132 protobuf-3.1.0]# ./configure
> [root@host132 protobuf-3.1.0]# make
> [root@host132 protobuf-3.1.0]# make check
> [root@host132 protobuf-3.1.0]# make install
> [root@host132 protobuf-3.1.0]# ldconfig 


### 安装`hdf5`

> [root@host132 caffe-master]# yum install hdf5-devel

### 安装`epel-release`

> [root@host132 caffe-master]# yum install epel-release


### 安装`leveldb-devel`

> [root@host132 caffe-master]# yum install leveldb-devel


### 安装`snappy-devel`

> [root@host132 caffe-master]# yum install snappy-devel

### 安装`caffe`

> [root@host132 opt]# unzip caffe-master.zip

如果没有`unzip`，先安装`unzip`：

> [root@host132 opt]# yum install unzip

然后再

> [root@host132 opt]# unzip caffe-master.zip
> [root@host132 opt]# cd caffe-master
> [root@host132 caffe-master]# cp Makefile.config.example Makefile.config

修改`Makefile.config`配置文件

> [root@host132 caffe-master]# vim Makefile.config

把

```
# CPU_ONLY := 1
```

注释去掉，修改后为

```
CPU_ONLY := 1
```

把

```
# BLAS_INCLUDE := /path/to/your/blas
# BLAS_LIB := /path/to/your/blas
```

注释去掉，并修改为

```
BLAS_INCLUDE := /usr/include
BLAS_LIB := /usr/lib64/atlas
```

把

```
# ANACONDA_HOME := $(HOME)/anaconda
# PYTHON_INCLUDE := $(ANACONDA_HOME)/include \
                # $(ANACONDA_HOME)/include/python2.7 \
                # $(ANACONDA_HOME)/lib/python2.7/site-packages/numpy/core/include
```

注释去掉，并把`anaconda`改为`anaconda2`,修改后为

```
ANACONDA_HOME := $(HOME)/anaconda2
PYTHON_INCLUDE := $(ANACONDA_HOME)/include \
                $(ANACONDA_HOME)/include/python2.7 \
                $(ANACONDA_HOME)/lib/python2.7/site-packages/numpy/core/include
```

开始编译：

> [root@host132 caffe-master]# make all
> [root@host132 caffe-master]# make test
> [root@host132 caffe-master]# make runtest

此时提示：

> [root@host132 caffe-master]# make runtest
> .build_release/tools/caffe
> .build_release/tools/caffe: error while loading shared libraries: libglog.so.0: cannot open shared object file: No such file or directory
> make: *** [runtest] 错误 127

找到`libglog.so.0`文件的位置

> [root@host132 caffe-master]# find / -name libglog.so.0
> /opt/glog-0.3.4/.libs/libglog.so.0
> /usr/local/lib/libglog.so.0

把

```
/usr/local/lib
```

加入到`/etc/ld.so.conf`文件中

文件`/etc/ld.so.conf`修改前为：

```
include ld.so.conf.d/*.conf
/usr/local/Python2.7/lib
```

修改后为：

```
include ld.so.conf.d/*.conf
/usr/local/Python2.7/lib
/usr/local/lib
```

然后执行以下命令：

> [root@host132 caffe-master]# /sbin/ldconfig 

继续执行下面命令编译`caffe`

> [root@host132 caffe-master]# make runtest


### 安装`caffe`的`pycaffe`接口模块

> [root@host132 caffe-master]# cd python
> [root@host132 python]# for req in $(cat requirements.txt); do pip install $req; done

如果出现以下信息

```
...
...
/usr/bin/ld: cannot find -lpython2.7
collect2: ld 返回 1
error: command 'g++' failed with exit status 1
...
...
```

则执行

> [root@host132 python]# ln -s /usr/local/Python2.7/lib/python2.7/config/libpython2.7.a /usr/local/lib/
> [root@host132 python]# for req in $(cat requirements.txt); do pip install $req; done




> [root@host132 caffe-master]# make pycaffe

完成后测试`caffe`模块

> [root@host132 caffe-master]# python
> Python 2.7.8 (default, Apr 18 2017, 17:09:58) 
> [GCC 4.4.7 20120313 (Red Hat 4.4.7-11)] on linux2
> Type "help", "copyright", "credits" or "license" for more information.
> \>>> import caffe
> Traceback (most recent call last):
>   File "<stdin>", line 1, in <module>
> ImportError: No module named caffe
> \>>> 

提示没有`caffe`模块，是因为没有把`caffe`模块加入到环境变量。

把`caffe`模块的路径添加到当前用用的环境变量`~/.bash_profile`文件里面

把

```
export PYTHONPATH=/opt/caffe-master/python:$PYTHONPATH
```
添加到`~/.bash_profile`文件的最后一行。

使环境变量生效

> [root@host132 caffe-master]# source ~/.bash_profile 

再次测试caffe的python模块是否已安装成功

> [root@host132 python]# python
> Python 2.7.8 (default, Apr 18 2017, 17:09:58) 
> [GCC 4.4.7 20120313 (Red Hat 4.4.7-11)] on linux2
> Type "help", "copyright", "credits" or "license" for more information.
> \>>> import caffe
> \>>> 

信息提示已安装成功。

至此，caffe的python环境安装工作已结束。


## `open_nsfw`web程序的安装

> [root@host132 opt]# cd /opt/
> [root@host132 opt]# unzip open_nsfw_web.zip
> [root@host132 open_nsfw_web]# pip install -r requirements.txt

启动web服务

> [root@host132 open_nsfw_web]# python app.py &


测试web服务

> [root@host132 ~]# curl http://127.0.0.1:5000/classify?imageurl=test_data/1.jpg

返回

```
{
  "imageurl": "test_data/1.jpg", 
  "result": true, 
  "score": "0.788449168205", 
  "times": "0.368"
}
```

说明web服务已启动成功。


## web服务接口说明

1. 

```
http://xx.xx.xx.xx:5000?classify?imageurl=图片路径
```

正确时返回格式为：
```
{
	"imageurl": "test_data/1.jpg", 
	"result": true, 
	"score": "0.788449168205", 
	"times": "0.363"
}
```
	
错误时返回格式为：

```
{
	"err": "check image path and only support png,bmp,jpg,jpe,jpeg,gif format.", 
	"imageurl": "test_data/21.jpg", 
	"result": false
}	
```

2.

```
http://xx.xx.xx.xx:5000
```
********
## 参考链接

[http://caffe.berkeleyvision.org/installation.html](http://caffe.berkeleyvision.org/installation.html)

[http://caffe.berkeleyvision.org/install_yum.html](http://caffe.berkeleyvision.org/install_yum.html)