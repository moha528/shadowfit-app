"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {Exercise} from "@/types/types";
import { MuscleGroup} from "@prisma/client";
import Particles from "@/components/ui/particles";


interface ExerciseCardProps {
  exercise: Exercise
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  getMuscleGroupLabel: (muscle: MuscleGroup) => string
  getIntensityLabel: (intensity: number) => string
  getIntensityColor: (intensity: number) => string
}

export function ExerciseCard({
  exercise,
  isHovered,
  onHover,
  onLeave,
  onClick,
  getMuscleGroupLabel,
  getIntensityLabel,
  getIntensityColor,
}: ExerciseCardProps) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-[#0A1428]/80 aspect-square cursor-pointer group shadow-xl shadow-black/30 border border-zinc-800/20"
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image en arrière-plan qui prend toute la carte */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 z-10" />
        <img
          src={exercise.image || "/placeholder.svg"}
          alt={exercise.name}
          className="w-full h-full object-cover object-center"
        />
        <Particles/>
      </div>

      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-5 ${
          exercise.intensity === 1
            ? "bg-gradient-radial from-green-900/20 to-transparent"
            : exercise.intensity === 2
              ? "bg-gradient-radial from-yellow-900/20 to-transparent"
              : "bg-gradient-radial from-red-900/20 to-transparent"
        }`}
      />

      {/* Nom de l'exercice en haut */}
      <div className="absolute top-0 inset-x-0 p-4 z-20">
        <h3 className="text-xl font-bold">{exercise.name}</h3>
      </div>

      {/* Carte flottante explicative */}
      <div className="absolute bottom-0 inset-x-0 p-4 z-20">
        <div className="bg-black/60 backdrop-blur-md p-4 rounded-lg border border-zinc-800/50 transform transition-all duration-500 group-hover:translate-y-0 translate-y-2 opacity-90 group-hover:opacity-100 shadow-lg shadow-black/20">
          <p className="text-sm text-zinc-300 line-clamp-3">
            {exercise.description?.split(".")[0] ||
              `Exercice focus on ${exercise.muscleGroups.map(getMuscleGroupLabel).join(", ")}.`}
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex space-x-1">
              <div
                className={`h-1.5 w-1.5 rounded-full ${exercise.intensity >= 1 ? "bg-green-500" : "bg-zinc-600"}`}
              ></div>
              <div
                className={`h-1.5 w-1.5 rounded-full ${exercise.intensity >= 2 ? "bg-yellow-500" : "bg-zinc-600"}`}
              ></div>
              <div
                className={`h-1.5 w-1.5 rounded-full ${exercise.intensity >= 3 ? "bg-red-500" : "bg-zinc-600"}`}
              ></div>
            </div>
            <Badge variant="outline" className={`bg-gradient-to-r ${getIntensityColor(exercise.intensity)}`}>
              {getIntensityLabel(exercise.intensity)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Muscle groups */}
      <div className="absolute top-4 right-4 z-20">
        <Badge className=" backdrop-blur-sm border-zinc-800/30 bg-zinc-900 text-muted-foreground text-xs shadow-md shadow-black/20">
          {exercise.muscleGroups.map(getMuscleGroupLabel).join(", ")}
        </Badge>
      </div>

      {/* Voir détails button */}
      <div
        className={`absolute bottom-[100px] right-4 z-30 transition-all duration-500 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Badge className="bg-white text-black hover:bg-zinc-200 text-xs flex items-center gap-1 shadow-lg shadow-black/20 px-3 py-1">
          Voir détails <ChevronRight className="h-3 w-3" />
        </Badge>
      </div>
    </motion.div>
  )
}
