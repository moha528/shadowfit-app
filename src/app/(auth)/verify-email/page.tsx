// verify-email-page.tsx
"use client"

import { useState, Suspense } from "react"
import { Dumbbell } from "lucide-react"
import SideImageForm from "@/features/auth/side-image-form"
import { AuthForm } from "@/features/auth/auth-form"
import { toastAlert } from "@/components/ui/sonner-v2"
import {redirect, useSearchParams} from "next/navigation"
import { authClient } from "@/lib/authClient"
import { toast } from "sonner"
import {verifiedEmailAction} from "@/actions/auth.action";
import { VerifyEmailFormValues, verifyEmailSchema } from "@/schemas/auth.schema"

function VerifyEmailContent() {
    const [isLoading, setIsLoading] = useState(false)
    const [isVerified,] = useState(false)
    const [currentQuote,setCurrentQuote] = useState(0)

    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    const motivationalQuotes = [
        {
            text: "Perseverance transforms failure into extraordinary achievement.",
            author: "Unknown",
        },
        {
            text: "Every verification is a step towards enhanced security.",
            author: "Unknown",
        },
        {
            text: "Discipline is the cornerstone of all lasting success.",
            author: "Jim Rohn",
        },
        {
            text: "Your commitment today builds your success tomorrow.",
            author: "Unknown",
        },
    ]

    const verifyEmailFields:Array<{
        type: "text" | "email" | "password" | "otp"
        name: keyof VerifyEmailFormValues
        label: string
        placeholder: string
        required: boolean
    }> = [
        {
            type: "otp",
            name: "otp",
            label: "Verification Code",
            placeholder: "123456",
            required: true,
        },
    ]

    const handleSubmit = async (values: VerifyEmailFormValues) => {
        if (!email) {
            toastAlert.error({
                title: "Missing email",
                description: "Please use the complete link received by email.",
                duration: 5000,
            })
            return
        }

        setIsLoading(true)
        const loadingToastId = toastAlert.loading({
            title: "Verifying...",
            description: "We are validating your security code.",
            duration: Infinity,
        })

            await authClient.emailOtp.verifyEmail({
                email,
                otp: values.otp,
            },{
                onRequest: () => {

                },
                onSuccess: async () => {
                    toast.dismiss(loadingToastId)
                    toastAlert.success({
                        title: "Email verified",
                        description: "Your email address has been successfully confirmed.",
                        duration: 5000,
                    })
                    const result = await verifiedEmailAction(email)
                    if (result.success) {
                        redirect("/login");
                    } else {
                        toast.dismiss(loadingToastId)
                        toastAlert.error({
                            title: "Verification error",
                            description: result.error || "An error occurred while verifying your email address.",
                            duration: 5000,
                        })
                    }

                },
                onError: (ctx) => {
                    toast.dismiss(loadingToastId)
                    toastAlert.error({
                        title: "Verification error",
                        description: ctx.error.message || "The code is invalid or has expired. Please try again.",
                        duration: 5000,
                    })
                },

            })

            setIsLoading(false)
    }

    const handleResendOtp = async () => {
        if (!email) return
       const loadingToastId = toastAlert.loading({
            title: "Sending code...",
            description: "A new verification code is being sent.",
            duration: Infinity,
        })

        setIsLoading(true)

            await authClient.emailOtp.sendVerificationOtp({
                email,
                type: "email-verification",
            }, {
                onRequest: () => {

                },
                onSuccess: () => {
                    toast.dismiss(loadingToastId)
                    toastAlert.success({
                        title: "Code sent",
                        description: "A new code has been sent to your email address.",
                        duration: 5000,
                    })
                    setIsLoading(false)
                  redirect("/verify-email?email=" + email + "&type=email-verification" + "&message=Un email de vérification a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception." + "&error=" + "Un nouveau code a été envoyé à votre adresse email." + "&success=" + "Un nouveau code a été envoyé à votre adresse email." + "&info=" + "Un nouveau code a été envoyé à votre adresse email." + "&warning=" + "Un nouveau code a été envoyé à votre adresse email." + "&alert=" + "Un nouveau code a été envoyé à votre adresse email." + "&notification=" + "Un nouveau code a été envoyé à votre adresse email." + "&toast=" + "Un nouveau code a été envoyé à votre adresse email.");
                },
                onError: (ctx) => {
                    toast.dismiss(loadingToastId)
                    toastAlert.error({
                        title: "Sending error",
                        description: ctx.error.message || "An error occurred while sending the code.",
                        duration: 5000,
                    })
                },
            });



    }

    return (
        <div className="login-container flex min-h-screen bg-black overflow-hidden">
            {/* Partie image (côté droit) */}
            <SideImageForm
                backgroundImage={'url("/auth/verify-email.png")'}
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
                            {isVerified ? "Email verified!" : "Email verification"}
                        </h1>
                        <p className="text-zinc-400 text-center">
                            {isVerified
                                ? "Your email address has been successfully confirmed."
                                : `Enter the 6-digit code sent to ${email || "your email"}`}
                        </p>
                    </div>

                    {!isVerified && (
                        <div className="mb-6 text-center">
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={isLoading}
                                className="text-sm text-gray-400 hover:text-gray-300 disabled:opacity-50 transition-colors duration-300"
                            >
                                Didn't receive a code? <span className="underline">Resend</span>
                            </button>
                        </div>
                    )}

                    <AuthForm
                        schema={verifyEmailSchema}
                        fields={verifyEmailFields}
                        submitButtonText={isVerified ? "Continue to application" : "Verify code"}
                        isLoading={isLoading}
                        onSubmit={handleSubmit}
                        footerText={isVerified ? "" : "Back to login page"}
                        footerLinkText={isVerified ? "" : "Sign in"}
                        footerLinkHref={isVerified ? "" : "/login"}
                    />
                </div>
            </div>
        </div>
    )
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    )
}