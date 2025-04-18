"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Dumbbell, Heart, Trophy, Zap, RefreshCw, UserCheck, Scale, Move, Users } from "lucide-react"

interface FloatingCardProps {
    title: string
    description: string
    icon: React.ReactNode
    initialPosition: { x: number; y: number }
    delay: number
}

const FloatingCard: React.FC<FloatingCardProps> = ({ title, description, icon, initialPosition, delay }) => {
    const [position, setPosition] = useState(initialPosition)
    const direction = useRef({ x: Math.random() > 0.5 ? 1 : -1, y: Math.random() > 0.5 ? 1 : -1 })
    const speed = useRef({ x: Math.random() * 0.2 + 0.1, y: Math.random() * 0.2 + 0.1 })

    useEffect(() => {
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setPosition((prev) => {
                    let newX = prev.x + direction.current.x * speed.current.x
                    let newY = prev.y + direction.current.y * speed.current.y

                    // Change direction if reaching boundaries
                    if (newX > 20 || newX < -20) {
                        direction.current.x *= -1
                        newX = prev.x
                    }

                    if (newY > 20 || newY < -20) {
                        direction.current.y *= -1
                        newY = prev.y
                    }

                    return { x: newX, y: newY }
                })
            }, 50)

            return () => clearInterval(interval)
        }, delay)

        return () => clearTimeout(timeout)
    }, [delay])

    return (
        <div
            className="absolute z-10 transition-transform duration-300 ease-in-out"
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
        >
            <Card className="w-40 bg-opacity-80 backdrop-blur-sm shadow-lg border border-blue-500/20">
                <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="text-blue-500">{icon}</div>
                        <h3 className="font-semibold text-xs">{title}</h3>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export function FloatingCards() {
    return (
        <div className="relative w-full h-full">
            <FloatingCard
                title="Strength & Power"
                description="Specialized programs to develop your maximum strength"
                icon={<Dumbbell size={16} />}
                initialPosition={{ x: 150, y: 800 }}
                delay={0}
            />
            <FloatingCard
                title="Cardio & Endurance"
                description="Improve your cardiovascular capacity and endurance"
                icon={<Heart size={16} />}
                initialPosition={{ x: 500, y: 950 }}
                delay={500}
            />
            <FloatingCard
                title="Optimal Nutrition"
                description="Nutritional plans tailored to your specific goals"
                icon={<Zap size={16} />}
                initialPosition={{ x: 500, y: 800 }}
                delay={1000}
            />
            <FloatingCard
                title="Competition"
                description="Specific preparation for competitive athletes"
                icon={<Trophy size={16} />}
                initialPosition={{ x: 120, y: 20 }}
                delay={1500}
            />
            <FloatingCard
                title="Recovery"
                description="Advanced techniques to optimize your recovery"
                icon={<RefreshCw size={16} />}
                initialPosition={{ x: 300, y: 200 }}
                delay={2000}
            />
            <FloatingCard
                title="Personal Tracking"
                description="Individual coaching adapted to your level and goals"
                icon={<UserCheck size={16} />}
                initialPosition={{ x: 800, y: 150 }}
                delay={2500}
            />
            <FloatingCard
                title="Bodybuilding"
                description="Hypertrophy programs to develop your muscle mass"
                icon={<Dumbbell size={16} />}
                initialPosition={{ x: 50, y: 950 }}
                delay={3000}
            />
            <FloatingCard
                title="Weight Loss"
                description="Effective strategies to burn fat and refine your silhouette"
                icon={<Scale size={16} />}
                initialPosition={{ x: 0, y: 150 }}
                delay={3500}
            />
            <FloatingCard
                title="Mobility"
                description="Exercises to improve your flexibility and prevent injuries"
                icon={<Move size={16} />}
                initialPosition={{ x: 700, y: 750 }}
                delay={4000}
            />
            <FloatingCard
                title="Community"
                description="Join thousands of athletes and share your progress"
                icon={<Users size={16} />}
                initialPosition={{ x: 180, y: 350 }}
                delay={4500}
            />
        </div>
    )
}
