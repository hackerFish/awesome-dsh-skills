---
name: dsh-debug-session
description: 排查 DSH 启动失败、插件不生效或会话异常时使用：按序收集信息、二分定位、备份回滚。
whenToUse: DSH 或插件表现异常、启动报错、插件装了没反应时。
---

# DSH 问题排查

## 先收集（一并写进求助帖）

- DSH 版本、node/pnpm 版本
- 插件清单（profile 的 package.json 依赖）
- 完整报错与日志、复现步骤

## 排查顺序

1. `dsh --profile web --dump-config`：确认插件层是否真的进入配置
2. 看启动日志：报错是否指向某个插件
3. 二分法：移除最近安装的插件 → 重启 → 确认是否恢复
4. 检查安装摩擦：pnpm 9 需 `--ignore-workspace-root-check`；大依赖树直连超时换 npmmirror；git 插件 prepare 需 allowBuilds 放行
5. 版本漂移：核对插件测试时的 DSH 版本与当前版本（参考 dsh-lab 报告）

## 备份与回滚

- 改配置前备份 `$DSH_HOME/profiles/<名字>/`（核心是 package.json 与 cordis.patch.yml）
- 出问题先恢复到备份状态，再逐项重放改动

## 求助

官方 GitHub Discussions 是明示关注的渠道；发帖附上前面的信息，描述"期望 vs 实际"。
