import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick(){
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

       // Get ID token and store it for AutoLogin
      //  const idToken = await user.getIdToken();
      //  localStorage.setItem('idToken', idToken);

      // check for the user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
      toast.success("Signed in with Google");
    } catch (error) {
      toast.error("Could not sign in with Google");
    }
  }
  return (
    <button 
    // make show type button to prevent form submission
    type="button"

    onClick={onGoogleClick} className="flex justify-center items-center w-full bg-red-600 text-white uppercase px-7 py-3 font-medium rounded shadow-md hover:bg-red-700 transition duration-150 ease-in-out hover:shadow-lg  active:bg-red-800">
        <FcGoogle className="text-2xl bg-white rounded-full mr-2"/>
        Continue with Google
    </button>
  )
}
