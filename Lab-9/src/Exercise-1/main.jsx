import React from 'react';

function Exercise1() {
  const name = "Pranay Kamble";
  const department = "B.Tech Computer Science";
  const year = "3rd Year";
  const section = "A";

  return (
    <div>
      <h2>Student Profile</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Section:</strong> {section}</p>
    </div>
  );
}

export default Exercise1;