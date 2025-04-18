import { z } from "zod"
import { DayOfWeek, MuscleGroup } from "@prisma/client"

export const programFormSchema = z.object({
    startDate: z.date(),
    endDate: z.date(),
    days: z.array(
        z.object({
            dayOfWeek: z.nativeEnum(DayOfWeek),
            muscleTargets: z.array(z.nativeEnum(MuscleGroup)).min(1, "At least one muscle group is required"),
        })
    ).min(1, "At least one training day is required"),
}).refine(
    (data) => {
        return data.endDate > data.startDate;
    },
    {
        message: "End date must be after start date",
        path: ["endDate"],
    }
).refine(
    (data) => {
        const days = data.days.map(d => d.dayOfWeek);
        return new Set(days).size === days.length;
    },
    {
        message: "Each day can only be selected once",
        path: ["days"],
    }
);

export type ProgramFormValues = z.infer<typeof programFormSchema>