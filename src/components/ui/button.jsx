import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 relative overflow-hidden group cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 focus-visible:ring-indigo-500",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25 hover:scale-105 focus-visible:ring-red-500",
        outline:
          "border-2 border-indigo-200 bg-white/50 text-indigo-700 shadow-md hover:bg-indigo-50 hover:border-indigo-300 hover:scale-105 focus-visible:ring-indigo-500",
        secondary:
          "bg-purple-400 text-white shadow-md hover:shadow-lg hover:scale-105 focus-visible:ring-purple-500 border-2 border-purple-200",
        ghost:
          "border-2 border-indigo-200 bg-white/50 text-indigo-700 shadow-md hover:bg-indigo-50 hover:border-indigo-300 hover:scale-105 focus-visible:ring-indigo-500",
        link: "text-white underline-offset-4 hover:underline transition-colors",
        premium:
          "bg-purple-500 text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 focus-visible:ring-purple-500 border-2 border-purple-300",
        luxury:
          "bg-purple-600 text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 focus-visible:ring-purple-500 border-2 border-purple-400"
      },
      size: {
        default: "h-12 px-6 py-3 text-sm font-semibold",
        sm: "h-9 rounded-lg gap-1.5 px-4 text-xs font-medium",
        lg: "h-14 rounded-xl px-8 text-base font-semibold",
        xl: "h-16 rounded-2xl px-10 text-lg font-bold",
        icon: "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Comp>
  )
}

export { Button, buttonVariants }
