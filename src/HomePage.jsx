import Header from "./Header";
import Content from "./Content";

function HomePage({ loggedIn, setShowOverlay, showOverlay }) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
        setShowOverlay={setShowOverlay}
        showOverlay={showOverlay}
      />
      <Content loggedIn={loggedIn} />
    </>
  );
}

export default HomePage;
