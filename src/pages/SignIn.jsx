import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  function onChange(e){
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  async function onSubmit(e){
    e.preventDefault();

    try {
      const auth  = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        navigate("/")
        toast.success('Signed in successfully');
      }

    } catch (error) {
      toast.error('Bad user credentials');
      console.log(error);
    }

  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-5 font-bold">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-10 max-w-6xl ml-4 ">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src="/signIn.png" alt="key picture" className="w-full rounded-3xl" />
        </div>
        <div className="mb-6 w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit} >
            <input className="bg-white mb-6 w-full px-4 py-2 text-xl text-gray-600 border-gray-300 rounded transition ease-in-out" type="email" id="email" value={email} onChange={onChange} placeholder="Email address"/>
          
            <div className="relative">
                <input className="bg-white mb-6 w-full px-4 py-2 text-xl text-gray-600 border-gray-300 rounded transition ease-in-out mt-4" type={showPassword ? "text" : "password"} id="password" value={password} onChange={onChange} placeholder="Password"/>
                {showPassword ? (<IoMdEye  className="absolute right-3 top-7 text-2xl cursor-pointer" onClick={()=>setShowPassword((pre)=>!pre)}/>) : (<IoMdEyeOff className="absolute right-3 top-7 text-2xl cursor-pointer" onClick={()=>setShowPassword((pre)=>!pre)}/>)}
            </div>

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don&apos;t have an account?
                <Link to="/signUp" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out">Register</Link>
              </p>
              <p>
                <Link to="/forgotPassword" className="text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out">Forgot Password?</Link>
              </p>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-7 font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg  active:bg-blue-800">Sign in</button>

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
