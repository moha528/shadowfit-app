export const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
        case "beginner":
            return "Débutant"
        case "intermediate":
            return "Intermédiaire"
        case "advanced":
            return "Avancé"
        default:
            return difficulty
    }
}

export const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case "beginner":
            return "from-green-600/20 to-green-500/30 text-green-400 border-green-500/30"
        case "intermediate":
            return "from-yellow-600/20 to-yellow-500/30 text-yellow-400 border-yellow-500/30"
        case "advanced":
            return "from-red-600/20 to-red-500/30 text-red-400 border-red-500/30"
        default:
            return "from-zinc-600/20 to-zinc-500/30 text-zinc-400 border-zinc-500/30"
    }
}

export const getMuscleGroupLabel = (muscle: string) => {
    const muscleLabels: { [key: string]: string } = {
        abs: "Abdominaux",
        core: "Sangle abdominale",
        chest: "Pectoraux",
        back: "Dos",
        shoulders: "Épaules",
        biceps: "Biceps",
        triceps: "Triceps",
        forearms: "Avant-bras",
        quadriceps: "Quadriceps",
        hamstrings: "Ischio-jambiers",
        glutes: "Fessiers",
        "full body": "Corps entier",
    }

    return muscleLabels[muscle] || muscle
}