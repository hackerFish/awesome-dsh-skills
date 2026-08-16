---
name: dsh-changelog
description: 维护版本变更记录时使用：遵循 Keep a Changelog 约定，与语义化版本联动。
whenToUse: 发布新版本、合并用户可见改动、整理发布说明时。
---

# 维护 CHANGELOG

## 格式（Keep a Changelog）

```
## [未发布] - YYYY-MM-DD
### 新增
### 变更
### 修复
### 移除
### 安全
```

- 每个版本一段，倒序排列；条目写"对用户的影响"而非内部实现
- 每条尽量关联 PR/issue 编号
- 发布时把"未发布"改成版本号与日期

## 联动规则

- 版本号遵循语义化版本：破坏性变更升主版本，新功能升次版本，修复升补丁
- CHANGELOG 与 package.json 版本号、git tag 三者一致
- 与文档同步：CHANGELOG 里说的变化，README/文档必须一致
