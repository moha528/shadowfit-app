import { z } from "zod"

import { MuscleGroup } from "@prisma/client"

import { Gender } from "@prisma/client"

export const exerciseSchema = z.object({
    name: z.string()
        .min(3, "must be at least 3 characters")
        .max(50, "must be at most 50 characters")
        .regex(/^[a-zA-Z0-9\s]+$/, "Name must contain only letters and numbers"),
    description: z.string().min(10, "Description must be at least 10 characters").optional().or(z.literal("")),
    muscleGroups: z.array(z.nativeEnum(MuscleGroup))
        .min(1, "Select at least one muscle group")
        .refine((muscleGroups) => muscleGroups.length <= 3, "Select at most 3 muscle groups")
        .transform((muscleGroups) => muscleGroups.map(muscleGroup => MuscleGroup[muscleGroup])),
    intensity: z.number().min(1).max(3).default(1),
    type: z.nativeEnum(Gender).default(Gender.MALE),
    image: z.instanceof(File).optional().nullable(),
})

export type ExerciseFormValues = z.infer<typeof exerciseSchema>