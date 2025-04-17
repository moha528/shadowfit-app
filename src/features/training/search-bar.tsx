"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MuscleGroup } from "@prisma/client"

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedMuscleGroups: MuscleGroup[] // Changed to array
  setSelectedMuscleGroups: (groups: MuscleGroup[]) => void // Changed to array
  selectedIntensity: number | null
  setSelectedIntensity: (intensity: number | null) => void
  getMuscleGroupLabel: (muscle: MuscleGroup) => string
  getIntensityLabel: (intensity: number) => string
}

export function SearchBar({
                            searchQuery,
                            setSearchQuery,
                            selectedMuscleGroups,
                            setSelectedMuscleGroups,
                            selectedIntensity,
                            setSelectedIntensity,
                            getMuscleGroupLabel,
                            getIntensityLabel,
                          }: SearchBarProps) {
  // Function to remove a specific muscle group
  const removeMuscleGroup = (muscle: MuscleGroup) => {
    setSelectedMuscleGroups(selectedMuscleGroups.filter(m => m !== muscle))
  }

  // Check if any filters are active
  const hasActiveFilters = selectedMuscleGroups.length > 0 || selectedIntensity !== null

  return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <Input
              type="text"
              placeholder="Search an exercice or a muscle group..."
              className="pl-10 bg-zinc-900/50 border-zinc-800/30 h-12 rounded-xl focus:border-zinc-600 focus:ring-zinc-600 shadow-lg shadow-black/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Active filters */}
        {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {selectedMuscleGroups.map((muscle) => (
                  <Badge
                      key={muscle}
                      variant="outline"
                      className="bg-blue-600/20 text-blue-400 border-blue-500/30 hover:bg-blue-700/30 flex items-center gap-1 px-3 py-1 shadow-md shadow-black/10"
                      onClick={() => removeMuscleGroup(muscle)}
                  >
                    {getMuscleGroupLabel(muscle)}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
              ))}

              {selectedIntensity && (
                  <Badge
                      variant="outline"
                      className="bg-yellow-600/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-700/30 flex items-center gap-1 px-3 py-1 shadow-md shadow-black/10"
                      onClick={() => setSelectedIntensity(null)}
                  >
                    Intensité: {getIntensityLabel(selectedIntensity)}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
              )}
            </div>
        )}
      </div>
  )
}