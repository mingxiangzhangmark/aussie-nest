// import React from 'react'

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { db } from "../firebase";
import Loading from "../components/Loading";
import { getAuth } from "firebase/auth";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import { FaShare } from "react-icons/fa";
import { FaCheck,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair, } from "react-icons/fa";



// import required modules
import { Autoplay, Pagination, Navigation, EffectFade, EffectCoverflow } from 'swiper/modules';
import { toast } from "react-toastify";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


export default function PropertyDetail() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  useEffect(() => {
    async function fetchListing(){
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setListing(docSnap.data());
        setLoading(false);
        console.log(listing);
      }
    }
    fetchListing();
  }, [ params.listingId])

  if(loading){
    return <Loading />
  }
  // if (!listing) {
  //   toast.error("Could not get listing data");
  // }

  return (
    <>
      <div className="w-full container mx-auto px-4 bg-gray-200  border-r-2">
      <Swiper
       loop={true}  // Enable looping
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        // effect="fade"

        effect={'coverflow'}
        grabCursor={true}
        slidesPerView={'2'}
        coverflowEffect={{
          rotate: 60,
          stretch: -50, 
          depth: 400, 
          modifier: 1, 
          slideShadows: true,
        }}

        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCoverflow,EffectFade,Autoplay, Pagination, Navigation, ]}
        className=" w-full h-[50vh]" // Tailwind CSS classes
      >

        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full bg-cover bg-center" >

            {/* style={{background:`url(${listing.imgUrls[index]}) center no-repeat`}} */}
            {/*use this to improve the quality of the picture*/}
            <img src={url} alt={`Listing Image ${index}`} className="w-full h-full object-cover" />
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      <div className={`fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer
      border-2  rounded-full w-12 h-12 flex justify-center items-center hover:border-blue-500 hover:scale-105 ${shareLinkCopied ? 'border-green-500':'border-gray-400'}`}
       
      onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        toast.success("Link copied to clipboard");
        setTimeout(() => {
          setShareLinkCopied(false)
          
        }, 2000);
      }
      }>
        {shareLinkCopied ? <FaCheck className="text-lg text-green-500"/> : <FaShare className="text-lg text-slate-700"/>}
      </div>

      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full ">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - ${listing.type === "rent" ? listing.regularPrice +"/month" : listing.regularPrice}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold" style={{ whiteSpace: "pre-wrap" }}>Description - </span>
            {/* {listing.description} */}
            {listing.description.split('\n').map((line, index) => (
    <p key={index}>{line}</p>
  ))}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? "Parking spot" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
              >
                Contact Landlord
              </button>
            </div>
          )} 
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
        <div className="w-full h-[200px] md:h-[400px] rounded mt-6 md:mt-6 md:ml-2" style={{zIndex:1}}>
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>
                {listing.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
     
    </>
  )
}
 