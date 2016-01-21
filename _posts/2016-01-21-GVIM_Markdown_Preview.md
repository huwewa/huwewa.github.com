---
layout: post
title: GVIM中Markdown实时预览的解决方案
date: 2016-01-21 11:03:30
categories: IT技术
tags:
---

- 安装[Markdown Preview Plus](https://github.com/volca/markdown-preview) Chrome扩展。

- 安装后勾选`允许访问文件网址` ![]({{site.url}}/assets/20160121/markdown_preview.png)

- 在`.vimrc`中设置预览快捷键
    
    autocmd BufRead,BufNewFile *.{md,mdown,mkd,mkdn,markdown,mdwn} map <Leader>p :!start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "%:p"<CR>

- 在vim中编辑markdown文件，保存后按下`<Leader>p`即可在Chrome中实时预览。
