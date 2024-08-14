import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ImProfile } from "react-icons/im";
import { FaHome } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";

export default function MyProfileSideBar() {
   const auth = getAuth();
   const navigate = useNavigate();
   const name = auth.currentUser.displayName;
   const email = auth.currentUser.email;
   

   // Logout function
   function onLogout(){
    auth.signOut();
    navigate('/');
    toast.success('Logged out');
  }
    return (
      <div className="flex h-screen flex-col justify-between border-e bg-white w-[19%] fixed">
        <div className="px-1 py-1 overflow-y-auto">
          <ul className="mt-6 space-y-1">

            <li className="flex rounded-lg hover:bg-gray-100">
              <a
                href='/profile'
                className=" flex rounded-lg pl-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700"
              >
                <div className="text-xl px-2"><ImProfile /></div>
                My Profile
              </a>
            </li>

            <li className="flex rounded-lg hover:bg-gray-100">
              <a
                href="/profile/createList"
                className="flex rounded-lg px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700"
              >
                <div className="text-xl px-2 "><FaHome /></div>
                My Home
              </a>
            </li>
            <li className="flex rounded-lg hover:bg-gray-100">
              <a
                href="/profile/myListing"
                className="flex rounded-lg px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <div className="text-xl px-2"><FaListUl /></div>
                My listings
              </a>
            </li>
            <li >
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                > <div className="text-xl px-2"><MdOutlineSettings /></div>
                  <span className="text-base font-medium"> Account Settings </span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 px-4">
                  <li className="flex rounded-lg hover:bg-gray-100">
                    <a
                      href="/profile/accountDetail"
                      className="flex rounded-lg px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <div className="text-xl px-2"><TbArrowsExchange /></div>
                      Change Info
                    </a>
                  </li >
                  <li className="flex rounded-lg hover:bg-gray-100">
                    <a
                      href="/profile/accountSecurity"
                      className="flex rounded-lg px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <div className="text-xl px-2"><AiOutlineSafetyCertificate /></div>
                      Security
                    </a>
                  </li>
                  <li className="flex rounded-lg hover:bg-gray-100">
                    <form action="#">
                      <button
                        onClick={onLogout}
                        type="submit"
                        className="flex w-full rounded-lg px-4 py-2 text-base font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                      >
                        <div className="text-xl px-2"><TbLogout /></div>
                        Logout
                      </button>
                    </form>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a href="/" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs">
                <strong className="block font-medium">{name}</strong>
                <span className="break-all "> {email}</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    );
  }
  