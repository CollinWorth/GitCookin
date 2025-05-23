from fastapi import APIRouter, HTTPException
from database import recipes_collection
from model import Recipe
from bson import ObjectId


router = APIRouter()

def recipe_to_json(recipe):
    recipe = dict(recipe)
    if "_id" in recipe:
        recipe["_id"] = str(recipe["_id"])
    if "user_id" in recipe and isinstance(recipe["user_id"], ObjectId):
        recipe["user_id"] = str(recipe["user_id"])
    # If you have ObjectId in ingredients, convert those too
    if "ingredients" in recipe:
        for ing in recipe["ingredients"]:
            if "recipe_id" in ing and isinstance(ing["recipe_id"], ObjectId):
                ing["recipe_id"] = str(ing["recipe_id"])
    return recipe

@router.get("/")
async def get_recipes():
    recipes = await recipes_collection.find().to_list(1000)
    return recipes

@router.post("/")
async def create_recipe(recipe: Recipe):
    try:
        await recipes_collection.insert_one(recipe.dict())
        return {"message": "Recipe created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating recipe: {str(e)}")

@router.get("/user/{user_id}")
async def get_recipes_by_user(user_id: str):
    try:
        user_obj_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user_id format")
    try:
        recipes = await recipes_collection.find({"user_id": user_obj_id}).to_list(1000)
        # Convert ObjectId fields to strings
        return [recipe_to_json(r) for r in recipes]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching recipes: {str(e)}")

