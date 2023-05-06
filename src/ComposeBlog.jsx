import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { auth, db } from "./firebase";
import { addBlog } from "./blogCollection";

function ComposeBlog({ loggedIn }) {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
      return "";
    }
    const firstName = displayName.split(" ")[0];
    return firstName;
  }

  // Update the title state variable when the input value changes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Update the content state variable when the textarea value changes
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    let blogData = { user: { displayName: user.displayName }, title, content };
    addBlog(db, blogData);

    setTitle("");
    setContent("");
  };

  return (
    <>
      <section className="compose-page">
        <Navbar loggedIn={loggedIn} />

        {user ? (
          <div>
            <h1 className="welcome-message">
              Welcome, {getFirstName(user.displayName)}!
            </h1>
          </div>
        ) : (
          ""
        )}

        <form className="compose-form" onSubmit={handleSubmit}>
          <label htmlFor="blog-title" className="compose-form__label">
            Title
          </label>
          <input
            type="text"
            className="blog-title"
            id="blog-title"
            placeholder="Summarize your blog post"
            value={title}
            onChange={handleTitleChange}
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
            value={content}
            onChange={handleContentChange}
          ></textarea>

          <input type="file" className="img-input" />
          <button className="compose-form__btn">Post</button>
        </form>
      </section>
    </>
  );
}

export default ComposeBlog;
