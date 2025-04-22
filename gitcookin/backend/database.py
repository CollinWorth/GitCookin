from fastapi import FastAPI
import motor.motor_asyncio

uri = "mongodb+srv://collin:colldub@cookindb.wcbu46g.mongodb.net/?retryWrites=true&w=majority&appName=cookindb"
client = motor.motor_asyncio.AsyncIOMotorClient(uri)
db = client.myDatabase





