import React, { useState } from 'react';
// import HeroImage from "../components/HeroImage";
import CenteredHero from '../components/CenteredHero';
import Navbar from '../components/Navbar';
import { auth, authForFirebaseUI } from '../components/firebase';

function Home(props) {
  console.log('Home Page called');

  // current userID
  const [uid, setUid] = useState(null);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUid(authForFirebaseUI.currentUser.uid);
    } else {
      window.location.reload();
    }
  });

  // Page content
  const cont = (
    <div>
      {/* <HeroImage /> */}
      <CenteredHero recPage={`/recommendation/${uid}`} />
    </div>
  );

  return <Navbar content={cont} />;
}

export default Home;
