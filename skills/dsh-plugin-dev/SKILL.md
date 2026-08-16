---
name: dsh-plugin-dev
description: 开发或调试 DeepSeek Harness 插件时使用：按已验证的结构编写 bundle、本地调试、发布与收录。
whenToUse: 写 DSH 插件、排查插件装载问题、准备发布插件时。
---

# DSH 插件开发（依据官方包验证过的结构）

## 最小形态

插件 = 一个 npm 包 + `dsh.bundle` 声明（字段取自官方 `@deepseek-ai/dsh-base` 的真实清单）：

```jsonc
// package.json（节选）
{
  "name": "my-dsh-plugin",
  "version": "0.1.0",
  "main": "lib/index.js",
  "dsh": { "bundle": { "patch": "./cordis.patch.yml" } }
}
```

`cordis.patch.yml` 是往 profile 配置栈插入的行列表（结构取自官方 base 清单）：

```yaml
- insert:
    - id: my-plugin
      name: 'my-dsh-plugin'
      config: {}
```

规则：行按 `id` 定位，**后写覆盖先写，且整行替换 `config` 而非合并**；行顺序不代表加载顺序。

## 调试循环

```bash
dsh plugin --profile web add /path/to/my-dsh-plugin --ignore-workspace-root-check
dsh --profile web --dump-config     # 确认你的行进入配置
```

- 隔离测试：把 `DSH_HOME` 指向临时目录，不污染真实环境
- 干净安装必须成功；改代码后重新 add 再验
- 冒烟：`dsh --profile headless "最小任务"` 确认不崩（需模型凭据）

## 发布与收录

1. `npm publish`（确保 `files` 包含 `cordis.patch.yml` 与构建产物）
2. GitHub 仓库打 `dsh-plugin` topic
3. README 写明开发/测试时的 DSH 版本（rc 期 API 在变）
4. 向社区目录提收录 PR，描述自己写

## 注意

- 依赖能省则省；避免 `postinstall`/`prepare` 脚本（会让用户安装变复杂）
- 官方当前不接受外部 PR，生态贡献以插件与内容为主
