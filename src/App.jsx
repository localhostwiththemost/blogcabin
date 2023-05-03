import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import { Auth } from "./Auth";
import { auth, googleProvider } from "./firebase";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (
        user &&
        user.providerData[0].providerId === googleProvider.providerId
      ) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage loggedIn={loggedIn} setShowOverlay={setShowOverlay} showOverlay={showOverlay} />
          }
        />
        <Route path="/login" element={<Auth setLoggedIn={setLoggedIn} showOverlay={showOverlay} />} />
      </Routes>
    </>
  );
}

export default App;
