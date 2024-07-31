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





function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/profile', element: <Profile /> },
        { path: '/forgotPassword', element: <ForgotPassword /> },
        { path: '/signIn', element: <SignIn /> },
        { path: '/signUp', element: <SignUp /> },
        { path: '/offer', element: <Offer /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
    // <RouterProvider router={router}>
     // * <AutoLogin /> 
    // </RouterProvider> 
  );
}
export default App


