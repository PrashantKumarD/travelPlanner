import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';
import { MapPin, Sparkles, Calendar } from 'lucide-react';
import Footer from '../view-trip/components/Footer';

function MyTrips() {
    useEffect(()=>{
        GetUserTrips();
    },[])
    const navigate = useNavigate();
    const [userTrips,setUserTrips]=useState([]);
    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        
        if(!user){
            navigate('/');
            return ;
        }

        setUserTrips([])
        const q = query(collection(db, 'AITrips'), where("userEmail", "==", user?.email));

        const querySnapshot = await getDocs(q);
        const trips = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          trips.push(doc.data());
        });
        setUserTrips(trips);
    }

    return (
        <div className='min-h-screen pt-20 pb-12'>
            <div className='max-w-7xl mx-auto px-6'>
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Travel Collection</span>
                        <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                    </div>
                    
                    <h1 className='heading-primary text-4xl md:text-5xl text-center mb-4'>
                        <span className='text-gradient-primary'>My Travel</span>
                        <br />
                        <span className='text-gray-700'>Adventures</span>
                    </h1>
                    
                    <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                        Revisit your amazing journeys and plan new adventures with AI
                    </p>
                </div>

                {/* Trips Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {userTrips?.length > 0 ? 
                        userTrips.map((trip, index) => (
                            <UserTripCardItem key={index} trip={trip} />
                        ))
                        :
                        // Loading skeletons
                        [1,2,3,4,5,6].map((item,index) => (
                            <div key={index} className='card-luxury h-64 w-full'>
                                <div className="animate-pulse">
                                    <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-4"></div>
                                    <div className="space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Empty State */}
                {userTrips?.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-4">No trips yet</h3>
                        <p className="text-gray-500 mb-8">Start planning your first adventure with AI</p>
                        <a href="/create-trip" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all">
                            <Sparkles className="w-5 h-5" />
                            Create Your First Trip
                        </a>
                    </div>
                )}
            </div>
            
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default MyTrips
