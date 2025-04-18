import prisma from "@/lib/prisma"

export class TrainingSessionRepository {

    static async createTrainingSession(userId: string, data: {
        notes?: string
        exerciseIds: string[]

    }) {
        return prisma.trainingSession.create({
            data: {
                notes: data.notes,
                date: new Date(),
                exercises: {
                    connect: data.exerciseIds.map((id) => ({ id })),
                },
                user: {
                    connect: {
                        id: userId, // Connectez la session à un utilisateur existant
                    }
                }
            },
            include: {
                exercises: true, // ✅ pour retourner les exos liés
            },
        });
    }

    static async updateTrainingSession(data: {
        id: string
        notes?: string
        exerciseIds: string[]
    }) {
        return prisma.trainingSession.update({
            where: { id: data.id },
            data: {
                notes: data.notes,
                exercises: {
                    set: data.exerciseIds.map((id) => ({ id })),
                },
            },
            include: {
                exercises: true, // ✅ pour retourner les exos liés
            },
        });
    }

    static async deleteTrainingSession(id: string) {
        return prisma.trainingSession.delete({
            where: { id },
        });
    }

    static async getTrainingSessions() {
        return prisma.trainingSession.findMany({
            include: {
                exercises: true,
            },
        });
    }

    static async getTrainingSessionById(id: string) {
        return prisma.trainingSession.findUnique({
            where: { id },
            include: {
                exercises: true,
            },
        });
    }

    static async getTrainingSessionsByUserId(userId: string) {
        return prisma.trainingSession.findMany({
            where: { userId },
            include: {
                exercises: true,
            },
        });
    }

}