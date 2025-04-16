"use client"

import { useRouter } from "next/navigation"

import { useExercises } from "@/hooks/use-exercises"
import { AnimatePresence } from "framer-motion"

import {SearchBar} from "@/features/training/search-bar";
import {ExerciseFilters} from "@/features/training/exercise-filters";
import {ExerciseGrid} from "@/features/training/exercise-grid";
import {ExerciseDetails} from "@/features/training/exercise-details";

import React from 'react';


const HomePage = () => {
    const router = useRouter()
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

    return (
        <div className="min-h-screen  text-white relative overflow-hidden">


            {/* Main content */}
            <main className="container mx-auto px-4 py-6 relative z-10">
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
                />

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
};

export default HomePage;

