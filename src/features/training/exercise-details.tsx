"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, Clock, Target, Award } from "lucide-react"
import {Exercise, MuscleGroup} from "@/types/types";
import {Gender} from "@prisma/client";


interface ExerciseDetailsProps {
  exercise: Exercise
  gender: Gender
  onClose: () => void
  getMuscleGroupLabel: (muscle: MuscleGroup) => string
  getIntensityLabel: (intensity: number) => string
  getIntensityColor: (intensity: number) => string
}

export function ExerciseDetails({
  exercise,
  gender,
  onClose,
  getMuscleGroupLabel,
  getIntensityLabel,
  getIntensityColor,
}: ExerciseDetailsProps) {
  const detailsVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-b from-[#0A1428] to-[#050A14] rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl shadow-black/50 border border-zinc-800/30"
        variants={detailsVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row h-[80vh] md:h-[70vh]">
          {/* Image section */}
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden bg-[#050A14]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 z-10" />
            <img
              src={exercise.image[gender] || "/placeholder.svg"}
              alt={exercise.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-black/30 hover:bg-black/50 z-20"
              onClick={onClose}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>

          {/* Content section */}
          <div className="relative w-full md:w-1/2 h-1/2 md:h-full p-6 flex flex-col">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                  {exercise.name}
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {exercise.muscleGroups.map((muscle) => (
                    <Badge
                      key={muscle}
                      variant="secondary"
                      className="bg-zinc-800/80 hover:bg-zinc-700/80 shadow-md shadow-black/20"
                    >
                      {getMuscleGroupLabel(muscle)}
                    </Badge>
                  ))}
                </div>
              </div>
              <Badge
                variant="outline"
                className={`bg-gradient-to-r ${getIntensityColor(exercise.intensity)} shadow-md shadow-black/20`}
              >
                {getIntensityLabel(exercise.intensity)}
              </Badge>
            </div>

            <div className="space-y-6 flex-grow">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center shadow-md shadow-black/20">
                  <Info className="h-5 w-5 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Description</h4>
                  <p className="text-zinc-400">{exercise.description}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center shadow-md shadow-black/20">
                  <Clock className="h-5 w-5 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Durée recommandée</h4>
                  <p className="text-zinc-400">{exercise.duration}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center shadow-md shadow-black/20">
                  <Target className="h-5 w-5 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Muscles ciblés</h4>
                  <p className="text-zinc-400">{exercise.muscleGroups.map(getMuscleGroupLabel).join(", ")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center shadow-md shadow-black/20">
                  <Award className="h-5 w-5 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Intensité</h4>
                  <p className="text-zinc-400">{getIntensityLabel(exercise.intensity)}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full bg-gradient-to-r from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800 h-12 shadow-lg shadow-black/20"
                onClick={onClose}
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
