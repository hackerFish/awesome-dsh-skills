# 贡献指南

## 投稿一个技能

1. Fork 本仓库，新建目录 `skills/<name>/SKILL.md`（`name` 必须 kebab-case，与目录名一致）。
2. frontmatter 只允许以下字段：`name`（必填）、`description`（必填）、`whenToUse`、`metadata`、`disable-model-invocation`、`user-invocable`。布尔字段只接受 `true/false/yes/no/on/off/1/0`（大小写不敏感）。
3. 本地通过校验：`node tools/validate-skills.mjs`（必须全绿）。CI 会在 push/PR 时自动跑同一校验（Windows + Linux 双平台，见 `.github/workflows/validate.yml`），红则不能合。
4. 在 README 的技能清单表加一行，提 PR。

## 内容标准（禁得起推敲）

- **原创**：不接受从其他仓库/博客搬运的正文；引用他人内容必须注明来源。
- **可验证**：正文里的每一条命令、每一个字段都要有据可查（官方包、官方文档或你附上的验证记录）。
- **单一主题**：一个技能只解决一件事；正文 40 行以内，清单化、祈使句。
- **诚实标注**：涉及 DSH 内部机制时写明"依据官方包 x 的 README/实现"，不写"应该是"。

## 报错与勘误

发现技能内容与 DSH 实际行为不符？开 issue，附：你的 DSH 版本、复现步骤、期望与实际行为。我们验证后更新技能并保留勘误记录。
