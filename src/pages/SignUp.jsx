import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link} from "react-router-dom";
import {  useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db} from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  function onChange(e){
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  async function onSubmit(e){
    // prevent the default refresh form submission
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: name
      }); // update the user profile
      const user = userCredential.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
    
      // redirect to the home page
      navigate("/");
      toast.success("Signed up successfully");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("The email address is already in use by another account");
      }else if (error.code === "auth/missing-email") {
        toast.error("An email address must be provided");
      }else if (error.code === "auth/invalid-email") {
        toast.error("The email address is not valid");
      }else if (error.code === "auth/network-request-failed") {
        toast.error("Network error, check your internet connection");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many requests, try again later");
      } else if (error.code === "auth/operation-not-allowed") {
        toast.error("The email/password accounts are not enabled");
      } else{
        toast.error('Something went wrong with the registration');
      }
      console.log(error);
      

    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-5 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-10 max-w-6xl ml-4 ">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="/key.png" alt="picture" className="w-full  rounded-3xl" />
        </div>
        <div className="mb-6 w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input className="bg-white mb-6 w-full px-4 py-2 text-xl text-gray-600 border-gray-300 rounded transition ease-in-out" type="text" id="name" value={name} onChange={onChange} placeholder="Full name"/>
            
            <input className="bg-white mb-2 w-full px-4 py-2 text-xl text-gray-600 border-gray-300 rounded transition ease-in-out" type="email" id="email" value={email} onChange={onChange} placeholder="Email address"/>
          
            <div className="relative">
                <input className="bg-white mb-6 w-full px-4 py-2 text-xl text-gray-600 border-gray-300 rounded transition ease-in-out mt-4" type={showPassword ? "text" : "password"} id="password" value={password} onChange={onChange} placeholder="Password"/>
                {showPassword ? (<IoMdEye  className="absolute right-3 top-7 text-2xl cursor-pointer" onClick={()=>setShowPassword((pre)=>!pre)}/>) : (<IoMdEyeOff className="absolute right-3 top-7 text-2xl cursor-pointer" onClick={()=>setShowPassword((pre)=>!pre)}/>)}
            </div>

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Have an account?
                <Link to="/signIn" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out">Sign in</Link>
              </p>
              <p>
                <Link to="/forgotPassword" className="text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out">Forgot Password?</Link>
              </p>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-7 font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg  active:bg-blue-800">Sign up</button>

            <div className="my-4 before:border-t flex before:flex-1 items-center before:border-gray-400    after:border-t after:flex-1 after:border-gray-400">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>

            <OAuth/>
          </form>

          
        </div>
      </div>
    </section>
  )
}
