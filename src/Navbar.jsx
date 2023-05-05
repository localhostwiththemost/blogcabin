import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

function Navbar({ handleSignInClick, loggedIn }) {
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <Link to="/">
        <ion-icon name="home" className="home-icon"></ion-icon>
      </Link>

      <ul className="nav-ul">
        <li className="nav-link--item">Our Story</li>
        {loggedIn ? (
          <li className="nav-link--item">
            <Link to="/compose" className="nav-link">
              Compose
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className="nav-link--item">
          {!loggedIn ? (
            <button onClick={handleSignInClick}>Sign In</button>
          ) : (
            <button onClick={logOut}>Sign Out</button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
