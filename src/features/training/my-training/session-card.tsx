"use client"

import { useState } from "react"
import { format } from "date-fns"
import {enUS, fr} from "date-fns/locale"
import { Calendar, ChevronRight, Edit, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { TrainingSessionWithExercises } from "@/types/types"

interface SessionCardProps {
    session: TrainingSessionWithExercises
    onEdit: () => void
    onDelete: () => void
}

export function SessionCard({ session, onEdit, onDelete }: SessionCardProps) {
    const sessionDate = session.date ? new Date(session.date) : new Date()
    const isValidDate = !isNaN(sessionDate.getTime())

    const formattedDate = isValidDate
        ? format(sessionDate, 'dd MMMM yyyy', { locale: enUS })
        : "Date unavailable"
    const formattedTime = isValidDate
        ? format(sessionDate, 'p', { locale: enUS })
        : "Time unavailable"
    const [isHovered, setIsHovered] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const handleDelete = () => {
        setDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        onDelete()
        setDeleteDialogOpen(false)
    }

    return (
        <>
            <Card
                className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-300" />
                        <h3 className="font-medium text-blue-100">{formattedDate}</h3>
                        <span className="text-sm text-blue-200">{formattedTime}</span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={onEdit}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDelete} className="text-red-500 hover:text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="p-4">
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-zinc-400 mb-2">Exercises ({session.exercises.length})</h4>
                        <div className="flex flex-wrap gap-2">
                            {session.exercises.map((exercise) => (
                                <Badge key={exercise.id} variant="outline" className="bg-zinc-800/50 border-zinc-700">
                                    {exercise.name}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {session.notes && (
                        <div>
                            <h4 className="text-sm font-medium text-zinc-400 mb-2">Notes</h4>
                            <p className="text-sm text-zinc-300 bg-zinc-800/30 p-3 rounded-lg border border-zinc-800 line-clamp-3">
                                {session.notes}
                            </p>
                        </div>
                    )}
                </div>

                <div
                    className={`p-3 border-t border-zinc-800 bg-zinc-900/20 flex justify-end transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-70"
                    }`}
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:bg-blue-950/30"
                        onClick={onEdit}
                    >
                        View details
                        <ChevronRight className="h-3 w-3" />
                    </Button>
                </div>
            </Card>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this session?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This training session will be permanently deleted from your history.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}