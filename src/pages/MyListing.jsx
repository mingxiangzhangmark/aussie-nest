import { useEffect, useState } from "react";
import MyProfileSideBar from "../components/MyProfileSideBar";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import ListingItem from "../components/ListingItem";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";



export default function MyListing() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [listings , setListings] = useState(null);
  const [loading , setLoading] = useState(true);
  useEffect(() => {
    // setLoading(true);
    async function fetchUserListings(){
      const listingRef = collection(db, "listings");
      const q = query(listingRef, where("userRef","==", auth.currentUser.uid),orderBy("timestamp","desc"));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data:doc.data()});
      })
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings()
  }, [auth.currentUser.uid])

  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted the property");
    }
  }
  function onEdit(listingID) {
    navigate(`/edit-listing/${listingID}`);
  }

  return (
    <div className="flex h-screen">
      <MyProfileSideBar />
      <div className="flex-grow bg-white rounded-lg border p-6 m-4 ml-[21%] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">My Property for rent / sell</h1>
        <p className="text-gray-700">
          Here you can manage your property details, update your information, and configure your settings.
        </p>
        <hr className="my-3"/>

        <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            {/* <h2>listitem1</h2> */}
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
                // console.log(listing.data.name)
                
              ))}
            </ul>
          </>
        )}
      </div>
        
      </div>
    </div>
  )
}
