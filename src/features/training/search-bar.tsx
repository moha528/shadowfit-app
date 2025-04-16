"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { MuscleGroup } from "@/types/exercise"

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedMuscleGroup: MuscleGroup | null
  setSelectedMuscleGroup: (group: MuscleGroup | null) => void
  selectedIntensity: number | null
  setSelectedIntensity: (intensity: number | null) => void
  getMuscleGroupLabel: (muscle: MuscleGroup) => string
  getIntensityLabel: (intensity: number) => string
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedMuscleGroup,
  setSelectedMuscleGroup,
  selectedIntensity,
  setSelectedIntensity,
  getMuscleGroupLabel,
  getIntensityLabel,
}: SearchBarProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
        <Input
          type="text"
          placeholder="Rechercher un exercice ou un muscle..."
          className="pl-10 bg-zinc-900/50 border-zinc-800/30 h-12 rounded-xl focus:border-zinc-600 focus:ring-zinc-600 shadow-lg shadow-black/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Active filters */}
      {(selectedMuscleGroup || selectedIntensity) && (
        <div className="flex flex-wrap gap-2">
          {selectedMuscleGroup && (
            <Badge
              variant="outline"
              className="bg-zinc-800/50 hover:bg-zinc-700/50 border-zinc-700/50 shadow-md shadow-black/20"
              onClick={() => setSelectedMuscleGroup(null)}
            >
              {getMuscleGroupLabel(selectedMuscleGroup)}
              <span className="ml-1 text-xs">×</span>
            </Badge>
          )}
          {selectedIntensity && (
            <Badge
              variant="outline"
              className="bg-zinc-800/50 hover:bg-zinc-700/50 border-zinc-700/50 shadow-md shadow-black/20"
              onClick={() => setSelectedIntensity(null)}
            >
              Intensité: {getIntensityLabel(selectedIntensity)}
              <span className="ml-1 text-xs">×</span>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
