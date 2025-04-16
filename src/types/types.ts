export enum MuscleGroup {
    PECTORALS = "PECTORALS",
    BICEPS = "BICEPS",
    TRICEPS = "TRICEPS",
    ABDOMINALS = "ABDOMINALS",
    LEGS = "LEGS",
    BACK = "BACK",
    SHOULDERS = "SHOULDERS",
    CALVES = "CALVES",
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export interface Exercise {
    id: string
    name: string
    description: string
    muscleGroups: MuscleGroup[]
    intensity: number // 1 = faible, 2 = modéré, 3 = intense
    type: string // "matériel", "sans matériel"
    image: {
        [Gender.MALE]: string
        [Gender.FEMALE]: string
    }
    duration?: string
}
