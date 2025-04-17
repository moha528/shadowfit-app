import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gender, MuscleGroup } from "@prisma/client"

interface FilterBarProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    muscleGroupFilter: string
    setMuscleGroupFilter: (group: string) => void
    intensityFilter: string
    setIntensityFilter: (intensity: string) => void
    genderFilter: string
    setGenderFilter: (gender: string) => void
}

export function FilterBar({
                              searchTerm,
                              setSearchTerm,
                              muscleGroupFilter,
                              setMuscleGroupFilter,
                              intensityFilter,
                              setIntensityFilter,
                              genderFilter,
                              setGenderFilter
                          }: FilterBarProps) {
    return (
        <div className="bg-zinc-900/70 rounded-xl shadow-2xl overflow-hidden border border-zinc-800 mb-8">
            <div className="p-6 border-b border-zinc-800">
                <h2 className="text-2xl font-bold text-white mb-4">Filters</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                            placeholder="Search exercises..."
                            className="pl-10 bg-zinc-800/50 border-zinc-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Muscle Group Filter */}
                    <Select
                        value={muscleGroupFilter}
                        onValueChange={setMuscleGroupFilter}
                    >
                        <SelectTrigger className="bg-zinc-800/50 border-zinc-700">
                            <SelectValue placeholder="Filter by muscle group" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Muscle Groups</SelectItem>
                            {Object.entries(MuscleGroup).map(([key, value]) => (
                                <SelectItem key={value} value={value}>
                                    {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Intensity Filter */}
                    <Select
                        value={intensityFilter}
                        onValueChange={setIntensityFilter}
                    >
                        <SelectTrigger className="bg-zinc-800/50 border-zinc-700">
                            <SelectValue placeholder="Filter by intensity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Intensities</SelectItem>
                            <SelectItem value="1">Easy</SelectItem>
                            <SelectItem value="2">Moderate</SelectItem>
                            <SelectItem value="3">Intense</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Gender Filter */}
                    <Select
                        value={genderFilter}
                        onValueChange={setGenderFilter}
                    >
                        <SelectTrigger className="bg-zinc-800/50 border-zinc-700">
                            <SelectValue placeholder="Filter by gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Genders</SelectItem>
                            <SelectItem value={Gender.MALE}>Male</SelectItem>
                            <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                            <SelectItem value={Gender.BOTH}>Both</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}