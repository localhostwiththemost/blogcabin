import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { db } from "./firebase";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

function Blog({ loggedIn, user, uid }) {
  const { blogId } = useParams(); // Get the blogId from the URL
  const [blogData, setBlogData] = useState(null);
  const [liked, setLiked] = useState(() => {
    const storedLiked = localStorage.getItem(`blog-${blogId}-liked`);
    return storedLiked ? JSON.parse(storedLiked) : { isLiked: false };
  });
  //const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [numberOfLikes, setNumberOfLikes] = useState(() => {
    const storedLikes = localStorage.getItem(`blog-${blogId}-likes`);
    return storedLikes ? parseInt(storedLikes) : 0;
  });
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

  const handleLikeClick = () => {
    setLiked((prevLiked) => {
      const newLiked = { ...prevLiked, isLiked: !prevLiked.isLiked };
      // Update the class of the like container based on the new liked state
      const likeContainer = document.getElementById(`like-container-${blogId}`);
      if (likeContainer) {
        likeContainer.classList.toggle("liked");
      }

      return newLiked;
    });

    setNumberOfLikes((prevNumberOfLikes) => {
      if (!liked.isLiked) {
        return prevNumberOfLikes + 1;
      } else {
        return prevNumberOfLikes > 0 ? prevNumberOfLikes - 1 : 0;
      }
    });
  };

  // Retrieve liked state from local storage during initialization
  useEffect(() => {
    const likedState = localStorage.getItem(`blog-${blogId}-liked`);
    if (likedState !== null) {
      setLiked(JSON.parse(likedState));
    }
  }, [blogId]);

  // Save updated liked state to local storage when the user clicks the thumbs-up icon
  useEffect(() => {
    localStorage.setItem(`blog-${blogId}-liked`, JSON.stringify(liked));
  }, [blogId, liked]);

  // Save number of likes to local storage when it changes
  useEffect(() => {
    localStorage.setItem(`blog-${blogId}-likes`, numberOfLikes.toString());
  }, [blogId, numberOfLikes]);

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

          {loggedIn ? (
            <div className="like-comment__container">
              <div
                id={`like-container-${blogId}`}
                className={
                  liked.isLiked ? "like-container liked" : "liked-container"
                }
                onClick={handleLikeClick}
              >
                <ion-icon name="thumbs-up-sharp"></ion-icon>
                <span>{numberOfLikes}</span>
              </div>
              <ion-icon name="chatbubble"></ion-icon>
            </div>
          ) : (
            <div className="like-comment__container">
              <ion-icon name="thumbs-up-sharp"></ion-icon>
              <ion-icon name="chatbubble"></ion-icon>
            </div>
          )}

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
              <input type="text" name="" id="" placeholder="Add a comment" />
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
