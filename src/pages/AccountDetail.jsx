import { useEffect, useState } from "react";
import MyProfileSideBar from "../components/MyProfileSideBar";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AccountDetail() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listing, setListing] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    //auth.currentUser.displayName
    email: '',
    // auth.currentUser.email
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
          setListing(listingData);
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

    console.log(listing);
    
    
    // Logout function
    function onLogout(){
      auth.signOut();
      navigate('/');
      toast.success('Logged out');
    }


    function onChange(event){
      setFormData((prev) => ({
        ...prev,
        [event.target.id]: event.target.value,
      }));
    }

    async function onSubmit(){
      try {
        const updates = {};

        if (phone) {
          updates.phone = phone;
        }

        if (description) {
          updates.description = description;
        }

        if (name !== auth.currentUser.displayName) {
          await updateProfile(auth.currentUser, {
            displayName: name,
          });
          updates.name = name;
        }

        if (Object.keys(updates).length > 0) {
          const docRef = doc(db, 'users', auth.currentUser.uid);
          await updateDoc(docRef, updates);

          toast.success('Profile updated');
        } else {
          toast.info('No changes made');
        }
      } catch (error) { 
        toast.error('Failed to update profile');
        console.log(error);
      }
    }



  return (
    <div className="flex h-screen">
      <MyProfileSideBar />
      <div className="flex-grow bg-white rounded-lg border p-6 m-4 ml-[21%] overflow-y-auto">
        
<form action="#" className="space-y-4">
          <div>
          <h1 className="text-3xl text-gray-700 mb-8 text-center">Change Personal Information  
          </h1>
            {/* <label className="sr-only" htmlFor="name">Name</label> */}
            <input
              className={`w-full rounded-lg border-gray-200 p-3 text-sm ${changeDetail && "border-green-600 border-2"}`}
              placeholder="Name"
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail} 
              onChange={onChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              {/* <label className="sr-only" htmlFor="email">Email</label> */}
              <input
                className={`w-full rounded-lg border-gray-200 p-3 text-sm `}
                placeholder="Email address"
                type="email"
                id="email"
                value={email}
                disabled
              
              />
            </div>

            <div>
              {/* <label className="sr-only" htmlFor="phone">Phone</label> */}
              <input
                className={`w-full rounded-lg border-gray-200 p-3 text-sm ${changeDetail && "border-green-600 border-2"}`}
                placeholder="Phone Number"
                type="tel"
                id="phone"
                value={phone}
                disabled={!changeDetail} 
              onChange={onChange}
              />
            </div>
          </div>


          <div>
           

            <textarea
              className={`w-full rounded-lg border-gray-200 p-3 text-sm ${changeDetail && "border-green-600 border-2"}`}
              placeholder="Description"
              rows="8"
              id="description"
              value={description}
              disabled={!changeDetail} 
              onChange={onChange}
            ></textarea>
          </div>

          <div className="mt-4">
            <button
            onClick={(event) => {
              event.preventDefault();  // prevent the default behavior of the form
              changeDetail && onSubmit();
              setChangeDetail((prev) => {
                return !prev;
              });
            }}
              type="submit"
              className={`inline-block w-full rounded-lg  ml-[22%] px-10 py-3 font-medium text-white sm:w-auto ${changeDetail ? 'bg-green-500 hover:bg-green-600' : "bg-blue-500 hover:bg-blue-600" }`}
            >
              {/* Update Personal Information */}
              {changeDetail ? 'Update Personal Information' : 'Edit Personal Information'}
            </button>

            <button
             onClick={onLogout}
              type="submit"
              className="inline-block w-full rounded-lg bg-red-600 ml-5 px-10 py-3 font-medium text-white sm:w-auto"
            >
              Logout Account
            </button>
          </div>
          
        </form>
         

      </div>
    </div>
  );
}
