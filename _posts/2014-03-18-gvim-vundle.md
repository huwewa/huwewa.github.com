---
layout: post
title: 如何在gVim中使用vundle管理插件
date: 2014-03-18 22:48:23
categories: IT技术
tags:
---
###安装gVim###
我的安装目录是`D:\Vim`。安装完成后设置两个环境变量`VIM`和`VIMRUNTIME`。其中`VIM`的值是`D:\Vim`，`VIMRUNTIME`的值是`D:\Vim\vim74`。

<!-- more -->

###安装Git###
我的安装目录是`D:\Git`。安装后在环境变量`Path`中添加`D:\Git\cmd`，设置后在cmd中`git --version`查看是否安装成功。

###配置curl脚本###
在`D:\Git\cmd`目录中新建名为`curl.cmd`的文件。内容如下：
```
@rem Do not use "echo off" to not affect any child calls.
@setlocal

@rem Get the abolute path to the parent directory, which is assumed to be the
@rem Git installation root.
@for /F "delims=" %%I in ("%~dp0..") do @set git_install_root=%%~fI
@set PATH=%git_install_root%\bin;%git_install_root%\mingw\bin;%PATH%

@if not exist "%HOME%" @set HOME=%HOMEDRIVE%%HOMEPATH%
@if not exist "%HOME%" @set HOME=%USERPROFILE%

@curl.exe %*
```

在`cmd`中`curl --version`查看curl是否配置成功。

我的插件配置文件`bundles.vim`和vim配置文件`_vimrc`。

`bundles.vim`

```
set nocompatible               " be iMproved
filetype off                   " required!

" 此处规定Vundle的路径  
set rtp+=$VIM/vimfiles/bundle/vundle/
call vundle#rc('$VIM/vimfiles/bundle/')

" let Vundle manage Vundle
" required!
Bundle 'gmarik/vundle'

" My bundles here:
"
" original repos on GitHub
  Bundle 'winmanager'
  Bundle 'bufexplorer.zip'
  Bundle 'Tabular'
  Bundle 'AutoClose'
  Bundle 'The-NERD-tree'
  Bundle 'commentary.vim'
  Bundle 'ctrlp.vim'
  Bundle 'rainbow_parentheses.vim'
  Bundle 'IndexedSearch'
  Bundle 'bling/vim-airline'
  Bundle 'mattn/calendar-vim'
  Bundle 'terryma/vim-expand-region'
" Bundle 'tpope/vim-rails.git'
" vim-scripts repos
" Bundle 'L9'
" non-GitHub repos
" Bundle 'git://git.wincent.com/command-t.git'
" Git repos on your local machine (i.e. when working on your own plugin)
" Bundle 'file:///Users/gmarik/path/to/plugin'
" ...

filetype plugin indent on     " required!
"
" Brief help
" :BundleList          - list configured bundles
" :BundleInstall(!)    - install (update) bundles
" :BundleSearch(!) foo - search (or refresh cache first) for foo
" :BundleClean(!)      - confirm (or auto-approve) removal of unused bundles
"
" see :h vundle for more details or wiki for FAQ
" NOTE: comments after Bundle commands are not allowed.

filetype plugin indent on     " required!

```

`_vimrc`

