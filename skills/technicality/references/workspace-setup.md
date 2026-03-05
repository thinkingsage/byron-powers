# Workspace Setup — Technical Book Projects

Use this reference when a user wants to create their project workspace before starting a technical book.

---

## Two-Repo Pattern

Technical books typically use two separate repositories:

- **Manuscript repo** (private) — the book text, outlines, proposals, and notes
- **Code repo** (public) — the running example that readers can clone and follow along

Keep them separate so readers can access the code without seeing draft manuscript content.

---

## Folder Structures

### Manuscript Repo (private)

```
~/books/
└── [book-name]/             # manuscript repo (private)
    ├── manuscript/           # chapter files (ch01.md, ch02.md, ...)
    ├── proposals/            # book proposal, pitch docs
    ├── outlines/             # TOC, chapter outlines, beat sheets
    ├── diagrams/             # source files for diagrams (draw.io, Mermaid, etc.)
    ├── notes/                # research, reviewer feedback, editor correspondence
    ├── assets/               # screenshots, raw images
    └── .gitignore
```

### Code Example Repo (public)

```
~/books/
└── [book-name]-code/        # code repo (public, for readers)
    ├── README.md             # reader-facing setup instructions
    ├── ch01/
    ├── ch02/
    │   ├── before/           # starting state for chapter examples
    │   └── after/            # completed state
    └── final/                # complete running example
```

---

## GitHub Setup Workflow

1. Create the manuscript repo (private):
   ```
   gh repo create [book-name] --private --clone
   cd [book-name]
   mkdir -p manuscript proposals outlines diagrams notes assets
   ```

2. Create the code example repo (public):
   ```
   cd ~/books
   gh repo create [book-name]-code --public --clone
   cd [book-name]-code
   mkdir -p ch01 final
   ```

3. Add `.gitignore` to the manuscript repo:
   ```
   .DS_Store
   *.swp
   *.swo
   *~
   *.bak
   Thumbs.db
   *.pdf
   *.docx
   ```

4. Initial commits:
   ```
   # manuscript repo
   git add .
   git commit -m "scaffold: manuscript structure"
   git push -u origin main

   # code repo
   git add .
   git commit -m "scaffold: code example structure"
   git push -u origin main
   ```

---

## Commit Strategy

**Manuscript repo:**
- Commit after each chapter draft or major revision pass
- Message format:
  - `draft: ch03 first pass`
  - `revise: ch03 technical review changes`
  - `outline: revised chapter 5-8 sequence`
- Tag book milestones:
  - `first-draft`
  - `tech-review`
  - `final-manuscript`

**Code repo:**
- Commit after each working example is complete
- Tag by chapter: `ch01-complete`, `ch02-complete`
- Every example must run before committing — readers will clone this

---

## Working with Your Publisher's System

Many publishers (O'Reilly, Manning, Pragmatic Bookshelf) have their own production pipeline — Atlas, DocBook, AsciiDoc, or proprietary tooling. If your publisher provides a repo or system:

- Use the **publisher's repo as the canonical manuscript source**
- Keep your private repo as a scratch space and backup
- Sync regularly to avoid divergence

See `references/production-prep.md` for publisher-specific format requirements and submission workflows.
