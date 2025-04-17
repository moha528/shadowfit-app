import { cn } from "@/lib/utils"
import { DayOfWeek, MuscleGroup } from "@prisma/client"

interface YearViewProps {
  currentDate: Date
  isProgramDay: (date: Date) => boolean
  onMonthClick: (date: Date) => void
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const dayNamesShort = ["M", "T", "W", "T", "F", "S", "S"]

export function YearView({ currentDate, isProgramDay, onMonthClick }: YearViewProps) {
  const year = currentDate.getFullYear()

  const renderMiniMonth = (monthIndex: number) => {
    const firstDay = new Date(year, monthIndex, 1)
    const lastDay = new Date(year, monthIndex + 1, 0)
    const daysInMonth = lastDay.getDate()

    // Ajuster pour que MONDAY soit le premier jour (1-7, MONDAY-dimanche)
    let firstDayOfWeek = firstDay.getDay() || 7
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek

    // Cellules vides pour les jours avant le premier jour du mois
    const blanks = Array(firstDayOfWeek - 1)
      .fill(null)
      .map((_, i) => <div key={`blank-${i}`} className="text-center"></div>)

    // Jours du mois
    const days = Array(daysInMonth)
      .fill(null)
      .map((_, i) => {
        const date = new Date(year, monthIndex, i + 1)
        const isProgram = isProgramDay(date)
        const isToday = date.toDateString() === new Date().toDateString()
        const isCurrent =
          currentDate.getDate() === i + 1 && currentDate.getMonth() === monthIndex && currentDate.getFullYear() === year

        return (
          <div
            key={`day-${i}`}
            className={cn(
              "text-center text-xs py-1 cursor-pointer hover:bg-gray-800 rounded-full w-6 h-6 mx-auto flex items-center justify-center",
              isToday ? "text-primary" : "text-gray-400",
              isProgram ? "bg-accent/30" : "",
              isCurrent ? "bg-primary text-primary-foreground" : "",
            )}
          >
            {i + 1}
          </div>
        )
      })

    return (
      <div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1">
          {dayNamesShort.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{[...blanks, ...days]}</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {monthNames.map((monthName, monthIndex) => (
        <div
          key={monthName}
          className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 cursor-pointer"
          onClick={() => onMonthClick(new Date(year, monthIndex, 1))}
        >
          <div className="bg-gray-900 p-2 text-center font-medium border-b border-gray-800">{monthName}</div>
          <div className="p-2">{renderMiniMonth(monthIndex)}</div>
        </div>
      ))}
    </div>
  )
} 