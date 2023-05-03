import { auth } from "./firebase";
import { signOut } from "firebase/auth";

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
      <ul className="nav-ul">
        <li className="nav-link">Our Story</li>
        {loggedIn ? <li className="nav-link">Compose</li> : ""}
        <li className="nav-link">
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
