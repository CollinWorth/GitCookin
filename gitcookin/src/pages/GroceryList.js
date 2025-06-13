import React, { useState, useEffect } from 'react';
import './css/GroceryList.css';

function GroceryList({ user }) {
  const [groceryLists, setGroceryLists] = useState([]); // Holds all grocery lists for user
  const [newItem, setNewItem] = useState(''); // Input for new item
  const [selectedListId, setSelectedListId] = useState(null); // Which list to add items to

  // Fetch all grocery lists for this user
  useEffect(() => {
    const fetchGroceryLists = async () => {
      try {
        const response = await fetch(`http://localhost:8000/groceryList/userID/${user.id || user._id}`);
        if (response.ok) {
          const data = await response.json(); // Parse JSON
          setGroceryLists(data); // Set all grocery lists
          if (data.length > 0) {
            setSelectedListId(data[0]._id); // Default to first list
          }
        } else {
          console.error('Failed to fetch grocery lists:', response.statusText);
        }
      } catch (err) {
        console.error('Error fetching grocery lists:', err);
      }
    };

    if (user) {
      fetchGroceryLists();
    }
  }, [user]);

  // Add a new item to the selected list
  const addItem = async () => {
    if (!newItem.trim() || !selectedListId) return;

    try {
      const response = await fetch(`http://localhost:8000/groceryList/${selectedListId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItem.trim(), quantity: 1, category: 'Other', checked: false }),
      });

      if (response.ok) {
        // Update the UI optimistically
        const updatedLists = groceryLists.map((list) => {
          if (list._id === selectedListId) {
            return {
              ...list,
              items: [...list.items, { name: newItem.trim(), quantity: 1, category: 'Other', checked: false }],
            };
          }
          return list;
        });
        setGroceryLists(updatedLists);
        setNewItem('');
      } else {
        console.error('Failed to add item:', response.statusText);
      }
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  // Remove item from list
  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/groceryList/${selectedListId}/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedLists = groceryLists.map((list) => {
          if (list._id === selectedListId) {
            return {
              ...list,
              items: list.items.filter((item) => item._id !== itemId),
            };
          }
          return list;
        });
        setGroceryLists(updatedLists);
      } else {
        console.error('Failed to remove item:', response.statusText);
      }
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  return (
    <div className="grocery-list-container">
      <h1>Your Grocery Lists</h1>

      {/* Dropdown to switch between lists */}
      {groceryLists.length > 0 && (
        <select onChange={(e) => setSelectedListId(e.target.value)} value={selectedListId}>
          {groceryLists.map((list) => (
            <option key={list._id} value={list._id}>
              {list.name}
            </option>
          ))}
        </select>
      )}

      {/* Add item input */}
      <div className="add-item">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new item"
        />
        <button onClick={addItem} disabled={!selectedListId}>
          Add
        </button>
      </div>

      {/* Display items of selected list */}
      <div className="grocery-list">
        {selectedListId &&
          groceryLists
            .filter((list) => list._id === selectedListId)
            .map((list) => (
              <div key={list._id}>
                <h2>{list.name}</h2>
                {list.items.length > 0 ? (
                  <ul>
                    {list.items.map((item, idx) => (
                      <li key={item._id || idx} className="grocery-item">
                        {item.name} ({item.quantity})
                        <button className="remove-item" onClick={() => removeItem(item._id)}>
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No items in this list yet.</p>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}

export default GroceryList;