import { useState } from "react";
import MyProfileSideBar from "../components/MyProfileSideBar";



export default function CreateList() {
  const [formData , setFormData] = useState({
    type: "rent",
    name : "",
    bedrooms : 1,
    bathrooms : 1,
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

  const { type,name,bedrooms,bathrooms,parking,
    address,
    furnished,
    description,
    offer,
    regularPrice,
    discountedPrice,
    // latitude,
    // longitude,
    // images, 
  } = formData;

  function onChangeType(){
    const newType = event.target.getAttribute('data-type');
    setFormData(prevState => ({
      ...prevState,
      type: newType
    }));
  }
  
  function onChange(){
    
  }
  return (
    <div className="flex h-screen">
      <MyProfileSideBar />
      <div className="flex-grow bg-white rounded-lg border p-10 m-4 ml-[22%] overflow-y-auto">
        <h1 className="text-2xl font-medium mb-4 text-gray-700">Sell Or Rent Your Place</h1>


        <div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex gap-1">
                <a 
                  type="button"
                  id="type"
                  data-type="rent"
                  onClick={onChangeType}
                  className={`${type === 'rent'? ("cursor-pointer shrink-0 rounded-t-xl border border-gray-300 border-b-white p-2 px-10 text-sm font-medium text-blue-600") : (("cursor-pointer border border-transparent p-2 px-10 text-sm font-medium text-gray-500 hover:text-gray-700" ))}`} 
              
                >Rent</a>

                <a
                  type="button"
                  id="type"
                  onClick={onChangeType}
                  data-type="sell"
                  className=
                  {`${type === 'sell' ? ("cursor-pointer shrink-0 rounded-t-xl border border-gray-300 border-b-white p-2 px-10 text-sm font-medium text-blue-600") : (("cursor-pointer border border-transparent p-2 px-10 text-sm font-medium text-gray-500 hover:text-gray-700" ))}`} 
                >
                  Sell
                </a>
              </nav>
            </div>
          </div>
        </div>


        <form action="#" className="mt-6 grid grid-cols-6 gap-6">

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
                  onChange={onChange}
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
                  onChange={onChange}
                  className={`ml-1 px-3 py-1 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out border border-gray-300 ${
                  !furnished ? "bg-white text-black" : "bg-blue-600 text-white"
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
                  onChange={onChange}
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

            {!offer && (
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
              <a href="#" className="text-gray-700 underline">privacy policy</a>.
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
        </form>




        
        
      </div>
    </div>
  )
}
