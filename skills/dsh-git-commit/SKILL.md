---
name: dsh-git-commit
description: 提交代码时使用：按约定式提交写 commit message，并在提交前做最小自检。
whenToUse: 准备 git commit、提交信息不规范、需要整理提交历史时。
---

# 规范化 Git 提交

## 提交格式（约定式提交）

```
<type>(<scope>): <subject>
```

- type：feat（新功能）、fix（修复）、docs（文档）、chore（杂务）、refactor（重构）、test（测试）、perf（性能）
- subject：祈使句，≤ 50 字符，写"动机/效果"而不是"做了什么动作"
- 需要更多上下文时，空一行后写 body：为什么改、影响范围、验证方式

## 提交前最小自检（逐条确认）

1. `git diff --cached` 通读一遍，确认没有混入无关改动
2. 无密钥/令牌/密码：`git diff --cached | grep -iE "token|secret|password|api[_-]?key"` 无意外命中
3. 无大文件、临时文件、构建产物：`.log`、`node_modules`、`dist`、`.DS_Store` 不进库
4. 每个提交只做一件事：功能与格式化分两次提交
5. 测试通过后才提交；被测试覆盖的修复在 subject 里写清复现路径

## 小步提交

- 一次提交对应一个可回滚的逻辑单元
- 先提交能让项目处于"可用状态"的最小改动，再叠加
- 与 issue 关联：`fix: ... (#42)`
