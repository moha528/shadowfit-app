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
    gender: Gender.MALE,
    role: Role.USER,
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
        dayOfWeek: DayOfWeek.LUNDI,
        muscleTargets: [MuscleGroup.CHEST, MuscleGroup.SHOULDERS],
      },
      {
        id: "day_2",
        dayOfWeek: DayOfWeek.MERCREDI,
        muscleTargets: [MuscleGroup.BACK, MuscleGroup.ARMS],
      },
      {
        id: "day_3",
        dayOfWeek: DayOfWeek.VENDREDI,
        muscleTargets: [MuscleGroup.LEGS, MuscleGroup.ABS],
      },
      {
        id: "day_4",
        dayOfWeek: DayOfWeek.DIMANCHE,
        muscleTargets: [MuscleGroup.CARDIO],
      },
    ],
  }
  