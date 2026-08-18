---
name: dsh-restart
description: 启动、重启或检查本机 dsh（DeepSeek Harness Web）服务时使用：检测端口占用、终止残留进程、启动服务并打开界面。
whenToUse: 用户要求"启动 dsh / 重启 dsh / 打开 dsh 界面"、提示端口被占用或 dsh 界面打不开时。
---

# 启动 / 重启 dsh

依据：`dsh web` 启动浏览器 UI（`dsh web --help` 可查 `--host` / `--port` 参数，`--port 0` 让系统分配空闲端口）；配置根按官方 `@deepseek-ai/dsh-skill-filesystem` 的 dshHome 规则取 `$DSH_HOME` 或 `~/.dsh`。

1. 定位安装：`dsh --version`；命令不存在则用 `npx -y @deepseek-ai/dsh --version`（首次会下载，需网络）。
2. 确认配置根：`$DSH_HOME`（Windows 为 `$env:DSH_HOME`），未设置则为 `~/.dsh`。
3. 检查端口（本机默认 3080，可用 `--port` 覆盖）：
   - Windows：`netstat -ano | findstr :3080`，记录 LISTENING 行的 PID
   - macOS/Linux：`lsof -iTCP:3080 -sTCP:LISTEN -t`；无 lsof 用 `ss -ltnp | grep :3080`
4. 确认占用进程类型：Windows `tasklist /FI "PID eq <pid>"`；macOS/Linux `ps -p <pid> -o comm=`。非 node/dsh 类进程**不要杀**，先询问用户。
5. 探测服务：`curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3080/`（Windows 用 `curl.exe`）。
   - 有响应（200）且用户只是要"打开"→ 直接开浏览器（Windows `start http://127.0.0.1:3080`，macOS `open http://127.0.0.1:3080`）；**不重启**，避免丢失当前会话。
   - 有响应但用户明确要求"重启"→ 终止进程（Windows `taskkill /PID <pid> /T /F`；macOS/Linux `kill <pid>`），等待端口释放。
   - 无响应视为残留进程 → 终止后继续。
6. 启动：`dsh web`；PATH 无 dsh 则 `npx -y @deepseek-ai/dsh web`。需要指定配置根时先设置 `DSH_HOME`（指向第 2 步路径）。
7. 轮询第 5 步的探测直到返回 200（最多约 30 秒），然后打开浏览器。
8. 失败排查：查看启动命令完整报错；`dsh web --help` 确认用法；确认端口未被防火墙或其它程序占用；可临时用 `dsh web --port 0` 验证服务本身能否起来。
9. ⚠️ 重启会终止当前运行中的 dsh 进程（含当前对话所在服务）：执行前明确告知用户，重启后重新打开界面。
