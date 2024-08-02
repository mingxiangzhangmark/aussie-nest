import { useState } from "react";
import MyProfileSideBar from "../components/MyProfileSideBar";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AccountDetail() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
    const { name, email } = formData;
    
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
        if (name !== auth.currentUser.displayName) {
          await updateProfile(auth.currentUser, {
            displayName: name,
          });
          const docRef = doc(db, 'users', auth.currentUser.uid);
          await updateDoc(docRef,{
            name,
          });

          toast.success('Profile updated');
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
        <section className="flex-col flex justify-center items-center mx-auto">
          <h1 className="text-3xl text-gray-700 mb-8 text-center">Change Profile Information  
          </h1>
          <div className="w-[55%]">
            <form >
              <input type="text" id = 'name' value={name} disabled={!changeDetail} 
              onChange={onChange}
              className={`w-full px-4 py-2 mb-8 text-gray-700 font-medium border-blue-500 rounded transition: ease-in-out ${changeDetail && "border-green-600 border-2"}`}/>

              <input type="email" id = 'email' value={email} disabled className="w-full px-4 py-2 mb-8 text-gray-700 font-medium border-blue-500 rounded transition: ease-in-out"/>

              <button
              onClick={(event) => {
                event.preventDefault();  // prevent the default behavior of the form
                changeDetail && onSubmit();
                setChangeDetail((prev) => {
                  return !prev;
                });
              }}

              className={`w-full mb-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded ${changeDetail ? 'bg-green-500 hover:bg-green-600' : "bg-blue-500 hover:bg-blue-600" }`}>
                {changeDetail ? 'APPLY CHANGE' : 'EDIT'}
                
              </button>

              <button onClick={onLogout} className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded">
                SIGN OUT
              </button>
              
            </form>
          </div>
        </section>
         

      </div>
    </div>
  );
}
