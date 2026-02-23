# LeetCode Daily Competitive Series

A Streamlit web app for browsing, uploading, and exploring LeetCode problem explanations written in Markdown. Because apparently writing things down once isn't enough, we need a whole web app to display them.

## Features That Definitely Took More Time Than Just Reading Files

| Feature | What It Actually Does |
|---|---|
| Upload | Lets you throw more Markdown files at the app instead of putting them in the folder like a sane person |
| Auto-classification | Guesses what your problem is about because you couldn't be bothered to fill out the metadata |
| Filters | Pretends to help you find things while you scroll past them anyway |
| Pagination | Limits you to 9 problems per page to make you feel like you're making progress |
| Permalinks | Generates URLs nobody will ever bookmark |
| SPA | Uses fancy URL routing so you can pretend this is a real web application |
| Clean UI | Colors the cards by difficulty so you can feel bad about only solving Easy problems |

## Quick Start For The Impatient

```bash
git clone https://github.com/purple-claw/Leetcode-Daily-Competitive-Series-.git
cd Leetcode-Daily-Competitive-Series-
pip install -r requirements.txt  # Go make coffee, this might take a while
streamlit run app.py
```

Point your browser to http://localhost:8501 and wonder why you didn't just use a file browser.

## Markdown File Format (If You Insist On Being Organized)

Throw these files into `problems/` with some fancy YAML front-matter:


title: "Two Sum"
number: 1
difficulty: "Easy"
tags: ["Array", "Hash Table"]
date: "2024-01-01"
url: "https://leetcode.com/problems/two-sum/"

# 1. Two Sum

## Problem
Find two numbers that add up to something. Revolutionary.

## Approach
Use a hash map because that's what everyone does.

## Solution
```python
def twoSum(nums, target):
    # You've seen this a thousand times
    ...
```
```

None of that front-matter is actually required. The app will desperately try to figure out what you meant by scanning the content. It's usually wrong, but it tries.

### Naming Convention (Or Lack Thereof)

Files should follow `<number>-<slug>.md` if you want the app to find them without crying:

```
problems/
  0001-two-sum.md
  0056-merge-intervals.md
  0121-best-time-to-buy-sell-stock.md
```

## Uploading Files Like It's 1999

Use the Upload Problems panel in the sidebar to add files during runtime. This feature exists because dragging files into a folder was too straightforward. Uploaded files merge with existing ones and deduplicate by slug, which is fancy talk for "the newer one wins."

## Permalinks That Nobody Uses

```
http://localhost:8501/?problem=1-two-sum
```

Share this with your friends who definitely care about your LeetCode solutions.

## Built With

- Streamlit - Because React would require actual JavaScript knowledge
- Python - The duct tape of programming languages
- Markdown - So we can pretend plain text is a feature
- Pure cope - The main dependency
