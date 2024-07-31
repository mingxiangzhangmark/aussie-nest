import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Ensure correct import from react-router-dom
// import { toast } from "react-toastify";

export default function AutoLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, navigate to the home page
        navigate("/");
      } else {
        // User is signed out, navigate to the sign-in page
        navigate("/signIn");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return null; // This component does not render anything
}
