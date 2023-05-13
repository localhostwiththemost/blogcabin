import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { db } from "./firebase";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

function Blog({loggedIn}) {
  const { blogId } = useParams(); // Get the blogId from the URL
  const [blogData, setBlogData] = useState(null);
  const blogCollectionRef = collection(db, "blogCollection");
  const blogDocRef = doc(blogCollectionRef, blogId);

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const docSnapshot = await getDoc(blogDocRef);
        if (docSnapshot.exists()) {
          const blog = { ...docSnapshot.data(), id: docSnapshot.id };
          setBlogData(blog);
        } else {
          console.log("Blog not found");
        }
      } catch (err) {
        console.log(err);
      }
    };

    getBlogData();
  }, [blogDocRef]);

  if (!blogData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar loggedIn={loggedIn} />
      <div className="blogData-container">
        <h1>{blogData.title}</h1>
        <p>{blogData.author}</p>
        <img src={blogData.image} alt="Blog" />
        <p>{blogData.content}</p>
      </div>
    </>
  );
}

export default Blog;
