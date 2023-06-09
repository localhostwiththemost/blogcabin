import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";

function Content() {
  const [blogData, setBlogData] = useState([]);
  const blogCollectionRef = collection(db, "blogCollection");
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const data = await getDocs(blogCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBlogData(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getBlogData();
  }, []);

  const handleBlogCardClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <>
      <section className="links-section" id="links-section">
        <div className="blogs-container">
          <h2 className="section-title">Recent Posts</h2>
          <div className="links-container">
            {blogData.length > 0 ? (
              blogData.map((blog) => {
                return (
                  <BlogCard
                    key={blog.id}
                    title={blog.title}
                    author={blog.user && blog.user.displayName}
                    image={blog.image}
                    onClick={() => handleBlogCardClick(blog.id)}
                  />
                );
              })
            ) : (
              <p>No blogs available</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Content;
