import {Gender, MuscleGroup} from "@prisma/client";
import {z} from "zod";

export const exerciseFields = [
    {
        type: "text",
        name: "name",
        label: "Exercise Name",
        placeholder: "Enter exercise name",
        required: true,
    },
    {
        type: "textarea",
        name: "description",
        label: "Description",
        placeholder: "Describe how to perform this exercise",
        rows: 4,
    },
    {
        type: "multi-select",
        name: "muscleGroups",
        label: "Target Muscle Groups",
        required: true,
        options: Object.entries(MuscleGroup).map(([key, value]) => ({
            value,
            label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
        })),
    },
    {
        type: "select",
        name: "type",
        label: "Gender Type",
        required: true,
        options: [
            { value: Gender.MALE, label: "Male" },
            { value: Gender.FEMALE, label: "Female" },
            { value: Gender.BOTH, label: "Both" },
        ],
    },
    {
        type: "slide",
        name: "intensity",
        label: "Intensity",
        min: 1,
        max: 3,
        step: 1,
        marks: [
            { value: 1, label: "Easy" },
            { value: 2, label: "Moderate" },
            { value: 3, label: "Intense" },
        ],
    },
    {
        type: "file",
        name: "image",
        label: "Exercise Image",
        accept: "image/*",
        multiple: false,
        maxSize: 5 * 1024 * 1024, // 5MB
    },
]


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