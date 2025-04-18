export const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
        case "beginner":
            return "Beginner"
        case "intermediate":
            return "Intermediate" 
        case "advanced":
            return "Advanced"
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
        abs: "Abs",
        core: "Core",
        chest: "Chest",
        back: "Back", 
        shoulders: "Shoulders",
        biceps: "Biceps",
        triceps: "Triceps",
        forearms: "Forearms",
        quadriceps: "Quadriceps",
        hamstrings: "Hamstrings",
        glutes: "Glutes",
        "full body": "Full Body",
    }

    return muscleLabels[muscle] || muscle
}