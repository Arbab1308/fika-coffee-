from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Reservation Models
class ReservationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    date: str  # Format: YYYY-MM-DD
    time: str  # Format: HH:MM
    guests: int = Field(..., ge=1, le=20)
    special_requests: Optional[str] = Field(default="", max_length=500)

class Reservation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    date: str
    time: str
    guests: int
    special_requests: str = ""
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Menu item models
class MenuItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    price: Optional[float] = None
    category: str
    description: Optional[str] = ""
    dietary: Optional[List[str]] = []

# Contact form model
class ContactMessage(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=1000)

class ContactMessageResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Routes
@api_router.get("/")
async def root():
    return {"message": "Fika Coffee API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Reservation endpoints
@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(reservation: ReservationCreate):
    """Create a new reservation"""
    reservation_obj = Reservation(**reservation.model_dump())
    doc = reservation_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.reservations.insert_one(doc)
    return reservation_obj

@api_router.get("/reservations", response_model=List[Reservation])
async def get_reservations():
    """Get all reservations"""
    reservations = await db.reservations.find({}, {"_id": 0}).to_list(1000)
    for res in reservations:
        if isinstance(res['created_at'], str):
            res['created_at'] = datetime.fromisoformat(res['created_at'])
    return reservations

@api_router.get("/reservations/{reservation_id}", response_model=Reservation)
async def get_reservation(reservation_id: str):
    """Get a specific reservation"""
    reservation = await db.reservations.find_one({"id": reservation_id}, {"_id": 0})
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    if isinstance(reservation['created_at'], str):
        reservation['created_at'] = datetime.fromisoformat(reservation['created_at'])
    return reservation

# Contact endpoints
@api_router.post("/contact", response_model=ContactMessageResponse)
async def submit_contact(message: ContactMessage):
    """Submit a contact message"""
    msg_obj = ContactMessageResponse(**message.model_dump())
    doc = msg_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_messages.insert_one(doc)
    return msg_obj

# Menu endpoint (returns static menu data)
@api_router.get("/menu")
async def get_menu():
    """Get the full menu"""
    return {"categories": MENU_DATA}

# Static menu data
MENU_DATA = {
    "Fresh Squeeze": [
        {"name": "Watermelon Juice", "price": 250},
        {"name": "Orange Juice", "price": 320},
        {"name": "Classic Lemonade", "price": 250},
        {"name": "ABC", "price": 320}
    ],
    "Cold": [
        {"name": "Iced Americano", "price": 290},
        {"name": "Iced Latte", "price": 350},
        {"name": "Espresso Tonic", "price": 280},
        {"name": "Iced Mocha", "price": 320},
        {"name": "Classic Cold Coffee", "price": 350},
        {"name": "Cold Brew", "price": 290},
        {"name": "Vietnamese Mocha Cloud", "price": 350},
        {"name": "Cold Brew Tonic", "price": 350},
        {"name": "Cold Brew Juice", "price": 350}
    ],
    "Hot": [
        {"name": "Espresso", "price": 210},
        {"name": "Macchiato", "price": 290},
        {"name": "Americano", "price": 290},
        {"name": "Cortado", "price": 350},
        {"name": "Flat White", "price": 350},
        {"name": "Café Latte", "price": 290},
        {"name": "Cappuccino", "price": 290},
        {"name": "Mocha", "price": 290},
        {"name": "Hot Chocolate", "price": 350}
    ],
    "Specials": [
        {"name": "Vietnamese Coffee", "price": 380},
        {"name": "Mazagran (Portugal)", "price": 380},
        {"name": "Matcha Latte", "price": 350},
        {"name": "Mango Matcha Latte", "price": 450},
        {"name": "Tiramisu Iced Latte", "price": 520}
    ],
    "Manual Brew": [
        {"name": "French Press", "price": 400},
        {"name": "Pour Over", "price": 380}
    ],
    "Affogato": [
        {"name": "Chocolate Malabar", "price": 420},
        {"name": "Vanilla", "price": 320},
        {"name": "Salted Caramel", "price": 350}
    ],
    "Spill The Tea": [
        {"name": "Masala Chai", "price": 220},
        {"name": "Ginger Honey Lemon Tea", "price": 200},
        {"name": "Lemon Iced Tea", "price": 260}
    ],
    "All Day Breakfast": [
        {"name": "Turkish Eggs", "price": 420},
        {"name": "Chorizo Egg Benedict", "price": 480},
        {"name": "French Toast", "price": 430},
        {"name": "French Omelette", "price": 450},
        {"name": "Ros Omelette", "price": 450},
        {"name": "Fika Full House Brekkin", "price": 590},
        {"name": "Shake Shake Shuka", "price": 430},
        {"name": "Sunny Side Up", "price": 420},
        {"name": "Classic Scrambled Eggs", "price": 400},
        {"name": "English Breakfast Platter", "price": 490}
    ],
    "Wafflin Around": [
        {"name": "Classic Waffles", "price": 380},
        {"name": "Sea Salt Chocolate", "price": 450}
    ],
    "Ssup Hot Cakes": [
        {"name": "Tiramisu Pancake", "price": 450},
        {"name": "Banana Brulee Pancake", "price": 430},
        {"name": "Classic Pancake", "price": 420, "description": "with choice of honey maple"}
    ],
    "Burgers": [
        {"name": "Cottage Surprise", "price": 520},
        {"name": "Veg Mania Burger", "price": 520},
        {"name": "Nashville Fried Chicken", "price": 540},
        {"name": "American Cowboy", "price": 540}
    ],
    "House Classics": [
        {"name": "Bombay Bachelor Sandwich", "price": 320},
        {"name": "Avocado Caprese", "price": 475},
        {"name": "Mustard Chicken", "price": 450},
        {"name": "Vegetable Club", "price": 350},
        {"name": "Chicken Lemon Herb", "price": 650}
    ],
    "Toasties": [
        {"name": "Cucumber Cheese Toast", "price": 320},
        {"name": "PBC Toast", "price": 350},
        {"name": "Avo Guacamole Toast", "price": 480},
        {"name": "Shrooms Toast", "price": 380},
        {"name": "Panzanella", "price": 380},
        {"name": "Nutella Banana Toastie", "price": 380},
        {"name": "Chilli Cheese Garlic", "price": 380}
    ],
    "Sourdough Sammy": [
        {"name": "Korean Sourdough Sammy", "price": 520},
        {"name": "Birria Chicken Cheese Skirt", "price": 540},
        {"name": "Mushroom Caramelized Onion Grilled Cheese", "price": 480}
    ],
    "Smoothie Bowl": [
        {"name": "Tropical Mango Blueberry", "price": 440},
        {"name": "Berry Blast", "price": 460},
        {"name": "Coco Peanut (Vegan)", "price": 480},
        {"name": "Espresso Dates", "price": 460}
    ],
    "Pizza Palooza": [
        {"name": "Classic Margarita", "price": 620},
        {"name": "Farmville", "price": 620},
        {"name": "Greek Souvlaki Chicken", "price": 650},
        {"name": "Classic Pepperoni / Chorizo Hot Honey", "price": 750},
        {"name": "Goat", "price": 680}
    ],
    "Bowls": [
        {"name": "Burrito", "price": 450, "description": "Mexican vegetarian"},
        {"name": "Hakka Noodles", "price": 450, "dietary": ["veg", "non-veg"]},
        {"name": "Chef Special Wok Noodles", "price": 480, "dietary": ["veg", "non-veg"]},
        {"name": "Manchurian", "price": 420, "dietary": ["veg", "non-veg"]}
    ],
    "Pasta": [
        {"name": "Penné Allá Romanía", "price": 400, "dietary": ["veg", "non-veg"]},
        {"name": "Penné Rossé Vivo", "price": 450, "dietary": ["veg", "non-veg"]},
        {"name": "Penné Rosé", "price": 430, "dietary": ["veg", "non-veg"]},
        {"name": "Penné Al Basilicó", "price": 420, "dietary": ["veg", "non-veg"]},
        {"name": "Spaghetti Aglio É Olio Classico", "price": 530, "dietary": ["veg", "non-veg"]},
        {"name": "Spaghetti Alla Créme", "price": 550, "dietary": ["veg", "non-veg"]},
        {"name": "Spaghetti Al Pomodoro", "price": 530, "dietary": ["veg", "non-veg"]},
        {"name": "Mac And Cheese", "price": 420, "dietary": ["veg", "non-veg"]}
    ],
    "Tapas": [
        {"name": "Creole Lime Chicken Bite", "price": 420},
        {"name": "Skillet Nachos", "price": 440, "dietary": ["veg", "non-veg"]},
        {"name": "Pumpkin Borani", "price": 470},
        {"name": "Mediterranean Hummus", "price": 450},
        {"name": "Mezze Platter", "price": 550, "dietary": ["veg", "non-veg"]}
    ],
    "Mighty Munchies": [
        {"name": "Korean Cream Cheese Garlic Bun", "price": 350},
        {"name": "Cracked Potatoes", "price": 350},
        {"name": "Togarashi Avo Taco With Spicy Pina Salsa", "price": 480},
        {"name": "Queso Fries", "price": 420},
        {"name": "Fries Carnival", "price": 430},
        {"name": "KFC", "price": 450},
        {"name": "Jalapeno Cheese Bombs", "price": 420},
        {"name": "Vegetable Cigar Roll", "price": 370},
        {"name": "Chicken Cigar Roll", "price": 450},
        {"name": "Classic Fries", "price": 350},
        {"name": "Chicken Nuggets", "price": 450},
        {"name": "Truffle Fries", "price": 470}
    ],
    "Salad Bar": [
        {"name": "Waldorf Salad", "price": 450},
        {"name": "Caesar Salad", "price": 480},
        {"name": "Mediterranean Chickpea Salad", "price": 450},
        {"name": "Melon Bliss Salad", "price": 360},
        {"name": "Quinoa & Grilled Cottage Cheese", "price": 380},
        {"name": "Quinoa & Smoked Chicken", "price": 380}
    ],
    "Indian Affair": [
        {"name": "Shahi Paneer", "price": 450},
        {"name": "Subz Miloni", "price": 390},
        {"name": "Kadhai Paneer", "price": 420},
        {"name": "Murgh Makhani", "price": 620},
        {"name": "Kadhai Chicken", "price": 480},
        {"name": "Railway Chicken Curry", "price": 480},
        {"name": "Nizami Dal", "price": 420},
        {"name": "Dal Makhani", "price": 470}
    ],
    "Sides and Staples": [
        {"name": "Roasted Papad (2 PCS)", "price": 55},
        {"name": "Green Salad", "price": 190},
        {"name": "Pudina Raita", "price": 175},
        {"name": "Boondi Raita", "price": 159},
        {"name": "Mix Veg Raita", "price": 199},
        {"name": "Tawa Roti", "price": 65},
        {"name": "Butter Roti", "price": 75},
        {"name": "Tawa Paratha", "price": 100},
        {"name": "Laccha Paratha", "price": 150},
        {"name": "Steamed Rice", "price": 240},
        {"name": "Jeera Rice", "price": 220},
        {"name": "Vegetable Pulao", "price": 250},
        {"name": "Masala Khichdi", "price": 320}
    ],
    "Desserts": [
        {"name": "Walnut & Banana Cake", "price": None},
        {"name": "Chocolate Marble Cake", "price": None},
        {"name": "Chocolate Muffin", "price": None},
        {"name": "Tiramisu", "price": None},
        {"name": "Sea Salt Chocolate Cookies", "price": None},
        {"name": "Peanut Butter Cookies", "price": None}
    ],
    "Pawsome": [
        {"name": "Boiled Chicken", "price": 250},
        {"name": "Steamed Rice With Milk", "price": 250},
        {"name": "Boiled Eggs With Rice", "price": 250},
        {"name": "Boiled Vegetable Bowl", "price": 200}
    ]
}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
