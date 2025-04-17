"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Dumbbell, ArrowRight, Construction, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import SideImageForm from "@/features/auth/side-image-form"

export default function FeatureComingSoon() {
    const [mounted, setMounted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentQuote, setCurrentQuote] = useState(0)

    const motivationalQuotes = [
        {
            text: "Discipline is the bridge between goals and accomplishment.",
            author: "Jim Rohn",
        },
        {
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill",
        },
        {
            text: "The pain you feel today will be the strength you feel tomorrow.",
            author: "Arnold Schwarzenegger",
        },
        {
            text: "The body achieves what the mind believes.",
            author: "Napoleon Hill",
        },
        {
            text: "Don't count the days, make the days count.",
            author: "Muhammad Ali",
        },
    ]

    useEffect(() => {
        setMounted(true)

        // Simulate progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + Math.random() * 0.5
                return newProgress > 75 ? 75 : newProgress // Cap at 75%
            })
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    if (!mounted) return null

    return (
        <div className="login-container flex min-h-screen bg-black overflow-hidden">
            {/* Side image (left side) */}
            <SideImageForm
                backgroundImage={'url("/coming-soon.png")'}
                motivationalQuotes={motivationalQuotes}
                currentQuote={currentQuote}
                setCurrentQuote={setCurrentQuote}
            />

            {/* Content (right side) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div className="flex flex-col items-center mb-10 transition-all duration-300">
                        <div className="flex items-center gap-2 font-bold text-2xl mb-4 logo-glow">
                            <Dumbbell className="h-7 w-7 text-gray-400" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                ShadowFit
              </span>
                        </div>
                        <h1 className="text-3xl font-bold mb-2 text-center">This feature is not ready yet</h1>
                        <p className="text-zinc-400 text-center">
                            Our team is actively working on this feature to provide you with an exceptional experience.
                        </p>
                    </div>

                    {/* Progress section */}
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 flex items-center">
                <Construction className="w-4 h-4 mr-2" />
                Progress
              </span>
                            <span className="text-gray-400">{Math.floor(progress)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-gray-600 to-gray-400"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            ></motion.div>
                        </div>
                    </div>

                    {/* Estimated time */}
                    <div className="flex items-center justify-center text-gray-500 mb-10">
                        <Timer className="w-4 h-4 mr-2" />
                        <span>Estimated time: 2-3 weeks</span>
                    </div>

                    {/* Return button */}
                    <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white group px-6 py-6 h-auto" asChild>
                        <Link href="/">
                            Return to home
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
