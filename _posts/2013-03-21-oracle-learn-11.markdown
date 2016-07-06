---
layout: post
title: "Oracle系列:[11]授权管理和创建表空间"
date: 2013-03-21 21:12
comments: true
categories: IT技术
---
### 权限管理
一般是通过角色对用户权限进行管理。创建角色并把用户分配到角色：

```
create role myrole;
grant myrole to username;
```

把权限赋给用户：

```
grant create session to username;
```

上面的意思是把`create session`权限赋给用户`username`。当采用下面的写法时：

```
grant create session to username with admin option;
```

表示把`create session`权限赋给用户`username`,并且用户`username`也拥有赋予`create session`权限给其他用户的权力。

<!-- more -->

- `with admin option`和`with grant option`

`with admin option`是系统授权，作用于跟系统相关的授权。`with grant option`是对象授权，作用于跟对象相关的授权。

假设有三个用户`huwewa`,`aa`和`bb`。`huwewa`用户下有一张表`books`。那么：

```
grant select on books to aa with grant option;
```

`huwewa`用户把查看`books`表的权限赋给用户`aa`。此时，用户`aa`可以通过

```
select * from huwewa.books;
```

查看表内容，而用户`bb`不可以。连接到`aa`用户，`aa`用户已经拥有把查看`huwewa`用户的`books`表内容的权限赋给其他用户的权力。

```
grant select on huwewa.books to bb;
```

### 表空间的创建
创建表空间：

```
create tablespace mytabs datafile 'c:\xxx.dbf' size 10m;
```

赋表空间的操作权限给用户：

```
grant unlimited tablespace,dba to username;
```

变更用户的默认表空间：

```
alter user username default tablespace mytabs;
```

这样这个用户所创建的表就会默认到所指定的表空间。当然创建表时也可以指定创建到哪个表空间：

```
create table mytable(id number) tablespace mytabs;
```

（完）
