// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useEffect, useState } from "react";


// export default function useAuthStatus() {
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [checkingStatus, setCheckingStatus] = useState(true);
//     useEffect(() => {
//         const auth = getAuth();
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setLoggedIn(true);
//             }
//             setCheckingStatus(false);
//         });
//     },[]);
//   return { loggedIn, checkingStatus };
// }

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default  function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    // console.log(auth);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });
  }, []);
  return { loggedIn, checkingStatus };
}