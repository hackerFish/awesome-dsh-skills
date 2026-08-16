# 🐋 awesome-dsh-skills — DSH 技能库

**实测可用的 DeepSeek Harness 技能（skills）精选库：每个 `SKILL.md` 都通过格式校验与加载冒烟，复制即用。**

> 与 [dsh-lab](https://github.com/hackerFish/dsh-lab)（插件实测实验室）共用同一套标准：**先验证，再发布**。dsh-lab 回答"这个插件能不能装、代码里有什么"，本库回答"模型按什么流程干得更好"。

## 什么是 DSH 技能

DSH 会扫描技能目录，把 `SKILL.md` 注册进模型可见的技能目录（catalog），模型按需加载正文作为指令。规则（对照官方 `@deepseek-ai/dsh-skill-filesystem` 的实现）：

- **位置**：`<目录>/<name>/SKILL.md` 或扁平 `<name>.md`，**只发现一层**；
- **frontmatter 必填**：`name`（kebab-case）与 `description`；可选：`whenToUse`、`metadata`、`disable-model-invocation`、`user-invocable`；
- **默认根目录**（按优先级）：项目 `.dsh/skills`、项目 `.agents/skills`、用户 `~/.dsh/skills`、`~/.agents/skills`。

## 安装

```bash
git clone https://github.com/hackerFish/awesome-dsh-skills ~/dsh-skills
mkdir -p ~/.dsh/skills
cp -r ~/dsh-skills/skills/* ~/.dsh/skills/     # 全部
# 或只复制你需要的单个技能目录，例如：
# cp -r ~/dsh-skills/skills/dsh-git-commit ~/.dsh/skills/
```

新会话创建时生效（技能目录在启动时被扫描，运行中也会被 watch 跟踪）。

## 质量保证（禁得起推敲）

每个技能入库前必须通过两道关：

1. **格式校验**：`node tools/validate-skills.mjs` 全绿——name 规则、frontmatter 字段白名单、布尔字段取值、单层结构，逐条对照官方实现规则。
2. **加载冒烟**：在隔离的 `DSH_HOME` 中放入技能并启动 `dsh --profile web --dump-config`，确认启动干净。

**内容红线**：只写验证过的事实；涉及 DSH 的命令与结构以官方包为准；不收录未经检验的"魔法提示词"。

## 技能清单

| 技能 | 用途 |
|---|---|
| [dsh-git-commit](skills/dsh-git-commit/SKILL.md) | 约定式提交 + 提交前最小自检 |
| [dsh-code-review](skills/dsh-code-review/SKILL.md) | 六维结构化代码审查 |
| [dsh-test-first](skills/dsh-test-first/SKILL.md) | 先写失败测试，再最小实现 |
| [dsh-doc-sync](skills/dsh-doc-sync/SKILL.md) | 改动后同步文档与版本号 |
| [dsh-plugin-dev](skills/dsh-plugin-dev/SKILL.md) | 按已验证结构开发/调试 DSH 插件 |
| [dsh-dependency-audit](skills/dsh-dependency-audit/SKILL.md) | 依赖审计与升级回滚预案 |
| [dsh-refactor-safe](skills/dsh-refactor-safe/SKILL.md) | 先立测试基线，小步安全重构 |
| [dsh-debug-session](skills/dsh-debug-session/SKILL.md) | DSH 启动/插件异常排查流程 |
| [dsh-changelog](skills/dsh-changelog/SKILL.md) | Keep a Changelog 变更记录 |
| [dsh-chinese-docs](skills/dsh-chinese-docs/SKILL.md) | 中文技术文档写作规范 |
| [dsh-pr-review](skills/dsh-pr-review/SKILL.md) | PR 审查清单与结构化反馈 |
| [dsh-task-breakdown](skills/dsh-task-breakdown/SKILL.md) | 复杂任务拆解与验收标准 |

## 贡献

见 [CONTRIBUTING.md](CONTRIBUTING.md)。投稿必须通过校验器与冒烟，并遵守原创红线。

## 免责声明

技能是文档型指引，本身不执行代码、不产生副作用；但模型会按技能正文行事，请只安装你读过并信任的技能。本库与 DeepSeek 官方无隶属关系。

## 许可证

[MIT](LICENSE)
