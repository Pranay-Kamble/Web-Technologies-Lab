import React from 'react';

function StudentCard(props) {
  return (
    <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px', width: '250px' }}>
      <h3>{props.name}</h3>
      <p>Department: {props.department}</p>
      <p>Marks: {props.marks}</p>
    </div>
  );
}

function Exercise2() {
  return (
    <div>
      <h2>Student Cards</h2>
      <StudentCard name="Pranay Kamble" department="CSE" marks="95" />
      <StudentCard name="Arun Kumar" department="ECE" marks="88" />
      <StudentCard name="Rohit Sharma" department="Sports" marks="82" />
    </div>
  );
}

export default Exercise2;