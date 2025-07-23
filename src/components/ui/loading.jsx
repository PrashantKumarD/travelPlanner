import React from 'react'
import { Sparkles } from 'lucide-react'

function Loading({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-purple-600 animate-pulse" />
        </div>
      </div>
      <p className="text-gray-600 font-medium animate-pulse">{message}</p>
    </div>
  )
}

export { Loading }
