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
import { Plus, MapPin, LogOut, Sparkles } from "lucide-react";

function Header() {
  const [openDialog,setOpenDialog]=useState(false);
  const navigate = useNavigate();

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
    <header className='fixed top-0 left-0 right-0 z-50 w-full border-b border-white/20 bg-white/30 backdrop-blur-2xl shadow-sm'>
      <div className='flex justify-between items-center px-6 py-4 max-w-7xl mx-auto'>
        {/* Logo Section */}
        <a href="/" className='flex items-center gap-3 hover:scale-105 transition-transform duration-200 cursor-pointer'>
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <img src='/logo.svg' className='w-6 h-6 filter brightness-0 invert'/>
          </div>
          <div className="flex flex-col">
            <span className='text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              VoyageGenius
            </span>
            <span className="text-xs text-gray-500 hidden sm:block">AI Travel Planner</span>
          </div>
        </a>

        {/* Navigation */}
        <div className='flex items-center gap-4'>
          {users ? 
            <div className='flex items-center gap-6'>
              <div className='flex items-center gap-4'>
                <a href='/create-trip'>
                  <Button variant='outline' size="sm" className='rounded-full border-2'>
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Create Trip</span>
                  </Button>
                </a>
                <a href='/my-trips'>
                  <Button variant='ghost' size="sm" className='rounded-full'>
                    <MapPin className="w-4 h-4" />
                    <span className="hidden sm:inline">My Trips</span>
                  </Button>
                </a>
              </div>
              
              {/* User Profile */}
              <Popover>
                <PopoverTrigger>
                  <div className="relative group cursor-pointer">
                    <div className="w-10 h-10 rounded-full ring-2 ring-indigo-200 group-hover:ring-indigo-400 transition-all duration-200 overflow-hidden">
                      <img 
                        className="w-full h-full object-cover" 
                        src={users?.picture || '/dummy.jpeg'}
                        onError={e => { e.target.onerror = null; e.target.src = '/dummy.jpeg'; }}
                        alt="Profile"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className='bg-white/95 backdrop-blur-xl border-0 shadow-xl rounded-xl p-4 w-80'>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                      <img 
                        className="w-12 h-12 rounded-full ring-2 ring-indigo-100 flex-shrink-0" 
                        src={users?.picture || '/dummy.jpeg'}
                        onError={e => { e.target.onerror = null; e.target.src = '/dummy.jpeg'; }}
                        alt="Profile"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-800 truncate">{users?.name}</p>
                        <p className="text-sm text-gray-500 truncate break-all">{users?.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className='w-full justify-start rounded-lg border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300'
                      onClick={()=>{
                        googleLogout();
                        localStorage.clear();
                        navigate('/');
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          : 
            <Button onClick={()=>setOpenDialog(true)} variant="default" size="sm" className="rounded-full">
              <Sparkles className="w-4 h-4" />
              Sign In
            </Button> 
          }
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
                <h2 className='heading-secondary text-2xl text-gray-800 mb-2'>Welcome Back</h2>
                <p className='text-gray-600 text-base'>Sign in to access your travel plans and create new adventures</p>
              </div>
              <Button onClick={login} variant="default" size="lg" className='w-full'>
                <FcGoogle className='w-6 h-6'/>
                Continue with Google
              </Button>
              <p className="text-xs text-gray-500">
                Secure authentication powered by Google
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  )
}

export default Header