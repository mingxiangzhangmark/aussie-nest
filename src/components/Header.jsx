import { useLocation, useNavigate } from "react-router";


export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();

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
            <a href="/" className="flex items-center lg:text-xl  font-bold h-5 mt-[-5px]">
                <img src="/favicon.ico" alt="Logo" className="h-7 mr-2" />
                AussieNest
            </a>

            <ul className="flex space-x-8 ">
                <li><a href="/" className= {`font-medium py-5 text-lg border-b-[3px] transition duration-300 ease-in-out  ${pathRoute("/") ? "text-blue-600 border-b-blue-600" : "border-b-transparent hover:text-gray-500"}`}>Home</a></li>
                <li><a href="/offer" className={`font-medium py-5 text-lg border-b-[3px] transition duration-300 ease-in-out  ${pathRoute("/offer") ? "text-blue-500 border-b-blue-600" : "border-b-transparent hover:text-gray-500"}`}>Offer</a></li>
                <li><a href="/about" className={`font-medium py-5 text-lg border-b-[3px] transition duration-300 ease-in-out  ${pathRoute("/about") ? "text-blue-500 border-b-blue-600" : "border-b-transparent hover:text-gray-600"}`}>About</a></li>
                <li><a href="/signIn" className={`font-medium py-5 text-lg border-b-[3px] transition duration-300 ease-in-out ${pathRoute("/signIn") ? "text-blue-600 border-b-blue-500" : "border-b-transparent hover:text-gray-500"}`}>Sign in</a></li>
                <li className="mt-[-3px]">
                    <button className="bg-blue-600 text-white  font-medium text-lg px-2 py-1 transition duration-300 ease-in-out  rounded hover:bg-blue-700" onClick={handleSignUpClick}>Sign up</button>
                </li>
            </ul>
        </nav>
        </header>
    </>
  )
}
