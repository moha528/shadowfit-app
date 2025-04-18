import {Gender, MuscleGroup, TrainingSession} from "@prisma/client";




export interface Exercise {
    id: string;
    name: string;
    description: string | null;
    muscleGroups: MuscleGroup[];
    intensity: number; // 1 = faible, 2 = modéré, 3 = intense
    type: Gender; // MALE ou FEMALE
    image?: string;
}

export type TrainingSessionWithExercises = TrainingSession & {
    exercises: Exercise[];
};

export interface CreateSessionData {
    notes?: string
    exerciseIds: string[]
}

export interface UpdateSessionData {
    id: string
    notes?: string
    exerciseIds: string[]
}