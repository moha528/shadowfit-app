import { X } from "lucide-react"
import { Control } from "react-hook-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { MuscleGroup } from "@prisma/client"

interface MuscleGroupSelectorProps {
    index: number
    selectedMuscleGroups: Record<number, MuscleGroup[]>
    handleMuscleGroupChange: (index: number, muscleGroup: MuscleGroup) => void
    removeMuscleGroup: (index: number, muscleGroup: MuscleGroup) => void
}

export default function MuscleGroupSelector({
    index,
    selectedMuscleGroups,
    handleMuscleGroupChange,
    removeMuscleGroup
}: MuscleGroupSelectorProps) {
    return (
        <FormField
            name={`days.${index}.muscleTargets`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-xs font-medium text-muted-foreground">
                        Muscle Groups
                    </FormLabel>
                    <div className="space-y-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-between h-8 text-sm",
                                            !field.value?.length && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value?.length
                                            ? `${field.value.length} group${field.value.length > 1 ? "s" : ""} selected`
                                            : "Select muscle groups"}
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0" align="start">
                                <Command>
                                    <CommandInput
                                        placeholder="Search for a muscle group..."
                                        className="h-9 text-sm"
                                    />
                                    <CommandList>
                                        <CommandEmpty className="text-sm py-2">
                                            No muscle group found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            <ScrollArea className="h-60">
                                                {Object.values(MuscleGroup).map((muscle) => (
                                                    <CommandItem
                                                        key={muscle}
                                                        value={muscle}
                                                        onSelect={() => handleMuscleGroupChange(index, muscle as MuscleGroup)}
                                                        className="text-sm"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                checked={selectedMuscleGroups[index]?.includes(muscle as MuscleGroup)}
                                                                className="h-3.5 w-3.5 rounded-sm"
                                                            />
                                                            {muscle}
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </ScrollArea>
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        <div className="flex flex-wrap gap-1.5">
                            {selectedMuscleGroups[index]?.map((muscle) => (
                                <Badge
                                    key={muscle}
                                    variant="secondary"
                                    className="flex items-center gap-1 text-xs py-0.5 px-2 bg-accent hover:bg-accent/80 group"
                                >
                                    {muscle}
                                    <button
                                        type="button"
                                        onClick={() => removeMuscleGroup(index, muscle)}
                                        className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
} 