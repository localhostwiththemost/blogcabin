import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Auth = ({ setLoggedIn, showOverlay }) => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className={
          showOverlay ? "auth-content overlay show" : "auth-content overlay"
        }
      >
        <p className="auth-text">
          To comment on or write an article, please sign in using your Google
          account.
        </p>

        <button className="google-btn" onClick={signInWithGoogle}>
          <img
            className="google-icon"
            src="src/images/google-icon.webp"
            alt="Google logo"
          />{" "}
          Sign In With Google
        </button>
      </div>
    </>
  );
};
