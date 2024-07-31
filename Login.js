import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement authentication logic here
    navigate('/dashboard');
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Account ID:
          <input type="text" value={accountId} onChange={(e) => setAccountId(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;