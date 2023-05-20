import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import ComposeBlog from "./ComposeBlog";
import Blog from "./Blog";
import { Auth } from "./Auth";
import { auth, googleProvider } from "./firebase";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (
        user &&
        user.providerData[0].providerId === googleProvider.providerId
      ) {
        setLoggedIn(true);
        setUid(user.uid);
      } else {
        setLoggedIn(false);
        setUid(null);
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
            <HomePage
              loggedIn={loggedIn}
              setShowOverlay={setShowOverlay}
              showOverlay={showOverlay}
            />
          }
        />
        <Route
          path="/compose"
          element={
            <ComposeBlog
              loggedIn={loggedIn}
              user={user}
              setUser={setUser}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              image={image}
              setImage={setImage}
            />
          }
        />

        <Route
          path="/blog/:blogId"
          element={<Blog loggedIn={loggedIn} user={user} uid={uid} />}
        />

        <Route
          path="/login"
          element={<Auth setLoggedIn={setLoggedIn} showOverlay={showOverlay} />}
        />
      </Routes>
    </>
  );
}

export default App;
