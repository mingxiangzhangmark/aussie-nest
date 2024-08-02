// import { Navigate, Outlet } from "react-router";
// import useAuthStatus from "../hooks/useAuthStatus";

// export default function PrivateRoute() {
//     const {loggedIn, checkingStatus} = useAuthStatus();
//     if (checkingStatus){
//         return <div>Loading...</div>
//     }
//   return loggedIn ? <Outlet /> : <Navigate to="/signIn" />;
// }
import { Outlet, Navigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
// import { useAuthStatus } from "../hooks/useAuthStatus";
// import Spinner from "./Spinner";
export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <div>Loading...</div>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}