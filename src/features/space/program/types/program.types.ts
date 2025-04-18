import { DayOfWeek, MuscleGroup } from "@prisma/client"

export interface CreateProgramFormProps {
    userId: string
}

export interface TrainingDay {
    dayOfWeek: DayOfWeek;
    muscleTargets: MuscleGroup[];
} 