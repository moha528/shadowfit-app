// lib/services/Training.service.ts


import {ExerciseRepository} from "@/repository/exercice.repository";
import {Exercise, Gender} from "@prisma/client";
import {headers} from "next/headers";
import {auth} from "@/lib/auth";
import {UserRepository} from "@/repository/user.repository";
import {TrainingSessionRepository} from "@/repository/training-session.repository";

export const TrainingService = {

    async getTrainingExercisesByType(){
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }
        const user = await UserRepository.getUserById(session.user.id)


        return await  ExerciseRepository.getExercisesByType(user ? user.gender : Gender.BOTH)

    },
 async getTrainingExercises(){
     const headersValue = await headers()
     const session = await auth.api.getSession({ headers: headersValue })

     if (!session?.user) {
         return { error: "User not found" }
     }



     return await  ExerciseRepository.getAllExercises()

 },

 async createTrainingExercises(data: {
     intensity: number;
     muscleGroups: ("PECTORALS" | "BICEPS" | "TRICEPS" | "ABDOMINALS" | "LEGS" | "BACK" | "SHOULDERS" | "CALVES")[];
     image: string;
     name: string;
     description: string;
     type: "MALE" | "FEMALE" | "BOTH";
 }){
     const headersValue = await headers()
     const session = await auth.api.getSession({ headers: headersValue })

     if (!session?.user ) {
         return { error: "User not found" }
     }

     return await ExerciseRepository.createExercise(data)

 },

    async updateExercise(id: string, data: Partial<Exercise>) {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return await ExerciseRepository.updateExercise(id, data)
    },

    async deleteExercise(id: string) {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return await ExerciseRepository.deleteExercise(id)
    },

    async createTrainingSessionExercises(data: {
        notes?: string
        exerciseIds: string[]
    }) {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return await TrainingSessionRepository.createTrainingSession(session.user.id,data)
    },
    async updateTrainingSessionExercises(data: {
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
    },

    async deleteTrainingSession(id: string) {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return await TrainingSessionRepository.deleteTrainingSession(id)
    },

    async getTrainingSessions() {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return TrainingSessionRepository.getTrainingSessions();
    },

    async getTrainingSessionByCurrentUser() {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }

        return TrainingSessionRepository.getTrainingSessionsByUserId(session.user.id);
    },



}