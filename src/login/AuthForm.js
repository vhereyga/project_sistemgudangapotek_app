import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for admin and user credentials
    const isAdmin = username === 'admin' && password === 'adminpass';
    const isUser = username === 'karyawan' && password === 'userpass';

    if (isAdmin) {
      alert('Admin login successful!');
      navigate('/index');  // Navigate to admin dashboard
    } else if (isUser) {
      alert('User login successful!');
      navigate('/karyawan');  // Navigate to home/dashboard for user
    } else {
      alert('Login failed, please check your username and password');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AuthForm;
