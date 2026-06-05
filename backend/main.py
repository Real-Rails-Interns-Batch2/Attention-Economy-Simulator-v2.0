"""
─────────────────────────────────────────────────────────────────────
FASTAPI BACKEND - POC-45 Attention Economy Revenue Simulator
Phase 2: Local-to-Cloud Mirroring (Backend Service)
Author: Jaliha Sherin K J | Batch 2 Interns
─────────────────────────────────────────────────────────────────────

API STRUCTURE:
- GET  /health                  - Health check
- GET  /                        - Root metadata
- GET  /api/platforms           - Get all platforms
- GET  /api/platforms/{platform_id} - Get platform by ID
- GET  /api/cpm-verticals       - Get CPM data by vertical
- POST /api/simulator           - Run simulator calculation
"""

import logging
import os
import sys

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Import router using absolute package imports to support running from the repo root.
if __package__ is None:
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    if repo_root not in sys.path:
        sys.path.insert(0, repo_root)

from backend.routers import api_router

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ═══════════════════════════════════════════════════════════════════
# FASTAPI APPLICATION SETUP
# ═══════════════════════════════════════════════════════════════════

app = FastAPI(
    title="POC-45 Revenue Simulator API",
    description="Attention Economy Revenue Simulator Backend",
    version="1.0.0",
)

# ─────────────────────────────────────────────────────────────────
# CORS CONFIGURATION (Allow Docker container and local requests)
# ─────────────────────────────────────────────────────────────────

cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API router
app.include_router(api_router)


@app.get("/health", tags=["Health"])
async def health_check():
    """Health endpoint used by containers and monitoring checks."""
    return {"status": "healthy", "service": "poc45-backend"}


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API metadata."""
    return {
        "name": "POC-45 Revenue Simulator API",
        "version": "1.0.0",
        "author": "Jaliha Sherin K J | Batch 2 Interns",
        "docs": "/docs",
        "redoc": "/redoc",
    }


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler."""
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )


if __name__ == "__main__":
    import uvicorn

    # റൺ ചെയ്യാൻ ഈ രീതി ഉപയോഗിക്കുക
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=os.getenv("ENVIRONMENT") != "docker",
    )
