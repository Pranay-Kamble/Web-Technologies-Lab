import React, { useState } from 'react';

function Exercise1() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    let validationErrors = {};

    if (!name.trim()) validationErrors.name = "Name is required.";
    if (!email.trim() || !email.includes('@')) validationErrors.email = "Valid email is required.";
    if (!password.trim()) validationErrors.password = "Password is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
      
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>User Registration Form</h2>
      {success && <p style={{ color: 'green' }}>Form submitted successfully!</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name: </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          {errors.name && <p style={{ color: 'red', margin: '0' }}>{errors.name}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          {errors.email && <p style={{ color: 'red', margin: '0' }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {errors.password && <p style={{ color: 'red', margin: '0' }}>{errors.password}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Exercise1;