"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MuscleGroup } from "@/types/exercise"

interface ExerciseFiltersProps {
  selectedCategory: "sans matériel" | "matériel"
  setSelectedCategory: (value: string) => void
  selectedMuscleGroup: MuscleGroup | null
  setSelectedMuscleGroup: (value: MuscleGroup | null) => void
  selectedIntensity: number | null
  setSelectedIntensity: (value: number | null) => void
  resetFilters: () => void
  getMuscleGroupLabel: (muscle: MuscleGroup) => string
  getIntensityLabel: (intensity: number) => string
}

export function ExerciseFilters({
  selectedCategory,
  setSelectedCategory,
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

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <Tabs
        defaultValue="sans matériel"
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className="w-full"
      >
        <TabsList className="w-full bg-zinc-900/50 p-1 rounded-xl shadow-lg shadow-black/20 border border-zinc-800/20">
          <TabsTrigger
            value="sans matériel"
            className="w-1/2 py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-zinc-800 data-[state=active]:to-zinc-900 data-[state=active]:text-white rounded-lg transition-all"
          >
            Sans Matériel
          </TabsTrigger>
          <TabsTrigger
            value="matériel"
            className="w-1/2 py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-zinc-800 data-[state=active]:to-zinc-900 data-[state=active]:text-white rounded-lg transition-all"
          >
            Avec Matériel
          </TabsTrigger>
        </TabsList>
      </Tabs>

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
  )
}
