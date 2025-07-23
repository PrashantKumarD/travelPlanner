import { doc, getDoc } from 'firebase/firestore';
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import InfoSection from './components/InfoSection';
import { useParams } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';

function Viewtrip() {
    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);
    useEffect(()=>{
        tripId && GetTripData();
    },[tripId])

    // use to get trip information from firebase

    const GetTripData= async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());

        }
        else{
            console.log("No such document");
            toast.error("No trip found")
        }
    }
  return (
    <div className='min-h-screen pt-20 pb-12'>
      <div className='max-w-6xl mx-auto px-6 md:px-8 lg:px-12'>
        {/*Information Section*/}
        <InfoSection trip={trip}/>

        {/*Recommended Hotels*/}
        <Hotels trip={trip}/>

        {/*Daily plan*/}
        <PlacesToVisit trip={trip}/>

        {/*Footer*/}
        <Footer/>
      </div>
    </div>
  )
}

export default Viewtrip
