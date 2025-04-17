import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

interface CalendarHeaderProps {
  currentDate: Date
  currentView: "day" | "month" | "year"
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
  onViewChange: (view: "day" | "month" | "year") => void
}

export function CalendarHeader({
  currentDate,
  currentView,
  onPrevious,
  onNext,
  onToday,
  onViewChange
}: CalendarHeaderProps) {
  const getCalendarTitle = () => {
    if (currentView === "year") {
      return format(currentDate, 'yyyy', { locale: enUS })
    } else if (currentView === "month") {
      return format(currentDate, 'MMMM yyyy', { locale: enUS })
    } else {
      return format(currentDate, 'EEEE d MMMM yyyy', { locale: enUS })
    }
  }

  return (
    <div className="p-4 flex items-center justify-between border-b border-border">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          className="text-muted-foreground hover:text-foreground hover:bg-accent/50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold">{getCalendarTitle()}</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
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
            onClick={() => onViewChange("day")}
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
            onClick={() => onViewChange("month")}
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
            onClick={() => onViewChange("year")}
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
          onClick={onToday}
          className="border-border text-muted-foreground hover:text-foreground hover:bg-accent/50"
        >
          <Clock className="h-4 w-4 mr-1" />
          Today
        </Button>
      </div>
    </div>
  )
} 