'use server';

import { ProgramService } from '@/services/program.service';
import { DayOfWeek, MuscleGroup } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function checkExistingProgram(userId: string) {
    const res = await ProgramService.checkExistingProgram(userId)
    return res
}

export async function createProgram(
    userId: string,
    startDate: Date,
    endDate: Date,
    days: { dayOfWeek: DayOfWeek; muscleTargets: MuscleGroup[] }[]
) {
    try {
        const program = await ProgramService.createProgram(userId, startDate, endDate, days);
        revalidatePath('/space');
        return { success: true, program };
    } catch (error) {
        console.error('Error creating program:', error);
        return { success: false, error: 'Failed to create program' };
    }
} 