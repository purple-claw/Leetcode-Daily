# LeetCode Daily Competitive Series

A modern FastAPI web application for browsing, editing, and exploring LeetCode problem explanations written in Markdown. Because apparently a simple file browser wasn't good enough.

## Features That Definitely Justify The Development Time

| Feature | What It Actually Does |
|---|---|
| **Smart Search** | Search problems by title, number, or tags while pretending regex doesn't exist |
| **Markdown Editor** | Paste markdown directly in-app and save it without file upload dialogs |
| **Auto-Classification** | Guesses what your problem is about because you couldn't be bothered to add metadata |
| **Advanced Filters** | Filter by difficulty and tags so you can avoid the Hard problems |
| **Pagination** | Shows 9 problems per page to make you feel like you're making progress |
| **Permalinks** | Generates URLs that nobody will ever bookmark |
| **Modern UI** | Colors the cards by difficulty so you can feel bad about only solving Easy problems |
| **Auto-Organization** | Automatically saves problems in tag-based directories because folder structure is hard |
| **Statistics** | Counts your problems so you can lie to recruiters about how many you've solved |

## Quick Start (Local Development)

### Option 1: Simple Run

```bash
# Clone the repository
git clone https://github.com/purple-claw/Leetcode-Daily.git
cd Leetcode-Daily

# Install dependencies
pip install -r requirements.txt

# Run the application
python main.py
```

### Option 2: Using Uvicorn Directly

```bash
# Install dependencies
pip install -r requirements.txt

# Run with hot reload (development)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Open your browser and navigate to:
- **Application**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (at least FastAPI gives you free documentation)
- **Alternative API Docs**: http://localhost:8000/redoc (because one auto-generated doc page wasn't enough)

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

None of that front-matter is actually required. The app will desperately try to figure out what you meant by scanning the content. It's usually wrong, but it tries.

### Naming Convention (Or Lack Thereof)

Files should follow `<number>-<slug>.md` if you want the app to find them without crying:

```
problems/
  0001-two-sum.md
  0056-merge-intervals.md
  0121-best-time-to-buy-sell-stock.md
```

## Markdown Editor (Paste + Save)

Use the Markdown Editor panel in the UI to paste raw markdown and save it instantly. The backend parses metadata/frontmatter, classifies tags, and stores the file in the correct folder.

## Permalinks That Nobody Uses

```
http://localhost:8000/?problem=1-two-sum
```

Share this with your friends who definitely care about your LeetCode solutions.

## Built With

- FastAPI - Because we needed an excuse to learn async/await
- Python - The duct tape of programming languages
- Vanilla JavaScript - Because adding React would make this a "real" project
- Markdown - So we can pretend plain text is a feature
- Pure cope - The main dependency

## Project Structure (For The Curious)

```
Leetcode-Daily/
├── main.py                 # FastAPI backend (the real MVP)
├── app.py                  # Legacy Streamlit app (delete if you want)
├── static/                 # Frontend files
│   ├── index.html         # The only HTML file (SPA baby)
│   ├── styles.css         # 400+ lines of CSS you'll never refactor
│   └── app.js             # Vanilla JS (no jQuery, we have standards)
├── problems/              # Markdown files organized by tags
│   ├── Array/
│   ├── Dp/
│   ├── TwoPointers/
│   └── ...                # And many more directories you'll never use
├── requirements.txt       # Python dependencies (all 4 of them)
├── Procfile              # For deployers who miss Heroku
├── railway.json          # Railway's love letter
├── render.yaml           # Render's version of the same thing
├── runtime.txt           # Python 3.11 because 3.12 broke something
└── README.md             # You are here
```

## API Endpoints (Auto-Generated But Here Anyway)

Because FastAPI gives you interactive docs at `/docs`, but you wanted them in the README too:

- `GET /` - Serves the frontend (groundbreaking)
- `GET /api/problems` - List all problems with filters
- `GET /api/problems/{slug}` - Get a single problem
- `GET /api/stats` - Statistics for your dashboard addiction
- `GET /api/tags` - All available tags
- `POST /api/editor/save` - Save markdown pasted from the editor
- `GET /health` - For load balancers that don't exist yet

## License

MIT - Do whatever you want, I'm not your lawyer.
