import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Auth = () => {
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
            }
    }, []);

        const userSignOut = () => {
            signOut(auth).then(() => {
                console.log('signed out');
                // alert("Successfully signed out. Redirecting you to login page...");
            }).catch(error => console.log(error));
        };

  return (
    <div>
        { authUser ? <><p>{`Signed In as ${authUser.email}`}</p>
        <>
        <Button onClick={userSignOut} name="Sign In" variant="primary">Sign Out</Button>{' '}
        </>
        </> : <p>Signed Out</p>}
    </div>
  );
};

export default Auth;