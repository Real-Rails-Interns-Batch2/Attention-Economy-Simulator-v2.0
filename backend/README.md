# Attention-Economy-Simulator-v2.0
A powerful analytical tool that visualizes how user engagement—such as view time and click-through rates—directly converts into digital revenue.
# POC #45 - Attention Economy Revenue Simulator

A portable Next.js demo project with supporting Python utility scripts. This repository is configured for local development on Windows and other platforms without absolute-path issues.

## ✅ What works
- `npm install` from the project root
- `npm run dev` to launch the Next.js app
- Python utility scripts that derive file locations from `Path(__file__).resolve().parent`
- Clean ignore rules for Node, Next.js, and Python build artifacts

## Prerequisites
- Node.js 20.x or later
- npm 10.x or later
- Python 3.11+ for optional utility scripts

## Setup
1. Open a terminal in the project root:
   ```bash
   cd "POC-45---attention-economy-revenue-simulator---Jaliba-sherin-kj"
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. (Optional) Install Python dependencies for utility scripts:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   ```

## Run the app
```bash
npm run dev
```
Then open `http://localhost:3000` in your browser.

## Python utilities
The repository includes helper scripts that load `overview.txt` relative to the repo root:
- `extract.py`
- `extract2.py`
- `extract3.py`
- `extract4.py`
- `fix_escapes.py`

These scripts now use `pathlib.Path(__file__).resolve().parent` so they can run without hard-coded machine paths.

## Project contents
- `app/` — Next.js app source files
- `next.config.js` — Next.js configuration with `turbopack.root`
- `package.json` — app dependencies and scripts
- `requirements.txt` — Python utility environment requirements
- `.gitignore` — ignores build artifacts for both Node and Python

## Notes
- Run `npm install` only from inside the `POC-45---attention-economy-revenue-simulator---Jaliba-sherin-kj` folder.
- Do not rely on any `package-lock.json` located outside this directory.
- If you add Python packages, update `requirements.txt` accordingly.
