import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Auth from './Auth';

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