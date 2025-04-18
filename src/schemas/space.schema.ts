import { z } from "zod"
import { DayOfWeek, MuscleGroup } from "@prisma/client"

export const programFormSchema = z.object({
    startDate: z.date(),
    endDate: z.date(),
    days: z.array(
        z.object({
            dayOfWeek: z.nativeEnum(DayOfWeek),
            muscleTargets: z.array(z.nativeEnum(MuscleGroup)).min(1, "Au moins un groupe musculaire est requis"),
        })
    ).min(1, "Au moins un jour d'entraînement est requis"),
}).refine(
    (data) => {
        return data.endDate > data.startDate;
    },
    {
        message: "La date de fin doit être postérieure à la date de début",
        path: ["endDate"],
    }
).refine(
    (data) => {
        const days = data.days.map(d => d.dayOfWeek);
        return new Set(days).size === days.length;
    },
    {
        message: "Chaque jour ne peut être sélectionné qu'une seule fois",
        path: ["days"],
    }
);

export type ProgramFormValues = z.infer<typeof programFormSchema>