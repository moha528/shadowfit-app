
import { Exercise } from "@/types/types";
import {TrainingService} from "@/services/training.service";
import {Gender, MuscleGroup} from "@prisma/client";

export const exercisesData: Exercise[]  = await TrainingService.getTrainingExercises()



// export const exercisesData: Omit<Exercise, "sessions">[] = [
//   {
//     id: "squat",
//     name: "Squat",
//     description: "Le squat est un exercice fondamental qui cible principalement les quadriceps, les fessiers et les ischio-jambiers...",
//     muscleGroups: [MuscleGroup.LEGS, MuscleGroup.ABDOMINALS],
//     intensity: 2,
//     type: Gender.MALE,
//     image: "/exercises/male-squat.png",
//   },
//   {
//     id: "pushup",
//     name: "Pompe",
//     description: "Les pompes sont un exercice polyvalent qui cible principalement les pectoraux, les triceps et les épaules...",
//     muscleGroups: [MuscleGroup.PECTORALS, MuscleGroup.TRICEPS, MuscleGroup.SHOULDERS],
//     intensity: 2,
//     type: Gender.MALE,
//     image: "/exercises/male-pushup.png",
//   },
//   {
//     id: "abs",
//     name: "Abdos",
//     description: "Les abdominaux renforcent votre sangle abdominale et améliorent votre stabilité...",
//     muscleGroups: [MuscleGroup.ABDOMINALS],
//     intensity: 1,
//     type: Gender.MALE,
//     image: "/exercises/male-abs.png",
//   },
//   {
//     id: "plank",
//     name: "Gainage",
//     description: "Le gainage est excellent pour renforcer l'ensemble de votre sangle abdominale...",
//     muscleGroups: [MuscleGroup.ABDOMINALS, MuscleGroup.SHOULDERS],
//     intensity: 1,
//     type: Gender.MALE,
//     image: "/exercises/male-plank.png",
//   },
//   {
//     id: "lunges",
//     name: "Fentes",
//     description: "Les fentes ciblent les jambes et les fessiers tout en améliorant votre équilibre...",
//     muscleGroups: [MuscleGroup.LEGS],
//     intensity: 1,
//     type: Gender.MALE,
//     image: "/exercises/male-lunges.png",
//   },
//   {
//     id: "burpees",
//     name: "Burpees",
//     description: "Les burpees sont un exercice complet qui sollicite l'ensemble du corps...",
//     muscleGroups: [MuscleGroup.PECTORALS, MuscleGroup.LEGS, MuscleGroup.ABDOMINALS, MuscleGroup.SHOULDERS],
//     intensity: 3,
//     type: Gender.MALE,
//     image: "/exercises/male-burpees.png",
//   },
//   {
//     id: "dumbbell-curl",
//     name: "Curl Haltère",
//     description: "Le curl avec haltères cible principalement les biceps...",
//     muscleGroups: [MuscleGroup.BICEPS],
//     intensity: 1,
//     type: Gender.MALE,
//     image: "/exercises/male-dumbbell-curl.png",
//   },
//   {
//     id: "bench-press",
//     name: "Développé Couché",
//     description: "Le développé couché est un exercice fondamental pour développer la force du haut du corps...",
//     muscleGroups: [MuscleGroup.PECTORALS, MuscleGroup.TRICEPS, MuscleGroup.SHOULDERS],
//     intensity: 2,
//     type: Gender.MALE,
//     image: "/exercises/male-bench-press.png",
//   },
//   {
//     id: "lat-pulldown",
//     name: "Tirage Vertical",
//     description: "Le tirage vertical cible principalement les muscles du dos...",
//     muscleGroups: [MuscleGroup.BACK, MuscleGroup.BICEPS, MuscleGroup.SHOULDERS],
//     intensity: 2,
//     type: Gender.MALE,
//     image: "/exercises/male-lat-pulldown.png",
//   },
//   {
//     id: "shoulder-press",
//     name: "Développé Épaules",
//     description: "Le développé épaules cible principalement les deltoïdes et les triceps...",
//     muscleGroups: [MuscleGroup.SHOULDERS, MuscleGroup.TRICEPS],
//     intensity: 2,
//     type: Gender.MALE,
//     image: "/exercises/male-shoulder-press.png",
//   },
// ];
