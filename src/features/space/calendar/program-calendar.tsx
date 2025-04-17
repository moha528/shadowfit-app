"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockProgram } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { MuscleGroup, DayOfWeek, ProgramDay, Program } from "@prisma/client"

interface ProgramCalendarProps {
  userId: string
}

export function ProgramCalendar({ userId }: ProgramCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState<"day" | "month" | "year">("month")
  const program = mockProgram

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const dayNamesShort = ["M", "T", "W", "T", "F", "S", "S"]
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

  // Fonction pour obtenir le nom du jour de la semaine
  const getDayOfWeekName = (date: Date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[date.getDay()]
  }

  // Fonction pour vérifier si une date est dans le programme
  const isProgramDay = (date: Date) => {
    if (!program) return false

    const programStart = program.startDate
    const programEnd = program.endDate

    // Vérifier si la date est dans la plage du programme
    if (date < programStart || date > programEnd) return false

    // Convertir le jour de la semaine JavaScript (0-6, dimanche-samedi) au format de l'enum DayOfWeek
    const dayOfWeekMap: Record<number, DayOfWeek> = {
      1: DayOfWeek.MONDAY,
      2: DayOfWeek.TUESDAY,
      3: DayOfWeek.WEDNESDAY,
      4: DayOfWeek.THURSDAY,
      5: DayOfWeek.FRIDAY,
      6: DayOfWeek.SATURDAY,
      0: DayOfWeek.SUNDAY,
    }

    const dayOfWeek = dayOfWeekMap[date.getDay()]
    // Vérifier si ce jour de la semaine est dans le programme
    return program.days.some((day) => day.dayOfWeek.toString() === dayOfWeek.toString())
  }

  // Fonction pour obtenir les cibles musculaires pour un jour donné
  const getMuscleTargets = (date: Date) => {
    if (!program) return []

    const dayOfWeekMap: Record<number, DayOfWeek> = {
      1: DayOfWeek.MONDAY,
      2: DayOfWeek.TUESDAY,
      3: DayOfWeek.WEDNESDAY,
      4: DayOfWeek.THURSDAY,
      5: DayOfWeek.FRIDAY,
      6: DayOfWeek.SATURDAY,
      0: DayOfWeek.SUNDAY,
    }

    const dayOfWeek = dayOfWeekMap[date.getDay()]
    const programDay = program.days.find((day) => day.dayOfWeek.toString() === dayOfWeek.toString())

    return programDay ? programDay.muscleTargets : []
  }

  // Rendu de la vue jour
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const currentHour = new Date().getHours()

    return (
      <div className="relative overflow-y-auto max-h-[calc(100vh-200px)]">
        {hours.map((hour) => (
          <div key={hour} className="flex border-b border-gray-800 relative">
            <div className="w-12 py-2 text-right pr-2 text-gray-500 text-sm">{hour}:00</div>
            <div className="flex-1 h-12 border-l border-gray-800 relative">
              {/* Ligne rouge pour l'heure actuelle */}
              {hour === 1 && <div className="absolute w-full h-0.5 bg-red-500 top-0 z-10"></div>}

              {/* Événements d'entraînement */}
              {isProgramDay(currentDate) && hour === 18 && (
                <div className="absolute top-0 left-0 right-0 h-24 bg-green-900/20 border-l-4 border-green-500 ml-1 p-2">
                  <div className="text-sm font-medium">Workout</div>
                  <div className="text-xs text-gray-400">
                    {getMuscleTargets(currentDate)
                      .map((target) => target)
                      .join(", ")}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Rendu des jours du mois
  const renderMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    // Ajuster pour que MONDAY soit le premier jour (1-7, MONDAY-dimanche)
    let firstDayOfWeek = firstDay.getDay() || 7
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek

    // Cellules vides pour les jours avant le premier jour du mois
    const blanks = Array(firstDayOfWeek - 1)
      .fill(null)
      .map((_, i) => <div key={`blank-${i}`} className="h-[100px] border border-gray-800"></div>)

    // Jours du mois
    const days = Array(daysInMonth)
      .fill(null)
      .map((_, i) => {
        const date = new Date(year, month, i + 1)
        const isProgram = isProgramDay(date)
        const isToday = date.toDateString() === new Date().toDateString()
        const muscleTargets = getMuscleTargets(date)

        // Déterminer si le jour est un jour d'entraînement et quel type
        const hasChest = muscleTargets.some(target => target.toString() === MuscleGroup.PECTORALS.toString())
        const hasLegs = muscleTargets.some(target => target.toString() === MuscleGroup.LEGS.toString())
        const hasBack = muscleTargets.some(target => target.toString() === MuscleGroup.BACK.toString())
        const hasCardio = muscleTargets.some(target => target.toString() === MuscleGroup.CALVES.toString())

        return (
          <div
            key={`day-${i}`}
            className={cn(
              "h-[100px] border border-gray-800 p-2 relative cursor-pointer hover:bg-gray-900/50",
              isToday ? "bg-primary/20" : "",
              i >= 15 && i <= 16 ? "bg-accent/40" : "",
            )}
            onClick={() => {
              setCurrentDate(date)
              setCurrentView("day")
            }}
          >
            <span className={cn("text-sm font-medium", isToday ? "text-primary" : "text-gray-300")}>{i + 1}</span>

            {/* Indicateurs d'entraînement */}
            <div className="absolute bottom-2 left-2 flex gap-1">
              {hasChest && <div className="w-3 h-3 rounded-sm bg-green-500" title="Chest"></div>}
              {hasLegs && <div className="w-3 h-3 rounded-sm bg-purple-500" title="Legs"></div>}
              {hasBack && <div className="w-3 h-3 rounded-sm bg-orange-500" title="Back"></div>}
              {hasCardio && <div className="w-3 h-3 rounded-sm bg-blue-500" title="Cardio"></div>}
            </div>
          </div>
        )
      })

    return [...blanks, ...days]
  }

  // Rendu de la vue mois
  const renderMonthView = () => {
    return (
      <div>
        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 border-b border-gray-800">
          {dayNames.map((day) => (
            <div key={day} className="py-2 text-center text-gray-400 font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Grille des jours */}
        <div className="grid grid-cols-7">{renderMonthDays()}</div>
      </div>
    )
  }

  // Rendu d'un mini-calendrier pour la vue année
  const renderMiniMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
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
        const date = new Date(year, month, i + 1)
        const isProgram = isProgramDay(date)
        const isToday = date.toDateString() === new Date().toDateString()
        const isCurrent =
          currentDate.getDate() === i + 1 && currentDate.getMonth() === month && currentDate.getFullYear() === year

        return (
          <div
            key={`day-${i}`}
            className={cn(
              "text-center text-xs py-1 cursor-pointer hover:bg-gray-800 rounded-full w-6 h-6 mx-auto flex items-center justify-center",
              isToday ? "text-primary" : "text-gray-400",
              isProgram ? "bg-accent/30" : "",
              isCurrent ? "bg-primary text-primary-foreground" : "",
            )}
            onClick={() => {
              setCurrentDate(date)
              setCurrentView("day")
            }}
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

  // Rendu de la vue année
  const renderYearView = () => {
    const year = currentDate.getFullYear()

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {monthNames.map((monthName, monthIndex) => (
          <div
            key={monthName}
            className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 cursor-pointer"
            onClick={() => {
              setCurrentDate(new Date(year, monthIndex, 1))
              setCurrentView("month")
            }}
          >
            <div className="bg-gray-900 p-2 text-center font-medium border-b border-gray-800">{monthName}</div>
            <div className="p-2">{renderMiniMonth(year, monthIndex)}</div>
          </div>
        ))}
      </div>
    )
  }

  const navigatePrevious = () => {
    if (currentView === "year") {
      setCurrentDate(new Date(currentDate.getFullYear() - 1, 0, 1))
    } else if (currentView === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() - 1)
      setCurrentDate(newDate)
    }
  }

  const navigateNext = () => {
    if (currentView === "year") {
      setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1))
    } else if (currentView === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    } else {
      const newDate = new Date(currentDate)
      newDate.setDate(newDate.getDate() + 1)
      setCurrentDate(newDate)
    }
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Titre du calendrier en fonction de la vue
  const getCalendarTitle = () => {
    if (currentView === "year") {
      return currentDate.getFullYear().toString()
    } else if (currentView === "month") {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    } else {
      return `${getDayOfWeekName(currentDate)} ${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    }
  }

  return (
    <div className="bg-background text-foreground rounded-lg overflow-hidden">
      {/* En-tête du calendrier */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={navigatePrevious}
            className="text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-bold">{getCalendarTitle()}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateNext}
            className="text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-accent/10 rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("day")}
              className={cn(
                "rounded-md px-3 py-1 text-sm",
                currentView === "day" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              Day
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("month")}
              className={cn(
                "rounded-md px-3 py-1 text-sm",
                currentView === "month" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              Month
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("year")}
              className={cn(
                "rounded-md px-3 py-1 text-sm",
                currentView === "year" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              Year
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="border-border text-muted-foreground hover:text-foreground hover:bg-accent/50"
          >
            <Clock className="h-4 w-4 mr-1" />
            Today
          </Button>
        </div>
      </div>

      {/* Corps du calendrier */}
      <div className={cn(currentView === "day" ? "py-1" : "p-6")}>
        {currentView === "day" && renderDayView()}
        {currentView === "month" && renderMonthView()}
        {currentView === "year" && renderYearView()}
      </div>

      {/* Légende */}
      <div className="p-3 border-t border-border flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-primary"></div>
          <span className="text-xs text-muted-foreground">Chest</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-secondary"></div>
          <span className="text-xs text-muted-foreground">Legs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-accent"></div>
          <span className="text-xs text-muted-foreground">Back</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-destructive"></div>
          <span className="text-xs text-muted-foreground">Cardio</span>
        </div>
      </div>
    </div>
  )
}
