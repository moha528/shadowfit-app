import { $Enums } from "@prisma/client"

// Types basés sur votre schéma Prisma
enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
  }
  
  enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    TRAINER = "TRAINER",
  }
  
  enum DayOfWeek {
    LUNDI = "LUNDI",
    MARDI = "MARDI",
    MERCREDI = "MERCREDI",
    JEUDI = "JEUDI",
    VENDREDI = "VENDREDI",
    SAMEDI = "SAMEDI",
    DIMANCHE = "DIMANCHE",
  }
  
  enum MuscleGroup {
    CHEST = "CHEST",
    BACK = "BACK",
    LEGS = "LEGS",
    SHOULDERS = "SHOULDERS",
    ARMS = "ARMS",
    ABS = "ABS",
    CARDIO = "CARDIO",
  }
  
  // Données mockées pour l'utilisateur
  export const mockUser = {
    id: "user_1",
    email: "user@example.com",
    name: "Mouhamadou Tidiane Seck",
    gender: $Enums.Gender.MALE,
    role: $Enums.Role.USER,
    profileCompleted: true,
    goals: "Prendre du muscle et améliorer mon endurance",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-04-20"),
    emailVerified: true,
    image: null,
  }
  
  // Données mockées pour le programme
  export const mockProgram = {
    id: "program_1",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-12-31"),
    days: [
      {
        id: "day_1",
        dayOfWeek: $Enums.DayOfWeek.MONDAY,
        muscleTargets: [$Enums.MuscleGroup.PECTORALS, $Enums.MuscleGroup.SHOULDERS],
      },
      {
        id: "day_2",
        dayOfWeek: $Enums.DayOfWeek.WEDNESDAY,
        muscleTargets: [$Enums.MuscleGroup.BACK, $Enums.MuscleGroup.BICEPS],
      },
      {
        id: "day_3",
        dayOfWeek: $Enums.DayOfWeek.FRIDAY,
        muscleTargets: [$Enums.MuscleGroup.LEGS, $Enums.MuscleGroup.ABDOMINALS],
      },
      {
        id: "day_4",
        dayOfWeek: $Enums.DayOfWeek.SUNDAY,
        muscleTargets: [$Enums.MuscleGroup.CALVES],
      },
    ],
  }
  