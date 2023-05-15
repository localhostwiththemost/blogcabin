import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { db } from "./firebase";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

function Blog({ loggedIn }) {
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
      <div className="blog-page">
        <div className="blogData-container">
          <h1 className="blog-title__heading">{blogData.title}</h1>

          <div className="blog-author__container">
            <img
              src={blogData.user.userImg}
              alt={`A photo of ${blogData.user.displayName}`}
              className="author-img"
            />
            <p className="author-name">{blogData.user.displayName}</p>
          </div>

          <div className="like-comment__container">
            <ion-icon name="thumbs-up-sharp"></ion-icon>
            <ion-icon name="chatbubble"></ion-icon>
          </div>

          <img
            src={
              blogData.image ? blogData.image : "https://placebear.com/400/400"
            }
            alt={blogData.title}
            className="blog-img"
          />

          <div className="blogData-body__container">
            <p className="blogData-body">{blogData.content}</p>
          </div>
        </div>

        {loggedIn ? (
          <div className="comment-container">
            <form action="">
              <input type="text" name="" id="" />
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Blog;
