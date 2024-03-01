import React, { useState } from 'react';

export default function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log('Login clicked');
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your login logic here
  };

  const handleSignup = () => {
    console.log('Signup clicked');
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your signup logic here
  };

  return (
    <div>
      <div id="login">
        <div className="header">
          <h1>Profile</h1>
        </div>
        <form>
          <div className="group">
            <input
              id="txtEmail"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <label>Email</label>
          </div>
          <div className="group">
            <input
              id="txtPassword"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label>Password</label>
          </div>
          <button
            id="btnLogin"
            type="button"
            className="button buttonBlue"
            onClick={handleLogin}
          >
            Log in
          </button>
          <button
            id="btnSignup"
            type="button"
            className="button buttonBlue"
            onClick={handleSignup}
          >
            Sign up
          </button>
        </form>
      </div>

      <div id="app">
        <div className="header">
          <h1>Sign up / Sign in</h1>
        </div>
        <form>
          <div className="group">
            <div id="lblAuthState" className="authlabel"></div>
          </div>
          <button id="btnLogout" type="button" className="button buttonBlue">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
