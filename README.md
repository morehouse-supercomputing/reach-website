# REACH Cultural Competency Benchmark Website

The public dissemination platform for the Google REACH GenAI Consortium (Workstream 5), built by a Morehouse student cohort for INSPIRE 2026.

New here? Start with the onboarding guide: https://morehouse-supercomputing.github.io/reach-website/

## The team and your tasks

Click your name to see your task list. Tasks are GitHub Issues, grouped by milestone.

| Role | Student | Your tasks |
|---|---|---|
| Front-End Developer | Chase Clayton | [Front-End issues](https://github.com/morehouse-supercomputing/reach-website/issues?q=is%3Aissue+label%3A%22role%3Afrontend%22) |
| Back-End Developer | Kanayo Egwuekwe-Maxey | [Back-End issues](https://github.com/morehouse-supercomputing/reach-website/issues?q=is%3Aissue+label%3A%22role%3Abackend%22) |
| Data Visualization & Research Lead | De'Andre Randolph | [Data Viz issues](https://github.com/morehouse-supercomputing/reach-website/issues?q=is%3Aissue+label%3A%22role%3Adata-viz%22) |
| UX/UI Designer | James Moore IV | [UX/UI issues](https://github.com/morehouse-supercomputing/reach-website/issues?q=is%3Aissue+label%3A%22role%3Auiux%22) |
| Marketing & Communications Lead | Wendell Robinson | [Marketing issues](https://github.com/morehouse-supercomputing/reach-website/issues?q=is%3Aissue+label%3A%22role%3Amarketing-comms%22) |

## How the work is organized

- **Tasks** are [Issues](https://github.com/morehouse-supercomputing/reach-website/issues), labeled with your role.
- **Milestones** group the tasks into phases ([M0 through M4](https://github.com/morehouse-supercomputing/reach-website/milestones)). The milestones line up with the pay schedule, so finishing a milestone and getting paid are the same moment.
- **Your weekly output** is checked in every Monday (see the onboarding guide).

## How we work

Nobody pushes to `main` but Dr. Scruse, so the live site never breaks. You never merge your own work.

**For a normal task (most of the time):**

1. Branch off `main`, named for your work, like `data-viz/heatmap`.
2. Commit, push your branch, and open a Pull Request into `main` with Dr. Scruse as reviewer.
3. Your PR gets a live preview link. Check it.
4. Dr. Scruse reviews and merges. The branch auto-deletes after merge.

**When several people build one feature together (like the live demo):**

Share one feature branch instead of each working alone. Everyone works on the same branch, pulls before pushing, and it goes to `main` as a single Pull Request once it is done. There is also a structured option for bigger features where each person opens a Pull Request into the shared branch first.

The golden rule on any shared branch: run `git pull` before you `git push`, every time.

Full step-by-step workflow, shared-branch options, and conflict handling are in [CONTRIBUTING.md](CONTRIBUTING.md).

## Repository layout

```
web/      the Next.js site (front-end, UI, content)
data/     ingestion + schema (back-end)
infra/    Cloud Run, IAM, deploy config
docs/     onboarding guide and project docs
```

Sensitive data (benchmark results, drafts, credentials) never lives in this repo. It stays in private Google Cloud Storage.
