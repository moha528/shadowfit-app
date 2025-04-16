import { type Exercise, MuscleGroup, Gender } from "@/types/exercise"

// Ces données pourront être remplacées par des appels à Prisma
export const exercisesData: Exercise[] = [
  {
    id: "squat",
    name: "Squat",
    description:
      "Le squat est un exercice fondamental qui cible principalement les quadriceps, les fessiers et les ischio-jambiers. Tenez-vous debout, pieds écartés à la largeur des épaules, puis descendez comme si vous alliez vous asseoir sur une chaise invisible.",
    muscleGroups: [MuscleGroup.LEGS, MuscleGroup.ABDOMINALS],
    intensity: 2,
    type: "sans matériel",
    image: {
      [Gender.MALE]: "/exercises/male-squat.png",
      [Gender.FEMALE]: "/exercises/female-squat.png",
    },
    duration: "3 séries de 12-15 répétitions",
  },
  {
    id: "pushup",
    name: "Pompe",
    description:
      "Les pompes sont un exercice polyvalent qui cible principalement les pectoraux, les triceps et les épaules. Placez vos mains légèrement plus larges que vos épaules, gardez votre corps droit et abaissez-vous jusqu'à ce que votre poitrine soit près du sol.",
    muscleGroups: [MuscleGroup.PECTORALS, MuscleGroup.TRICEPS, MuscleGroup.SHOULDERS],
    intensity: 2,
    type: "sans matériel",
    image: {
      [Gender.MALE]: "/exercises/male-pushup.png",
      [Gender.FEMALE]: "/exercises/female-pushup.png",
    },
    duration: "3 séries de 10-12 répétitions",
  },
  {
    id: "abs",
    name: "Abdos",
    description:
      "Les abdominaux renforcent votre sangle abdominale et améliorent votre stabilité. Allongez-vous sur le dos, genoux pliés, pieds à plat sur le sol. Placez vos mains derrière la tête et soulevez vos épaules du sol en contractant vos abdominaux.",
    muscleGroups: [MuscleGroup.ABDOMINALS],
    intensity: 1,
    type: "sans matériel",
    image: {
      [Gender.MALE]: "/exercises/male-abs.png",
      [Gender.FEMALE]: "/exercises/female-abs.png",
    },
    duration: "3 séries de 15-20 répétitions",
  },
  {
    id: "plank",
    name: "Gainage",
    description:
      "Le gainage est excellent pour renforcer l'ensemble de votre sangle abdominale et améliorer votre posture. Maintenez une position similaire à une pompe, mais en vous appuyant sur vos avant-bras. Gardez votre corps en ligne droite de la tête aux talons.",
    muscleGroups: [MuscleGroup.ABDOMINALS, MuscleGroup.SHOULDERS],
    intensity: 1,
    type: "sans matériel",
    image: {
      [Gender.MALE]: "/exercises/male-plank.png",
      [Gender.FEMALE]: "/exercises/female-plank.png",
    },
    duration: "3 séries de 30-60 secondes",
  },
  {
    id: "lunges",
    name: "Fentes",
    description:
      "Les fentes ciblent les jambes et les fessiers tout en améliorant votre équilibre. Faites un grand pas en avant avec une jambe, abaissez votre corps jusqu'à ce que les deux genoux soient pliés à environ 90 degrés, puis revenez à la position de départ.",
    muscleGroups: [MuscleGroup.LEGS],
    intensity: 1,
    type: "sans matériel",
    image: {
      [Gender.MALE]: "/exercises/male-lunges.png",
      [Gender.FEMALE]: "/exercises/female-lunges.png",
    },
    duration: "3 séries de 10-12 répétitions par jambe",
  },
  {
    id: "burpees",
    name: "Burpees",
    description:
      "Les burpees sont un exercice complet qui sollicite l'ensemble du corps et améliore votre endurance. Commencez debout, accroupissez-vous, placez vos mains au sol, sautez en position de planche, faites une pompe, ramenez vos pieds vers vos mains, puis sautez en l'air.",
    muscleGroups: [MuscleGroup.PECTORALS, MuscleGroup.LEGS, MuscleGroup.ABDOMINALS, MuscleGroup.SHOULDERS],
    intensity: 3,
    type: "sans matériel",
    image: {
      [Gender.MALE]: "/exercises/male-burpees.png",
      [Gender.FEMALE]: "/exercises/female-burpees.png",
    },
    duration: "3 séries de 8-10 répétitions",
  },
  {
    id: "dumbbell-curl",
    name: "Curl Haltère",
    description:
      "Le curl avec haltères cible principalement les biceps. Tenez un haltère dans chaque main, bras tendus le long du corps, paumes vers l'avant. Pliez les coudes pour amener les haltères vers vos épaules, puis redescendez lentement.",
    muscleGroups: [MuscleGroup.BICEPS],
    intensity: 1,
    type: "matériel",
    image: {
      [Gender.MALE]: "/exercises/male-dumbbell-curl.png",
      [Gender.FEMALE]: "/exercises/female-dumbbell-curl.png",
    },
    duration: "3 séries de 10-12 répétitions",
  },
  {
    id: "bench-press",
    name: "Développé Couché",
    description:
      "Le développé couché est un exercice fondamental pour développer la force et la masse musculaire du haut du corps, en particulier les pectoraux. Allongez-vous sur un banc, saisissez la barre avec une prise légèrement plus large que vos épaules, abaissez-la vers votre poitrine, puis poussez-la vers le haut.",
    muscleGroups: [MuscleGroup.PECTORALS, MuscleGroup.TRICEPS, MuscleGroup.SHOULDERS],
    intensity: 2,
    type: "matériel",
    image: {
      [Gender.MALE]: "/exercises/male-bench-press.png",
      [Gender.FEMALE]: "/exercises/female-bench-press.png",
    },
    duration: "4 séries de 8-10 répétitions",
  },
  {
    id: "lat-pulldown",
    name: "Tirage Vertical",
    description:
      "Le tirage vertical cible principalement les muscles du dos, en particulier les grands dorsaux. Asseyez-vous à la machine, saisissez la barre avec une prise large, tirez-la vers le bas jusqu'à ce qu'elle touche votre poitrine, puis remontez lentement.",
    muscleGroups: [MuscleGroup.BACK, MuscleGroup.BICEPS, MuscleGroup.SHOULDERS],
    intensity: 2,
    type: "matériel",
    image: {
      [Gender.MALE]: "/exercises/male-lat-pulldown.png",
      [Gender.FEMALE]: "/exercises/female-lat-pulldown.png",
    },
    duration: "3 séries de 10-12 répétitions",
  },
  {
    id: "shoulder-press",
    name: "Développé Épaules",
    description:
      "Le développé épaules cible principalement les deltoïdes et les triceps. Tenez un haltère dans chaque main au niveau des épaules, paumes vers l'avant. Poussez les haltères vers le haut jusqu'à ce que vos bras soient tendus, puis redescendez lentement.",
    muscleGroups: [MuscleGroup.SHOULDERS, MuscleGroup.TRICEPS],
    intensity: 2,
    type: "matériel",
    image: {
      [Gender.MALE]: "/exercises/male-shoulder-press.png",
      [Gender.FEMALE]: "/exercises/female-shoulder-press.png",
    },
    duration: "3 séries de 8-10 répétitions",
  },
]
