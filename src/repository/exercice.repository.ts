import prisma from "@/lib/prisma"
import { Exercise, Gender, MuscleGroup } from "@prisma/client";

export class ExerciseRepository {

    static async createExercise(data: {
        intensity: number;
        muscleGroups: ("PECTORALS" | "BICEPS" | "TRICEPS" | "ABDOMINALS" | "LEGS" | "BACK" | "SHOULDERS" | "CALVES")[];
        image: string;
        name: string;
        description: string;
        type: "MALE" | "FEMALE" | "BOTH";
    }) {
        return await prisma.exercise.create({
            data: {
                name: data.name,
                description: data.description,
                type: data.type,
                muscleGroups: data.muscleGroups,
                intensity: data.intensity,
                image: data.image,
            },
        })
    }

    static async updateExercise(id: string, data: Partial<Exercise>) {
        return await prisma.exercise.update({
            where: { id },
            data,
        })
    }

    static async deleteExercise(id: string) {
        return await prisma.exercise.delete({
            where: { id },
        })
    }

    static async getAllExercises() {
        return await prisma.exercise.findMany()
    }

    static async getExerciseById(id: string) {
        return await prisma.exercise.findUnique({
            where: { id },
        })
    }

    static async getExercisesByType(type: Gender) {
        const typesToInclude: Gender[] = [Gender.BOTH]

        if (type === Gender.MALE) {
            typesToInclude.push(Gender.MALE)
        } else if (type === Gender.FEMALE) {
            typesToInclude.push(Gender.FEMALE)
        }

        return await prisma.exercise.findMany({
            where: {
                type: {
                    in: typesToInclude,
                },
            },
        })
    }

    static async getExercisesByMuscleGroup(muscleGroup: MuscleGroup[]) {
        return prisma.exercise.findMany({
            where: {
                muscleGroups: {
                    hasSome: muscleGroup,
                },
            },
        });
    }

    static async getExercisesByIntensity(intensity: number) {
        return await prisma.exercise.findMany({
            where: { intensity },
        })
    }

}