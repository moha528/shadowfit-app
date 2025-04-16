import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Changer le mot de passe",
    description: "Modifiez votre mot de passe",
};

export default function ChangePasswordPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold">Changer le mot de passe</h1>
        </div>
    );
} 