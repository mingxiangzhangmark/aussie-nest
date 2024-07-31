import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AutoLogin from './components/AutoLogin';



const Layout = () => {
  return (
    <>
      <Header/>
      {/* <AutoLogin /> */}
      <Outlet />
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
       
      // transition: Bounce,
        />
    </>
  );
};

export default Layout;
