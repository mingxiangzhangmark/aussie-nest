
import { getAuth } from "firebase/auth";
import MyProfileSideBar from "../components/MyProfileSideBar";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";




export default function Profile() {

  const auth = getAuth();
  // const name = auth.currentUser.displayName;
  // const email = auth.currentUser.email;
  // const phone = auth.currentUser.phone;
  // const description = auth.currentUser.description;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    phone: '',
  });
  const { name, email,description,phone } = formData;

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // setListing(docSnap.data());
        // console.log(listing.name);
        const listingData = docSnap.data();
        // setListing(listingData);
        setFormData((prev) => ({
          ...prev,
          name: listingData.name || '',
          email: listingData.email || '',
          description: listingData.description || '',
          phone: listingData.phone || '',
        }));
        
      }
    }
    fetchListing();
  }, [auth.currentUser.uid]);
  // console.log(formData);
  
 
  

  return (
    <>

      <div className="flex h-screen">
      <MyProfileSideBar />
      <div className="flex-grow bg-white rounded-lg border p-6 m-4 ml-[21%] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-8">My profile</h1>
        <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Name</dt>
                <dd className="text-gray-700 sm:col-span-2">{name}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Email Address</dt>
                <dd className="text-gray-700 sm:col-span-2">{email}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Phone</dt>
                <dd className="text-gray-700 sm:col-span-2">{phone}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Description</dt>
                <dd className="text-gray-700 sm:col-span-2">{description}</dd>
              </div>

              
           
            </dl>
          </div>


      </div>
    </div>
    </>
  )
}
