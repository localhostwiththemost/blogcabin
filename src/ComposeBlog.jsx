import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { auth, db } from "./firebase";
import { addBlog } from "./blogCollection";

function ComposeBlog({
  loggedIn,
  user,
  setUser,
  title,
  setTitle,
  content,
  setContent,
  image,
  setImage,
}) {
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

  function convertImageToDesiredFormat(image) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const convertedImage = reader.result;
        resolve(convertedImage);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(image);
    });
  }

  // Update the title state variable when the input value changes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Update the content state variable when the textarea value changes
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  // todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    let blogData = { user: { displayName: user.displayName }, title, content };

    if (image) {
      // Convert the image to the desired format (e.g., base64) and add it to the blogData object
      const convertedImage = await convertImageToDesiredFormat(image);
      blogData.image = convertedImage;
    }

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
            Body
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

          <input
            type="file"
            className="img-input"
            onChange={handleImageChange}
          />
          <button className="compose-form__btn">Post</button>
        </form>
      </section>
    </>
  );
}

export default ComposeBlog;
