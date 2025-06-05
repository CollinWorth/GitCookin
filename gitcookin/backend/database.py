from fastapi import FastAPI
import motor.motor_asyncio

uri = "mongodb+srv://collin:colldub@cookindb.wcbu46g.mongodb.net/?retryWrites=true&w=majority&appName=cookindb"
client = motor.motor_asyncio.AsyncIOMotorClient(uri)
db = client.cookindb
recipes_collection = db.recipes
users_collection = db.users
mealPlans_collection = db.mealPlans





