import { ExerciseRepository } from "@/repository/exercice.repository";
import { Exercise, Gender } from "@prisma/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { UserRepository } from "@/repository/user.repository";
import { TrainingSessionRepository } from "@/repository/training-session.repository";
import {FilterParams} from "@/types/types";

export class TrainingService {

    static async getTrainingExercisesByType() {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }
        const user = await UserRepository.getUserById(session.user.id)


        return await ExerciseRepository.getExercisesByType(user ? user.gender : Gender.BOTH)

    }
    
    static async getTrainingExercises(filters?: FilterParams) {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return []
        }

        return await ExerciseRepository.getAllExercises()
    }

    static async createTrainingExercises(data: {
        intensity: number;
        muscleGroups: ("PECTORALS" | "BICEPS" | "TRICEPS" | "ABDOMINALS" | "LEGS" | "BACK" | "SHOULDERS" | "CALVES")[];
        image: string;
        name: string;
        description: string;
        type: "MALE" | "FEMALE" | "BOTH";
    }) {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return await ExerciseRepository.createExercise(data)

    }

    static async updateExercise(id: string, data: Partial<Exercise>) {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return await ExerciseRepository.updateExercise(id, data)
    }

    static async deleteExercise(id: string) {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return await ExerciseRepository.deleteExercise(id)
    }

    static async createTrainingSessionExercises(data: {
        notes?: string
        exerciseIds: string[]
    }) {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return await TrainingSessionRepository.createTrainingSession(session.user.id, data)
    }

    static async updateTrainingSessionExercises(data: {
        id: string
        notes?: string
        exerciseIds: string[]
    }) {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return await TrainingSessionRepository.updateTrainingSession(data)
    }

    static async deleteTrainingSession(id: string) {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return await TrainingSessionRepository.deleteTrainingSession(id)
    }

    static async getTrainingSessions() {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return TrainingSessionRepository.getTrainingSessions();
    }

    static async getTrainingSessionByCurrentUser() {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return TrainingSessionRepository.getTrainingSessionsByUserId(session.user.id);
    }

}