import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import {  getAuth, sendPasswordResetEmail } from "firebase/auth";


export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function onChange(e){
    setEmail(e.target.value);
  }
  async function onSubmit(e){
    e.preventDefault();
    try {
      const auth = getAuth();

       // Check if the email is registered
      //  const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      //  console.log('signInMethods:', signInMethods); // Debugging info
      //  if (signInMethods.length === 0) {
      //    toast.error('Email is not registered');
      //    return;
      //  }
 
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
      navigate("/signIn");
    } catch (error) {
      toast.error('Failed to send reset password');
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-5 font-bold">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-10 max-w-6xl ml-4 ">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="/forgotPassword.png" alt="key picture" className="w-full rounded-3xl" />
        </div>
        <div className="mb-6 w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit} >
            <input className="bg-white mb-8 w-full px-4 py-2 text-xl text-gray-600 border-gray-300 rounded transition ease-in-out" type="email" id="email" value={email} onChange={onChange} placeholder="Email address"/>
          
           

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don&apos;t have an account?
                <Link to="/signUp" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out">Register</Link>
              </p>
              <p>
                <Link to="/signIn" className="text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out">Sign in instead</Link>
              </p>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-7 font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg  active:bg-blue-800">Send reset password</button>

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
