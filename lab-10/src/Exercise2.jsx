import React, { useState } from 'react';

function Exercise2() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      const newItem = {
        id: Date.now(),
        text: inputValue
      };
      setItems([...items, newItem]);
      setInputValue('');
    }
  };

  const handleRemoveItem = (idToRemove) => {
    const updatedItems = items.filter(item => item.id !== idToRemove);
    setItems(updatedItems);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Task List</h2>
      
      <div>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Enter a new task"
        />
        <button onClick={handleAddItem}>Add Task</button>
      </div>

      {items.length === 0 ? (
        <p>No tasks available. Please add some!</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} style={{ margin: '5px 0' }}>
              {item.text} 
              <button 
                onClick={() => handleRemoveItem(item.id)} 
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Exercise2;