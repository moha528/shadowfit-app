// reset-password-page.tsx
"use client"

import { useState, Suspense } from "react"
import { Dumbbell } from "lucide-react"
import SideImageForm from "@/features/auth/side-image-form"
import { AuthForm } from "@/features/auth/auth-form"
import { toastAlert } from "@/components/ui/sonner-v2"
import {redirect, useSearchParams} from "next/navigation"
import { authClient } from "@/lib/authClient"
import { toast } from "sonner"
import { ResetPasswordFormValues, resetPasswordSchema } from "@/schemas/auth.schema"
import {resetPasswordFields} from "@/fields/reset-password-fields";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200"></div>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}

function ResetPasswordContent() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess] = useState(false)
    const [currentQuote,setCurrentQuote] = useState(0)

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const motivationalQuotes = [
        {
            text: "Discipline is the bridge between goals and accomplishment.",
            author: "Jim Rohn",
        },
        {
            text: "Success is not final, failure is not fatal. It is the courage to continue that counts.",
            author: "Winston Churchill",
        },
        {
            text: "Each new day is a new opportunity to start again.",
            author: "Unknown",
        },
        {
            text: "Perseverance is the secret of all triumphs.",
            author: "Victor Hugo",
        },
    ]



    const handleSubmit = async (values: ResetPasswordFormValues) => {
        if (!token) {
            toastAlert.error({
                title: "Missing token",
                description: "The reset link is invalid or has expired.",
                duration: 5000,
            })
            return
        }

        setIsLoading(true)
        const loadingToastId = toastAlert.loading({
            title: "Resetting password...",
            description: "Please wait while we update your password.",
            duration: Infinity,
        })
        setIsLoading(true);
        const { password } = values;

        // Simulate an API call to reset the password
        await authClient.resetPassword({
            newPassword: password,
            token: token, // Replace with the actual token from the URL or context
        }, {
            onRequest: () => {

            },
            onSuccess: () => {
                toast.dismiss(loadingToastId)
              toastAlert.success({
                title: "Password reset",
                description: "Your password has been successfully reset.",
                duration: 5000,
              })
            redirect("/login" + "?resetPassword=true" + "&email=" + searchParams.get("email") || "")
            },
            onError: (ctx) => {
                toast.dismiss(loadingToastId)
                toastAlert.error({
                    title: "Error",
                    description: ctx.error.message || "An error occurred while resetting your password.",
                    duration: 3000,
                })
            },
        });

        setIsLoading(false);
    }

    return (
        <div className="login-container flex min-h-screen bg-black overflow-hidden">
            {/* Partie image (côté droit) */}
            <SideImageForm
                backgroundImage={'url("/auth/reset-password.png")'}
                motivationalQuotes={motivationalQuotes}
                currentQuote={currentQuote}
                setCurrentQuote={setCurrentQuote}
            />

            {/* Formulaire (côté gauche) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div className="flex flex-col items-center mb-10 transition-all duration-300">
                        <div className="flex items-center gap-2 font-bold text-2xl mb-4 logo-glow">
                            <Dumbbell className="h-7 w-7 text-gray-400" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                                ShadowFit
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">
                            {isSuccess ? "Password updated" : "Reset your password"}
                        </h1>
                        <p className="text-zinc-400 text-center">
                            {isSuccess
                                ? "You can now sign in with your new password."
                                : "Enter your new password below."}
                        </p>
                    </div>

                    <AuthForm
                        schema={resetPasswordSchema}
                        fields={resetPasswordFields}
                        submitButtonText={isSuccess ? "Go to login page" : "Reset password"}
                        isLoading={isLoading}
                        onSubmit={handleSubmit}
                        footerText={isSuccess ? "" : "Back to login page"}
                        footerLinkText={isSuccess ? "" : "Sign in"}
                        footerLinkHref={isSuccess ? "" : "/login"}
                    />
                </div>
            </div>
        </div>
    )
}