import {createBrowserRouter,RouterProvider,} from "react-router-dom";
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
// import Header from "./components/Header";


// function App() {

//   const router = createBrowserRouter([
//     { path: "/", element: <Home/>,errorElement: <ErrorPage />,},
//     { path: "/about", element:<About/>,errorElement: <ErrorPage />,},
//     { path:"/profile",element:<Profile/>,errorElement: <ErrorPage />,},
//     { path:"/forgotPassword",element:<ForgotPassword/>,errorElement: <ErrorPage />,},
//     { path: "/signIn", element: <SignIn />, errorElement: <ErrorPage />, },
//     { path: "/signUp", element: <SignUp />, errorElement: <ErrorPage />, },

//   ]);


//   return (
//     <>
//       {/* <Header/> */}
//       <RouterProvider router={router} />
//     </>
//   )
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
  );
}
export default App