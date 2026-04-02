import React from 'react';
import Exercise1 from './Exercise1';
import Exercise2 from './Exercise2';
import Exercise3 from './Exercise3';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Lab Sheet 10: React JS Advanced</h1>
      
      <br /><br />
      <h3>Exercise 1: Form Validation Output</h3>
      <Exercise1 />
      
      <br /><br />
      <h3>Exercise 2: Dynamic List Output</h3>
      <Exercise2 />
      
      <br /><br />
      <h3>Exercise 3: API Fetch Output</h3>
      <Exercise3 />
      
    </div>
  );
}

export default App;