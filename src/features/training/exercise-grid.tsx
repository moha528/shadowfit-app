"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExerciseCard } from "@/components/exercise-card"
import type { Exercise, Gender, MuscleGroup } from "@/types/exercise"

interface ExerciseGridProps {
  exercises: Exercise[]
  gender: Gender
  hoveredExercise: string | null
  setHoveredExercise: (id: string | null) => void
  setSelectedExercise: (exercise: Exercise | null) => void
  resetFilters: () => void
  getMuscleGroupLabel: (muscle: MuscleGroup) => string
  getIntensityLabel: (intensity: number) => string
  getIntensityColor: (intensity: number) => string
}

export function ExerciseGrid({
  exercises,
  gender,
  hoveredExercise,
  setHoveredExercise,
  setSelectedExercise,
  resetFilters,
  getMuscleGroupLabel,
  getIntensityLabel,
  getIntensityColor,
}: ExerciseGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      {exercises.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                gender={gender}
                isHovered={hoveredExercise === exercise.id}
                onHover={() => setHoveredExercise(exercise.id)}
                onLeave={() => setHoveredExercise(null)}
                onClick={() => setSelectedExercise(exercise)}
                getMuscleGroupLabel={getMuscleGroupLabel}
                getIntensityLabel={getIntensityLabel}
                getIntensityColor={getIntensityColor}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center mb-6 shadow-xl shadow-black/30">
            <Dumbbell className="h-10 w-10 text-zinc-600" />
          </div>
          <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            Aucun exercice trouvé
          </h3>
          <p className="text-zinc-400 max-w-md mb-8">
            Essayez de modifier vos critères de recherche ou sélectionnez une autre catégorie d'exercices.
          </p>
          <Button
            variant="outline"
            className="border-zinc-800/50 hover:bg-zinc-800/80 shadow-lg shadow-black/20 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50"
            onClick={resetFilters}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </>
  )
}
