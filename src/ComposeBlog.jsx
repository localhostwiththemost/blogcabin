import Navbar from "./Navbar";

function ComposeBlog({ loggedIn }) {
  return (
    <>
      <section className="compose-page">
        <Navbar loggedIn={loggedIn} />

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
          <button className="compose-form__btn">Post</button>
        </form>
      </section>
    </>
  );
}

export default ComposeBlog;
