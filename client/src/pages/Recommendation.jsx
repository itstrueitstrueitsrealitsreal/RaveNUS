import React, { useState, useEffect } from "react";
import Rec from "../components/rec/Rec";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import { db } from "../components/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
// for geopoint queries
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import Spinner from 'react-bootstrap/Spinner';

function Recommendation(props) {
  console.log("Recommendation Page called");

  const navigate = useNavigate();

  const eateryCollection = "eateries"

  const navigateToNewRec = () => {
      navigate('/recommendation');
  }

  const findEatery = async (id) => {
    if (id) {
      const d = await getDoc(doc(db, eateryCollection, id));
      console.log(d.data());
      return d.data();
    }
  }

  // Create a Firestore reference
  const firestore = firebase.firestore();

  // Create a GeoFirestore reference
  const GeoFirestore = geofirestore.initializeApp(firestore);

  // Create a GeoCollection reference
  const geocollection = GeoFirestore.collection('eateries');

  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });

  const [location, setLocation] = useState(null);

  const [isLoading, setLoading] = useState(true);

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
    const query = geocollection.near({ 
      center: new firebase.firestore.GeoPoint(Number(userLocation.latitude), Number(userLocation.longitude)), radius: 600 
    });
    // Get query (as Promise)
    query.get().then((value) => {
      // All GeoDocument returned by GeoQuery, like the GeoDocument added above
      console.log(value.docs);
      return value.docs;
    }).then((x) => {
      return x.sort(
        (e1, e2) => {
          return e1.distance - e2.distance;
        }
      );
    }).then((x) => {
      if (x[0]) {
        // obtain eatery id
        console.log(x[0].id)
        return x[0].id;
      }
    }).then(findEatery)
    .then((x) => {
      if (x) {
        if (isLoading) {
          setLoading(false);
          console.log(x);
          setLocation( {
            name: x.name,
            coords: {
              lat: Number(x.coordinates._lat),
              lng: Number(x.coordinates._long)
            }
          });
        }
      }
    });

  const ln = {
    name: 'Computing Drive',
    lat: 1.2944816303761464, 
    lng: 103.77255175825597
  }

  const cont = isLoading ? <Spinner /> : (
    <div>
      <h1>{location.name}</h1>
      <MapComponent location={location.coords}/>
      <Rec recPage={navigateToNewRec}/>
    </div> )

  return <Navbar content={cont} />
}

export default Recommendation;