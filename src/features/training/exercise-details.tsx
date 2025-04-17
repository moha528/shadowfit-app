"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, Clock, Target, Award, X } from "lucide-react"
import { Exercise } from "@/types/types"
import { Gender, MuscleGroup } from "@prisma/client"

interface ExerciseDetailsProps {
  exercise: Exercise
  onClose: () => void
  getMuscleGroupLabel: (muscle: MuscleGroup) => string
  getIntensityLabel: (intensity: number) => string
  getIntensityColor: (intensity: number) => string
}

export function ExerciseDetails({
                                  exercise,
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
            className="bg-zinc-900 rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl shadow-black/50 border border-zinc-800/30"
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col md:flex-row h-[80vh] md:h-[70vh]">
            {/* Image section */}
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden bg-[#050A14] group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 z-10" />
              <img
                  src={exercise.image || "/placeholder.svg"}
                  alt={exercise.name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full bg-black/30 hover:bg-black/50 z-20 backdrop-blur-sm"
                  onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-4 left-4 z-20">
                <Badge
                    variant="outline"
                    className={`bg-gradient-to-r ${getIntensityColor(exercise.intensity)} shadow-md shadow-black/20 backdrop-blur-sm`}
                >
                  {getIntensityLabel(exercise.intensity)}
                </Badge>
              </div>
            </div>

            {/* Content section */}
            <div className="relative w-full md:w-1/2 h-1/2 md:h-full p-6 flex flex-col overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                  {exercise.name}
                </h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {exercise.muscleGroups.map((muscle) => (
                      <Badge
                          key={muscle}
                          variant="secondary"
                          className="bg-zinc-800/80 hover:bg-zinc-700/80 shadow-md shadow-black/20 backdrop-blur-sm"
                      >
                        {getMuscleGroupLabel(muscle)}
                      </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-6 flex-grow">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center shadow-md shadow-black/20">
                    <Info className="h-10 w-10 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Description</h4>
                    <p className="text-zinc-400">{exercise.description || "No description available"}</p>
                  </div>
                </div>


                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center shadow-md shadow-black/20">
                    <Target className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Targeted Muscles</h4>
                    <p className="text-zinc-400">
                      {exercise.muscleGroups.map(getMuscleGroupLabel).join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center shadow-md shadow-black/20">
                    <Award className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Intensity</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400">{getIntensityLabel(exercise.intensity)}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((level) => (
                            <div
                                key={level}
                                className={`h-2 w-2 rounded-full ${exercise.intensity >= level ? 'bg-current' : 'bg-zinc-700'} ${getIntensityColor(exercise.intensity).split(' ')[4]}`}
                            />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800">
                <Button
                    className="w-full bg-primary hover:from-zinc-600 hover:to-zinc-800 h-12 shadow-lg shadow-black/20"
                    onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
  )
}