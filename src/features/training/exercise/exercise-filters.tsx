"use client"

import { Button } from "@/components/ui/button"
import { Filter, X, Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MuscleGroup } from "@prisma/client"
import { useState } from "react"

interface ExerciseFiltersProps {
    selectedMuscleGroups: MuscleGroup[] // Changed to array
    setSelectedMuscleGroups: (value: MuscleGroup[]) => void // Changed to array
    selectedIntensity: number | null
    setSelectedIntensity: (value: number | null) => void
    resetFilters: () => void
    getMuscleGroupLabel: (muscle: MuscleGroup) => string
    getIntensityLabel: (intensity: number) => string
}

export function ExerciseFilters({
                                    selectedMuscleGroups,
                                    setSelectedMuscleGroups,
                                    selectedIntensity,
                                    setSelectedIntensity,
                                    resetFilters,
                                    getMuscleGroupLabel,
                                    getIntensityLabel,
                                }: ExerciseFiltersProps) {
    // Get all muscle groups
    const muscleGroups = Object.values(MuscleGroup)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Calculate if any filters are active
    const hasActiveFilters = selectedMuscleGroups.length > 0 || selectedIntensity !== null

    // Toggle muscle group selection
    const toggleMuscleGroup = (muscle: MuscleGroup) => {
        if (selectedMuscleGroups.includes(muscle)) {
            setSelectedMuscleGroups(selectedMuscleGroups.filter(m => m !== muscle))
        } else {
            setSelectedMuscleGroups([...selectedMuscleGroups, muscle])
        }
    }

    // Remove muscle group
    const removeMuscleGroup = (muscle: MuscleGroup) => {
        setSelectedMuscleGroups(selectedMuscleGroups.filter(m => m !== muscle))
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex-1"></div>

                <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className={`h-12 w-12 rounded-xl transition-all duration-200 border-zinc-800/30 ${hasActiveFilters
                                ? "bg-zinc-800 text-white"
                                : "bg-zinc-900/50 hover:bg-zinc-800/50"} shadow-lg shadow-black/20`}
                        >
                            <Filter className="h-5 w-5" />
                            {hasActiveFilters && (
                                <span className="absolute top-1 right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {selectedMuscleGroups.length + (selectedIntensity !== null ? 1 : 0)}
                </span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-72 bg-zinc-900 border-zinc-800/50 shadow-xl shadow-black/40 rounded-xl p-2"
                    >
                        <div className="flex justify-between items-center mb-2 px-2">
                            <h3 className="text-sm font-semibold text-white">Filtres</h3>
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        resetFilters()
                                        setIsFilterOpen(false)
                                    }}
                                    className="text-xs text-zinc-400 hover:text-zinc-200 p-1 h-7"
                                >
                                    Réinitialiser
                                </Button>
                            )}
                        </div>

                        <div className="border-b border-zinc-800 my-2"></div>

                        <div className="mb-3">
                            <div className="p-2 text-sm font-medium text-white">Muscular Groups</div>
                            <div className="grid grid-cols-2 gap-1">
                                {muscleGroups.map((muscle) => (
                                    <div
                                        key={muscle}
                                        className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all ${
                                            selectedMuscleGroups.includes(muscle)
                                                ? "bg-blue-600/20 text-blue-400"
                                                : "hover:bg-zinc-800 text-zinc-300"
                                        }`}
                                        onClick={() => toggleMuscleGroup(muscle)}
                                    >
                                        <div className={`w-4 h-4 rounded mr-2 flex items-center justify-center border ${
                                            selectedMuscleGroups.includes(muscle)
                                                ? "border-blue-500 bg-blue-500/20"
                                                : "border-zinc-700"
                                        }`}>
                                            {selectedMuscleGroups.includes(muscle) && (
                                                <Check className="w-3 h-3 text-blue-400" />
                                            )}
                                        </div>
                                        <span className="text-sm">{getMuscleGroupLabel(muscle)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-b border-zinc-800 my-2"></div>

                        <div>
                            <div className="p-2 text-sm font-medium text-white">Intensité</div>
                            <div className="flex gap-2 px-2">
                                {[1, 2, 3].map((intensity) => (
                                    <div
                                        key={intensity}
                                        onClick={() => setSelectedIntensity(selectedIntensity === intensity ? null : intensity)}
                                        className={`flex-1 py-2 rounded-lg cursor-pointer text-center transition-all ${
                                            selectedIntensity === intensity
                                                ? "bg-blue-600/20 text-blue-400 border border-blue-500/50"
                                                : "bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 border border-transparent"
                                        }`}
                                    >
                                        {getIntensityLabel(intensity)}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => setIsFilterOpen(false)}
                            >
                                Appliquer
                            </Button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Display selected filters */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 py-2">
                    {selectedMuscleGroups.map(muscle => (
                        <Badge
                            key={muscle}
                            className="px-2 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center gap-1"
                        >
                            {getMuscleGroupLabel(muscle)}
                            <X
                                className="w-3 h-3 cursor-pointer"
                                onClick={() => removeMuscleGroup(muscle)}
                            />
                        </Badge>
                    ))}

                    {selectedIntensity && (
                        <Badge
                            className="px-2 py-1 bg-yellow-600/20 text-yellow-400 border border-yellow-500/30 flex items-center gap-1"
                        >
                            {getIntensityLabel(selectedIntensity)}
                            <X
                                className="w-3 h-3 cursor-pointer"
                                onClick={() => setSelectedIntensity(null)}
                            />
                        </Badge>
                    )}

                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            onClick={resetFilters}
                            className="px-2 py-1 bg-yellow-600/20 text-red-400 cursor-pointer border border-red-500/30 flex items-center gap-1"
                        >
                            Delete All
                        </Button>


                    )}
                </div>
            )}
        </div>
    )
}