import React from 'react';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import Auth from '../components/auth/Auth';

function Login() {
  return (
      <div className="Login">
        <SignIn />
        <SignUp />
        <Auth />
      </div>
  );
}

export default Login;