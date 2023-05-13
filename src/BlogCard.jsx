function BlogCard({ title, author, image, onClick }) {
  return (
    <>
      <div className="blogcard" onClick={onClick}>
        <img src={image ? image : "https://via.placeholder.com/400"} alt="" className="blogcard__img" />

        <div className="blogcard__text-container">
          <h3 className="blogcard__title">{title}</h3>

          <div className="blogcard__author-container">
            <span className="blogcard__by">By</span>
            <h4 className="blogcard__author">{author}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
