function BlogCard() {
  return (
    <>
      <div className="blogcard">
        <img src="src/images/hero.jpg" alt="" className="blogcard__img" />

        <div className="blogcard__text-container">
          <h3 className="blogcard__title">Java</h3>

          <div className="blogcard__author-container">
            <span className="blogcard__by">By</span>
            <h4 className="blogcard__author">Author</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
