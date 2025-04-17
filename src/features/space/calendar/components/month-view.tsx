import { cn } from "@/lib/utils"
import { $Enums, Program } from "@prisma/client"
import { motion } from "framer-motion"
import { fadeIn } from "@/components/animations"

const muscleGroupColors: Record<$Enums.MuscleGroup, string> = {
  PECTORALS: "bg-blue-500",
  BICEPS: "bg-green-500",
  TRICEPS: "bg-purple-500",
  ABDOMINALS: "bg-yellow-500",
  LEGS: "bg-red-500",
  BACK: "bg-orange-500",
  SHOULDERS: "bg-pink-500",
  CALVES: "bg-indigo-500"
}

interface MonthViewProps {
  currentDate: Date
  isProgramDay: (date: Date) => boolean
  getMuscleTargets: (date: Date) => $Enums.MuscleGroup[]
  onDayClick: (date: Date) => void
  program: Program | null
}

export function MonthView({ currentDate, isProgramDay, getMuscleTargets, onDayClick, program }: MonthViewProps) {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const today = new Date()

  const isProgramStartDate = (date: Date) => {
    if (!program) return false
    return date.toDateString() === new Date(program.startDate).toDateString()
  }

  const isProgramEndDate = (date: Date) => {
    if (!program) return false
    return date.toDateString() === new Date(program.endDate).toDateString()
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: firstDayOfMonth }).map((_, index) => (
        <div key={`empty-${index}`} className="h-24" />
      ))}
      {Array.from({ length: daysInMonth }).map((_, day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1)
        const isToday = date.toDateString() === today.toDateString()
        const isWorkoutDay = isProgramDay(date)
        const muscleTargets = isWorkoutDay ? getMuscleTargets(date) : []
        const isStartDate = isProgramStartDate(date)
        const isEndDate = isProgramEndDate(date)

        return (
          <motion.div
            key={day}
            className={cn(
              "h-24 p-2 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800/30 relative",
              isToday && "bg-gray-800/50",
              isWorkoutDay && "bg-green-900/20",
              isStartDate && "border-l-4 border-l-blue-500",
              isEndDate && "border-r-4 border-r-blue-500"
            )}
            onClick={() => onDayClick(date)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: day * 0.02 }}
          >
            <div className="flex justify-between items-start">
              <span className={cn("text-sm", isToday && "text-green-500 font-bold")}>
                {day + 1}
              </span>
              {isWorkoutDay && (
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
              )}
            </div>
            {isStartDate && (
              <div className="absolute bottom-1 right-1 text-xs text-blue-500 font-medium">
                Start
              </div>
            )}
            {isEndDate && (
              <div className="absolute top-1 right-1 text-xs text-blue-500 font-medium">
                End
              </div>
            )}
            {isWorkoutDay && (
              <motion.div
                className="mt-2 flex flex-wrap gap-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                {muscleTargets.map((muscle) => (
                  <div
                    key={muscle}
                    className={cn(
                      "w-2 h-2 rounded-full",
                      muscleGroupColors[muscle]
                    )}
                    title={muscle.toLowerCase()}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
} 