"""
─────────────────────────────────────────────────────────────────────
FASTAPI BACKEND - POC-45 Attention Economy Revenue Simulator
Phase 2: Local-to-Cloud Mirroring (Backend Service)
Author: Jaliha Sherin K J | Batch 2 Interns
─────────────────────────────────────────────────────────────────────

ENDPOINTS:
- GET  /health                    - Health check
- GET  /api/platforms             - Get all platforms
- GET  /api/platforms/{id}        - Get platform by ID
- POST /api/simulator             - Run simulator calculation
- GET  /api/cpm-verticals         - Get CPM data by vertical
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
import os
import logging

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

# ═══════════════════════════════════════════════════════════════════
# PYDANTIC MODELS (Data Validation)
# ═══════════════════════════════════════════════════════════════════


class Platform(BaseModel):
    id: str
    name: str
    icon: str
    category: str
    dau: int
    session: int
    adLoad: int
    cpm: float
    creatorSplit: int
    color: str


class SimulatorRequest(BaseModel):
    platform_id: str
    dau: int
    session: int
    ad_load: int
    cpm: float


class SimulatorResponse(BaseModel):
    total_hours: float
    total_impressions: float
    daily_revenue: float
    annual_run_rate: float
    creator_revenue: float
    platform_net: float


class VerticalCPM(BaseModel):
    label: str
    value: int


# ═══════════════════════════════════════════════════════════════════
# DATA (PLACEHOLDER - Replace with database queries in production)
# ═══════════════════════════════════════════════════════════════════

PLATFORMS_DATA = [
    {
        "id": "youtube",
        "name": "YouTube",
        "icon": "▶️",
        "category": "Video",
        "dau": 122,
        "session": 40,
        "adLoad": 12,
        "cpm": 7.5,
        "creatorSplit": 55,
        "color": "#f43f5e",
    },
    {
        "id": "tiktok",
        "name": "TikTok",
        "icon": "🎵",
        "category": "Short Video",
        "dau": 150,
        "session": 95,
        "adLoad": 8,
        "cpm": 3.5,
        "creatorSplit": 20,
        "color": "#06b6d4",
    },
    {
        "id": "instagram",
        "name": "Instagram",
        "icon": "📸",
        "category": "Social",
        "dau": 500,
        "session": 29,
        "adLoad": 14,
        "cpm": 8.2,
        "creatorSplit": 15,
        "color": "#8b5cf6",
    },
    {
        "id": "facebook",
        "name": "Facebook",
        "icon": "🟦",
        "category": "Social",
        "dau": 2100,
        "session": 31,
        "adLoad": 16,
        "cpm": 6.1,
        "creatorSplit": 10,
        "color": "#3b82f6",
    },
    {
        "id": "twitter",
        "name": "X / Twitter",
        "icon": "🐦",
        "category": "Microblogging",
        "dau": 238,
        "session": 30,
        "adLoad": 10,
        "cpm": 2.1,
        "creatorSplit": 25,
        "color": "#9ca3af",
    },
    {
        "id": "snapchat",
        "name": "Snapchat",
        "icon": "👻",
        "category": "Messaging",
        "dau": 414,
        "session": 26,
        "adLoad": 9,
        "cpm": 2.95,
        "creatorSplit": 35,
        "color": "#f59e0b",
    },
]

VERTICAL_CPMS_DATA = [
    {"label": "Finance / Crypto", "value": 52},
    {"label": "Software / SaaS", "value": 45},
    {"label": "Real Estate", "value": 38},
    {"label": "E-Commerce", "value": 15},
    {"label": "Gaming", "value": 8},
    {"label": "Entertainment", "value": 4},
]

# ═══════════════════════════════════════════════════════════════════
# ROUTES
# ═══════════════════════════════════════════════════════════════════


@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for Docker container monitoring.
    Used by healthcheck and load balancers.
    """
    return {"status": "healthy", "service": "poc45-backend"}


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information."""
    return {
        "name": "POC-45 Revenue Simulator API",
        "version": "1.0.0",
        "author": "Jaliha Sherin K J | Batch 2 Interns",
        "docs": "/docs",
        "redoc": "/redoc",
    }


@app.get("/api/platforms", response_model=List[Platform], tags=["Platforms"])
async def get_platforms():
    """
    Get all social media platforms with their metrics.
    Returns: List of Platform objects
    """
    try:
        return PLATFORMS_DATA
    except Exception as e:
        logger.error(f"Error fetching platforms: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching platforms")


@app.get("/api/platforms/{platform_id}", response_model=Platform, tags=["Platforms"])
async def get_platform(platform_id: str):
    """
    Get a specific platform by ID.
    Args: platform_id (str) - Platform identifier (e.g., 'youtube', 'tiktok')
    Returns: Platform object
    """
    platform = next(
        (p for p in PLATFORMS_DATA if p["id"] == platform_id), None
    )
    if not platform:
        raise HTTPException(status_code=404, detail=f"Platform '{platform_id}' not found")
    return platform


@app.get("/api/cpm-verticals", response_model=List[VerticalCPM], tags=["CPM"])
async def get_cpm_verticals():
    """
    Get CPM rates by industry vertical.
    Returns: List of VerticalCPM objects
    """
    return VERTICAL_CPMS_DATA


@app.post("/api/simulator", response_model=SimulatorResponse, tags=["Simulator"])
async def run_simulator(request: SimulatorRequest):
    """
    Run the revenue simulator with custom parameters.
    
    Args:
        request: SimulatorRequest containing:
            - platform_id: str
            - dau: int (Daily Active Users in millions)
            - session: int (Session length in minutes)
            - ad_load: int (Ads per hour)
            - cpm: float (Cost per mille)
    
    Returns:
        SimulatorResponse with calculated metrics
    """
    try:
        # Get platform to extract creator split
        platform = next(
            (p for p in PLATFORMS_DATA if p["id"] == request.platform_id), None
        )
        if not platform:
            raise HTTPException(status_code=404, detail=f"Platform not found")

        # Revenue calculations
        total_hours = (request.dau * 1_000_000 * request.session) / 60
        total_impressions = total_hours * request.ad_load
        daily_revenue = (total_impressions / 1000) * request.cpm
        creator_revenue = daily_revenue * (platform["creatorSplit"] / 100)
        platform_net = daily_revenue - creator_revenue
        annual_run_rate = (daily_revenue * 365) / 1_000_000_000

        return SimulatorResponse(
            total_hours=total_hours,
            total_impressions=total_impressions,
            daily_revenue=daily_revenue,
            annual_run_rate=annual_run_rate,
            creator_revenue=creator_revenue,
            platform_net=platform_net,
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Simulator error: {str(e)}")
        raise HTTPException(status_code=500, detail="Simulator calculation failed")


# ═══════════════════════════════════════════════════════════════════
# ERROR HANDLERS
# ═══════════════════════════════════════════════════════════════════


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler."""
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )


# ═══════════════════════════════════════════════════════════════════
# RUN APPLICATION (for local development)
# ═══════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=os.getenv("ENVIRONMENT") != "docker",
    )
