import { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Assuming you have already set up Firebase Authentication in your app

const UserID = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up the listener
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    user ? (
      user.uid
    ) : (
      "User is signed out."
    )
  );
};

export default UserID;
