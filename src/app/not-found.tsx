"use client"

import { useState } from "react"
import Link from "next/link"
import { Dumbbell, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import SideImageForm from "@/features/auth/side-image-form";

export default function NotFoundPage() {
  const [currentQuote,setCurrentQuote] = useState(0)

  const motivationalQuotes = [
    {
      text: "Every setback is a setup for a comeback.",
      author: "T.D. Jakes",
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      text: "The path to success is to take massive, determined action.",
      author: "Tony Robbins",
    },
    {
      text: "The only limit to our realization of tomorrow is our doubts of today.",
      author: "Franklin D. Roosevelt",
    },
    {
      text: "Don't count the days, make the days count.",
      author: "Muhammad Ali",
    },
  ]

  return (
    <div className="flex min-h-screen bg-black overflow-hidden">
      {/* Side image with quote */}

      <SideImageForm
          backgroundImage={'url("/404.png")'}
          motivationalQuotes={motivationalQuotes}
          currentQuote={currentQuote}
          setCurrentQuote={setCurrentQuote}
      />
      {/* Content side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="flex flex-col items-center mb-10 transition-all duration-300">
            <div className="flex items-center gap-2 font-bold text-2xl mb-4 logo-glow">
              <Dumbbell className="h-7 w-7 text-gray-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                ShadowFit
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-2 text-center">Page not found</h1>
            <p className="text-zinc-400 text-center">The page you are looking for does not exist or has been moved</p>
          </div>

          {/* Mobile only 404 */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="text-[120px] font-bold text-white opacity-90">404</div>
          </div>

          <div className="space-y-6">
            <div className="text-zinc-400 text-center">
              <p>We cannot find the page you are looking for.</p>
              <p>Check the URL or return to the home page.</p>
            </div>

            <div className="pt-4">
              <Button className="w-full h-12 bg-gray-800 hover:bg-gray-700 text-white group" asChild>
                <Link href="/">
                  Return to home
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="relative flex items-center py-5">
              <div className="flex-grow border-t border-gray-800"></div>
              <span className="flex-shrink mx-4 text-zinc-500">ou</span>
              <div className="flex-grow border-t border-gray-800"></div>
            </div>

            <div className="flex flex-col space-y-4">
              <Button variant="outline" className="w-full h-12 border-gray-800 hover:bg-gray-800 text-white" asChild>
                <Link href="/contact">Contact us</Link>
              </Button>

              <Button variant="outline" className="w-full h-12 border-gray-800 hover:bg-gray-800 text-white" asChild>
                <Link href="/search">Search</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
