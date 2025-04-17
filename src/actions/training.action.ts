// actions/verify-email.ts
"use server"


import {TrainingService} from "@/services/training.service";
import {Exercise} from "@prisma/client";
import {revalidatePath} from "next/cache";
import {CreateSessionData, TrainingSessionWithExercises, UpdateSessionData} from "@/types/types";



export async function getGenderExercisesAction() {
    try {

        return await TrainingService.getTrainingExercisesByType()
    } catch (error) {

        return {
            error: error instanceof Error
                ? error.message
                : "Oops we encountered an error while fetching the exercises. Please try again later."
        }
    }
}

export async function createExercisesAction(data: {
    intensity: number;
    muscleGroups: ("PECTORALS" | "BICEPS" | "TRICEPS" | "ABDOMINALS" | "LEGS" | "BACK" | "SHOULDERS" | "CALVES")[];
    image: string;
    name: string;
    description: string;
    type: "MALE" | "FEMALE" | "BOTH";
}) {
    try {
        await TrainingService.createTrainingExercises(data);
        revalidatePath("/training/new");
        return { success: true };
    } catch (error) {
        return {
            error: error instanceof Error
                ? error.message
                : "Oops we encountered an error while creating the exercises. Please try again later."
        };
    }
}
// { updateExerciseAction, deleteExerciseAction, getExercisesAction

export async function updateExerciseAction(id: string, data: Partial<Exercise>) {

    try {
        const result = await TrainingService.updateExercise(id, data)
        revalidatePath("/training/new")
        return {message: " Exercise created successfully ", data: result}
    } catch (error) {
        return {
            error: error instanceof Error
                ? error.message
                : "Oops we encountered an error while updating the exercise. Please try again later."
        }
    }


}

export async function deleteExerciseAction(id: string) {

    try {
        const result = await TrainingService.deleteExercise(id)
        revalidatePath("/training/new")
        return {message: "Exercice deleted successfully", data: result}
    } catch (error) {
        return {
            error: error instanceof Error
                ? error.message
                : "OOps we encountered an error while deleting the exercise. Please try again later."
        }
    }


}

export async function getExercisesAction() {
    try {
        const result = await TrainingService.getTrainingExercises()
        return {data: result}
    } catch (error) {
        return {
            error: error instanceof Error
                ? error.message
                : "OOps we encountered an error while fetching the exercises. Please try again later."
        }
    }


}
export async function createTrainingSessionAction(data: CreateSessionData) {
    try{
        const result = await TrainingService.createTrainingSessionExercises(data)
        revalidatePath("/training/my")
        return result as TrainingSessionWithExercises
    } catch (error) {
        return {
            error: error instanceof Error
                ? error.message
                : "Oops we encountered an error while creating the training session. Please try again later."
        }
    }
}

export async function updateTrainingSessionAction(data: UpdateSessionData) {
    try{
        const result = await TrainingService.updateTrainingSessionExercises(data)
        revalidatePath("/training/my")
        return result as TrainingSessionWithExercises
    } catch (error) {
        return {
            error: error instanceof Error
                ? error.message
                : "Oops we encountered an error while updating the training session. Please try again later."
        }
    }
}

export async function deleteTrainingSessionAction(id: string) {
    try{
        const result = await TrainingService.deleteTrainingSession(id)
        revalidatePath("/training/my")
        return result as TrainingSessionWithExercises
    } catch (error) {
        return {
            error: error instanceof Error
                ? error.message
                : "Oops we encountered an error while deleting the training session. Please try again later."
        }
    }
}

export async function getTrainingSessionsAction() {
    try{
        const result = await TrainingService.getTrainingSessionByCurrentUser()
        return result as TrainingSessionWithExercises[]
    } catch (error) {
        return {
            error: error instanceof Error
                ? error.message
                : "Oops we encountered an error while fetching the training sessions. Please try again later."
        }
    }
}