import {Gender, MuscleGroup} from "@prisma/client";




export interface Exercise {
    id: string;
    name: string;
    description?: string;
    muscleGroups: MuscleGroup[];
    intensity: number; // 1 = faible, 2 = modéré, 3 = intense
    type: Gender; // MALE ou FEMALE
    image?: string;
}
