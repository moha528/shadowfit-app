import { Metadata } from "next";
import TrainingSessionPage from "@/features/training/exercise/training-exercise";

export const metadata: Metadata = {
    title: "Exercices",
    description: "Gérez vos exercices",
};

export default function ExercisesPage() {
    return (
        <div className="container mx-auto py-10">
           <TrainingSessionPage/>
        </div>
    );
}