```
"去掉边框
set go=

set nocompatible
source $VIM/bundles.vim
source $VIMRUNTIME/vimrc_example.vim
source $VIMRUNTIME/mswin.vim
behave xterm

set diffexpr=MyDiff()
function MyDiff()
  let opt = '-a --binary '
  if &diffopt =~ 'icase' | let opt = opt . '-i ' | endif
  if &diffopt =~ 'iwhite' | let opt = opt . '-b ' | endif
  let arg1 = v:fname_in
  if arg1 =~ ' ' | let arg1 = '"' . arg1 . '"' | endif
  let arg2 = v:fname_new
  if arg2 =~ ' ' | let arg2 = '"' . arg2 . '"' | endif
  let arg3 = v:fname_out
  if arg3 =~ ' ' | let arg3 = '"' . arg3 . '"' | endif
  let eq = ''
  if $VIMRUNTIME =~ ' '
    if &sh =~ '\<cmd'
      let cmd = '""' . $VIMRUNTIME . '\diff"'
      let eq = '"'
    else
      let cmd = substitute($VIMRUNTIME, ' ', '" ', '') . '\diff"'
    endif
  else
    let cmd = $VIMRUNTIME . '\diff'
  endif
  silent execute '!' . cmd . ' ' . opt . arg1 . ' ' . arg2 . ' > ' . arg3 . eq
endfunction

:colo evening
if has("win32")
    set guifont=YaHei\ Consolas\ Hybrid:h15
else
    set guifont=Monaco:h14    
endif

set nu
syntax on
:filetype plugin on

:inoremap    <A-a>  <ESC>:Allpn<CR>
map          <A-a>  :Allpn<CR>
:inoremap    <A-c>  <ESC>:Allcom<CR>
map          <A-c>  :Allcom<CR>
:inoremap    <A-z>  <ESC>:Aheader<CR>
map          <A-z>  :Aheader<CR>
:inoremap    <A-l>  <ESC>:Acontent<CR>
map          <A-l>  :Acontent<CR>

"clean last search highlighting or use nnoremap <esc> :noh<return><esc>
nnoremap <ESC> :let @/ = ""<ESC>

"设置编码
set fileencodings=utf-8,gb18030
"设置新建文件的编码格式
set fileencoding=utf-8

"设置最大标签数
set tabpagemax=20

"状态栏显示命令
set showcmd

"winmanager浏览器类型,ctrl+n切换
let g:winManagerWindowLayout = "FileExplorer,BufExplorer"

"映射winmanager快捷键
"按F8打开winmanager列表
nmap <silent> <F8> :WMToggle<cr>   
"按F5刷新winmanager列表
nmap <F11> :wa<cr>:TlistUpdate<cr>:TlistUpdate<cr><F5><c-w>b

"设置打开文件的路径为当前工作路径
set autochdir

" 开始折叠
"set foldenable
"设置语法折叠
"set foldmethod=indent                
"设置折叠区域的宽度
"set foldcolumn=0           
"设置折叠层数为
"setlocal foldlevel=3      
"设置为自动关闭折叠
"set foldclose=all   
"设置空格打开或关闭折叠                                 
"nnoremap <space> @=((foldclosed(line('.')) < 0) ? 'zc' : 'zo')<CR>      

"设置移动行
"Normal 模式下<C-j> <C-k>移动当前行到下1行或上1行
"Visual模式下<C-j> <C-k>移动当前选中的多行到下1行或上1行
nnoremap <C-k>  mz:m-2<cr>`z==
nnoremap <C-j>  mz:m+<cr>`z==
xnoremap <C-k>  :m'<-2<cr>gv=gv
xnoremap <C-j>  :m'>+<cr>gv=gv

"设置自动缩进
"tab == 4 space
set autoindent
set tabstop=4
set shiftwidth=4
set expandtab

"高亮当前行或列
set cursorline
"set cursorcolumn

"设置不产生swap文件
set noswapfile

"设置不自动备份
set nobackup
"设置鼠标选中后为可视模式，只有在behave mswin时才这样设置
"set selectmode-=mouse

"默认工作空间
cd E:\vimfiles

"F5编译
map <F5> :call CompileRunGcc()<CR>
func! CompileRunGcc()
    exec "w"
    if &filetype == 'c'
        exec "!g++ % -o %<"
        exec "! %<"
    elseif &filetype == 'cpp'
        exec "!g++ % -o %<"
        exec "! %<"
    elseif &filetype == 'java' 
        exec "!javac %" 
        exec "!java %<"
    elseif &filetype == 'sh'
        :!%
    endif
endfunc

" NERDTree plugin
map <F3> :NERDTreeToggle<CR>

" rainbow_parentheses.vim
let g:rbpt_colorpairs = [
    \ ['brown',       'RoyalBlue3'],
    \ ['Darkblue',    'SeaGreen3'],
    \ ['darkgray',    'DarkOrchid3'],
    \ ['darkgreen',   'firebrick3'],
    \ ['darkcyan',    'RoyalBlue3'],
    \ ['darkred',     'SeaGreen3'],
    \ ['darkmagenta', 'DarkOrchid3'],
    \ ['brown',       'firebrick3'],
    \ ['gray',        'RoyalBlue3'],
    \ ['black',       'SeaGreen3'],
    \ ['darkmagenta', 'DarkOrchid3'],
    \ ['Darkblue',    'firebrick3'],
    \ ['darkgreen',   'RoyalBlue3'],
    \ ['darkcyan',    'SeaGreen3'],
    \ ['darkred',     'DarkOrchid3'],
    \ ['red',         'firebrick3'],
    \ ]
let g:rbpt_max = 16
let g:rbpt_loadcmd_toggle = 0
au VimEnter * RainbowParenthesesToggle
au Syntax * RainbowParenthesesLoadRound
au Syntax * RainbowParenthesesLoadSquare
au Syntax * RainbowParenthesesLoadBraces

"markdown preview see ref https://github.com/huwewa/huwewa.github.com/issues/1
:nnoremap <F2> :!cmd /c d:\Python27\python d:\Python27\Scripts\markdown_py %:t -e utf-8 > %:r.html<CR>
:nnoremap \e :!cmd /c start ./%:r.html<CR>

" calendar-vim
"let g:calendar_diary = "D:/Vim/workspace/diary"  " 设置日记的存储路径
let g:calendar_mark = 'left-fit' "可以让*和数字可靠近
map <F12> :Calendar<cr>

"插入时间
map ,dt a<C-R>=strftime('%Y-%m-%d %H:%M:%S')<CR>

"当打开单个文件时也显示airline
set laststatus=2

" --------------------------------------------------------------
```

（完）
