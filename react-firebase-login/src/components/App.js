import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Auth from './auth/Auth';


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
