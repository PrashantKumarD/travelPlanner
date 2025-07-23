import React from 'react'
import { MapPin, Mail, Phone, Globe, Heart, Sparkles } from 'lucide-react'

function Footer() {
  return (
    <footer className="relative w-full mt-12 overflow-hidden">
      {/* Glassmorphism effect only */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-6">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
          
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
              <img src="/logo.svg" alt="VoyageGenius Logo" className="w-5 h-5 filter brightness-0 invert" />
            </div>
            <div>
              <span className="text-lg font-bold text-gradient-primary">VoyageGenius</span>
              <p className="text-xs text-gray-500">AI Travel Planner</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6">
            <a href="/" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm font-medium">
              Home
            </a>
            <a href="/create-trip" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm font-medium">
              Plan Trip
            </a>
            <a href="/my-trips" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm font-medium">
              My Trips
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>kumarprashant6080@gmail.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>+(91) 9329381824</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Bhopal, India</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} VoyageGenius. All rights reserved.
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs">
                Privacy
              </span>
              <span className="text-gray-500 text-xs">
                Terms
              </span>
              <span className="text-gray-500 text-xs">
                Support
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500" fill="currentColor" />
              <span>for travelers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
