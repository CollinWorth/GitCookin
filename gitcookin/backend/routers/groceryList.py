from fastapi import APIRouter, HTTPException
from model import GroceryList, GroceryItem
from bson import ObjectId
from database import grocery_collection

router = APIRouter()

def convert_object_ids(doc):
    """
    Recursively converts any ObjectId fields in a MongoDB document to strings.
    """
    if isinstance(doc, list):
        return [convert_object_ids(item) for item in doc]
    elif isinstance(doc, dict):
        return {key: convert_object_ids(value) for key, value in doc.items()}
    elif isinstance(doc, ObjectId):
        return str(doc)
    else:
        return doc


# Create a new grocery list
@router.post("/")
def create_grocery_list(grocery: GroceryList):
    grocery_dict = grocery.dict(by_alias=True)
    grocery_dict["user_id"] = ObjectId(grocery_dict["user_id"])
    result = grocery_collection.insert_one(grocery_dict)
    if not result:
        raise HTTPException(status_code=500, detail="Failed to create grocery list")
    else:
        return {"message": "List created"}
    

@router.get("/userID/{user_id}")
async def get_grocery_lists_userID(user_id: str):
    try:
        user_obj_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Invalid user ID format")
    
    grocery_lists = await grocery_collection.find({"user_id": user_obj_id}).to_list(length=100)

    return convert_object_ids(grocery_lists)
    
    

# Get a grocery list by its ID
@router.get("/listID/{grocery_list_id}")
async def get_grocery_list_listID(grocery_list_id: str):
    try:
        obj_id = ObjectId(grocery_list_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid grocery list ID format")

    grocery_list = await grocery_collection.find_one({"_id": obj_id})
    if not grocery_list:
        raise HTTPException(status_code=404, detail="Grocery list not found")

    return convert_object_ids(grocery_list)

# Add a new grocery item to the list
@router.put("/{grocery_list_id}")
def add_grocery_item(grocery_list_id: str, item: GroceryItem):
    grocery_list = grocery_collection.find_one({"_id": ObjectId(grocery_list_id)})
    if not grocery_list:
        raise HTTPException(status_code=404, detail="Grocery list not found")
    
    item_dict = item.dict(by_alias=True)
    item_dict["_id"] = ObjectId()  # Generate a new ObjectId for the item
    grocery_collection.update_one(
        {"_id": ObjectId(grocery_list_id)},
        {"$push": {"items": item_dict}}
    )
    item_dict["_id"] = str(item_dict["_id"])  # Convert ObjectId to string for the response
    return {"message": "Item added to grocery list", "item": item_dict}

# Delete a grocery item from the list
@router.delete("/{grocery_list_id}/{item_id}")
def delete_grocery_item(grocery_list_id: str, item_id: str):
    grocery_list = grocery_collection.find_one({"_id": ObjectId(grocery_list_id)})
    if not grocery_list:
        raise HTTPException(status_code=404, detail="Grocery list not found")
    
    result = grocery_collection.update_one(
        {"_id": ObjectId(grocery_list_id)},
        {"$pull": {"items": {"_id": ObjectId(item_id)}}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Item not found in grocery list")
    
    return {"message": "Item deleted from grocery list"}


