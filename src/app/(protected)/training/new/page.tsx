import { Metadata } from "next";
import ExerciseFormPage from "@/features/training/exercise/exercice-create";
import ExerciseList from "@/features/training/exercise/exercice-list";
import {getExercisesAction} from "@/actions/training.action";


export const metadata: Metadata = {
    title: "Nouvel entraînement",
    description: "Créez un nouvel entraînement",
};

export default async function NewTrainingPage() {
    const exercises = await getExercisesAction();
    console.log("exercises", exercises.data);
    return (
        <div className="container mx-auto py-10">
           <ExerciseFormPage/>
            <ExerciseList data={exercises.data}/>
        </div>
    );
} 