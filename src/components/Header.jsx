import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { IoPersonOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../hooks/AuthContext";

export default function Header() {
    const [pageState, setPageState] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);

    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPageState(true);
            } else {
                setPageState(false);
            }
        });
    }, [auth]);

    useEffect(() => {
        // Close mobile menu when clicking outside
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const handleSignUpClick = () => {
        navigate('/signUp');
    };

    function pathRoute(route) {
        if (location.pathname === route) {
            return true;
        }
    }

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Sale", path: "/category/sell" },
        { name: "Rent", path: "/category/rent" },
    ];

    return (
        <>
            <header className="bg-white border-b shadow-sm sticky top-0 z-50">
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-12">
                    <a href="/" className="flex items-center lg:text-xl text-gray-700 font-semibold h-5 pt-1 mt-[-5px] hover:text-gray-500 transition duration-300 ease-in-out">
                        <img src="/favicon.ico" alt="Logo" className="h-7 mr-2" />
                        AUSSIENEST
                    </a>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a href={link.path} className={`font-medium pt-4 pb-[14px] text-lg border-b-[3px] transition duration-300 ease-in-out text-gray-700 ${pathRoute(link.path) ? "text-blue-600 border-b-blue-600" : "border-b-transparent hover:text-gray-500"}`}>
                                    {link.name}
                                </a>
                            </li>
                        ))}

                        {user ? (
                            <li className="">
                                <a href="/profile" className={`flex items-center font-medium text-gray-700 text-lg border-gray-700 rounded-2xl border-2 mt-[-3px] hover:text-gray-500 hover:border-gray-500 transition duration-300 ease-in-out ${pathRoute("/profile")}`}>
                                    <div className="text-xl px-2"><IoPersonOutline /></div>
                                    <div className="pr-2">Profile</div>
                                </a>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <a href="/signIn" className={`font-medium text-gray-700 py-4 text-lg border-b-[3px] transition duration-300 ease-in-out ${pathRoute("/signIn") ? "text-blue-600 border-b-blue-500" : "border-b-transparent hover:text-gray-500"}`}>
                                        Sign in
                                    </a>
                                </li>
                                <li className="mt-[-3px]">
                                    <button className="bg-blue-600 text-white font-medium text-lg px-2 py-1 transition duration-300 ease-in-out rounded hover:bg-blue-700" onClick={handleSignUpClick}>
                                        Sign up
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 hover:text-gray-500"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <RxHamburgerMenu className="h-6 w-6" />
                    </button>
                </nav>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
                )}

                {/* Mobile Menu */}
                <div 
                    ref={mobileMenuRef}
                    className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
                        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex justify-between items-center p-4 border-b">
                        <a href="/" className="flex items-center text-gray-700 font-semibold">
                            <img src="/favicon.ico" alt="Logo" className="h-6 mr-2" />
                            <span>AUSSIENEST</span>
                        </a>
                        <button 
                            className="text-gray-700 hover:text-gray-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <IoClose className="h-6 w-6" />
                        </button>
                    </div>
                    
                    <div className="py-4">
                        <ul className="space-y-3 px-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.path} 
                                        className={`block py-2 font-medium text-gray-700 text-center ${
                                            pathRoute(link.path) ? "text-blue-600" : "hover:text-gray-500"
                                        }`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            
                            {user ? (
                                <li>
                                    <a 
                                        href="/profile" 
                                        className={`block text-center py-2 font-medium text-gray-700 ${
                                            pathRoute("/profile") ? "text-blue-600" : "hover:text-gray-500"
                                        }`}
                                    >
                                        <IoPersonOutline className="mr-2 md:inline hidden" />
                                        Profile
                                    </a>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <a 
                                            href="/signIn" 
                                            className={`block py-2 font-medium text-gray-700 text-center ${
                                                pathRoute("/signIn") ? "text-blue-600" : "hover:text-gray-500"
                                            }`}
                                        >
                                            Sign in
                                        </a>
                                    </li>
                                    <li className="pt-2">
                                        <button 
                                            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition duration-300" 
                                            onClick={handleSignUpClick}
                                        >
                                            Sign up
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
}
