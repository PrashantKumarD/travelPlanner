import React, { useEffect, useState } from 'react'
import {Button} from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { Sparkles, MapPin, Calendar, Users } from "lucide-react";
import Footer from '../../view-trip/components/Footer';

function Hero() {
  const navigate = useNavigate();
  const [openDialog,setOpenDialog]=useState(false);

  const users= JSON.parse(localStorage.getItem('user'));
  useEffect(()=>{
    console.log(users);
  },[])

  const login = useGoogleLogin({
  onSuccess: (tokenResponse) => {
    console.log("Google Login Success:", tokenResponse);
    GetUserProfile(tokenResponse);  // ← call it here
  },
  onError: (error) => {
    console.error("Google Login Error:", error);
  },
});

const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
    {
      headers : {
        Authorization : `Bearer ${tokenInfo?.access_token}`,
        Accept : 'Application/json'
      }
    }).then((resp)=>{
      console.log(resp)
      localStorage.setItem('user',JSON.stringify(resp.data))
      setOpenDialog(false);
      navigate('/create-trip');
    })
  }
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center pt-20'>
      <div className='flex flex-col items-center max-w-6xl mx-auto px-4 gap-8 relative z-10'>
        {/* Premium Hero Text */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">AI-Powered Travel Planning</span>
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
          
          <h1 className='heading-primary text-5xl md:text-6xl lg:text-7xl text-center leading-tight'>
            <span className='text-gradient-primary'>Plan Your Dream Trip</span>
            <br />
            <span className='text-gray-700'>With AI Intelligence</span>
          </h1>
          
          <p className='text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium'>
            Imagine having your own intelligent travel companion—one that understands your taste, preferences, and travel goals. 
            From personalized itineraries and hidden local gems to real-time adjustments, it plans every detail exactly how you'd love.
          </p>
          
          <p className='text-base md:text-lg text-gray-500 max-w-3xl mx-auto'>
            No more endless research or stressful bookings. Just seamless, intuitive, and memorable journeys powered by AI. 
            This isn't just trip planning—this is your dream vacation designed and delivered in seconds.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
          <div className="card-luxury p-6 text-center">
            <MapPin className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Smart Destinations</h3>
            <p className="text-sm text-gray-600">AI-curated locations based on your preferences</p>
          </div>
          <div className="card-luxury p-6 text-center">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Perfect Timing</h3>
            <p className="text-sm text-gray-600">Optimal scheduling for maximum enjoyment</p>
          </div>
          <div className="card-luxury p-6 text-center">
            <Users className="w-8 h-8 text-pink-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Personalized</h3>
            <p className="text-sm text-gray-600">Tailored experiences for every traveler type</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4 mt-8">
          { !users ? (
            <>
              <Button onClick={() => setOpenDialog(true)} variant="premium" size="xl" className="shadow-2xl">
                <Sparkles className="w-5 h-5" />
                Start Planning Your Dream Trip
              </Button>
              <p className="text-sm text-gray-500">Free to start • No credit card required</p>
              
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTitle></DialogTitle>
                <DialogContent className='bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-2xl'>
                  <DialogHeader>
                    <DialogDescription className="text-center space-y-6">
                      <div className="flex justify-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                          <img src='/logo.svg' className="w-10 h-10 filter brightness-0 invert"/>
                        </div>
                      </div>
                      <div>
                        <h2 className='heading-secondary text-2xl text-gray-800 mb-2'>Welcome to VoyageGenius</h2>
                        <p className='text-gray-600 text-base'>Sign in with Google to start planning your perfect trip with AI</p>
                      </div>
                      <Button onClick={login} variant="default" size="lg" className='w-full'>
                        <FcGoogle className='w-6 h-6'/>
                        Continue with Google
                      </Button>
                      <p className="text-xs text-gray-500">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <Button onClick={() => navigate('/create-trip')} variant="luxury" size="xl" className="shadow-2xl">
              <Sparkles className="w-5 h-5" />
              Create New Trip
            </Button>
          )}
        </div>

        {/* Trust indicators */}
        <div className="flex items-center gap-8 mt-12 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>10,000+ trips planned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>AI-powered recommendations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Instant itinerary generation</span>
          </div>
        </div>

        {/* Premium Screenshots Showcase */}
        <div className="w-full max-w-7xl mt-20">
          <div className="text-center mb-12">
            <h2 className="heading-secondary text-3xl md:text-4xl mb-4">
              <span className="text-gradient-primary">See VoyageGenius</span>
              <br />
              <span className="text-gray-700">In Action</span>
            </h2>
            <p className="text-lg text-gray-600">
              Experience the power of AI-driven travel planning through our beautiful interface
            </p>
          </div>

          {/* Screenshots Grid with 3D Effect */}
          <div className="relative">
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              {/* Screenshot 1 - Featured (larger) */}
              <div className="lg:col-span-2 lg:row-span-2 group">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
                  <img 
                    src="/Screenshot 2025-07-23 154656.png" 
                    alt="VoyageGenius Dashboard"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4">
                      <h3 className="font-bold text-gray-800 mb-1">AI Trip Planning</h3>
                      <p className="text-sm text-gray-600">Intelligent itinerary generation</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screenshot 2 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1">
                  <img 
                    src="/Screenshot 2025-07-23 154940.png" 
                    alt="Smart Recommendations"
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 z-20">
                    <div className="bg-white/90 backdrop-blur-md rounded-lg p-3">
                      <h4 className="font-semibold text-gray-800 text-sm">Smart Destinations</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screenshot 3 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
                  <img 
                    src="/Screenshot 2025-07-23 155001.png" 
                    alt="Trip Management"
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 z-20">
                    <div className="bg-white/90 backdrop-blur-md rounded-lg p-3">
                      <h4 className="font-semibold text-gray-800 text-sm">Trip Management</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screenshot 4 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1">
                  <img 
                    src="/Screenshot 2025-07-23 155030.png" 
                    alt="Beautiful Interface"
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 z-20">
                    <div className="bg-white/90 backdrop-blur-md rounded-lg p-3">
                      <h4 className="font-semibold text-gray-800 text-sm">Premium Interface</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screenshot 5 */}
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
                  <img 
                    src="/Screenshot 2025-07-23 155049.png" 
                    alt="User Experience"
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 right-2 z-20">
                    <div className="bg-white/90 backdrop-blur-md rounded-lg p-3">
                      <h4 className="font-semibold text-gray-800 text-sm">Seamless Experience</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Below Screenshots */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600 mb-6">
              Ready to experience the future of travel planning?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              { !users ? (
                <Button onClick={() => setOpenDialog(true)} variant="luxury" size="lg" className="shadow-2xl">
                  <Sparkles className="w-5 h-5" />
                  Try VoyageGenius Free
                </Button>
              ) : (
                <Button onClick={() => navigate('/create-trip')} variant="luxury" size="lg" className="shadow-2xl">
                  <Sparkles className="w-5 h-5" />
                  Start New Adventure
                </Button>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>✨ No credit card required</span>
                <span>•</span>
                <span>🚀 Instant setup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Hero
