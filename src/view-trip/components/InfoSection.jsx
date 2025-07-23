import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { GrSend } from "react-icons/gr";
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalApi';



function InfoSection({trip}) {
    const [photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
        trip&&GetPlacePhoto();
    },[trip])

    const GetPlacePhoto=async()=>{
        const data={
            textQuery : trip?.userSelection?.location?.label
        }
        const result=await GetPlaceDetails(data).then((resp)=>{
            console.log(resp.data.places[0].photos[3].name)

            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }
  return (
    <div>
        <img 
          src={photoUrl || '/dummy.jpeg'} 
          onError={e => { e.target.onerror = null; e.target.src = '/dummy.jpeg'; }}
          className='h-[400px] w-full object-cover rounded-xl'
        />
        <div className='flex justify-between item center'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-5'>
                <h2 className=' p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-2xs md:text-md'>📅 {trip.userSelection?.noOfDays} Day</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-2xs md:text-md'>💵 {trip.userSelection?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-2xs md:text-md'>🙋 No. Of Traveller : {trip.userSelection?.traveler} </h2>
            </div>
        </div>
        <button
          className="flex items-center justify-center mt-12 w-12 h-12 rounded-full shadow-lg bg-gradient-to-br from-green-400 via-emerald-400 to-blue-400 hover:scale-110 hover:shadow-xl transition-all duration-200 border-2 border-white"
          style={{ boxShadow: '0 4px 24px 0 rgba(34,197,94,0.15)' }}
          title="Share or Send"
        >
          <GrSend className="text-white text-xl drop-shadow" />
        </button>
        </div>



    </div>
  )
}

export default InfoSection
