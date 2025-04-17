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

interface DayViewProps {
  currentDate: Date
  isProgramDay: (date: Date) => boolean
  getMuscleTargets: (date: Date) => $Enums.MuscleGroup[]
  program: Program | null
}

export function DayView({ currentDate, isProgramDay, getMuscleTargets, program }: DayViewProps) {
  const isWorkoutDay = isProgramDay(currentDate)
  const muscleTargets = getMuscleTargets(currentDate)
  const isStartDate = program ? currentDate.toDateString() === new Date(program.startDate).toDateString() : false
  const isEndDate = program ? currentDate.toDateString() === new Date(program.endDate).toDateString() : false

  return (
    <motion.div 
      className="p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          {currentDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </h2>
        {(isStartDate || isEndDate) && (
          <div className="mt-2">
            {isStartDate && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
                Program Start Date
              </span>
            )}
            {isEndDate && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500 ml-2">
                Program End Date
              </span>
            )}
          </div>
        )}
      </div>

      {isWorkoutDay ? (
        <motion.div
          className="bg-gray-800/50 rounded-lg p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-2">Workout Day</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Muscle Groups:</p>
            <div className="flex flex-wrap gap-2">
              {muscleTargets.map((muscle) => (
                <div
                  key={muscle}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    muscleGroupColors[muscle]
                  )}
                >
                  {muscle.toLowerCase()}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="text-center text-gray-500 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          No workout scheduled for this day
        </motion.div>
      )}
    </motion.div>
  )
} 