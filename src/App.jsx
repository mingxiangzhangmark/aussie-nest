import {createBrowserRouter,RouterProvider, } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import About from "./pages/About";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./Layout";
import Offer from "./pages/Offer";
import AccountDetail from "./pages/AccountDetail";
import AccountSecurity from "./pages/AccountSecurity";
import CreateList from "./pages/CreateList";
import MyListing from "./pages/MyListing";
import PrivateRoute from "./components/PrivateRoute";
import EditListing from "./pages/EditListing";
import PropertyDetail from "./pages/PropertyDetail";
import Rent from "./pages/Rent";
import Sale from "./pages/Sale";
import { Analytics } from '@vercel/analytics/react';





// function App() {
  
//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Layout />,
//       errorElement: <ErrorPage />,
//       children: [
//         { path: '/', element: <Home /> },
//         { path: '/about', element: <About /> },

//         { path: '/profile', element: <Profile /> },
//         { path: '/forgotPassword', element: <ForgotPassword /> },
//         { path: '/signIn', element: <SignIn /> },
//         { path: '/signUp', element: <SignUp /> },
//         { path: '/offer', element: <Offer /> },
//         { path: "profile/accountDetail",element:  <AccountDetail /> },
//         { path: "profile/accountSecurity",element:  <AccountSecurity/> },
//         { path: "profile/createList",element:  <CreateList/> },
//         { path: "profile/myListing",element:  <MyListing/> },
//       ],
//     },
//   ]);

//   return (
//     <RouterProvider router={router} />
//   );
// }
// export default App

 

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/signIn', element: <SignIn /> },
        { path: '/signUp', element: <SignUp /> },
        { path: '/offer', element: <Offer /> },
        { path: '/category/rent', element: <Rent /> },
        { path: '/category/sell', element: <Sale/> },
        // { path: '/category/:categoryName', element: <Sale/> },
        {path: 'edit-listing/:listingId', element: <EditListing />},
        {path: "/category/:categoryName/:listingId",element: <PropertyDetail />},
        {
          path: '/profile',
          element: <PrivateRoute />, //use the /profile route to check if the user is logged in
          children: [
            { path: '', element: <Profile /> },
            { path: 'accountDetail', element: <AccountDetail /> },
            { path: 'accountSecurity', element: <AccountSecurity /> },
            { path: 'createList', element: <CreateList /> },
            { path: 'myListing', element: <MyListing /> },
            
          ],
        },
        { path: '/forgotPassword', element: <ForgotPassword /> },
      ],
    },
  ]);

  return (
    <div>
       <RouterProvider router={router} />
    <Analytics />
    </div>
   
  );
}

export default App;

