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
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
            <a href="/" className="flex items-center text-xl font-bold h-5 mt-[-5px]">
                <img src="/favicon.ico" alt="Logo" className="h-7 mr-2" />
                AussieNest
            </a>

            <ul className="flex space-x-10">
                <li><a href="/" className= {`font-serif py-4 text-lg border-b-[3px] ${pathRoute("/") ? "text-blue-600 border-b-blue-600" : "border-b-transparent hover:text-gray-500"}`}>Home</a></li>
                <li><a href="/offer" className={`font-serif py-4 text-lg border-b-[3px] ${pathRoute("/offer") ? "text-blue-500 border-b-blue-500" : "border-b-transparent hover:text-gray-500"}`}>Offer</a></li>
                <li><a href="/about" className={`font-serif py-4 text-lg border-b-[3px] ${pathRoute("/about") ? "text-blue-500 border-b-blue-500" : "border-b-transparent hover:text-gray-500"}`}>About</a></li>
                <li><a href="/signIn" className={`font-serif py-4 text-lg border-b-[3px] ${pathRoute("/signIn") ? "text-blue-500 border-b-blue-500" : "border-b-transparent hover:text-gray-500"}`}>Log in</a></li>
                <li className="mt-[-3px]">
                    <button className="bg-blue-500 text-white  font-serif text-lg px-2 py-1 rounded hover:bg-blue-600" onClick={handleSignUpClick}>Sign up</button>
                </li>
            </ul>
        </nav>
        </header>
    </>
  )
}
