import { MuscleGroup } from "@prisma/client"

const muscleGroupColors: Record<MuscleGroup, string> = {
  PECTORALS: "bg-blue-500",
  BICEPS: "bg-green-500",
  TRICEPS: "bg-purple-500",
  ABDOMINALS: "bg-yellow-500",
  LEGS: "bg-red-500",
  BACK: "bg-orange-500",
  SHOULDERS: "bg-pink-500",
  CALVES: "bg-indigo-500"
}

export function CalendarLegend() {
  return (
    <div className="p-3 border-t border-border flex flex-wrap items-center gap-4">
      {Object.entries(muscleGroupColors).map(([muscle, color]) => (
        <div key={muscle} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-sm ${color}`}></div>
          <span className="text-xs text-muted-foreground">{muscle.toLowerCase()}</span>
        </div>
      ))}
    </div>
  )
} 