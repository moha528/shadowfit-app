import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dumbbell, Edit, Trash2, ChevronRight } from "lucide-react"
import { Gender } from "@prisma/client"
import { Exercise } from "@/types/types"
import { useState } from "react"
import { motion } from "framer-motion"
import Particles from "@/components/ui/particles"

interface ExerciseCardProps {
    exercise: Exercise
    onEdit: (exercise: Exercise) => void
    onDelete: (exercise: Exercise) => void
    onClick?: () => void
}

export function ExerciseListCard({ exercise, onEdit, onDelete, onClick }: ExerciseCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    const renderIntensityBadge = (intensity: number) => {
        switch (intensity) {
            case 1:
                return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Easy</Badge>
            case 2:
                return <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">Moderate</Badge>
            case 3:
                return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">Intense</Badge>
            default:
                return null
        }
    }

    const renderGenderBadge = (type: Gender) => {
        switch (type) {
            case Gender.MALE:
                return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Male</Badge>
            case Gender.FEMALE:
                return <Badge className="bg-pink-500/20 text-pink-400 hover:bg-pink-500/30">Female</Badge>
            case Gender.BOTH:
                return <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">Both</Badge>
            default:
                return null
        }
    }

    const getIntensityColor = (intensity: number) => {
        switch (intensity) {
            case 1:
                return "from-green-900/40 to-green-900/10"
            case 2:
                return "from-yellow-900/40 to-yellow-900/10"
            case 3:
                return "from-red-900/40 to-red-900/10"
            default:
                return "from-zinc-900/40 to-zinc-900/10"
        }
    }

    return (
        <motion.div
            className="relative overflow-hidden bg-zinc-900/40 rounded-xl bg-black/10 border-zinc-800/20 cursor-pointer group shadow-xl shadow-black/30"
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image en arrière-plan */}
            <div className="relative w-full h-60">
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 z-10" />
                    {exercise.image ? (
                        <img
                            src={exercise.image}
                            alt={exercise.name}
                            className="w-full h-full object-cover object-center"
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                            <Dumbbell className="h-12 w-12 text-zinc-600" />
                        </div>
                    )}
                    <Particles />
                </div>

                {/* Glow effect on hover */}
                <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-5 bg-gradient-radial ${getIntensityColor(exercise.intensity)}`}
                />

                {/* Nom de l'exercice en haut */}
                <div className="absolute top-0 inset-x-0 p-4 z-20">
                    <h3 className="text-xl font-bold">{exercise.name}</h3>
                </div>

                {/* Muscle groups */}
                <div className="absolute top-4 right-4 z-20">
                    <Badge className="backdrop-blur-sm border-zinc-800/30 bg-zinc-900 text-muted-foreground text-xs shadow-md shadow-black/20">
                        {exercise.muscleGroups.map((group) =>
                            group.charAt(0).toUpperCase() + group.slice(1).toLowerCase()
                        ).join(", ")}
                    </Badge>
                </div>
            </div>

            {/* Content section */}
            <div className="p-4 flex flex-col">
                <div className="bg-zinc-900 backdrop-blur-md p-4 rounded-lg border border-zinc-800/50 transform transition-all duration-500 group-hover:translate-y-0 translate-y-1 opacity-90 group-hover:opacity-100 shadow-lg shadow-black/20">
                    <p className="text-zinc-300 text-sm line-clamp-2 mb-3">
                        {exercise.description || "No description provided"}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center space-x-1">
                            <div className={`h-1.5 w-1.5 rounded-full ${exercise.intensity >= 1 ? "bg-green-500" : "bg-zinc-600"}`}></div>
                            <div className={`h-1.5 w-1.5 rounded-full ${exercise.intensity >= 2 ? "bg-yellow-500" : "bg-zinc-600"}`}></div>
                            <div className={`h-1.5 w-1.5 rounded-full ${exercise.intensity >= 3 ? "bg-red-500" : "bg-zinc-600"}`}></div>
                        </div>
                        <div className="flex gap-2">
                            {renderIntensityBadge(exercise.intensity)}
                            {renderGenderBadge(exercise.type)}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4">

                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-zinc-700 hover:bg-zinc-800 backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(exercise);
                            }}
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-red-900/30 text-red-500 hover:bg-red-950/30 hover:text-red-400 backdrop-blur-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(exercise);
                            }}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}