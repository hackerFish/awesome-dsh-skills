# 🐋 awesome-dsh-skills — Tested Skills for DeepSeek Harness

**12 original engineering skills (SKILL.md). Every skill passes a format validator mirroring the official `@deepseek-ai/dsh-skill-filesystem` rules plus an isolated-DSH_HOME load smoke test. Copy, drop in, done.**

[中文](README.zh.md) · Sibling repos: [dsh-lab](https://github.com/hackerFish/dsh-lab) · [awesome-dsh-presets](https://github.com/hackerFish/awesome-dsh-presets) · [dsh-video-studio](https://github.com/hackerFish/dsh-video-studio)

## What DSH skills are

DSH scans skill roots (`~/.dsh/skills`, `.agents/skills`, project `.dsh/skills`) and registers `SKILL.md` files into the model-visible catalog. Each skill: `name` (kebab-case) + `description` required in frontmatter; optional `whenToUse` / `metadata` / `disable-model-invocation` / `user-invocable`.

## Install

```bash
git clone https://github.com/hackerFish/awesome-dsh-skills ~/dsh-skills
mkdir -p ~/.dsh/skills
cp -r ~/dsh-skills/skills/* ~/.dsh/skills/   # all, or copy individual skill dirs
```

## Quality gates (every skill)

1. `node tools/validate-skills.mjs` — field whitelist, kebab-case names, boolean value forms, single-level structure, per official rules
2. Load smoke test in an isolated `DSH_HOME` (skills placed, harness booted clean)
3. Content rule: verified facts only; no unverified "magic prompts"

## Skills (12)

| Skill | Purpose |
|---|---|
| dsh-git-commit | Conventional commits + pre-commit self-check |
| dsh-code-review | Six-dimension structured review |
| dsh-test-first | Red→green→refactor discipline |
| dsh-doc-sync | Keep docs/changelog/versions in sync |
| dsh-plugin-dev | DSH plugin dev with verified manifest/patch structures |
| dsh-dependency-audit | Dependency & install-script risk audit |
| dsh-refactor-safe | Baseline-first safe refactoring |
| dsh-debug-session | DSH boot/plugin failure triage |
| dsh-changelog | Keep a Changelog discipline |
| dsh-chinese-docs | Chinese technical writing conventions |
| dsh-pr-review | PR review checklist & structured feedback |
| dsh-task-breakdown | Task decomposition with acceptance criteria |

See [CONTRIBUTING.md](CONTRIBUTING.md) to submit a skill.

## License

[MIT](LICENSE)
