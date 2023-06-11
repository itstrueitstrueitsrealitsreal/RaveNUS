import React from 'react';
import SignIn from '../components/auth/SignIn';
import Auth from '../components/auth/Auth';

function Login(props) {

  return (
      <div className="Login">
        <SignIn render={props.render}/>
        <Auth />
      </div>
  );
}

export default Login;