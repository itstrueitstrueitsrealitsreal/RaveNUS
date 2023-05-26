import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Auth from './components/Auth';


function App() {
  return (
      <div className="App">
        <SignIn />
        <SignUp />
        <Auth />
      </div>
  );

}

export default App;
