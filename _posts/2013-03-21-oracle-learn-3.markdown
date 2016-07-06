---
layout: post
title: "Oracle系列:[3]SQL基本知识"
date: 2013-03-21 20:51
comments: true
categories: IT技术
---
### 结构化查询语言(SQL)
- 数据定义语言(DDL)
- 数据控制语言(DCL)
- 数据操纵语言(DML)

### DDL
- create

```
create table aa(no number(5) not null,name varchar2(30) not null);
```

- alter

```
alter table aa rename column no to id;
```

<!-- more -->

- drop

```
drop table aa;
```

### DCL
- grant

新建用户后，授权登录权限

```
grant create session to username;
```

如果huwewa用户有一张表mm,现在需要把这张表的select权限授予aa用户。则

```
grant select on mm to aa;
```

aa用户查询mm表时

```
select * from huwewa.mm;
```

- revoke

从aa用户手中把mm表的select权限收回。

```
revoke select on mm from aa;
```

收回权限后，aa用户不能再查询mm表。

### DML
- insert

```
insert into mm(no) values(1);
```

- select

```
select * from mm;
```

- update

```
update mm set no=3 where no=1;
```

- delete

```
delete from mm where no=3;
```

### Oracle常用函数
- length

```
select length('abc') from dual;
```

- ltrim

去除左边空格

```
select ltrim('   abc') from dual;
```

- rtrim

去除右边空格

```
select rtrim('abc   ') from dual;
```

- trim

去除左右两边空格

```
select trim('   abc   ') from dual;
```

- substr

取子字符串。如从abcdefg中从第一个开始取，取两个，则为ab.

```
select substr('abcdefg',1,2) from dual;
```

- sysdate

```
select sysdate from dual;
```

- current_date

```
select current_date from dual;
```

- to_char

```
select to_char(sysdate,'yyyy-mm-dd') from dual;
```

- to_date

```
select to_date('5-3月-13') from dual;
```

- sum

```
select sum(no) s from mm;
```

- avg

```
select avg(no) a from mm;
```

- max

```
select max(no) m from mm;
```

- min

```
select min(no) m from mm;
```

- count

```
select count(no) c from mm;
```

- user

查看当前用户

```
select user from dual;
```

- decode

```
select decode(dname,'it',1,0) from dept;
```

查询dept表中的dname字段，如果值为it,则显示为1，否则显示为0。可配合sum使用。

```
select sum(decode(dname,'it',1,0)) from dept;
```

- nvl

```
select nvl(dname,'no input') from dept;
```

如果dname字段为null，则以no input代替。

- 空值的查询

```
select * from dept where dname is null;
select * from dept where dname is not null;
```

- order by

```
select * from dept order by eptno asc;
select * from dept order by eptno desc;
```

- distinct

```
select distinct dname from dept;
```

dname列中重复的只显示一行。

（完）
