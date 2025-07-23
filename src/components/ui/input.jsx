import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:border-gray-300 shadow-sm hover:shadow-md file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-900",
        className
      )}
      {...props} />
  );
}

export { Input }
