"use client"

import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MuscleGroup } from "@/types/types"

interface ExerciseFiltersProps {
    selectedMuscleGroup: MuscleGroup | null
    setSelectedMuscleGroup: (value: MuscleGroup | null) => void
    selectedIntensity: number | null
    setSelectedIntensity: (value: number | null) => void
    resetFilters: () => void
    getMuscleGroupLabel: (muscle: MuscleGroup) => string
    getIntensityLabel: (intensity: number) => string
}

export function ExerciseFilters({
                                    selectedMuscleGroup,
                                    setSelectedMuscleGroup,
                                    selectedIntensity,
                                    setSelectedIntensity,
                                    resetFilters,
                                    getMuscleGroupLabel,
                                    getIntensityLabel,
                                }: ExerciseFiltersProps) {
    // Get all muscle groups
    const muscleGroups = Object.values(MuscleGroup)

    // Calculate if any filters are active
    const hasActiveFilters = selectedMuscleGroup !== null || selectedIntensity !== null

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex-1"></div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 rounded-xl border-zinc-800/30 bg-zinc-900/50 hover:bg-zinc-800/50 shadow-lg shadow-black/20"
                        >
                            <Filter className="h-5 w-5" />

                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800/50 shadow-xl shadow-black/40">
                        <div className="p-2 text-sm font-medium text-zinc-400">Groupe musculaire</div>
                        {muscleGroups.map((muscle) => (
                            <DropdownMenuItem
                                key={muscle}
                                className={`${selectedMuscleGroup === muscle ? "bg-zinc-800" : ""}`}
                                onClick={() => setSelectedMuscleGroup(selectedMuscleGroup === muscle ? null : muscle)}
                            >
                                {getMuscleGroupLabel(muscle)}
                            </DropdownMenuItem>
                        ))}
                        <div className="p-2 text-sm font-medium text-zinc-400">Intensité</div>
                        {[1, 2, 3].map((intensity) => (
                            <DropdownMenuItem
                                key={intensity}
                                className={`${selectedIntensity === intensity ? "bg-zinc-800" : ""}`}
                                onClick={() => setSelectedIntensity(selectedIntensity === intensity ? null : intensity)}
                            >
                                {getIntensityLabel(intensity)}
                            </DropdownMenuItem>
                        ))}
                        <div className="border-t border-zinc-800 my-1"></div>
                        <DropdownMenuItem onClick={resetFilters}>Réinitialiser les filtres</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Display selected filters */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                    {selectedMuscleGroup && (
                        <Badge
                            className="px-2 py-1 bg-zinc-800 text-zinc-200 flex items-center gap-1"
                        >
                            {getMuscleGroupLabel(selectedMuscleGroup)}
                            <X
                                className="w-3 h-3 cursor-pointer"
                                onClick={() => setSelectedMuscleGroup(null)}
                            />
                        </Badge>
                    )}

                    {selectedIntensity && (
                        <Badge
                            className="px-2 py-1 bg-zinc-800 text-zinc-200 flex items-center gap-1"
                        >
                            {getIntensityLabel(selectedIntensity)}
                            <X
                                className="w-3 h-3 cursor-pointer"
                                onClick={() => setSelectedIntensity(null)}
                            />
                        </Badge>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="text-xs text-zinc-400 hover:text-zinc-200 p-0 h-6"
                    >
                        Effacer tout
                    </Button>
                </div>
            )}
        </div>
    )
}