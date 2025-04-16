import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nouvel entraînement",
    description: "Créez un nouvel entraînement",
};

export default function NewTrainingPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold">Nouvel entraînement</h1>
        </div>
    );
} 