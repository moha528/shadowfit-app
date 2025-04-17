import { Metadata } from "next";
import {getExercisesAction, getTrainingSessionsAction} from "@/actions/training.action";
import TrainingSessions from "@/features/training/my-training/my-training-page";


export const metadata: Metadata = {
    title: "mon entraînement",
    description: "Créez un nouvel entraînement",
};

export default async function MyTrainingPage() {
    const exercises = await getExercisesAction();
    const initialSessions = await getTrainingSessionsAction();

    return (
        <div className="container mx-auto py-10">
            <TrainingSessions initialSessions={initialSessions} exercises={exercises.data}/>
        </div>
    );
}