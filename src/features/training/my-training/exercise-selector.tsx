"use client"

import { useState, useEffect } from "react"
import { Dumbbell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Exercise } from "@/types/types"

interface ExerciseSelectorProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    availableExercises: Exercise[]
    selectedExercises: Exercise[]
    onConfirm: (exercises: Exercise[]) => void
}

export function ExerciseSelector({
                                     open,
                                     onOpenChange,
                                     availableExercises,
                                     selectedExercises,
                                     onConfirm
                                 }: ExerciseSelectorProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [tempSelectedExercises, setTempSelectedExercises] = useState<Exercise[]>([])


    useEffect(() => {
        if (open) {
            setTempSelectedExercises([...selectedExercises])
            setSearchTerm("")
        }
    }, [open, selectedExercises])

    const handleSelectExercise = (exercise: Exercise) => {
        if (tempSelectedExercises.some(e => e.id === exercise.id)) {
            setTempSelectedExercises(tempSelectedExercises.filter(e => e.id !== exercise.id))
        } else {
            setTempSelectedExercises([...tempSelectedExercises, exercise])
        }
    }

    const handleConfirm = () => {
        onConfirm(tempSelectedExercises)
    }

    const filteredExercises = availableExercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.muscleGroups.some(group =>
            group.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Add Exercises</DialogTitle>
                    <DialogDescription>
                        Select the exercises you performed during this session.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                    <Input
                        placeholder="Search for an exercise..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-zinc-900/60 border-zinc-800"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredExercises.map((exercise) => {
                            const isSelected = tempSelectedExercises.some(e => e.id === exercise.id)
                            return (
                                <div
                                    key={exercise.id}
                                    className={`border rounded-xl overflow-hidden cursor-pointer transition-all ${
                                        isSelected
                                            ? "border-blue-500 bg-blue-950/20"
                                            : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                                    }`}
                                    onClick={() => handleSelectExercise(exercise)}
                                >
                                    <div className="relative h-28">
                                        {exercise.image ? (
                                            <img
                                                src={exercise.image}
                                                alt={exercise.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                                <Dumbbell className="h-8 w-8 text-zinc-600" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        <div className="absolute bottom-2 left-2 right-2">
                                            <h3 className="text-sm font-medium line-clamp-1">{exercise.name}</h3>
                                        </div>
                                        {isSelected && (
                                            <div className="absolute top-2 right-2">
                                                <div className="bg-blue-500 rounded-full h-5 w-5 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-2">
                                        <div className="flex flex-wrap gap-1">
                                            {exercise.muscleGroups.map((group) => (
                                                <Badge key={group} variant="secondary" className="text-xs px-1 py-0">
                                                    {group.charAt(0).toUpperCase() + group.slice(1).toLowerCase()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {filteredExercises.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-zinc-500">No exercises found for "{searchTerm}"</p>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} className="flex items-center gap-2">
                        Confirm ({tempSelectedExercises.length} selected)
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}