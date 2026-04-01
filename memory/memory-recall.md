# Memory Recall — Cross-Machine Setup

To load Claude memory on a new machine, run this from inside the project directory after pulling:

```bash
cp -r memory/ ~/.claude/projects/$(pwd | sed 's|/|-|g' | sed 's|^-||')/memory/
```

This copies the memory files to the path Claude Code reads on startup.

## Keeping memories in sync

After any session where memories are updated, copy them back into the repo and push:

```bash
cp -r ~/.claude/projects/$(pwd | sed 's|/|-|g' | sed 's|^-||')/memory/ memory/
git add memory/ && git commit -m "Update memory files" && git push origin main
```
