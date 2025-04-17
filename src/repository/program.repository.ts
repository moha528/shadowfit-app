import prisma from '@/lib/prisma';
import { Program, ProgramDay } from '@prisma/client';

export class ProgramRepository {
    static async createProgram(userId: string, startDate: Date, endDate: Date, days: Omit<ProgramDay, 'id' | 'programId'>[]) {
        return prisma.program.create({
            data: {
                userId,
                startDate,
                endDate,
                days: {
                    create: days
                }
            },
            include: {
                days: true
            }
        });
    }

    static async getProgramByUserId(userId: string) {
        return prisma.program.findUnique({
            where: { userId },
            include: {
                days: true
            }
        });
    }

    static async updateProgram(programId: string, data: Partial<Program>) {
        return prisma.program.update({
            where: { id: programId },
            data,
            include: {
                days: true
            }
        });
    }

    static async deleteProgram(programId: string) {
        return prisma.program.delete({
            where: { id: programId }
        });
    }
} 