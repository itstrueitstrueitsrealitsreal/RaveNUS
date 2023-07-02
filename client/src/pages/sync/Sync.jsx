import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import NUSModerator from 'nusmoderator';
import Navbar from '../../components/Navbar';
import { ref, uploadBytes } from "firebase/storage";
import { auth, authForFirebaseUI } from "../../components/firebase";
import { db, storage,  } from "../../components/firebase";
import { doc, setDoc, getDoc, getDocs, collection, updateDoc } from "firebase/firestore";
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

  const [timetableData, setTimetableData] = useState({
    Sem1: {
      Timetable: {
        Monday: {
          BT2102: "08"
        },
        Tuesday: {

        },
        Wednesday: {

        },
        Thursday: {

        },
        Friday: {

        }
      }
    },
    Sem2: {
      Timetable: {
        Monday: {

        },
        Tuesday: {

        },
        Wednesday: {

        },
        Thursday: {

        },
        Friday: {

        }
      }
    },
    Sem3: {
      Timetable: {
        Monday: {

        },
        Tuesday: {

        },
        Wednesday: {

        },
        Thursday: {

        },
        Friday: {

        }
      }
    },
    Sem4: {
      Timetable: {
        Monday: {

        },
        Tuesday: {

        },
        Wednesday: {

        },
        Thursday: {

        },
        Friday: {

        }
      }
    }
  });

  // function for syncing timetable
  const syncTimetable = () => {
    if (uid) {
      const semester = url.includes('sem-1') ? '1' : '2';
      const stripped = url.replace(/^https:\/\/nusmods\.com\/timetable\/.*\/share\?/gm, '').trim();
      const params = new URLSearchParams(stripped);
      let acadYear = NUSModerator.academicCalendar.getAcadYear(new Date()).year;
      acadYear = acadYear.replace('/', '-');
      acadYear = `20${acadYear}`;
      const acadYearEnd = `20${acadYear.substring(5, 8)}`;
      acadYear = acadYear.substring(0, 5) + acadYearEnd;
      for (const [modCode, lessons] of params) {
        console.log(modCode);
        console.log(lessons);
        console.log(`https://api.nusmods.com/v2/${acadYear}/modules/${modCode}.json`);
        fetch(`https://api.nusmods.com/v2/${acadYear}/modules/${modCode}.json`)
          .then((response) => response.json())
          .then((json) => console.log(json));
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
      await setDoc(docRef, timetableData, {merge: true})
        .then((docRef) => {
          alert('Timetable updated successfully.');
          setTimetableData({
            Sem1: {
              Timetable: {
                Monday: {

                },
                Tuesday: {

                },
                Wednesday: {

                },
                Thursday: {

                },
                Friday: {

                }
              }
            },
            Sem2: {
              Timetable: {
                Monday: {

                },
                Tuesday: {

                },
                Wednesday: {

                },
                Thursday: {

                },
                Friday: {

                }
              }
            },
            Sem3: {
              Timetable: {
                Monday: {

                },
                Tuesday: {

                },
                Wednesday: {

                },
                Thursday: {

                },
                Friday: {

                }
              }
            },
            Sem4: {
              Timetable: {
                Monday: {

                },
                Tuesday: {

                },
                Wednesday: {

                },
                Thursday: {

                },
                Friday: {

                }
              }
            }
          });
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
