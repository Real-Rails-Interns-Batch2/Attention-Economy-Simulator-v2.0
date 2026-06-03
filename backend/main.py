
import json
import os
import logging
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="POC-45 Revenue Simulator API")

# Load Data from data.json
def load_data():
    file_path = os.path.join(os.path.dirname(__file__), 'data.json')
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"platforms": [], "verticals": []}

data = load_data()
PLATFORMS_DATA = data.get("platforms", [])
VERTICAL_CPMS_DATA = data.get("verticals", [])

# CORS Configuration
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
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

# API Routes
@app.get("/api/platforms", response_model=List[Platform])
async def get_platforms():
    return PLATFORMS_DATA

@app.get("/api/platforms/{platform_id}", response_model=Platform)
async def get_platform(platform_id: str):
    platform = next((p for p in PLATFORMS_DATA if p["id"] == platform_id), None)
    if not platform:
        raise HTTPException(status_code=404, detail="Platform not found")
    return platform

@app.get("/api/cpm-verticals", response_model=List[VerticalCPM])
async def get_cpm_verticals():
    return VERTICAL_CPMS_DATA

@app.post("/api/simulator", response_model=SimulatorResponse)
async def run_simulator(request: SimulatorRequest):
    platform = next((p for p in PLATFORMS_DATA if p["id"] == request.platform_id), None)
    if not platform:
        raise HTTPException(status_code=404, detail="Platform not found")
    
    # Synthetic logic: Calculations based on user input
    total_hours = (request.dau * 1_000_000 * request.session) / 60
    total_impressions = total_hours * request.ad_load
    daily_revenue = (total_impressions / 1000) * request.cpm
    
    # Using the split percentage defined in platform data
    creator_split_pct = platform.get("creatorSplit", 50)
    creator_revenue = daily_revenue * (creator_split_pct / 100)
    platform_net = daily_revenue - creator_revenue
    annual_run_rate = (daily_revenue * 365) / 1_000_000_000
    
    return SimulatorResponse(
        total_hours=total_hours,
        total_impressions=total_impressions,
        daily_revenue=daily_revenue,
        annual_run_rate=annual_run_rate,
        creator_revenue=creator_revenue,
        platform_net=platform_net
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
