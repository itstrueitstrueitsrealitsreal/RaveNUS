import React, { useState, useEffect } from "react";
import Rec from "../components/rec/Rec";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import { db } from "../components/firebase";
import { collection, getDocs } from "firebase/firestore";
// for geopoint queries
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';

function Recommendation(props) {
  console.log("Recommendation Page called");

  const navigate = useNavigate();

  const navigateToNewRec = () => {
      navigate('/recommendation');
  }

  // Create a Firestore reference
  const firestore = firebase.firestore();

  // Create a GeoFirestore reference
  const GeoFirestore = geofirestore.initializeApp(firestore);

  // Create a GeoCollection reference
  const geocollection = GeoFirestore.collection('eateries');

  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });

  const [eatery, setEatery] = useState(null);

  useEffect(() => {
    // Function to get the user's location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
    getLocation();
  }, []);

// Add a GeoDocument to a GeoCollection
// geocollection.add({
//   name: 'Terrace',
//   // The coordinates field must be a GeoPoint!
//   coordinates: new firebase.firestore.GeoPoint(Number(1.29455), Number(103.774223))
// })

  // Create a GeoQuery based on a location
  const query = geocollection.near({ center: new firebase.firestore.GeoPoint(Number(userLocation.latitude), Number(userLocation.longitude)), radius: 600 });

  // Get query (as Promise)
  query.get().then((value) => {
    // All GeoDocument returned by GeoQuery, like the GeoDocument added above
    console.log(value.docs);
    const eateries = value.docs;
    const sortedEateries = eateries.sort( 
      (e1, e2) => {
        return e1.distance - e2.distance;
      }
    );
    const eateryId = {
      id: sortedEateries[0].id
    }

    console.log(eateryId);
    // setEatery(eatery);
  });


  const location = {
    address: 'Computing Drive',
    lat: 1.2944816303761464, 
    lng: 103.77255175825597
  }

  const cont = (
    <div>
      <h1>The Deck</h1>
      <MapComponent location={location}/>
      <Rec recPage={navigateToNewRec}/>
    </div> )

  return <Navbar content={cont} />
}

export default Recommendation;