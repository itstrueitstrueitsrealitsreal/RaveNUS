import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Container,
  Row
} from "reactstrap";
import { auth, authForFirebaseUI } from '../components/firebase.js';
import {
  collection, getDocs, getDoc, doc, updateDoc
} from 'firebase/firestore';
import { db } from "../components/firebase.js";

const Index = () => {
  console.log('Home Page called');

  const navigateToRecommmendation = () => {
    useNavigate(`/admin/recommendation/${uid}`);
  }

  // current userID
  const [uid, setUid] = useState(null);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUid(authForFirebaseUI.currentUser.uid);
    } else {
      window.location.reload();
    }
  });

  // Current Time
  const now = new Date().toLocaleTimeString([], { hour12: false });
  const [time, setTime] = useState(now);
  setInterval(updateTime, 1000);

  function updateTime() {
    setTime(new Date().toLocaleTimeString([], { hour12: false }));
  }

  const quotes = [
    {
      quote: "Hunger knows no friend but its feeder.", 
      person: "Aristophenes"
    },
    {
      quote: "If you can't feed a hundred people, then feed just one.", 
      person: "Mother Teresa"
    },
    {
      quote: "Good food is the foundation of genuine happiness.", 
      person: "Auguste Escoffier"
    },
    {
      quote: "There is no love sincerer than the love of food.", 
      person: "George Bernard Shaw"
    },
    {
      quote: "Food is our common ground, a universal experience.", 
      person: "James Beard"
    },
    {
      quote: "Food is not rational. Food is culture, habit, craving, and identity.", 
      person: "Jonathan Safran Foer"
    },
    {
      quote: "Food is a pretty good prism through which to view humanity.", 
      person: "Jonathan Gold"
    },
    {
      quote: "We all eat, and it would be a sad waste of opportunity to eat badly.", 
      person: "Anna Thomas"
    },
    {
      quote: "First we eat, then we do everything else.", 
      person: "M.F.K. Fisher"
    },
    {
      quote: "People who love to eat are always the best people.", 
      person: "Julia Child"
    },
    {
      quote: "Laughter is brightest where food is best.", 
      person: "Irish Proverb"
    },
    {
      quote: "Food is our common ground, a universal experience.", 
      person: "James Beard"
    },
    {
      quote: "Let food be thy medicine and medicine be thy food.", 
      person: "Hippocrates"
    },
    {
      quote: "So long as you have food in your mouth, you have solved all questions for the time being.", 
      person: "Franz Kafka"
    },
    {
      quote: "One cannot think well, love well, sleep well, if one has not dined well.", 
      person: "Virginia Woolf"
    },
    {
      quote: "It's okay to eat fish because they don't have any feelings.", 
      person: "Kurt Cobain"
    },
  ];

  const chooseQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  const quote = useMemo(() => chooseQuote(), []);

  return ( 
    <>
      <div className="pb-8 pt-5 pt-md-8">
        <Container className="mt-7" fluid>
          <Row>
            <div className="px-4 py-5 my-5 text-center">
              <h1 className="display-5 fw-bold text-body-emphasis" data-testid='time'>{time}</h1>
              <h1 className="display-5 fw-bold text-body-emphasis" data-testid='quote'>"{quote.quote}"</h1>
              <div className="col-lg-6 mx-auto">
              <p className="lead mb-4" data-testid='person'>-{quote.person}</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Button className="" type='button' color="warning" 
                      onClick={ async (e) => {
                        e.preventDefault();
                        const ref = doc(db, 'profile', uid);
                        const document = await getDoc(ref);
                        if (document.exists()) {
                          const p = document.data().NoOfRec;
                          var newfields = {
                              NoOfRec: p + 1,
                            };
                          await updateDoc(ref, newfields, {merge:true});
                        }
                        navigateToRecommmendation();
                      }}>Generate Recommendation</Button>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Index;
