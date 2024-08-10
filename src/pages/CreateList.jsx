import { useState } from "react";
import MyProfileSideBar from "../components/MyProfileSideBar";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {v4 as uuidv4} from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";


export default function CreateList() {
  const navigate = useNavigate();
  const auth = getAuth();
  // eslint-disable-next-line no-unused-vars
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    address,
    furnished,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;
  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    
    setLoading(true);
    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("maximum 6 images are allowed");
      return;
    }
    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${import.meta.env.VITE_REACT_APP_GEOCODE_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      if (location === undefined) {
        setLoading(false);
        toast.error("please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      console.log(error);
      
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Property added successfully");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Loading />;
  }


  return (
    <div className="flex h-screen">
      <MyProfileSideBar />
      <div className="flex-grow bg-white rounded-lg border p-10 m-4 ml-[22%] overflow-y-auto">
        <h1 className="text-2xl font-medium mb-4 text-gray-700">Sell or Rent Your Place</h1>

        <form onSubmit={onSubmit}>
        <div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex gap-1">
                <button 
                  type="button"
                  id="type"
                  onClick={onChange}
                  value="rent"
                  className={`${type === 'rent'? ("cursor-pointer shrink-0 rounded-t-xl border border-gray-300 border-b-white p-2 px-10 text-sm font-medium text-blue-600") : (("cursor-pointer border border-transparent p-2 px-10 text-sm font-medium text-gray-500 hover:text-gray-700" ))}`} 
              
                >Rent</button>

                <button
                  type="button"
                  id="type"
                  onClick = {onChange}
                  value="sell"
                  className=
                  {`${type === 'sell' ? ("cursor-pointer shrink-0 rounded-t-xl border border-gray-300 border-b-white p-2 px-10 text-sm font-medium text-blue-600") : (("cursor-pointer border border-transparent p-2 px-10 text-sm font-medium text-gray-500 hover:text-gray-700" ))}`} 
                >
                  Sell
                </button>
              </nav>
            </div>
          </div>
        </div>




          <div className="mt-6 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={onChange}
                required
                placeholder="Enter the name of your property"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>


            <div className="col-span-6 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Bedrooms
              </label>
              <input type="number"
              id="bedrooms"
              onChange={onChange}
              value={bedrooms}
              min="1"
              max="20"
              required
              className="select select-bordered mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
              </input>
            </div>


            <div className="col-span-6 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Bathrooms
              </label>
              <input type="number"
              id="bathrooms"
              onChange={onChange}
              value={bathrooms}
              min="1"
              max="20"
              required
              className="select select-bordered mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
              </input>
            </div>

            <div className="col-span-6">
            <label  className="block text-sm font-medium text-gray-700"> Address </label>

            <input
              type="text"
              id="address"
              value={address}
              onChange={onChange}
              required
              placeholder="Enter the address of your property"
              className="mt-1 p-2 w-full rounded-md border border-solid border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>


            {!geolocationEnabled && (
             <>
               <div className="col-span-6 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input type="number"
              id="latitude"
              onChange={onChange}
              value={latitude}
              min="-90"
              max="90"
              // required
              className="select select-bordered mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
              </input>
            </div>


            <div className="col-span-6 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input type="number"
              id="longitude"
              onChange={onChange}
              value={longitude}
              min="-180"
              max="180"
              className="select select-bordered mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
              </input>
            </div>

             </>
            )}

            <div className="col-span-6 mt-1">
            <label  className="flex gap-4">
              <span className="text-sm font-medium text-gray-700">
                Does your property have a parking space / garage? 
              </span>


              <div>
                <button
                  type="button"
                  id="parking"
                  value={true}
                  onClick={onChange}
                  className={`ml-1 px-3 py-1 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out border border-gray-300 ${
                  !parking ? "bg-white text-black" : "bg-blue-600 text-white"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                id="parking"
                value={false}
                onClick={onChange}
                className={`ml-4 px-4 py-1  font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out border border-gray-300  ${
                  parking ? "bg-white text-black" : "bg-blue-600 text-white"
                }`}
              >
                no
              </button>

              </div>
              

            </label>
          </div>

          <div className="col-span-6 mt-1">
            <label htmlFor="MarketingAccept" className="flex gap-4">
              <span className="text-sm font-medium text-gray-700">
              Is your property fully furnished (complete decoration)? 
              </span>


              <div>
                <button
                  type="button"
                  id="furnished"
                  value={true}
                  onClick={onChange}
                  className={`ml-1 px-3 py-1 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out border border-gray-300 ${
                  !furnished ? "bg-white text-black" : "bg-blue-600 text-white"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                id="furnished"
                value={false}
                onClick={onChange}
                className={`ml-4 px-4 py-1  font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out border border-gray-300  ${
                  furnished ? "bg-white text-black" : "bg-blue-600 text-white"
                }`}
              >
                no
              </button>

              </div>

            </label>
          </div>

          

          <div className="col-span-6">
            <label  className="block text-sm font-medium text-gray-700"> Description </label>

            <textarea
              type="text"
              id="description"
              value={description}
              onChange={onChange}
              required
              placeholder="Description your house / flat, let people know what they are getting"
              className="mt-1 p-2 w-full rounded-md border border-solid border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>


          <div className="col-span-6 mt-1">
            <label  className="flex gap-4">
              <span className="text-sm font-medium text-gray-700">
                Do your what to give a special offer of discount on your property? 
              </span>

              <div>
                <button
                  type="button"
                  id="offer"
                  value={true}
                  onClick={onChange}
                  className={`ml-1 px-3 py-1 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out border border-gray-300 ${
                  !offer ? "bg-white text-black" : "bg-blue-600 text-white"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                id="offer"
                value={false}
                onClick={onChange}
                className={`ml-4 px-4 py-1  font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out border border-gray-300  ${
                  offer ? "bg-white text-black" : "bg-blue-600 text-white"
                }`}
              >
                no
              </button>

              </div>
              

            </label>
          </div>


          <div className="col-span-6 sm:col-span-3">
              <label  className="block text-sm font-medium text-gray-700">
                Price {type==='rent' ? "($ Australian Dollar / Month)": "($ Australian Dollar)"}
              </label>
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                required
                min="100"
                max="100000000"
                placeholder="Enter the price of your property"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            {offer && (
               <div className="col-span-6 sm:col-span-3">
               <label  className="block text-sm font-medium text-gray-700">
                 Discount price your want to give {type==='rent' ? "($ Australian Dollar / Month)": "($ Australian Dollar)"}
               </label>
               <input
                 type="number"
                 id="discountedPrice"
                 value={discountedPrice}
                 onChange={onChange}
                 required
                 min="100"
                 max="100000000"
                 placeholder="Enter the price of your property"
                 className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
               />
             </div>
            )}

            <div className="col-span-6">
            <label  className="block text-sm font-medium text-gray-700"> Image </label>
            <p className="block text-xs font-medium text-gray-500">The first image will be the cover (max upload 6 images)</p>
            <input
              lang="en"
              type="file"
              id="images"
              // value={images}
              onChange={onChange}
              accept=".jpg, .jpeg, .png"
              multiple
              required
              placeholder="Enter the address of your property"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs  mt-1 p-2 rounded-md border border-solid border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>


          <div className="col-span-6">
            <p className="text-sm text-gray-500">
              By pressing this button, you agree to our
              <a href="#" className="text-gray-700 underline"> terms and conditions </a>
              and 
              <a href="#" className="text-gray-700 underline"> privacy policy</a>.
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              ADD PROPERTY TO WEBSITE FOR SALE/RENT
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Already have an property on sale/rent?
              <a href="/profile/myListing" className="text-gray-700 underline">Go to my list</a>.
            </p>
          </div>
          </div>

          
        </form>




        
        
      </div>
    </div>
  )
}
