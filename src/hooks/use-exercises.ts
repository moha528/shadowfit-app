"use client"

import { useState, useEffect } from "react"
import { exercisesData } from "@/data/exercises-data"
import {Gender} from "@prisma/client";
import {Exercise, MuscleGroup} from "@/types/types";

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>(exercisesData)
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(exercisesData)
  const [selectedCategory, setSelectedCategory] = useState<"sans matériel" | "matériel">("sans matériel")
  const [searchQuery, setSearchQuery] = useState("")
  const [gender, setGender] = useState<Gender>(Gender.FEMALE)
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup | null>(null)
  const [selectedIntensity, setSelectedIntensity] = useState<number | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [hoveredExercise, setHoveredExercise] = useState<string | null>(null)

  // Fetch user gender from localStorage on component mount
  useEffect(() => {
    const storedGender = localStorage.getItem("userGender")
    if (storedGender === "male") {
      setGender(Gender.MALE)
    } else if (storedGender === "female") {
      setGender(Gender.FEMALE)
    }
  }, [])

  // Filter exercises based on all criteria
  useEffect(() => {
    const filtered = exercises.filter((exercise) => {
      const categoryMatch = exercise.type === selectedCategory
      const searchMatch =
        searchQuery === "" ||
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.muscleGroups.some((muscle) =>
          getMuscleGroupLabel(muscle).toLowerCase().includes(searchQuery.toLowerCase()),
        )
      const muscleMatch = !selectedMuscleGroup || exercise.muscleGroups.includes(selectedMuscleGroup)
      const intensityMatch = !selectedIntensity || exercise.intensity === selectedIntensity

      return categoryMatch && searchMatch && muscleMatch && intensityMatch
    })

    setFilteredExercises(filtered)
  }, [exercises, selectedCategory, searchQuery, selectedMuscleGroup, selectedIntensity])

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedMuscleGroup(null)
    setSelectedIntensity(null)
  }

  // Get muscle group label
  const getMuscleGroupLabel = (muscle: MuscleGroup): string => {
    const muscleLabels: Record<MuscleGroup, string> = {
      [MuscleGroup.ABDOMINALS]: "Abdominaux",
      [MuscleGroup.PECTORALS]: "Pectoraux",
      [MuscleGroup.BACK]: "Dos",
      [MuscleGroup.SHOULDERS]: "Épaules",
      [MuscleGroup.BICEPS]: "Biceps",
      [MuscleGroup.TRICEPS]: "Triceps",
      [MuscleGroup.LEGS]: "Jambes",
      [MuscleGroup.CALVES]: "Mollets",
    }

    return muscleLabels[muscle]
  }

  // Get intensity label
  const getIntensityLabel = (intensity: number): string => {
    switch (intensity) {
      case 1:
        return "Faible"
      case 2:
        return "Modéré"
      case 3:
        return "Intense"
      default:
        return "Inconnu"
    }
  }

  // Get intensity color
  const getIntensityColor = (intensity: number): string => {
    switch (intensity) {
      case 1:
        return "from-green-600/20 to-green-500/30 text-green-400 border-green-500/30"
      case 2:
        return "from-yellow-600/20 to-yellow-500/30 text-yellow-400 border-yellow-500/30"
      case 3:
        return "from-red-600/20 to-red-500/30 text-red-400 border-red-500/30"
      default:
        return "from-zinc-600/20 to-zinc-500/30 text-zinc-400 border-zinc-500/30"
    }
  }

  // Cette fonction pourra être remplacée par un appel à Prisma
  const fetchExercises = async () => {
    // Ici, vous pourriez faire un appel à Prisma pour récupérer les exercices
    // Pour l'instant, nous utilisons les données statiques
    setExercises(exercisesData)
  }

  return {
    exercises,
    filteredExercises,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    gender,
    setGender,
    selectedMuscleGroup,
    setSelectedMuscleGroup,
    selectedIntensity,
    setSelectedIntensity,
    selectedExercise,
    setSelectedExercise,
    hoveredExercise,
    setHoveredExercise,
    resetFilters,
    getMuscleGroupLabel,
    getIntensityLabel,
    getIntensityColor,
    fetchExercises,
  }
}
