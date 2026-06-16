# How We Work on REACH

This is our shared playbook for version control. Read it once, refer back when you need to. The whole point is simple: keep `main` clean and working, and let everyone build on the same current code.

## The golden rules

1. **Nobody pushes to `main` but Dr. Scruse.** Everything reaches `main` through a Pull Request that she reviews and merges.
2. **One branch per task, not per person.** Branches are short-lived and disposable.
3. **`git pull` before you `git push`.** Every time. This is what prevents most conflicts.
4. **Never commit data or secrets.** This repo is public and holds code only. Benchmark data and unpublished results live in a private Google Cloud Storage bucket (read at runtime). Secrets (API keys, the values in `.env`) stay on your own machine and are set as environment variables in the host, backed by Google Secret Manager. A `.env` file never gets pushed anywhere, it just sits on your laptop.

## Branch naming

Name a branch for the work, prefixed with your role, not your name:

```
data-viz/heatmap
backend/ingestion
uiux/design-system
marketing/partner-pages
frontend/site-shell
```

The prefix shows whose lane it is. The branch is still temporary.

## The workflow for a normal task

```
1. git checkout main && git pull          start from the latest main
2. git checkout -b data-viz/heatmap        make a branch for this one task
3. (build it, commit as you go)
4. git push -u origin data-viz/heatmap     push your branch
5. Open a Pull Request into main, request Dr. Scruse as reviewer
6. She reviews and merges
7. The branch auto-deletes after merge. Start fresh for the next task.
```

In your Pull Request description, write `Closes #12` (your issue number). When the PR merges, the issue closes itself.

## When several people work on one feature

Some features need more than one person (the interactive demo, for example, pulls backend, data-viz, and frontend together). A branch is not owned by one person, so you share it. Pick the approach that fits the size of the work.

### Simple (2 to 3 people, a few days)

Everyone pushes to one shared branch and coordinates.

```
1. One person creates it:  git checkout -b feature/live-demo && git push -u origin feature/live-demo
2. The others join it:     git fetch && git checkout feature/live-demo
3. Everyone works. Pull before you push, every time.
4. When it is done, ONE Pull Request: feature/live-demo -> main
```

As long as you are mostly in different files, Git merges everyone's work automatically. If two people edit the same lines, Git shows both versions and you choose which to keep. Talk it out in Slack when that happens.

### Structured (bigger feature, lots of overlap)

The shared branch becomes a mini-main. Each person branches off it and opens a Pull Request into the feature branch, not into `main`:

```
feature/live-demo                  the shared integration branch
  live-demo/backend-endpoint   ->  PR into feature/live-demo
  live-demo/data-layer         ->  PR into feature/live-demo
  live-demo/ui                 ->  PR into feature/live-demo
then: feature/live-demo        ->  one PR into main at the end
```

Each piece gets reviewed on its own before joining the shared branch, and Dr. Scruse still sees one clean Pull Request into `main`.

## Handling a conflict

If Git says your push is rejected, someone else pushed first. Fix it:

```
git pull origin <your-branch>     bring in their changes
(resolve any conflicts Git marks, then commit)
git push
```

Conflicts only happen on the same lines of the same file. Small, frequent commits keep them rare.

## Where your work lives

- **Your tasks** are GitHub Issues, labeled with your role: https://github.com/morehouse-supercomputing/reach-website/issues
- **The board** shows everything at a glance: https://github.com/orgs/morehouse-supercomputing/projects/1
- **Milestones** group tasks into phases and line up with the pay schedule.

When in doubt, ask in Slack or bring it to a meeting. Asking early is what strong researchers do.
