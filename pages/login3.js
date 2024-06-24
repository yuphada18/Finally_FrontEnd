// components/LoginForm.js

import React from 'react';

const login3 = () => {
  return (
    <div style={containerStyle}>
      <div style={loginFormStyle}>
        <h2 style={titleStyle}>LoginForm</h2>
        <form>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email or Phone</label>
            <input type="text" name="emailOrPhone" required style={inputStyle} />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input type="password" name="password" required style={inputStyle} />
          </div>
          <div style={forgotPasswordStyle}>
            <a href="#" style={linkStyle}>Forgot Password?</a>
          </div>
          <button type="submit" style={loginButtonStyle}>Login</button>
          <div style={signupStyle}>
            <span>Not a member? </span>
            <a href="#" style={linkStyle}>Signup now</a>
          </div>
        </form>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(45deg, #00dbde, #fc00ff)',
};

const loginFormStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '0px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  width: '300px',
  textAlign: 'center',
};

const titleStyle = {
  marginBottom: '20px',
  fontWeight: 'bold',
};

const inputGroupStyle = {
  marginBottom: '15px',
  textAlign: 'left',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const forgotPasswordStyle = {
  textAlign: 'left',
  marginBottom: '20px',
};

const linkStyle = {
  color: '#0070f3',
  textDecoration: 'none',
};

const loginButtonStyle = {
  background: 'linear-gradient(45deg, #00dbde, #fc00ff)',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '100%',
};

const signupStyle = {
  marginTop: '20px',
};

export default login3;
