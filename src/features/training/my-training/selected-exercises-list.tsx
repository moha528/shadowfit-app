import { Dumbbell, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Exercise } from "@/types/types"

interface SelectedExercisesListProps {
    exercises: Exercise[]
    onRemove: (exerciseId: string) => void
}

export function SelectedExercisesList({ exercises, onRemove }: SelectedExercisesListProps) {
    if (exercises.length === 0) {
        return (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 text-center">
                <Dumbbell className="h-8 w-8 mx-auto text-zinc-700 mb-2" />
                <p className="text-zinc-500">No exercises selected</p>
                <p className="text-xs text-zinc-600 mt-1">Add exercises for this session</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exercises.map((exercise) => (
                <div key={exercise.id} className="flex items-center gap-3 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                    <div className="h-10 w-10 rounded bg-zinc-800 overflow-hidden flex-shrink-0">
                        {exercise.image ? (
                            <img src={exercise.image} alt={exercise.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center">
                                <Dumbbell className="h-5 w-5 text-zinc-600" />
                            </div>
                        )}
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-medium line-clamp-1">{exercise.name}</p>
                        <div className="flex gap-1 mt-1">
                            {exercise.muscleGroups.map((group) => (
                                <Badge key={group} variant="secondary" className="text-xs px-1 py-0">
                                    {group.charAt(0).toUpperCase() + group.slice(1).toLowerCase()}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 rounded-full hover:bg-zinc-800"
                        onClick={() => onRemove(exercise.id)}
                    >
                        <Trash2 className="h-3.5 w-3.5 text-zinc-500" />
                    </Button>
                </div>
            ))}
        </div>
    )
}