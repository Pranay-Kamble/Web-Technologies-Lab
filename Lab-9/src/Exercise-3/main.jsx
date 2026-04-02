import React, { useState } from 'react';

function Exercise3() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>Counter System</h2>
      <p>Current Value: {count}</p>
      
      <button onClick={handleIncrement} style={{ marginRight: '10px' }}>
        Increase
      </button>
      
      <button onClick={handleDecrement}>
        Decrease
      </button>
    </div>
  );
}

export default Exercise3;