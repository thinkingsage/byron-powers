# Workspace Setup — Fiction Projects

Use this reference when a user wants to create their project workspace before starting a novel.

---

## Folder Structure

```
~/writing/
└── [project-name]/          # one folder per novel
    ├── manuscript/           # chapter files (ch01.md, ch02.md, ...)
    ├── outline/              # plot outline, beat sheet, synopsis
    ├── characters/           # character sheets
    ├── world/                # world-building notes, maps, lore
    ├── seeds/                # project-specific Fiction Seeds
    │   └── [seed-name].md
    ├── notes/                # research, scratchpad, ideas
    └── .gitignore
```

**Central seed library** (cross-project, separate from any single novel):
```
~/seed-library/               # as defined in references/seed-library.md
    ├── catalog.md
    ├── house/
    └── genre/
```

---

## GitHub Setup Workflow

1. Create and clone the private repo:
   ```
   gh repo create [project-name] --private --clone
   cd [project-name]
   ```
   Or if starting from an existing folder:
   ```
   git init
   # then create the repo on GitHub and add it as origin
   ```

2. Create the folder structure inside the repo:
   ```
   mkdir -p manuscript outline characters world seeds notes
   ```

3. Add a `.gitignore`:
   ```
   .DS_Store
   *.swp
   *.swo
   *~
   *.bak
   Thumbs.db
   ```

4. Initial commit:
   ```
   git add .
   git commit -m "scaffold: project structure"
   git push -u origin main
   ```

---

## Commit Strategy

- Commit after each writing session with a descriptive message:
  - `draft: ch03 confrontation scene`
  - `outline: revised act two beat sheet`
  - `characters: added antagonist backstory`
- Tag milestones:
  - `v0.1-first-draft`
  - `v0.2-revised`
  - `v1.0-query-ready`
- Never commit sensitive notes (market research with real agent details, personal information) — add them to `.gitignore` or keep on a private branch

---

## Connection to Seed Library

The `seeds/` folder holds project-specific Fiction Seeds — style generators tuned to this novel's voice. When a seed proves useful across multiple projects, promote it to `~/seed-library/` for reuse.

See `references/seed-library.md` for the cataloging workflow and folder conventions.
