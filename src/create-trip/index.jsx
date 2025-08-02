import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input  } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelerList } from '../constants/options'
import toast, { Toaster } from 'react-hot-toast'
import { chatSession } from '../service/AIModal'
import { FcGoogle } from "react-icons/fc";
import { ImSpinner9 } from "react-icons/im";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../service/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users, DollarSign, Sparkles, ArrowRight } from "lucide-react"
import Footer from '../view-trip/components/Footer';





function CreateTrip() {
  const [place,setPlace]=useState()
  const [formData,setFormData]=useState({ noOfDays: '' })
  const [openDialog,setOpenDialog]=useState(false);
  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && value !== '') {
      const num = Number(value);
      if (num > 5) {
        toast.error('Enter the number of days between 1 - 5');
        return; // Don't update the state if invalid
      }
      if (num === 0) {
        toast.error('Number of days cannot be 0');
        return; // Don't update the state if invalid
      }
      if (num < 0) {
        toast.error('Negative days not allowed');
        return; // Don't update the state if invalid
      }
    }
    
    // Always update the state with the actual value
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  useEffect(()=>{
    console.log(formData)
  },[formData])

  const login = useGoogleLogin({
  onSuccess: (tokenResponse) => {
    console.log("Google Login Success:", tokenResponse);
    GetUserProfile(tokenResponse);  // ← call it here
  },
  onError: (error) => {
    console.error("Google Login Error:", error);
  },
});


  const onGenerateTrip= async()=>{
    const user=localStorage.getItem('user');

    if(!user){
      setOpenDialog(true)
      console.log(openDialog);
      return;
    }

    if(formData?.noOfDays>5 || !formData?.location||!formData?.budget||!formData?.traveler)
    {
      toast.error("Please enter all the fields")
      return;
    }

    setLoading(true);
    // Use the actual number of days without conversion
    let days = Number(formData?.noOfDays);
    if (isNaN(days) || days < 1) days = 1;
    const FINAL_PROMPT=AI_PROMPT.replace('{location}',formData?.location?.label).replace('{totalDays}',days).replace('{traveler}',formData?.traveler).replace('{budget}',formData?.budget).replace('{totalDays}',days)
    console.log(FINAL_PROMPT)

    // Retry logic for handling API overload
    const maxRetries = 3;
    let retryCount = 0;
    let result = null;

    while (retryCount < maxRetries) {
      try {
        result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());
        break; // Success, exit retry loop
      } catch (error) {
        retryCount++;
        console.error(`Attempt ${retryCount} failed:`, error);
        
        if (error.message?.includes('503') || error.message?.includes('overloaded')) {
          if (retryCount < maxRetries) {
            const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 2s, 4s, 8s
            toast.error(`AI service is busy. Retrying in ${delay/1000} seconds... (${retryCount}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delay));
          } else {
            toast.error('AI service is currently overloaded. Please try again in a few minutes.');
            setLoading(false);
            return;
          }
        } else {
          // Non-503 error, don't retry
          toast.error('An error occurred while generating your trip. Please try again.');
          setLoading(false);
          return;
        }
      }
    }

    setLoading(false);

    if (result) {
      SaveAiTrip(result?.response?.text(), formData.noOfDays);
    }
  }

  const SaveAiTrip = async (TripData, noOfDays) => {
    setLoading(true)

    // Use the actual number of days without conversion
    let days = Number(noOfDays);
    if (isNaN(days) || days < 1) days = 1;

    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: { ...formData, noOfDays: days },
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false)
    navigate('/view-trip/' + docId)
  }

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
      onGenerateTrip();
    })
  }
  return (
        <div className='min-h-screen pt-20 pb-12'>
      <div className='max-w-4xl mx-auto px-6'>
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">AI Trip Planner</span>
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
          
          <h1 className='heading-primary text-4xl md:text-5xl text-center mb-4'>
            <span className='text-gradient-primary'>Tell Us Your Travel</span>
            <br />
            <span className='text-gray-700'>Preferences</span>
          </h1>
          
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            Just provide some basic information, and our AI trip planner will generate a customized itinerary based on your preferences
          </p>
        </div>

        {/* Form Container */}
        <div className='card-luxury p-8 space-y-12'>
          {/* Destination Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h2 className='heading-secondary text-2xl text-gray-800'>
                What is your preferred destination?
              </h2>
            </div>
            <div className="relative">
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} 
                selectProps={{
                  place,
                  onChange:(v)=>{setPlace(v);
                    handleInputChange('location',v)
                  },
                  placeholder: "Search for destinations...",
                  className: "premium-places-autocomplete",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '8px',
                      boxShadow: 'none',
                      '&:hover': {
                        border: '2px solid #a78bfa',
                      },
                      '&:focus': {
                        border: '2px solid #8b5cf6',
                      }
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? '#8b5cf6' : state.isFocused ? '#f3f4f6' : 'white',
                      color: state.isSelected ? 'white' : '#374151',
                      padding: '12px',
                    })
                  }
                }}
              />
            </div>
          </div>

          {/* Duration Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h2 className='heading-secondary text-2xl text-gray-800'>
                How many days are you planning for your trip?
              </h2>
            </div>
            <Input
              className='border-2 border-gray-200 rounded-xl p-4 text-lg focus:border-purple-500 focus:ring-purple-500 transition-all'
              placeholder="Ex: 1, 2, 3, 4, 5..."
              type="number"
              min={1}
              max={5}
              value={formData.noOfDays}
              onChange={e => {
                const val = e.target.value;
                // Allow empty string or valid numbers
                if (val === '' || (!isNaN(val) && val.length <= 2)) {
                  handleInputChange('noOfDays', val);
                }
              }}
            />
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span>💡</span>
              <span>Plan up to 5 days for the perfect adventure</span>
            </p>
          </div>

          {/* Budget Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h2 className='heading-secondary text-2xl text-gray-800'>
                What is your budget?
              </h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {SelectBudgetOptions.map((items,index)=>(
                <div key={index} 
                onClick={()=>handleInputChange('budget',items.title)}
                className={`p-6 border-2 border-gray-200 cursor-pointer rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 group
                ${formData?.budget===items.title ? 'border-purple-500 bg-purple-50 shadow-lg ring-4 ring-purple-100' : 'hover:border-purple-300'}`}>
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{items.icon}</div>
                  <h3 className='text-lg font-bold text-gray-800 mb-2'>{items.title}</h3>
                  <p className='text-sm text-gray-600'>{items.desc}</p>
                  {formData?.budget===items.title && (
                    <div className="mt-3 flex items-center text-purple-600 text-sm font-medium">
                      <span>Selected</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Travelers Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className='heading-secondary text-2xl text-gray-800'>
                Who do you want to travel with?
              </h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {SelectTravelerList.map((items,index)=>(
                <div key={index}
                onClick={()=>handleInputChange('traveler',items.people)}
                className={`p-6 border-2 border-gray-200 cursor-pointer rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 group
                ${formData?.traveler===items.people ? 'border-pink-500 bg-pink-50 shadow-lg ring-4 ring-pink-100' : 'hover:border-pink-300'}`}>
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{items.icon}</div>
                  <h3 className='text-lg font-bold text-gray-800 mb-2'>{items.titles}</h3>
                  <p className='text-sm text-gray-600'>{items.desc}</p>
                  {formData?.traveler===items.people && (
                    <div className="mt-3 flex items-center text-pink-600 text-sm font-medium">
                      <span>Selected</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className='flex justify-center pt-8'>
            <Button 
              disabled={loading} 
              onClick={onGenerateTrip} 
              variant="premium" 
              size="xl"
              className='text-lg shadow-2xl hover:shadow-orange-500/30'
            >
              {loading ? (
                <>
                  <ImSpinner9 className='animate-spin w-5 h-5' />
                  <span>Generating Your Dream Trip...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate My Trip</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Sign In Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTitle></DialogTitle>
          <DialogContent className='bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-2xl max-w-md'>
            <DialogHeader>
              <DialogDescription className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <img src='/logo.svg' className="w-10 h-10 filter brightness-0 invert"/>
                  </div>
                </div>
                <div>
                  <h2 className='heading-secondary text-2xl text-gray-800 mb-2'>Sign In Required</h2>
                  <p className='text-gray-600 text-base'>Please sign in to generate your personalized trip itinerary</p>
                </div>
                <Button onClick={login} variant="default" size="lg" className='w-full'>
                  <FcGoogle className='w-6 h-6'/>
                  Continue with Google
                </Button>
                <p className="text-xs text-gray-500">
                  Secure authentication to save your travel plans
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default CreateTrip

