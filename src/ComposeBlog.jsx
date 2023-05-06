import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { auth } from "./firebase";

function ComposeBlog({ loggedIn }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function getFirstName(displayName) {
    if (!displayName) {
      return '';
    }
    const firstName = displayName.split(' ')[0];
    return firstName;
}

  return (
    <>
      <section className="compose-page">
        <Navbar loggedIn={loggedIn} />

        {user ? (
          <div>
            <h1 className="welcome-message">Welcome, {getFirstName(user.displayName)}!</h1>
          </div>
        ) : (
          ""
        )}

        <form action="" className="compose-form">
          <label htmlFor="blog-title" className="compose-form__label">
            Title
          </label>
          <input
            type="text"
            className="blog-title"
            id="blog-title"
            placeholder="Summarize your blog post"
          />
          <label htmlFor="blog-text" className="compose-form__label">
            Compose your article
          </label>
          <textarea
            name=""
            className="blog-text"
            id="blog-text"
            cols="80"
            rows="20"
            placeholder="Offer your unique perspective on a subject"
          ></textarea>
          
          <input type="file" className="img-input" />
          <button className="compose-form__btn">Post</button>
        </form>
      </section>
    </>
  );
}

export default ComposeBlog;
