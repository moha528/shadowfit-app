import {Gender, MuscleGroup} from "@prisma/client";

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
