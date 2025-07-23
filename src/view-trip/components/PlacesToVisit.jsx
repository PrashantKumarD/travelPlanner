import React from 'react'
import PlaceCardItem from './PlaceCardItem'


function PlacesToVisit({trip}) {
  return (
    <div>
      <h2 className=' text-purple-500 font-bold text-3xl my-10'>Places To Visit</h2>

        <div>
            {trip.tripData?.itinerary.map((item,index)=>(
                <div className='mt-5'>
                    
                    <h2 className='font-medium text-lg my-3'>📆 Day {item?.day}</h2>
                    <div className='grid md:grid-cols-2 gap-10'>
                    {item.locations.map((place,index)=>(
                        <div >
                            
                            <div className=''>
                                <PlaceCardItem place={place}/>

                            </div>
                            
                        </div>

                    ))}
                    
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default PlacesToVisit
