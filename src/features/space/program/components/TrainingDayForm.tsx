import { PlusCircle, Trash2 } from "lucide-react"
import { Control, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProgramFormValues } from "@/schemas/space.schema"
import { DayOfWeek, MuscleGroup } from "@prisma/client"
import MuscleGroupSelector from "./MuscleGroupSelector"

interface TrainingDayFormProps {
    control: Control<ProgramFormValues>
    selectedMuscleGroups: Record<number, MuscleGroup[]>
    handleMuscleGroupChange: (index: number, muscleGroup: MuscleGroup) => void
    removeMuscleGroup: (index: number, muscleGroup: MuscleGroup) => void
    getAvailableDays: (currentIndex: number) => DayOfWeek[]
    removeDay: (index: number) => void
}

export function TrainingDayForm({
    control,
    selectedMuscleGroups,
    handleMuscleGroupChange,
    removeMuscleGroup,
    getAvailableDays,
    removeDay
}: TrainingDayFormProps) {
    const { watch, setValue } = useFormContext<ProgramFormValues>()
    const days = watch("days")

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-base font-medium text-foreground">Training Days</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Add at least one training day to your program
                    </p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        const availableDays = getAvailableDays(-1)
                        if (availableDays.length > 0) {
                            setValue("days", [
                                ...days,
                                { dayOfWeek: availableDays[0], muscleTargets: [] },
                            ])
                        }
                    }}
                    className="shrink-0 h-8 text-xs"
                >
                    <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
                    Add a day
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {days.map((day, index) => (
                    <Card key={index} className="border border-border bg-card space-y-0 py-3 gap-1">
                        <CardHeader className="px-4 py-0 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                Day {index + 1}
                            </CardTitle>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeDay(index)}
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardHeader>

                        <CardContent className="px-4 pt-0 space-y-1">
                            <div className="flex justify-between items-start gap-3 flex-wrap">
                                <FormField
                                    control={control}
                                    name={`days.${index}.dayOfWeek`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-medium text-muted-foreground">
                                                Day of the week
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="h-8 text-sm">
                                                        <SelectValue placeholder="Select a day" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {getAvailableDays(index).map((day) => (
                                                        <SelectItem key={day} value={day} className="text-sm">
                                                            {day}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <MuscleGroupSelector
                                    index={index}
                                    selectedMuscleGroups={selectedMuscleGroups}
                                    handleMuscleGroupChange={handleMuscleGroupChange}
                                    removeMuscleGroup={removeMuscleGroup}
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
} 