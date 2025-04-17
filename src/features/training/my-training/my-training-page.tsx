"use client"

import { useState } from "react"
import { Plus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Exercise, TrainingSessionWithExercises,} from "@/types/types"
import {toastAlert} from "@/components/ui/sonner-v2";
import {SessionDialog} from "@/features/training/my-training/session-dialog";
import {SessionsList} from "@/features/training/my-training/session-lists";



interface TrainingSessionsPageProps {
    initialSessions: TrainingSessionWithExercises[]
    exercises: Exercise[]
}
export default function TrainingSessionsPage({ initialSessions, exercises }: TrainingSessionsPageProps) {
    const [sessions, setSessions] = useState<TrainingSessionWithExercises[]>(initialSessions)
    const [openDialog, setOpenDialog] = useState(false)
    const [currentSession, setCurrentSession] = useState<TrainingSessionWithExercises | null>(null)
    const [filterTab, setFilterTab] = useState("all")

    const handleCreateSession = () => {
        setCurrentSession(null)
        setOpenDialog(true)
    }

    const handleEditSession = (session: TrainingSessionWithExercises) => {
        setCurrentSession(session)
        setOpenDialog(true)
    }

    const handleSessionSaved = (session: TrainingSessionWithExercises) => {
        if (currentSession) {
            // Update existing session in the list
            setSessions(sessions.map(s => s.id === session.id ? session : s))
            toastAlert.success({
                title: "Session updated",
                description: "Your training session has been successfully updated."
            })
        } else {
            // Add new session to the list
            setSessions([session, ...sessions])
            toastAlert.success({
                title: "Session created",
                description: "Your new training session has been successfully created."
            })
        }
        setOpenDialog(false)
    }

    const handleSessionDeleted = (sessionId: string) => {
        setSessions(sessions.filter(s => s.id !== sessionId))
        toastAlert.success({
            title: "Session deleted",
            description: "The training session has been deleted."
        })
    }

    const filteredSessions = sessions.filter(session => {
        if (filterTab === "all") return true
        if (filterTab === "recent") {
            const oneWeekAgo = new Date()
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
            return new Date(session.date) >= oneWeekAgo
        }
        return false
    })

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My training sessions</h1>
                <Button onClick={handleCreateSession} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New session
                </Button>
            </div>

            <Tabs defaultValue="all" className="mb-8" onValueChange={setFilterTab}>
                <TabsList className="grid grid-cols-2 w-64">
                    <TabsTrigger value="all">All sessions</TabsTrigger>
                    <TabsTrigger value="recent">Recent (7d)</TabsTrigger>
                </TabsList>
            </Tabs>

            {filteredSessions.length === 0 ? (
                <Alert className="bg-blue-900/20 border-blue-800/30 text-blue-400">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                        You don't have any training sessions saved yet. Create your first session by clicking the "New session" button.
                    </AlertDescription>
                </Alert>
            ) : (
                <SessionsList
                    sessions={filteredSessions}
                    onEdit={handleEditSession}
                    onDelete={handleSessionDeleted}
                />
            )}

            <SessionDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                session={currentSession}
                exercises={exercises}
                onSave={handleSessionSaved}
            />
        </div>
    )
}