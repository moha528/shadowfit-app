// ExerciseList.tsx
"use client"

import { useState } from "react"

import { Card } from "@/components/ui/card"
import { useEdgeStore } from "@/lib/edgestore"
import { toastAlert } from "@/components/ui/sonner-v2"
import { deleteExerciseAction, updateExerciseAction } from "@/actions/training.action"
import { Gender, MuscleGroup } from "@prisma/client"
import { toast } from "sonner"

// Import newly created components


// Types
import { Exercise } from "../../../types/types"
import {HeaderLogo} from "@/features/training/training/header-logo";
import {FilterBar} from "@/features/training/training/filter-bar";
import {NoResultsFound} from "@/features/training/training/no-results-found";
import {ExerciseListCard} from "@/features/training/training/exerice-list-card";
import {DeleteConfirmationModal} from "@/features/training/exercise/delete-confirmation-modal";
import {EditExerciseModal} from "@/features/training/training/edit-exercise-modal";
import {ExerciseFormValues} from "@/features/training/field-schema-form";

export default function TrainingPage({data}: {data: Exercise[]}) {
    const [isLoading, setIsLoading] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [muscleGroupFilter, setMuscleGroupFilter] = useState<string>("ALL")
    const [intensityFilter, setIntensityFilter] = useState<string>("ALL")
    const [genderFilter, setGenderFilter] = useState<string>("ALL")
    const [uploadProgress, setUploadProgress] = useState(0)

    const { edgestore } = useEdgeStore()

    // Filter exercises based on current filter settings
    const filteredExercises = data.filter(exercise => {
        // Apply search term filter
        if (searchTerm &&
            !exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !exercise.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false
        }

        // Apply muscle group filter
        if (muscleGroupFilter !== "ALL" &&
            !exercise.muscleGroups.includes(muscleGroupFilter as MuscleGroup)) {
            return false
        }

        // Apply intensity filter
        if (intensityFilter !== "ALL" &&
            exercise.intensity !== parseInt(intensityFilter)) {
            return false
        }

        // Apply gender filter
        if (genderFilter !== "ALL" &&
            exercise.type !== genderFilter as Gender) {
            return false
        }

        return true
    })

    const handleEdit = (exercise: Exercise) => {
        setCurrentExercise(exercise)
        setIsEditModalOpen(true)
    }

    const handleDelete = (exercise: Exercise) => {
        setCurrentExercise(exercise)
        setIsDeleteModalOpen(true)
    }

    const handleEditSubmit = async (values: ExerciseFormValues) => {
        if (!currentExercise) return

        setIsLoading(true)
        setUploadProgress(0)

        try {
            let imageUrl = currentExercise.image

            // Handle image upload if a new image is provided
            if (values.image) {
                const toastId = toastAlert.loading({
                    title: "Uploading image...",
                    description: "Please wait while we upload the image",
                    duration: 0,
                })

                const res = await edgestore.publicFiles.upload({
                    file: values.image,
                    onProgressChange: (progress) => {
                        setUploadProgress(progress)
                        toast.dismiss(toastId)
                    },
                    options: {
                        replaceTargetUrl: imageUrl,
                    },
                })
                imageUrl = res.url
            }

            // Update exercise
            const result = await updateExerciseAction(currentExercise.id, {
                name: values.name,
                description: values.description ? values.description : "",
                muscleGroups: values.muscleGroups ? values.muscleGroups : [],
                intensity: values.intensity,
                type: values.type,
                image: imageUrl ? imageUrl : "",
            })

            if (result.error) {
                toastAlert.error({
                    title: "Error",
                    description: result.error,
                })
                return
            }

            toastAlert.success({
                title: "Success!",
                description: "Exercise updated successfully",
            })

            setIsEditModalOpen(false)
        } catch (error) {
            console.error("Update error:", error)
            toastAlert.error({
                title: "Error",
                description: "An error occurred while updating the exercise",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteConfirm = async () => {
        if (!currentExercise) return

        setIsLoading(true)
        try {
            const result = await deleteExerciseAction(currentExercise.id)

            if (result.error) {
                toastAlert.error({
                    title: "Error",
                    description: result.error,
                })
                return
            }

            toastAlert.success({
                title: "Success!",
                description: "Exercise deleted successfully",
            })

            setIsDeleteModalOpen(false)
        } catch (error) {
            console.error("Delete error:", error)
            toastAlert.error({
                title: "Error",
                description: "An error occurred while deleting the exercise",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const clearFilters = () => {
        setSearchTerm("")
        setMuscleGroupFilter("ALL")
        setIntensityFilter("ALL")
        setGenderFilter("ALL")
    }

    const getInitialFormValues = () => {
        if (!currentExercise) return undefined

        return {
            name: currentExercise.name,
            description: currentExercise.description || "",
            muscleGroups: currentExercise.muscleGroups,
            intensity: currentExercise.intensity,
            type: currentExercise.type,
            image: null, // File objects can't be initialized from URLs
        }
    }

    return (
        <div className="min-h-screen bg-black py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <HeaderLogo />

                {/* Filters */}
                <FilterBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    muscleGroupFilter={muscleGroupFilter}
                    setMuscleGroupFilter={setMuscleGroupFilter}
                    intensityFilter={intensityFilter}
                    setIntensityFilter={setIntensityFilter}
                    genderFilter={genderFilter}
                    setGenderFilter={setGenderFilter}
                />

                {/* Exercise List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <Card key={index} className="bg-zinc-900/70 border-zinc-800 h-64 animate-pulse">
                                <div className="h-full flex items-center justify-center">
                                    <span className="text-zinc-600">Loading...</span>
                                </div>
                            </Card>
                        ))
                    ) : filteredExercises.length === 0 ? (
                        <NoResultsFound clearFilters={clearFilters} />
                    ) : (
                        filteredExercises.map((exercise) => (
                            <ExerciseListCard
                                key={exercise.id}
                                exercise={exercise}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </div>

                {/* Edit Modal */}
                <EditExerciseModal
                    isOpen={isEditModalOpen}
                    setIsOpen={setIsEditModalOpen}
                    currentExercise={currentExercise}
                    isLoading={isLoading}
                    uploadProgress={uploadProgress}
                    initialValues={getInitialFormValues()}
                    onSubmit={handleEditSubmit}
                />

                {/* Delete Confirmation Modal */}
                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    setIsOpen={setIsDeleteModalOpen}
                    exerciseName={currentExercise?.name}
                    isLoading={isLoading}
                    onConfirm={handleDeleteConfirm}
                />
            </div>
        </div>
    )
}