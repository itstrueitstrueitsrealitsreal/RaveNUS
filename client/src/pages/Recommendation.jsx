import React, { useState, useEffect } from 'react';
import Rec from '../components/rec/Rec';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../components/firebase';
import {
  collection, getDocs, getDoc, doc
} from 'firebase/firestore';
// for geopoint queries
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as geofirestore from 'geofirestore';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';
import MapComponent from '../components/MapComponent';
import NUSModerator from 'nusmoderator';

function Recommendation() {
  console.log('Recommendation Page called');

  // page navigation
  const navigate = useNavigate();
  const navigateToNewRec = () => {
    setLoading(true);
    const nav = `/admin/recommendation/${uid}`;
    navigate(nav);
  };

  // current userID
  const url = useLocation();
  const uid = url.pathname.split('/')[3];

  // Create a Firestore reference
  const firestore = firebase.firestore();

  // Create a GeoFirestore reference
  const GeoFirestore = geofirestore.initializeApp(firestore);

  // Create a GeoCollection reference
  const geocollection = GeoFirestore.collection('eateries');

  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  const [location, setLocation] = useState(null);

  const [isLoading, setLoading] = useState(true);

  // function to check if user has created a profile
  const [profileExists, setProfileExists] = useState(false);

  const profileRef = doc(db, 'profile', uid);

  const checkProfile = async (userID) => {
    try {
      console.log(`checking if ${uid}'s profile exists...`);
      const documentSnapshot = await getDoc(profileRef);
      if (documentSnapshot.exists()) {
        console.log(`${uid}'s profile exists`);
        setProfileExists(true);
      } else {
        console.log(`${uid}'s profile does not exist`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (uid !== null) {
    checkProfile(uid);
  }
  // use this for testing
  const today = new Date('2023-08-31T15:24:00');

  // function to check if lesson is ongoing, returns it with lesson data if it is
  const getLessonData = async (data) => {
    const day = today.getDay() == 0 ? 6 : today.getDay() - 1;
    const week = NUSModerator.academicCalendar.getAcadWeekInfo(today).num;
    var time = today.toLocaleString([], {
      hour12: false,
      timeStyle: "short",
    });
    time = time.replace(':', '');
    console.log(time);
    console.log(week);
    console.log(day);
    // if week is an academic week
    if (week && day <= 4) {
      // iterate through all lessons of the day
      for (var i = 0; i < Object.keys(data[day].timetable).length; i++) {
        // if the lesson happens that week, and the time now is between
        // startTime and endTime, return true
        if (data[day].timetable[i].weeks.includes(week) 
          && data[day].timetable[i].startTime <= time 
          && data[day].timetable[i].endTime >= time) {
          return [true, data[day].timetable[i]];
        }
      }
    }
    return [false, null];
  }
  // function to check if location data exists, returns boolean with lat and long
  const getLocationData = async (lesson) => {
    const venueRef = doc(db, 'venues', lesson.venue);
    const venueQuery = (await getDoc(venueRef)).data();
    console.log('venueQuery');
    console.log(venueQuery);
    console
    if (venueQuery && venueQuery.location.x && venueQuery.location.y) {
      console.log([true, venueQuery.location.y, venueQuery.location.x]);
      return [true, Number(venueQuery.location.y), Number(venueQuery.location.x)];
    } 
    return [false, null, null];
  }

  useEffect(() => {
    // Function to get the user's location 
    const getLocation = async () => {
      // read timetable from database
      // if no timetable data, or location has no geolocation data,
      // or no lesson at that time,
      // use user location directly to generate recommendation
      const timetableQuery = await getDoc(profileRef);
      const timetable = timetableQuery.data().Timetable;
      console.log('timetable:');
      console.log(timetable);
      // if timetable data exists and lesson is ongoing
      if (timetable) {
        const [isLessonOngoing, lesson] = await getLessonData(timetable);
        if (isLessonOngoing) {
          const [locationExists, latitude, longitude] = await getLocationData(lesson);
          // if location data for venue exists
          console.log([locationExists, latitude, longitude]);
          if (locationExists) {
            setUserLocation({
              lat: Number(latitude),
              lng: Number(longitude),
            });
          }
        }
      } 
      if (userLocation.latitude === null 
        || userLocation.longitude === null) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                lat: Number(position.coords.latitude),
                lng: Number(position.coords.longitude),
              });
            },
            (error) => {
              console.error('Error getting user location:', error);
            },
          );
        } else {
        console.error('Geolocation is not supported by this browser.');
        }
      }
    };
    getLocation();
    console.log('location:');
    console.log(userLocation);
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
      const d = await getDoc(doc(db, 'eateries', id));
      return { ...d.data(), id: d.id };
    }
  };

  // get Eateries and User
  const getEateriesAndUser = async (ids) => {
    if (ids) {
      const eateries = []
      for (let i = 0; i < ids.length; i++) {
        const eatery = await findEatery(ids[i].id);
        eateries.push(eatery);
      }
      const user = await getUser(uid);
      return {eateries: eateries, user: user};
    }
  }

  // get Halal and Veg
  const getHalalAndVeg = async (info) => {
    if (info) {
      const halal = info.user.Halal;
      const veg = info.user.Vegetarian;
      var eateries = info.eateries;
      if (halal) {
        eateries = eateries.filter((e) => e.halal === halal);
      }
      if (veg) {
        eateries = eateries.filter((e) => e.vegetarian === veg);
      }
      return {eateries: eateries, user: info.user};
    }
  }

  // get User
  const getUser = async (id) => {
    if (id) {
      const d = await getDoc(doc(db, "profile", id)); 
      return {...d.data(), id: d.id};
    }
  }

  // get Stalls
  const getStalls = async (info) => {
    if (info) {
      const eateries = info.eateries;
      const halal = info.user.Halal;
      const veg = info.user.Vegetarian;
      var stalls = [];
      for (let i = 0; i < eateries.length; i++) {
        const s = await findStalls(eateries[i].id);
        stalls.push(s);
      }
      // current time
      const day = today.getDay();
      const hr = today.getHours();
      const min = today.getMinutes();
      const t = hr * 60 + min;
      for (let i = 0; i < stalls.length; i++) {
        // filter by Halal
        if (halal) {
          stalls[i] = stalls[i].filter((s) => s.halal === halal);
        }
        // filter by Vegetarian
        if (veg) {
          stalls[i] = stalls[i].filter((s) => s.vegetarian === veg);
        }
        // filter by Opening Hours
        stalls[i] = stalls[i].filter((s) => t >= s.ophrs[day]).filter((s) => t <= s.ophrs[day + 7]);
      }
      return {eateries: eateries, stalls: stalls, user: info.user};
    }
  }

  // Stall recommendation
  const [recStalls, setRecStalls] = useState(null);
  const [recStall, setRecStall] = useState(null);
  const findStalls = async (id) => {
    if (id) {
      const stallsPath = `eateries/${id}/Stalls/`;
      console.log('Calling findstalls');
      const stallsData = await getDocs(collection(db, stallsPath));
      const allStalls = stallsData.docs.map((doc) => ({
        key: doc.id, ...doc.data(), id: doc.id, eateryID: id,
      }));
      // filter out the stalls with either no rating or rating >= 3
      const stallsWithoutRating = allStalls.filter((s) => s.rating === null);
      const stallsWithRating = allStalls.filter((s) => s.rating !== null)
          .filter((s) => s.rating >= 3);
      var recStalls = [...stallsWithoutRating, ...stallsWithRating];
      return recStalls;
    }
  };
  // get recStall reviews
  const [revs, setRevs] = useState(null);
  const getRevs = async (path) => {
    // getting reviews
    console.log('Reviews getRev called');
    if (path) {
      const data = await getDocs(collection(db, path)).catch((err) => console.log(err));
      const allRevs = data.docs.map((doc) => ({ key: doc.id, ...doc.data(), id: doc.id }));
      return allRevs;
    }
  };

  // Create a GeoQuery based on a location
  const geoQuery = geocollection.near({
    center: new firebase.firestore.GeoPoint(Number(userLocation.lat), Number(userLocation.lng)), radius: 600,
  });
  // Get query (as Promise)
  geoQuery.get().then((value) => {
    // All GeoDocument returned by GeoQuery, like the GeoDocument added above
    console.log(value.docs);
    return value.docs;
  })
  // sort eateries by distance from user
  .then((x) => {
    return x.sort(
      (e1, e2) => {
        return e1.distance - e2.distance;
      }
    );
  })
  // obtain eateries and user
  .then(getEateriesAndUser)
  // check halal / veg
  .then(getHalalAndVeg)
  // obtain stalls
  .then(getStalls)
  // choosing eatery and stall
  .then((info) => {
    if (isLoading) {
      if (info.eateries.length !== 0) {
        console.log(info)
        // choosing eatery, based on location and then whether there are stalls available
        var index = null;
        for (let i = 0; i < info.eateries.length; i++) {
          if (info.stalls[i].length !== 0) {
            index = i;
            break;
          }
        }
        if (index !== null) {
          const eatery = info.eateries[index];
          const stalls = info.stalls[index];
          // set chosen eatery
          setLocation( {
            name: eatery.name,
            coords: {
              lat: Number(eatery.coordinates._lat),
              lng: Number(eatery.coordinates._long)
            },
            id: eatery.id
          });
          // set stalls from chosen eatery
          setRecStalls(stalls);
          const randomIndex = Math.floor(Math.random() * stalls.length);
          const recStall = stalls[randomIndex];
          // set chosen stall
          setRecStall(recStall);
          return "eateries/" + recStall.eateryID + "/Stalls/" + recStall.id + "/reviews";
        } else {
          // No Stalls are available
          setLoading(false)
          return null;
        }
      }
    }
  })
  // get reviews of the Recommended Stall
  .then(getRevs).then((revs) => {
    if (revs) {
      if (isLoading) {
        setRevs(revs);
        setLoading(false);
      }
      setLoading(false);
    }
    });

  // number of reviews limit, default 10
  const [limit, setLimit] = useState(10);

  // Page content
  const cont = isLoading ? <Spinner /> : (
    recStall === null ? 
    // if there are no stalls to recommend
    <div>
      <h1>Oops!</h1>
      <h2>We can't seem to find a Stall to recommend you!</h2>
      <p>Either there are no stalls open currently, 
          or there are none open that fit your dietary requirements, 
          or the stalls available are not rated highly enough for us to consider recommending them to you!</p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button onClick={navigateToNewRec} type="button" className="btn btn-primary btn-lg px-4 gap-3">Generate ANOTHER Recommendation</button>
      </div>
    </div> :
    // recommend stall
    <div>
      <h1>{location.name}</h1>
      <MapComponent location={location.coords} userLocation={userLocation}/>
      <br />
      {/* Add Review */}
      <Button onClick={() => {navigate(`/cr/${uid}/${location.id}/${recStall.id}`)}}>Add a Review!</Button>
      {/* Increase number of reviews by 10 */}
      <Button onClick={() => { setLimit(limit + 10); }}>load more reviews</Button>
      <Rec stall={recStall} recPage={navigateToNewRec} revs={revs} limit={limit} viewerUID={uid} />
    </div>
  );

  return cont;
}

export default Recommendation;
