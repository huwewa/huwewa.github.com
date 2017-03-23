---
layout: post
title: win7_64bit下部署yahoo开源的色情图片过滤网络open_nsfw
date: 2017-03-23 18:30:32
categories: IT技术
tags: 
---

[雅虎开源首个色情图像检测深度学习解决方案](http://www.yseeker.com/archives/14624.html)

## 下载

1. 雅虎的开源项目 [open_nsfw](https://github.com/yahoo/open_nsfw)
2. 64bit python2.7 安装包 [Windows x86-64 MSI installer](https://www.python.org/ftp/python/2.7.13/python-2.7.13.amd64.msi)
3. 编译好的Wiindows Caffe[Visual Studio 2015, CPU only, Python 2.7: Caffe Release](https://github.com/BVLC/caffe/tree/windows)

## 安装

1. 安装python2.7
2. 把`..\open_nsfw\caffe\python\*` 下所有内容拷贝到 python 根目录下 `\Python27\`
3. 双击运行 `..\open_nsfw\caffe\bin\caffe.exe` 看是否有缺失的 dll 文件，如果有缺失文件的话会有弹框出来告知是缺了哪个 dll . 自行找到这个 dll ,然后拷贝到 `C:\Windows\System32` 目录下。

## 试运行

运行命令

```
> python ./classify_nsfw.py --model_def nsfw_model/deploy.prototxt --pretrained_model nsfw_model/resnet_50_1by2_nsfw.caffemodel test.png
```

如果提示找不到某些模块的话，从 [这里](http://www.lfd.uci.edu/~gohlke/pythonlibs/)下载这些模块，注意有下载2.7版本并且是64位的模块。

下载完成后，使用 pip 进行安装：

```
> pip install xxx_amd64.whl
```

## 最后出击

当所有依赖都已经安装后，运行以下命令：

```
> python ./classify_nsfw.py --model_def nsfw_model/deploy.prototxt --pretrained_model nsfw_model/resnet_50_1by2_nsfw.caffemodel test.png
```

你可能得到这样一个错误

```
File "D:\work\Python27\lib\site-packages\PIL\Image.py", line 2274, in open
    % (filename if filename else fp))
IOError: cannot identify image file <StringIO.StringIO instance at 0x0000000021F
458C8>
```

此时，修改 `classify_nsfw.py` 文件中的第 104 行左右

修改前：

```
args = parser.parse_args()
image_data = open(args.input_file).read()
```

修改后：

```
args = parser.parse_args()
image_data = open(args.input_file,'rb').read() 
```

## 如无意外

如果一切顺利，此时你应该可以能运行这个命令：

```
> python ./classify_nsfw.py --model_def nsfw_model/deploy.prototxt --pretrained_model nsfw_model/resnet_50_1by2_nsfw.caffemodel test.png
```

并得到正确结果了：

```
D:\work\Python27\lib\site-packages\PIL\Image.py:860: UserWarning: Palette images
 with Transparency   expressed in bytes should be converted to RGBA images
  'to RGBA images')
NSFW score:   0.0012242263183
```

祝好！ :)


此次部署中我所下载的主要模块和软件

```
+ caffe/
+ numpy-1.11.2/
+ open_nsfw-master/
  caffe.zip
  ez_setup.py
  get-pip.py
  matplotlib-2.0.0-cp27-cp27m-win_amd64.whl
  numpy-1.11.2.zip
  numpy-1.12.1+mkl-cp27-cp27m-win_amd64.whl
  Pillow-2.6.1-py2.7-win-amd64.egg
  Pillow-2.7.0.win-amd64-py2.7.exe*
  protobuf-3.2.0-py2-none-any.whl
  python-2.7.13.amd64.msi
  readme.txt
  scikit_image-0.12.3-cp27-cp27m-win_amd64.whl
  scipy-0.19.0-cp27-cp27m-win_amd64.whl
  VCForPython27.msi
```


