import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { IoPersonOutline } from "react-icons/io5";
import { useAuth } from "../hooks/AuthContext";


export default function Header() {
    // eslint-disable-next-line no-unused-vars
    const [pageState, setPageState] = useState(false);

    const {user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user) {
                setPageState(true);
            }else{
                setPageState(false);
            }
        })
    }, [auth]);



    const handleSignUpClick = () => {
      navigate('/signUp');
    };

    function pathRoute(route){
        if (location.pathname === route) {
            return true;
        }
    }

  return (
    <>
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-12">
            <a href="/" className="flex items-center lg:text-xl text-gray-700 font-semibold h-5 pt-1 mt-[-5px] hover:text-gray-500 transition duration-300 ease-in-out">
                <img src="/favicon.ico" alt="Logo" className="h-7 mr-2" />
                AUSSIENEST
            </a>

            <ul className="flex space-x-8 ">
                <li><a href="/" className= {`font-medium py-4 text-lg border-b-[3px] transition duration-300 ease-in-out text-gray-700 ${pathRoute("/") ? "text-blue-600 border-b-blue-600" : "border-b-transparent hover:text-gray-500"}`}>Home</a></li>
                <li><a href="/offer" className={`font-medium text-gray-700 py-4 text-lg border-b-[3px] transition duration-300 ease-in-out  ${pathRoute("/offer") ? "text-blue-500 border-b-blue-600" : "border-b-transparent hover:text-gray-500"}`}>Offer</a></li>
                <li><a href="/about" className={`font-medium text-gray-700 py-4 text-lg border-b-[3px] transition duration-300 ease-in-out  ${pathRoute("/about") ? "text-blue-500 border-b-blue-600" : "border-b-transparent hover:text-gray-500"}`}>About</a></li>



                {user ? (
                    <li className=""><a href="/profile" className={`flex items-center font-medium text-gray-700 text-lg border-gray-700 rounded-2xl border-2 mt-[-3px] hover:text-gray-500 hover:border-gray-500 transition duration-300 ease-in-out ${pathRoute("/profile")}`}>
                        <div className="text-xl px-2"><IoPersonOutline /></div>
                        <div className="pr-2">Profile</div>
                    </a></li>
                ) : (
                    <>
                        <li><a href="/signIn" className={`font-medium text-gray-700 py-4 text-lg border-b-[3px] transition duration-300 ease-in-out ${pathRoute("/signIn") ? "text-blue-600 border-b-blue-500" : "border-b-transparent hover:text-gray-500"}`}>Sign in</a></li>
                        <li className="mt-[-3px]">
                            <button className="bg-blue-600 text-white font-medium text-lg px-2 py-1 transition duration-300 ease-in-out rounded hover:bg-blue-700" onClick={handleSignUpClick}>Sign up</button>
                        </li>
                    </>
                )}
    


                
            </ul>
        </nav>
        </header>
    </>
  )
}
