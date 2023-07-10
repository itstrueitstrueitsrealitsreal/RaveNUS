import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Auth(props) {
  console.log('Auth Component called');

  const navigate = useNavigate();

  const navigateToStart = () => {
    navigate('/');
  };

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = async () => {
    signOut(auth).then(() => {
      console.log('signed out');
      alert('Successfully signed out. Redirecting you to start page...');
    }).catch((error) => console.log(error));
    navigateToStart();
  };

  return (
    <div>
      { authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <>
            <Button onClick={userSignOut} name="Sign In" variant="primary">Sign Out</Button>
            {' '}
          </>
        </>
      ) : (
        <div>
          <p>Signed Out</p>
        </div>
      ) }
    </div>
  );
}

export default Auth;
