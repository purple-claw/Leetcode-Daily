# ⚡ LeetCode Daily Competitive Series

A **Streamlit web app** for browsing, uploading, and exploring optimised LeetCode problem explanations written in Markdown.

## Features

| Feature | Details |
|---|---|
| 📤 **Upload** | Drag-and-drop one or more `.md` files at runtime |
| 🏷️ **Auto-classification** | Parses YAML front-matter; falls back to intelligent content detection for difficulty & tags |
| 🔍 **Filters** | Filter by difficulty (Easy / Medium / Hard), topic tags, and free-text search |
| 📄 **Pagination** | 9 problems per page; prev / next navigation |
| 🔗 **Permalinks** | Every problem gets a unique URL: `?problem=<slug>` |
| 🖥️ **SPA** | Single-page application with URL-based routing |
| 🎨 **Clean UI** | Custom CSS with difficulty-coded cards, badges, and responsive 3-column grid |

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/purple-claw/Leetcode-Daily-Competitive-Series-.git
cd Leetcode-Daily-Competitive-Series-

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the app
streamlit run app.py
```

The app opens at **http://localhost:8501**.

## Markdown File Format

Each problem file should live in `problems/` and use YAML front-matter:

```markdown
---
title: "Two Sum"
number: 1
difficulty: "Easy"          # Easy | Medium | Hard
tags: ["Array", "Hash Table"]
date: "2024-01-01"
url: "https://leetcode.com/problems/two-sum/"
---

# 1. Two Sum

## Problem
...

## Approach
...

## Solution
\`\`\`python
def twoSum(nums, target):
    ...
\`\`\`
```

**All front-matter fields are optional.** When absent, the app auto-detects difficulty and topic tags from the content.

### Naming Convention

Files in `problems/` follow the pattern `<number>-<slug>.md`:

```
problems/
  0001-two-sum.md
  0056-merge-intervals.md
  0121-best-time-to-buy-sell-stock.md
```

## Uploading at Runtime

Use the **Upload Problems** panel in the sidebar to drop additional `.md` files into the session without restarting the app. Uploaded problems are merged with the bundled ones and deduplicated by slug.

## Permalink Example

```
http://localhost:8501/?problem=1-two-sum
```

Paste the URL into a browser to open that problem directly.
