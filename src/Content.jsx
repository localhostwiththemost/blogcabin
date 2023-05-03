import BlogCard from "./BlogCard";

function Content() {
  return (
    <>
      <section className="links-section" id="links-section">
        <div className="blogs-container">
            <h2 className="section-title">Recent Posts</h2>
            <div className="links-container">
                <BlogCard/>
            </div>
        </div>
      </section>
    </>
  );
}

export default Content;