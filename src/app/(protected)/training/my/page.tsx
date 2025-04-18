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

    // Handle error cases
    if ('error' in initialSessions) {
        return (
            <div className="container mx-auto py-10">
                <div className="text-red-500">Error: {initialSessions.error}</div>
            </div>
        );
    }

    if ('error' in exercises) {
        return (
            <div className="container mx-auto py-10">
                <div className="text-red-500">Error: {exercises.error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <TrainingSessions initialSessions={initialSessions} exercises={exercises.data}/>
        </div>
    );
}