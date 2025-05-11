from fastapi import APIRouter, HTTPException
from database import db


router = APIRouter()

@router.get("/users")
async def get_users():
    users = await db.users.find().to_list(1000)
    return users

@router.post("/users")
async def create_user(user: dict):
    if not user.get("username") or not user.get("email"):
        raise HTTPException(status_code=400, detail="Username and email are required")
    
    existing_user = await db.users.find_one({"username": user["username"]})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    result = await db.users.insert_one(user)
    return {"id": str(result.inserted_id), "message": "User created successfully"}
