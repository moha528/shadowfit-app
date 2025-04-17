"use client"

import { useState, useEffect } from "react"
import { MuscleGroup} from "@prisma/client";
import {Exercise} from "@/types/types";
import {getGenderExercisesAction} from "@/actions/training.action";

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<MuscleGroup[]>([])
  const [selectedIntensity, setSelectedIntensity] = useState<number | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [hoveredExercise, setHoveredExercise] = useState<string | null>(null)

  // Fetch user gender from localStorage on component mount
  useEffect(() => {
    const fetchExercises = async () => {
      try {

        const exercisesData = await getGenderExercisesAction()

        // Ensure we got an array back
        if (Array.isArray(exercisesData)) {
          setExercises(exercisesData as Exercise[])
        } else {
          console.error("Expected an array of exercises but got:", exercisesData)
          setExercises([])
        }
      } catch (err) {
          console.error("Error fetching exercises:", err)
        setExercises([])
      } finally {

      }
    }

    fetchExercises()
  }, [])


  // Filter exercises based on all criteria
  useEffect(() => {
    const filtered = exercises.filter((exercise) => {

      const searchMatch =
        searchQuery === "" ||
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.muscleGroups.some((muscle) =>
          getMuscleGroupLabel(muscle).toLowerCase().includes(searchQuery.toLowerCase()),
        )
      const muscleMatch = selectedMuscleGroups.length === 0 ||
          exercise.muscleGroups.some(muscle => selectedMuscleGroups.includes(muscle))
      const intensityMatch = !selectedIntensity || exercise.intensity === selectedIntensity

      return searchMatch && muscleMatch && intensityMatch
    })

    setFilteredExercises(filtered)
  }, [exercises,  searchQuery, selectedMuscleGroups, selectedIntensity])

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedMuscleGroups([])
    setSelectedIntensity(null)
  }

  // Get muscle group label
  const getMuscleGroupLabel = (muscle: MuscleGroup): string => {
    const muscleLabels: Record<MuscleGroup, string> = {
      [MuscleGroup.ABDOMINALS]: "Abdominals",
      [MuscleGroup.PECTORALS]: "Pectorals",
      [MuscleGroup.BACK]: "Back",
      [MuscleGroup.SHOULDERS]: "Shoulders",
      [MuscleGroup.BICEPS]: "Biceps",
      [MuscleGroup.TRICEPS]: "Triceps",
      [MuscleGroup.LEGS]: "Legs",
      [MuscleGroup.CALVES]: "Calves",
    }

    return muscleLabels[muscle]
  }

  // Get intensity label
  const getIntensityLabel = (intensity: number): string => {
    switch (intensity) {
      case 1:
        return "Low"
      case 2:
        return "Moderate"
      case 3:
        return "Intense"
      default:
        return "unknown"
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


  return {
    exercises,
    filteredExercises,
    searchQuery,
    setSearchQuery,
    selectedMuscleGroups,
    setSelectedMuscleGroups,
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

  }
}
