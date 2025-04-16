import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Exercices",
    description: "Gérez vos exercices",
};

export default function ExercisesPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold">Exercices</h1>
        </div>
    );
} 