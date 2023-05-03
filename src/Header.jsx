import Navbar from "./Navbar";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

function Header({ loggedIn, setShowOverlay, showOverlay }) {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    setShowOverlay(true);
    navigate(`/login`);
    console.log(showOverlay);
  };

  return (
    <>
      <header>
        <Navbar loggedIn={loggedIn} handleSignInClick={handleSignInClick} />
        <div className="header-content">
          <div className="heading-container">
            <h1 className="header-title">BlogCabin</h1>
            <h2 className="header-description">
              Deep in the weeds of technical writing.
            </h2>

            <Link to="links-section" smooth={true} duration={100}>
              <button className="btn-main" style={{ alignSelf: "flex-start" }}>
                Start Reading
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
