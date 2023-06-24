import React, { useState, useEffect } from "react";
import Rec from "../components/rec/Rec";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import { db } from "../components/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
// for geopoint queries
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from "react-bootstrap";

function Recommendation(props) {
  console.log("Recommendation Page called");

  // page navigation
  const navigate = useNavigate();
  const navigateToNewRec = () => {
      setLoading(true);
      const nav = "/recommendation/" + uid;
      navigate(nav);
  }

  // current userID
  const url = useLocation();
  const uid = url.pathname.split("/")[2];

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

  // get Eatery
  const findEatery = async (id) => {
    if (id) {
      const d = await getDoc(doc(db, "eateries", id));
      return {...d.data(), id: d.id};
    }
  }

  // Stall recommendation
  const [recStalls, setRecStalls] = useState(null);
  const [recStall, setRecStall] = useState(null);
  const findStalls = async (id) => {
    if (id) {
      const stallsPath = "eateries/" + id + "/Stalls/";
      const stallsData = await getDocs(collection(db, stallsPath));
      const allStalls = stallsData.docs.map((doc) => ({
        key: doc.id, ...doc.data(), id: doc.id, eateryID: id
      }));
      // filter out the stalls with either no rating or rating >= 3
      const stallsWithoutRating = allStalls.filter((s) => s.rating === null);
      const stallsWithRating = allStalls.filter((s) => s.rating !== null)
          .filter((s) => s.rating >= 3);
      const recStalls = [...stallsWithoutRating, ...stallsWithRating];
      return recStalls;
    }
  }
  // get recStall reviews
  const [revs, setRevs] = useState(null);
  const getRevs = async (path) => {
    // getting reviews
    console.log("Reviews getRev called");
    const data = await getDocs(collection(db, path));
    const allRevs = data.docs.map((doc) => ({key: doc.id, ...doc.data(), id: doc.id}));
    return allRevs;
  }

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
  .then((eatery) => {
    if (eatery) {
      if (isLoading) {
        setLocation( {
          name: eatery.name,
          coords: {
            lat: Number(eatery.coordinates._lat),
            lng: Number(eatery.coordinates._long)
          }
        });
      }
      console.log("eatery id:  " + eatery.id)
      return eatery.id
    }
  }).then(findStalls).then((stalls) => {
    if (stalls) {
      if (isLoading) {
        setRecStalls(stalls);
        const randomIndex = Math.floor(Math.random() * stalls.length);
        const recStall = stalls[randomIndex];
        setRecStall(recStall);
        return "eateries/" + recStall.eateryID + "/Stalls/" + recStall.id + "/reviews";
      }
    }
  }).then(getRevs).then((revs) => {
    if (revs) {
      if (isLoading) {
        setRevs(revs);
        setLoading(false);
      }
    }
    setLoading(false);
  });

  const ln = {
    name: 'Computing Drive',
    lat: 1.2944816303761464, 
    lng: 103.77255175825597
  }

  // number of reviews limit, default 10
  const [limit, setLimit] = useState(10);

  // Page content
  const cont = isLoading ? <Spinner /> : (
    <div>
      <h1>{location.name}</h1>
      <MapComponent location={location.coords}/>
      <br />
      {/* Increase number of reviews by 10 */}
      <Button onClick={() => {setLimit(limit + 10)}}>load more reviews</Button>
      <Rec stall={recStall} recPage={navigateToNewRec} revs={revs} limit={limit} viewerUID={uid}/>
    </div> )

  return <Navbar content={cont} />
}

export default Recommendation;