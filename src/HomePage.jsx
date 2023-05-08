import Header from "./Header";
import Content from "./Content";

function HomePage({
  loggedIn,
  setShowOverlay,
  showOverlay,
  title,
  user,
  image,
}) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        setShowOverlay={setShowOverlay}
        showOverlay={showOverlay}
      />
      <Content title={title} content={user} image={image} />
    </>
  );
}

export default HomePage;
