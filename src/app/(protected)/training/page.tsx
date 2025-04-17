"use client"

import { useExercises } from "@/hooks/use-exercises"
import { AnimatePresence } from "framer-motion"
import { SearchBar } from "@/features/training/search-bar"
import { ExerciseFilters } from "@/features/training/exercise/exercise-filters"
import { ExerciseGrid } from "@/features/training/exercise/exercise-grid"
import { ExerciseDetails } from "@/features/training/exercise/exercise-details"

const HomePage = () => {
    const {
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
    } = useExercises()

    return (
        <div className="min-h-screen text-white relative overflow-hidden">
            <main className="container mx-auto px-4 py-6 relative z-10">
                {/* Search and filters */}
                <div className="mb-8 space-y-4">
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedMuscleGroups={selectedMuscleGroups}
                        setSelectedMuscleGroups={setSelectedMuscleGroups}
                        selectedIntensity={selectedIntensity}
                        setSelectedIntensity={setSelectedIntensity}
                        getMuscleGroupLabel={getMuscleGroupLabel}
                        getIntensityLabel={getIntensityLabel}
                    />

                    <ExerciseFilters
                        selectedMuscleGroups={selectedMuscleGroups}
                        setSelectedMuscleGroups={setSelectedMuscleGroups}
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
                    hoveredExercise={hoveredExercise}
                    setHoveredExercise={setHoveredExercise}
                    setSelectedExercise={setSelectedExercise}
                    getMuscleGroupLabel={getMuscleGroupLabel}
                    getIntensityLabel={getIntensityLabel}
                    getIntensityColor={getIntensityColor}
                    resetFilters={resetFilters}
                />

                {/* Exercise details modal */}
                <AnimatePresence>
                    {selectedExercise && (
                        <ExerciseDetails
                            exercise={selectedExercise}
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

export default HomePage