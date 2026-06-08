# Let's get you building

I am glad you are here. You already got your welcome when you accepted your spot, so I am going to skip the speeches and get you set up to work.

Here is what you are walking into. You and four teammates are building the public home for REACH, the place where the world will see what a 12 school consortium has learned about how well today's AI actually understands the communities we serve. This is not a class project. It is the real dissemination platform, and your name is on it.

The part I am most excited about: you are going to build it on the same stack that powers real products, and that stack is powered by Google. Google put the tools and the cloud behind this consortium, and you get to use all of it. By October you will have shipped a live, cloud deployed site and presented it at INSPIRE. That is a portfolio most developers twice your age do not have.

So let's get your tools on.

## Your toolkit, powered by Google

Everything you build this summer runs on Google's platform. Get comfortable with these, because they are exactly what professional teams are reaching for right now.

- **Google Antigravity** is your home base, Google's agentic IDE. You will write, run, and ship everything from here.
- **Gemini** is your Google native copilot. Lean on it for anything that touches Google Cloud, Vertex AI, or BigQuery. It knows that world cold.
- **Vertex AI** is how we serve live model demos on the site, real AI running in the browser for anyone who visits.
- **Google Cloud** (Cloud Run, Cloud Storage) is where the site lives and where our data stays safe.
- **Claude Code** is also available inside Antigravity, and I like it for heavy multi file reasoning. Use it where it helps; reach for Gemini to keep our Google credits working for us.

The credits are real money Google invested in this consortium, so use the tools with intention. If we ever need to upgrade something, we have budget for it, just tell me.

## Before you start

Make sure you have these in hand:

- [ ] Your **REACH Google account** (this is what unlocks Antigravity and our Google Cloud credits)
- [ ] A **GitHub account**, with the invite to `morehouse-supercomputing/reach-website` accepted (check your email)
- [ ] Your signed **Engagement Agreement** back to me

## 1. Install Google Antigravity

1. Download Antigravity for your operating system and install it.
2. Open it and sign in with your **REACH Google account**, not a personal Gmail.
3. Let it open to a workspace. You will connect the project in Step 5.

## 2. Connect our Google Cloud credits

1. In Antigravity, sign in to or select the **REACH Google Cloud project** when prompted.
2. If you are asked which billing or credits source to use, choose the REACH project so your work draws on the consortium credits and not your own.
3. If you cannot see the project, tell me. I may need to add you to the Cloud project first.

## 3. Set up your assistants

Inside Antigravity, enable both **Gemini** and **Claude Code** in the assistant settings. Sign in to each.

My rule of thumb: Gemini first for anything Google native (Vertex AI, Cloud Run, BigQuery), Claude Code when you are wrestling with logic across a lot of files. Switching between them is a skill, and by August you will be fluent in both.

## 4. Connect GitHub

1. **Easiest path:** in Antigravity's source control settings, choose "Sign in with GitHub" and authorize.
2. **If it asks for a token instead:** create a GitHub fine grained Personal Access Token scoped to only the `reach-website` repo, with Contents and Pull requests set to read and write. Paste it where Antigravity asks.
3. **Never put a token in the repo.** If one ever lands in a file by accident, tell me right away so we can revoke it. No trouble, just speed.

## 5. Clone the repo

From Antigravity, open `morehouse-supercomputing/reach-website` straight from GitHub, or run:

```
git clone https://github.com/morehouse-supercomputing/reach-website.git
```

Then open the folder in Antigravity. You are in.

## 6. Find your work

Your tasks are waiting for you as GitHub Issues, labeled with your role and grouped by milestone (M0 through M4). The milestones line up with the pay schedule, so finishing your work and getting paid are the same moment. The big picture lives in `cohort-plan.md`.

## 7. How we work

One rule holds everything together: **nobody pushes to `main` but me.** That is not about control, it is so the live site never breaks and every change gets a second set of eyes.

Your loop for every piece of work:

1. Branch off `main`, named for your work, like `data-viz/heatmap`.
2. Build it, commit with a clear message.
3. Push your branch and **open a Pull Request** into `main`, with me as reviewer.
4. Your PR gets its own **preview link**, a live version of your change. Open it, make sure it looks right.
5. I review, we tighten anything that needs it, and I merge. You never merge your own.

## 8. Your weekly check-in

Every Monday you get a short weekly issue. Drop in what you shipped that week and link the PR or demo that proves it. That is how I track momentum and clear your milestone for payment. Keep it honest and keep it moving.

## 9. The one hard rule

This repo is public, on purpose, so your work is visible and yours to show off. That means nothing sensitive goes in it:

- No benchmark data, draft results, or partner materials before they are published.
- No credentials, API keys, `.env` files, or service account keys.

All of that lives in private Google Cloud Storage, and the site reads it at runtime. We have guardrails in place, but you own knowing the rule.

## 10. When you're stuck

We meet three times a week to plan, unblock, and keep each other honest. Do not sit on a blocker. Flag it, label the issue `blocked`, and bring it. Asking early is what strong researchers do.

Now let's build something that makes Google glad they bet on us. See you at kickoff.

Dr. Scruse
