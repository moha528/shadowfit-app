"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Exercise, TrainingSessionWithExercises } from "@/types/types"

import {SelectedExercisesList} from "@/features/training/my-training/selected-exercises-list";
import {ExerciseSelector} from "@/features/training/my-training/exercise-selector";
import {createTrainingSessionAction, updateTrainingSessionAction} from "@/actions/training.action";

interface SessionDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    session: TrainingSessionWithExercises | null
    exercises: Exercise[]
    onSave: (session: TrainingSessionWithExercises) => void
}

export function SessionDialog({
                                  open,
                                  onOpenChange,
                                  session,
                                  exercises,
                                  onSave
                              }: SessionDialogProps) {
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])
    const [sessionNotes, setSessionNotes] = useState("")
    const [openExerciseSelector, setOpenExerciseSelector] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (session) {
            setSelectedExercises(session.exercises)
            setSessionNotes(session.notes || "")
        } else {
            setSelectedExercises([])
            setSessionNotes("")
        }
    }, [session, open])

    const handleSaveSession = async () => {
        console.log("Saving session with exercises:", selectedExercises)

        setIsSubmitting(true)
        try {

            let savedSession: TrainingSessionWithExercises

            if (session) {

                // Update existing session
                savedSession = await updateTrainingSessionAction({
                    id: session.id,
                    notes: sessionNotes,
                    exerciseIds: selectedExercises.map(ex => ex.id)
                })
            } else {
                // Create new session

                savedSession = await createTrainingSessionAction({
                    notes: sessionNotes,
                    exerciseIds: selectedExercises.map(ex => ex.id)
                })
            }

            onSave(savedSession)
        } catch (error) {
            console.error("Failed to save session:", error)
            // Here you would typically show an error toast
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleExercisesConfirmed = (selectedExercises: Exercise[]) => {
        setSelectedExercises(selectedExercises)
        setOpenExerciseSelector(false)
    }

    const handleRemoveExercise = (exerciseId: string) => {
        setSelectedExercises(selectedExercises.filter(e => e.id !== exerciseId))
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{session ? "Edit Training Session" : "New Training Session"}</DialogTitle>
                        <DialogDescription>
                            {session
                                ? "Edit the details of your training session."
                                : "Create a new training session by adding exercises and notes."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 my-4">
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Exercises ({selectedExercises.length})</h3>
                                <Button
                                    onClick={() => setOpenExerciseSelector(true)}
                                    size="sm"
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Exercises
                                </Button>
                            </div>

                            <SelectedExercisesList
                                exercises={selectedExercises}
                                onRemove={handleRemoveExercise}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="notes" className="text-sm font-medium">
                                Session Notes
                            </label>
                            <Textarea
                                id="notes"
                                placeholder="How did your session go? (feelings, performance, etc.)"
                                className="h-24 bg-zinc-900/60 border-zinc-800"
                                value={sessionNotes}
                                onChange={(e) => setSessionNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveSession}
                            disabled={isSubmitting || selectedExercises.length === 0}
                        >
                            {isSubmitting ?
                                "Saving..." :
                                session ? "Update Session" : "Create Session"
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <ExerciseSelector
                open={openExerciseSelector}
                onOpenChange={setOpenExerciseSelector}
                availableExercises={exercises}
                selectedExercises={selectedExercises}
                onConfirm={handleExercisesConfirmed}
            />
        </>
    )
}