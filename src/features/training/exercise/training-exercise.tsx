"use client"

import { useRouter } from "next/navigation"
import { useState} from 'react'
import { AnimatePresence } from "framer-motion"
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

import { useExercises } from "@/hooks/use-exercises"
import { SearchBar } from "@/features/training/search-bar"
import { ExerciseFilters } from "@/features/training/exercise-filters"
import { ExerciseGrid } from "@/features/training/exercise-grid"
import { ExerciseDetails } from "@/features/training/exercise-details"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {Exercise} from "@/types/types";
import {toastAlert} from "@/components/ui/sonner-v2";
import {authClient} from "@/lib/authClient";

const TrainingSessionPage = () => {
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const {
        filteredExercises,
        searchQuery,
        setSearchQuery,
        gender,
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
    } = useExercises()

    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])
    const [notes, setNotes] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Toggle exercise selection
    const toggleExerciseSelection = (exercise: Exercise) => {
        setSelectedExercises(prev => {
            const isSelected = prev.some(ex => ex.id === exercise.id)
            if (isSelected) {
                return prev.filter(ex => ex.id !== exercise.id)
            } else {
                return [...prev, exercise]
            }
        })
    }

    // Submit training session
    const submitTrainingSession = async () => {
        if (!session?.user?.id) {
            toastAlert.error({
                title: "Erreur",
                description: "Vous devez être connecté pour enregistrer une session",
            })
            return
        }

        if (selectedExercises.length === 0) {
            toastAlert.error({
                title: "Erreur",
                description: "Veuillez sélectionner au moins un exercice",
            })
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/training-sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: session.user.id,
                    exerciseIds: selectedExercises.map(ex => ex.id),
                    notes,
                }),
            })

            if (!response.ok) throw new Error("Erreur lors de l'enregistrement")

            toastAlert.success({
                title: "Session enregistrée",
                description: "Votre session d'entraînement a été enregistrée avec succès.",
            })
            // Reset form
            setSelectedExercises([])
            setNotes('')
            router.refresh()
        } catch  {
            toastAlert.error({
                title: "Erreur",
                description: "Une erreur est survenue lors de l'enregistrement de la session",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen text-white relative overflow-hidden">
            {/* Main content */}
            <main className="container mx-auto px-4 py-6 relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Nouvelle session d&apos;entraînement</h1>
                    <div className="text-sm text-gray-400">
                        {format(new Date(), 'PPPP', { locale: enUS })}
                    </div>
                </div>

                {/* Selected exercises preview */}
                {selectedExercises.length > 0 && (
                    <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Exercices sélectionnés ({selectedExercises.length})</h2>
                        <div className="flex flex-wrap gap-2">
                            {selectedExercises.map(exercise => (
                                <div
                                    key={exercise.id}
                                    className="px-3 py-1 bg-gray-700 rounded-full flex items-center gap-2"
                                >
                                    <span>{exercise.name}</span>
                                    <button
                                        onClick={() => toggleExerciseSelection(exercise)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Notes */}
                <div className="mb-6">
                    <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Notes sur votre session (optionnel)"
                        className="bg-gray-800 border-gray-700 text-white"
                    />
                </div>

                {/* Search and filters */}
                <div className="mb-8 space-y-4">
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedMuscleGroup={selectedMuscleGroup}
                        setSelectedMuscleGroup={setSelectedMuscleGroup}
                        selectedIntensity={selectedIntensity}
                        setSelectedIntensity={setSelectedIntensity}
                        getMuscleGroupLabel={getMuscleGroupLabel}
                        getIntensityLabel={getIntensityLabel}
                    />

                    <ExerciseFilters
                        selectedMuscleGroups={selectedMuscleGroup}
                        setSelectedMuscleGroup={setSelectedMuscleGroup}
                        selectedIntensity={selectedIntensity}
                        setSelectedIntensity={setSelectedIntensity}
                        resetFilters={resetFilters}
                        getMuscleGroupLabel={getMuscleGroupLabel}
                        getIntensityLabel={getIntensityLabel}
                    />
                </div>

                {/* Exercise grid */}
                <ExerciseGrid
                    exercises={filteredExercises}
                    gender={gender}
                    hoveredExercise={hoveredExercise}
                    setHoveredExercise={setHoveredExercise}
                    setSelectedExercise={setSelectedExercise}
                    resetFilters={resetFilters}
                    getMuscleGroupLabel={getMuscleGroupLabel}
                    getIntensityLabel={getIntensityLabel}
                    getIntensityColor={getIntensityColor}
                    selectedExercises={selectedExercises}
                    toggleExerciseSelection={toggleExerciseSelection}
                />

                {/* Submit button */}
                <div className="mt-8 flex justify-end">
                    <Button
                        onClick={submitTrainingSession}
                        disabled={selectedExercises.length === 0 || isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
                    >
                        {isSubmitting ? "Enregistrement..." : "Enregistrer la session"}
                    </Button>
                </div>

                {/* Exercise details modal */}
                <AnimatePresence>
                    {selectedExercise && (
                        <ExerciseDetails
                            exercise={selectedExercise}
                            gender={gender}
                            onClose={() => setSelectedExercise(null)}
                            getMuscleGroupLabel={getMuscleGroupLabel}
                            getIntensityLabel={getIntensityLabel}
                            getIntensityColor={getIntensityColor}
                        />
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}

export default TrainingSessionPage