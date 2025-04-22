from fastapi import FastAPI
from database import client, db

app = FastAPI()

@app.on_event("startup")
async def startup_db_client():
    try:
        await client.admin.command('ping')
        print("MongoDB connection successful")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    print("MongoDB connection closed")
