"use client"

import { useState, useEffect } from "react"
import { $Enums, Program, ProgramDay } from "@prisma/client"
import { CalendarHeader } from "./components/calendar-header"
import { DayView } from "./components/day-view"
import { MonthView } from "./components/month-view"
import { YearView } from "./components/year-view"
import { CalendarLegend } from "./components/calendar-legend"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { zoomInPulse, fadeIn, staggeredFade } from "@/components/animations"

interface ProgramCalendarProps {
  userId: string,
  program: Program & { days: ProgramDay[] } | null
}

export function ProgramCalendar({ userId, program }: ProgramCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState<"day" | "month" | "year">("month")

  const isProgramDay = (date: Date) => {
    if (!program) return false

    const programStart = new Date(program.startDate)
    const programEnd = new Date(program.endDate)

    if (date < programStart || date > programEnd) return false

    const dayOfWeekMap: Record<number, $Enums.DayOfWeek> = {
      1: $Enums.DayOfWeek.MONDAY,
      2: $Enums.DayOfWeek.TUESDAY,
      3: $Enums.DayOfWeek.WEDNESDAY,
      4: $Enums.DayOfWeek.THURSDAY,
      5: $Enums.DayOfWeek.FRIDAY,
      6: $Enums.DayOfWeek.SATURDAY,
      0: $Enums.DayOfWeek.SUNDAY,
    }

    const dayOfWeek = dayOfWeekMap[date.getDay()]

    return program.days.some((day: any) => day.dayOfWeek.toString() === dayOfWeek.toString())
  }

  const getMuscleTargets = (date: Date): $Enums.MuscleGroup[] => {
    if (!program) return []

    const dayOfWeekMap: Record<number, $Enums.DayOfWeek> = {
      1: $Enums.DayOfWeek.MONDAY,
      2: $Enums.DayOfWeek.TUESDAY,
      3: $Enums.DayOfWeek.WEDNESDAY,
      4: $Enums.DayOfWeek.THURSDAY,
      5: $Enums.DayOfWeek.FRIDAY,
      6: $Enums.DayOfWeek.SATURDAY,
      0: $Enums.DayOfWeek.SUNDAY,
    }

    const dayOfWeek = dayOfWeekMap[date.getDay()]
    const programDay = program.days.find((day: any) => day.dayOfWeek.toString() === dayOfWeek.toString())

    return programDay ? programDay.muscleTargets : []
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

  const handleDayClick = (date: Date) => {
    setCurrentDate(date)
    setCurrentView("day")
  }

  const handleMonthClick = (date: Date) => {
    setCurrentDate(date)
    setCurrentView("month")
  }

  return (
    <motion.div 
      className="bg-background text-foreground rounded-lg overflow-hidden"
      {...zoomInPulse}
    >
      <CalendarHeader
        currentDate={currentDate}
        currentView={currentView}
        onPrevious={navigatePrevious}
        onNext={navigateNext}
        onToday={goToToday}
        onViewChange={setCurrentView}
      />

      <motion.div 
        className={cn(currentView === "day" ? "py-1" : "p-6")}
        {...staggeredFade}
      >
        <AnimatePresence mode="wait">
          {currentView === "day" && (
            <motion.div
              key="day"
              {...fadeIn}
            >
              <DayView
                currentDate={currentDate}
                isProgramDay={isProgramDay}
                getMuscleTargets={getMuscleTargets}
                program={program}
              />
            </motion.div>
          )}
          {currentView === "month" && (
            <motion.div
              key="month"
              {...fadeIn}
            >
              <MonthView
                currentDate={currentDate}
                isProgramDay={isProgramDay}
                getMuscleTargets={getMuscleTargets}
                onDayClick={handleDayClick}
                program={program}
              />
            </motion.div>
          )}
          {currentView === "year" && (
            <motion.div
              key="year"
              {...fadeIn}
            >
              <YearView
                currentDate={currentDate}
                isProgramDay={isProgramDay}
                onMonthClick={handleMonthClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div {...fadeIn}>
        <CalendarLegend />
      </motion.div>
    </motion.div>
  )
}
