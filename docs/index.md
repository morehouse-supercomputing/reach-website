# REACH Website — Contributor Onboarding

Welcome to the REACH Cultural Competency Benchmark Website summer cohort. This page walks you through everything you set up before you start building. Work through it top to bottom. If a step blocks you, post in the cohort channel or bring it to a standing meeting; do not stay stuck.

Our tooling goal is to get hands-on with a full modern AI development stack. You will work in **Google Antigravity** (an agentic IDE), using **Claude Code** as the primary coding assistant and **Gemini** where it makes sense to leverage our Google Cloud credits. Learning to move between these tools is part of the program.

---

## 0. Accounts you need first

Before anything else, make sure you have:

- [ ] Your **REACH project Google account** (used for Antigravity and our Google Cloud credits)
- [ ] A **GitHub account**, and you have **accepted the invite** to `morehouse-supercomputing/reach-website` (check your email)
- [ ] Sent Dr. Scruse your **GitHub username** and **preferred project email**
- [ ] Signed and returned your **Engagement Agreement**

---

## 1. Install Google Antigravity

Antigravity is the IDE we all build in.

1. Download Google Antigravity for your operating system and install it.
2. Open it and **sign in with your REACH project Google account** (not a personal Gmail).
3. Confirm it opens to a workspace. You will connect a project folder in Step 4.

> Exact menu labels may differ slightly by version. The pattern is the same: sign in with Google, then connect a repo.

## 2. Connect our Google Cloud credits

So your AI usage draws on the consortium credits, not your own:

1. In Antigravity, sign in to / select the **REACH Google Cloud project** when prompted.
2. If you are asked to choose a billing or credits source, pick the REACH project.
3. If you cannot see the project, tell Dr. Scruse, you may need to be added to the Cloud project first.

## 3. Choose your coding assistant

You have two agents available inside Antigravity. Use both over the summer.

- **Claude Code (primary).** Default to this for most build work, especially anything that needs careful reasoning, multi-file changes, or debugging. Sign in / enable it in Antigravity's assistant settings.
- **Gemini (use to leverage credits).** Reach for Gemini on Google-native tasks (Vertex AI, Cloud Run, BigQuery) and to spread usage across our Google credits.

Rule of thumb: **Claude Code by default, Gemini when the task is Google-native or when we are conserving Claude usage.** If we hit Claude Code limits and need to upgrade, we have a software budget line for it, flag it to Dr. Scruse.

## 4. Authenticate GitHub

Connect Antigravity to GitHub so you can clone, branch, and open pull requests.

1. **Preferred: OAuth.** In Antigravity's GitHub/source-control settings, choose "Sign in with GitHub" and authorize. This is the easiest path.
2. **If a token is required instead:** create a GitHub **fine-grained Personal Access Token** scoped to *only* the `reach-website` repo, with **Contents** and **Pull requests** read/write. Paste it where Antigravity (or `git`) asks for credentials.
   - **Never commit a token.** It does not go in the repo, ever. If you ever paste one into a file by accident, tell Dr. Scruse immediately so we can revoke it.

## 5. Clone the repository

1. From Antigravity, open `morehouse-supercomputing/reach-website` (Clone / Open from GitHub), or run:
   ```
   git clone https://github.com/morehouse-supercomputing/reach-website.git
   ```
2. Open the folder in Antigravity.

## 6. Find your work

- Your tasks are **GitHub Issues** labeled with your role (for example `role:data-viz`).
- They are grouped by **milestone** (M0 through M4), and the milestones line up with the pay schedule.
- The full picture (roles, milestones, deliverables) lives in the project's `cohort-plan.md`.

## 7. How we work: branches and pull requests

This is the most important section. **Nobody pushes to `main`.** `main` is protected and only Dr. Scruse can merge into it.

For every piece of work:

1. **Create a branch** named `your-role/short-description`, for example:
   ```
   git checkout -b data-viz/heatmap
   ```
2. Make your changes and **commit** them with a clear message.
3. **Push your branch:**
   ```
   git push -u origin data-viz/heatmap
   ```
4. **Open a Pull Request** into `main` and request **Dr. Scruse** as reviewer.
5. A **preview deploy URL** is generated on your PR. Open it and check your change looks right.
6. Dr. Scruse reviews, requests changes if needed, and **merges**. You never merge your own PR.

## 8. Your weekly output

Every Monday you get a **weekly issue** (`type:weekly`). Check off your expected output for the week and link the PR or demo that shows it. This is how we track momentum and how milestone sign-off (and payment) gets confirmed.

## 9. The no-data rule

Because this repository is **public**, sensitive material never goes in it:

- **No** benchmark data, draft results, or partner pre-publication materials.
- **No** credentials, API keys, `.env` files, or service-account JSON.

Those live in **private Google Cloud Storage** and the app reads them at runtime. The `.gitignore` blocks the common cases, but know the rule yourself.

## 10. Getting help

- **Standing meetings** run 3x per week for planning, unblocking, and accountability.
- Bring blockers early. Label a stuck issue `blocked` and say so.
- When in doubt about scope, check `cohort-plan.md` or ask Dr. Scruse.

Welcome aboard. Let's build something worth presenting at INSPIRE.
