// ForgotPasswordPage.tsx
"use client"

import { useState } from "react"
import { z } from "zod"
import { Dumbbell } from "lucide-react"
import SideImageForm from "@/features/auth/side-image-form"
import { AuthForm } from "@/features/auth/auth-form"
import { toastAlert } from "@/components/ui/sonner-v2"
import { toast } from "sonner"
import {authClient} from "@/lib/authClient";
import {verifyEmailAction} from "@/actions/auth.action";

// Schéma Zod pour le formulaire de réinitialisation de mot de passe
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

// Type déduit du schéma
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuote] = useState(0)

  const motivationalQuotes = [
    {
      text: "Discipline is the bridge between goals and accomplishment.",
      author: "Jim Rohn",
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      text: "The pain you feel today will be the strength you feel tomorrow.",
      author: "Arnold Schwarzenegger",
    },
    {
      text: "The body achieves what the mind believes.",
      author: "Napoleon Hill",
    },
    {
      text: "Don't count the days, make the days count.",
      author: "Muhammad Ali",
    },
  ]

  // Configuration des champs du formulaire
  const forgotPasswordFields: Array<{
    type: "email"
    name: keyof ForgotPasswordFormValues
    label: string
    placeholder: string
    required: boolean
  }> = [
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "example@email.com",
      required: true,
    },
  ]

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true)
    const { email } = values
    const result = await verifyEmailAction(email)
    if (result.error) {

      toastAlert.error({
        title: "Error",
        description: result.error,
        duration: 3000,
      })
      setIsLoading(false)
      return

    }
    const loadingToastId =     toastAlert.loading({
      title: "Sending email...",
      description: "We will send you an email to reset your password.",
      duration: Infinity,
    })

    await authClient.forgetPassword({
      email: email,
      redirectTo: "/reset-password",
    },{
      onRequest: async () => {


      },
      onSuccess: () => {
        toast.dismiss(loadingToastId)
        toastAlert.success({
          title: "Email sent",
          description: "A reset email has been sent to your address.",
          duration: 5000,
        })
      },
      onError: (ctx) => {
        toast.dismiss(loadingToastId)
        toastAlert.error({
          title: "Error",
          description: ctx.error.message || "An error occurred while sending the email.",
          duration: 3000,
        })
      },
    });
      setIsLoading(false)
  }

  return (
      <div className="login-container flex min-h-screen bg-black overflow-hidden">
        {/* Partie image (côté droit) */}
        <SideImageForm
            backgroundImage={'url("/auth/forgot-password.png")'}
            motivationalQuotes={motivationalQuotes}
            currentQuote={currentQuote}
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
                Forgot your password?
              </h1>
              <p className="text-zinc-400 text-center">
                Enter your email to receive a reset link
              </p>
            </div>
                <AuthForm
                    schema={forgotPasswordSchema}
                    fields={forgotPasswordFields}
                    submitButtonText="Send instructions"
                    isLoading={isLoading}
                    onSubmit={handleSubmit}
                    footerText="Back to login"
                    footerLinkText="Login"
                    footerLinkHref="/login"
                    socialButtons={false}
                />

          </div>
        </div>
      </div>
  )
}