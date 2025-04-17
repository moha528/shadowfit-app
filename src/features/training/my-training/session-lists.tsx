"use client"

import { motion } from "framer-motion"
import {SessionCard} from "@/features/training/my-training/session-card";
import {TrainingSessionWithExercises} from "@/types/types";


interface SessionsListProps {
    sessions: TrainingSessionWithExercises[]
    onEdit: (session: TrainingSessionWithExercises) => void
    onDelete: (sessionId: string) => void
}

export function SessionsList({ sessions, onEdit, onDelete }: SessionsListProps) {
    console.log("SessionsList sessions:", sessions) // Debugging line to check the sessions data
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    }
    console.log("SessionsList sessions:", sessions) // Debugging line to check the sessions data
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {sessions.map((session,index) => (
                <motion.div key={index} variants={itemVariants}>
                    <SessionCard
                        session={session}
                        onEdit={() => onEdit(session)}
                        onDelete={() => onDelete(session.id)}
                    />
                </motion.div>
            ))}
        </motion.div>
    )
}