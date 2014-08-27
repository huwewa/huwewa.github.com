---
layout: post
title: "Oracle系列:[12]表的管理与索引"
date: 2013-03-21 21:15
comments: true
categories: IT技术
---
###表的管理###
完整性与约束：
如新建了一个表，如下：
```
create table mytable(id number,name varchar2(20),eid number);
```

- 实体完整性

通过唯一主键实现：
```
alter table mytable add constraint pk_id primary key (id);
```
- 域完整性

域完整性也就是说一个表的某字段如果定义为`varchar2`类型，那么这个字段就不能插入其他类型的数据。

<!-- more -->

- 参照完整性

通过外键来约束。比如有另外一张表：
```
create table myreftable(eid number,name varchar2(20));
alter table myreftable add constraint pk_eid primary key (eid);
```
表`mytable`中外键约束`eid`字段：
```
alter table mytable add constraint fk_eid foreign key (eid) references myreftable(eid);
```
删除外键约束：
```
alter table mytable drop constraint fk_eid;
```

- check约束
```
alter table mytable add constraint ck_name check (name='f' or name='m');
```
这样就限制了`name`字段只能输入`f`或`m`。

###索引的管理###
当一张表中建立唯一主键时会在这个键上自动建立一个索引。也可以手动在其他字段上建立索引：
```
create index eid_index on mytable(eid);
```
当某列上重复值少时可以建立位图索引：
```
create bitmap index sex_index on mytable(sex);
```

（完）
