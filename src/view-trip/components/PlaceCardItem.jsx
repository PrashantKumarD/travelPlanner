import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';

function PlaceCardItem({ place }) {
  const [photoUrl,setPhotoUrl]=useState();
      useEffect(()=>{
          place&&GetPlacePhoto();
      },[place])
  
      const GetPlacePhoto=async()=>{
          const data={
              textQuery : place.placeName
          }
          const result=await GetPlaceDetails(data).then((resp)=>{
              console.log(resp.data.places[0].photos[3].name)
  
              const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
              setPhotoUrl(PhotoUrl);
          })
      }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>
      <div className="border rounded-2xl p-4 mt-4 flex flex-col md:flex-row gap-6 bg-white shadow-md hover:shadow-xl hover:scale-[1.025] transition-all duration-300 cursor-pointer">
        {/* Image Section */}
        <div className="flex-shrink-0 flex justify-center items-center">
          <img 
            src={photoUrl || '/dummy.jpeg'}
            alt={place.placeName}
            onError={e => { e.target.onerror = null; e.target.src = '/dummy.jpeg'; }}
            className='w-[160px] h-[160px] object-cover rounded-xl border border-gray-100 bg-gray-50 shadow-sm' 
          />
        </div>
        {/* Text Content Section */}
        <div className='flex-1 flex flex-col justify-between gap-2'>
          <div>
            <h2 className='font-extrabold text-2xl text-emerald-700 mb-1 flex items-center gap-2'>⛩️ {place.placeName}</h2>
            <p className='text-sm text-gray-600 mb-2'>🗋 {place.placeDetail}</p>
            <div className='flex flex-wrap gap-3 mb-2'>
              <span className='inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-100'>🏷️ {place.ticketPricing}</span>
              <span className='inline-block bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold border border-orange-100'>🕙 {place.travelTime}</span>
            </div>
          </div>
          <div className='flex justify-end'>
            <Button className='mt-2 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full shadow'>
              <FaMapMarkedAlt />
              Google Maps
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem
