import { ProgramRepository } from '@/repository/program.repository';
import { DayOfWeek, MuscleGroup } from '@prisma/client';

export class ProgramService {
    static async createProgram(userId: string, startDate: Date, endDate: Date, days: { dayOfWeek: DayOfWeek; muscleTargets: MuscleGroup[] }[]) {
        const existingProgram = await ProgramRepository.getProgramByUserId(userId);
        
        if (existingProgram) {
            await ProgramRepository.deleteProgram(existingProgram.id);
        }

        return ProgramRepository.createProgram(userId, startDate, endDate, days);
    }

    static async checkExistingProgram(userId: string) {
        try {
            const program = await ProgramRepository.getProgramByUserId(userId);
            return { exists: !!program };
        } catch (error) {
            console.error('Error checking program:', error);
            return { exists: false };
        }
    }
} 