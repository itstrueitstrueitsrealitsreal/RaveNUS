import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import NUSModerator from 'nusmoderator';
import Navbar from '../../components/Navbar';
import { ref, uploadBytes } from "firebase/storage";
import { auth, authForFirebaseUI } from "../../components/firebase";
import { db, storage,  } from "../../components/firebase";
import { doc, setDoc, getDoc, getDocs, collection, updateDoc, deleteDoc, deleteField } from "firebase/firestore";
import Spinner from 'react-bootstrap/Spinner';

function Sync() {
  console.log('Sync Page called');

  // loading state
  const [loading, setLoading] = useState(true);

  // current userID
  const [uid, setUid] = useState(null);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    auth.onAuthStateChanged(function(user) {
    if (user) {
      setUid(authForFirebaseUI.currentUser.uid);
      setLoading(false);
    } else {
      window.location.reload();
    }
  });
    return subscriber; // unsubscribe on unmount
  }, [uid]);

  // check if user has created a profile
  const [callAlert, setCallAlert] = useState(false);
  const checkUser = async (userid) => {
    try {
      console.log("userid trying: " + uid)
      const documentRef = doc(db, "profile", userid);
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        console.log("document exists");
      } else {
        console.log("document doesn't exist");
        setCallAlert(true);
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (uid !== null) {
    checkUser(uid);
  }

  const [timetableData, setTimetableData] = useState(
      [{
        day: 'Monday',
        timetable: {}
      },
      {
        day: 'Tuesday',
        timetable: {}
      },
      {
        day: 'Wednesday',
        timetable: {}
      },
      {
        day: 'Thursday',
        timetable: {}
      },
      {
        day: 'Friday',
        timetable: {}
      }]
  );

  function getDayType(date, weekInfo) {
    switch (weekInfo) {
      case 'Reading':
        return 'reading';
      case 'Examination':
        return 'examination';
      case 'Orientation':
        return 'orientation';
      case 'Recess':
        return 'recess';
      case 'Vacation': {
        const month = date.getMonth();
        return month > 8 || month < 3 ? 'winter' : 'summer';
      }
      default:
        if (isWeekend(date)) return 'weekend';
        return 'holiday';
    }
  }

  function getLessonTypeAndSlot(lessons) {
    var lessonsArray = [];
    lessonsArray = lessons.split(",");
    return lessonsArray;
  }

  function getLessonType(lesson) {
    console.log(lesson.substring(0,3));
    switch(lesson.split(':')[0]) {
      case 'LEC':
        return ['Lecture', lesson.split(':')[1]];
      case 'SEC':
        return ['Sectional Teaching', lesson.split(':')[1]];
      case 'REC':
        return ['Recitation', lesson.split(':')[1]];
      case 'TUT':
        return ['Tutorial', lesson.split(':')[1]];
      case 'LAB':
        return ['Laboratory', lesson.split(':')[1]];
      case 'DLEC':
        return ['Design Lecture', lesson.split(':')[1]];
      case 'PLEC':
        return ['Packaged Lecture', lesson.split(':')[1]];
      case 'PTUT':
        return ['Packaged Tutorial', lesson.split(':')[1]];
      case 'SEM':
        return ['Seminar-Style Module Class', lesson.split(':')[1]];
      case 'TUT2':
        return ['Tutorial Type 2', lesson.split(':')[1]];
      case 'TUT3':
        return ['Tutorial Type 3', lesson.split(':')[1]];
      case 'WS':
        return ['Workshop', lesson.split(':')[1]];
      default:
        return;
    }
  }

  const updateTimetable = (arr) => {
    var newState;
    for (var i = 0; i < arr.length; i++) {
      newState = timetableData.map((timetable) => {
        if (arr[i].day == timetable.day) {
          // need to add new object with id of the number of lessons 
          // in the day to the timetable array
          const newEventId = Object.keys(timetable.timetable).length;
          timetable.timetable[newEventId] = arr[i];
          return timetable;
        }
        return timetable;
      });
    }
    // for (var i = 0; i < newState.length; i++) {
    //   newState[i].timetable = Object.assign({}, newState[i].timetable);
    // }
    console.log('newState');
    console.log(newState);
    setTimetableData(newState);
  }


  // function for syncing timetable
  const syncTimetable = async () => {
    if (uid) {
      const semester = url.includes('sem-1') ? '1' : '2';
      const stripped = url.replace(/^https:\/\/nusmods\.com\/timetable\/.*\/share\?/gm, '').trim();
      const params = new URLSearchParams(stripped);
      let acadYear = NUSModerator.academicCalendar.getAcadYear(new Date()).year;
      acadYear = acadYear.replace('/', '-');
      acadYear = `20${acadYear}`;
      const acadYearEnd = `20${acadYear.substring(5, 8)}`;
      acadYear = acadYear.substring(0, 5) + acadYearEnd;

      const getSemesterIdx = (data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].semester == semester) {
            return i;
          }
        }
        return null;
      }

      const getInfo = (timetable, lessonType) => {
        var [lesson, slot] = lessonType;
        var data = [];
        for (var i = 0; i < timetable.length; i++) {
          if (timetable[i].classNo == slot && timetable[i].lessonType === lesson) {
            data.push({
              day: timetable[i].day, 
              weeks: timetable[i].weeks, 
              venue: timetable[i].venue, 
              startTime: timetable[i].startTime, 
              endTime: timetable[i].endTime
            })
            data.push([timetable[i].day, timetable[i].weeks, timetable[i].venue, timetable[i].startTime, timetable[i].endTime])
            for (var j = i + 1; j < timetable.length; j++) {
              if (timetable[j].classNo == slot && timetable[j].lessonType === lesson) {
                data.push({
                  day: timetable[j].day, 
                  weeks: timetable[j].weeks, 
                  venue: timetable[j].venue, 
                  startTime: timetable[j].startTime, 
                  endTime: timetable[j].endTime
                });
              }
            }
            return data;
          }
        }
      }

      var lessonsArray;
      var lessonType;
      var semesterData;
      var semesterDataIdx;

      for (const [modCode, lessons] of params) {
        console.log(`https://api.nusmods.com/v2/${acadYear}/modules/${modCode}.json`);
        fetch(`https://api.nusmods.com/v2/2023-2024/modules/${modCode}.json`)
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            lessonsArray = getLessonTypeAndSlot(lessons);
            console.log(lessonsArray);
            console.log(modCode);
            // getting key-value pairs of timings of lessons to locations
            var objArray = lessonsArray.map((lesson) => {
              // pair of lesson type and number
              lessonType = getLessonType(lesson);
              // returns semester data index corresponding to the current semester
              semesterDataIdx = getSemesterIdx(json.semesterData);
              // obtains correct semester data
              semesterData = json.semesterData[semesterDataIdx];
              // obtains venue, day, weeks, start and end time of lesson in an array
              return getInfo(semesterData.timetable, lessonType);
            });
            // objArray is an array of arrays 
            // have to reduce it into one big array
            objArray = objArray.flat();
            updateTimetable(objArray);
          });
      }

      updateDb().then(setURL("")).catch((err) => console.log(err));
    }
  };

  // function for updating database with timetable data
  const updateDb = async () => {
    const docRef = doc(db, 'profile', uid);
    if (url === '' || !url.includes('https://nusmods.com/timetable/')) {
      alert('Please enter a valid URL.')
    } else {
      const data = {Timetable: timetableData}
      console.log('data');
      console.log(data);
      await updateDoc(docRef, {
        Timetable: deleteField()
        })
        .then(await updateDoc(docRef, data, {merge:true}))
        .then((docRef) => {
          alert('Timetable updated successfully.');

        }).catch((err) => console.log(err));
    }
  }

  // redirect function
  const navigateToNUSMods = () => {
    alert('Redirecting you to nusmods.com...');
    window.open('https://nusmods.com', '_blank');
  };

  // updating url text area
  const [url, setURL] = useState('');

  function handleChange(event) {
    setURL(event.target.value);
    console.log(event.target.value);
    e.preventDefault();
  }

  const cont = (
    <div id="syncPage">
      {callAlert ? 
      <div>
        <h2>Oops! You have yet to create a profile!</h2>
        <p>Create a profile from the profile page to sync your timetable!</p>
      </div> 
      :
      <div>
        <h1>Timetable Sync</h1>
        <h2>Sync your timetable in 3 simple steps!</h2>
        <ol>
          <li>
            Go to the Timetable tab with your desired timetable on NUSMods using the button below.
            <br />
            <Button
              variant="primary"
              onClick={navigateToNUSMods}
            >
              NUSMods

            </Button>
          </li>
          <li>
            Click the Share/Sync button on the bottom right of the timetable as shown below.
            <br />
            <img src={require('../../components/img/nusmods_screenshot.png')} alt="screenshot of sync button" />
          </li>
          <li>
            Copy and paste the URL into the box below!
            <Form.Group
              className="mb-3"
            >
              <Form.Control
                type="url"
                placeholder="Paste URL here:"
                value={url}
                onChange={(e) => setURL(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={syncTimetable}>Sync</Button>
          </li>
        </ol>
      </div>
      }
    </div>
  );

  return <Navbar content={loading ? <Spinner /> : cont} />;
}

export default Sync;
