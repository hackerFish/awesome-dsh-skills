#!/usr/bin/env node
// awesome-dsh-skills 格式校验器（零依赖）
// 规则逐条对照官方 @deepseek-ai/dsh-skill-filesystem 的 README 实现：
//   - 单层发现：skills/<name>/SKILL.md；name 必须 kebab-case 且与目录名一致
//   - frontmatter 必填 name 与 description
//   - 可选字段白名单：whenToUse / metadata / disable-model-invocation / user-invocable
//   - 布尔字段只接受 true/false/yes/no/on/off/1/0（大小写不敏感）；驼峰拼写与未知字段直接判错
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// 用 fileURLToPath 而非 URL.pathname：后者在 Windows 上会得到 "/C:/..." 形式的路径，
// 导致 existsSync 永远失败、误报"缺少 skills/ 目录"（旧版在 Windows 下无法运行）
const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SKILLS_DIR = join(ROOT, 'skills')
const ALLOWED_KEYS = new Set(['name', 'description', 'whenToUse', 'metadata', 'disable-model-invocation', 'user-invocable'])
const BOOL_VALUES = new Set(['true', 'false', 'yes', 'no', 'on', 'off', '1', '0'])
const KEBAB = /^[a-z0-9][a-z0-9-]*$/

let errors = 0
let checked = 0

function fail(msg) { console.error('  ❌ ' + msg); errors++ }

function parseFrontmatter(text) {
  if (!text.startsWith('---')) return { error: '必须以 --- 开头' }
  const end = text.indexOf('\n---', 4)
  if (end < 0) return { error: 'frontmatter 未闭合（缺少第二个 ---）' }
  const body = text.slice(4, end)
  const fields = {}
  for (const rawLine of body.split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const m = line.match(/^([A-Za-z0-9-]+)\s*:\s*(.*)$/)
    if (!m) return { error: `无法解析的行: ${line}` }
    fields[m[1]] = m[2].trim()
  }
  return { fields, body: text.slice(end + 4) }
}

if (!existsSync(SKILLS_DIR)) { console.error('缺少 skills/ 目录'); process.exit(2) }

for (const dir of readdirSync(SKILLS_DIR).sort()) {
  const skillDir = join(SKILLS_DIR, dir)
  if (!existsSync(join(skillDir, 'SKILL.md'))) { fail(`${dir}: 缺少 SKILL.md`); continue }
  checked++
  const text = readFileSync(join(skillDir, 'SKILL.md'), 'utf8')
  const parsed = parseFrontmatter(text)
  if (parsed.error) { fail(`${dir}: ${parsed.error}`); continue }
  const f = parsed.fields
  for (const key of Object.keys(f)) {
    if (!ALLOWED_KEYS.has(key)) { fail(`${dir}: 未知字段 "${key}"（拼写或驼峰变体？只允许 ${[...ALLOWED_KEYS].join(', ')}）`) }
  }
  if (!f.name) fail(`${dir}: 缺少必填 name`)
  else {
    if (!KEBAB.test(f.name)) fail(`${dir}: name "${f.name}" 不是 kebab-case`)
    if (f.name !== dir) fail(`${dir}: name "${f.name}" 与目录名 "${dir}" 不一致`)
  }
  if (!f.description || !f.description.length) fail(`${dir}: 缺少必填 description`)
  for (const boolKey of ['disable-model-invocation', 'user-invocable']) {
    if (f[boolKey] !== undefined && !BOOL_VALUES.has(String(f[boolKey]).toLowerCase())) {
      fail(`${dir}: ${boolKey} 取值 "${f[boolKey]}" 非法（只允许 true/false/yes/no/on/off/1/0）`)
    }
  }
  if (f.metadata !== undefined && f.metadata === '') fail(`${dir}: metadata 不能为空字符串`)
  if (!parsed.body.trim()) fail(`${dir}: 正文为空`)
  if (parsed.body.length > 20000) fail(`${dir}: 正文过长（>20000 字符），请精简到 40 行以内`)
  console.log(`  ✅ ${dir}`)
}

console.log(`\n校验完成: ${checked} 个技能, ${errors} 个错误`)
process.exit(errors ? 1 : 0)
