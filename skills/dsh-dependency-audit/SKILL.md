---
name: dsh-dependency-audit
description: 升级或审查项目依赖时使用：审计安全告警、控制安装脚本风险、制定升级回滚预案。
whenToUse: 依赖变更、出现安全告警、或安装第三方包之前。
---

# 依赖审计与升级

## 安装前的底线

- 安装依赖 = 运行第三方代码；`postinstall`/`prepare` 脚本尤其要读一遍
- 优先官方源/镜像：`npm_config_registry=https://registry.npmmirror.com`（国内网络）

## 审计

```bash
npm audit            # 或 pnpm audit
npm outdated         # 看哪些落后
```

- 锁文件必须提交（package-lock.json / pnpm-lock.yaml），保证可复现
- 审计告警分级处理：生产路径的高危项立即处理，开发依赖的低危项排期

## 升级流程

1. 读目标版本 CHANGELOG，确认破坏性变更
2. 升级 → 全量跑测试
3. 失败回滚：锁文件与依赖版本一起回退
4. 升级与功能改动分提交

## 减依赖

新增依赖前先问：标准库能否实现？能否延迟到真正需要时再引入？
