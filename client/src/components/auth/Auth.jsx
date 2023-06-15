import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from '../../pages/SignIn';
import Navbar from "../Navbar";

const Auth = (props) => {
    const [authUser, setAuthUser] = useState(null);

    console.log("Auth Component called");

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
                alert("Successfully signed out. Redirecting you to login page...");
                // props.logout();
            }).catch(error => console.log(error));
        };

  return (
    <div>
        { authUser ? <><p>{`Signed In as ${authUser.email}`}</p>
        <>
        <Button onClick={userSignOut} name="Sign In" variant="primary">Sign Out</Button>{' '}
        </>
        <div className="App">
            <Router>
            <Navbar />
            </Router>
        </div>
        </> : <div><p>Signed Out</p>
        <SignIn />
        </div> }
    </div>
  );
};

export default Auth;