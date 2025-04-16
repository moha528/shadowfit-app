// LoginPage.tsx
"use client"

import { useState } from "react"

import { z } from "zod"
import { Dumbbell } from "lucide-react"
import SideImageForm from "@/features/auth/side-image-form"
import { AuthForm } from "@/features/auth/auth-form"
import {toastAlert} from "@/components/ui/sonner-v2";
import {authClient} from "@/lib/authClient";
import {toast} from "sonner";
import {verifyEmailAction} from "@/actions/auth.action";
import {redirect} from "next/navigation";

// Schéma Zod pour le formulaire de connexion
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must contain at least 6 characters" }),
})

// Type déduit du schéma
type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
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

  // Configuration des champs du formulaire avec typage strict
  const loginFields: Array<{
    type: "email" | "password"
    name: keyof LoginFormValues
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
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "••••••••",
      required: true,
    },
  ]

  const verifyEmail = async (email: string ) => {
    const {  error } = await authClient.emailOtp.sendVerificationOtp({
      email: email,
      type: "email-verification",
    })

    // Redirect to the email verification page or show a success message
    redirect("/verify-email?email=" + email + "&type=email-verification" + "&message=A verification email has been sent to your address. Please check your inbox." + "&error=" + error?.message || "")
  }
  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    const { email, password } = values;

    // Affiche le toast de chargement
    const loadingToastId = toastAlert.loading({
      title: "Logging in...",
      description: "Please wait while we verify your credentials.",
      duration: Infinity,
    });
    const result = await verifyEmailAction(email)
    if (result.error) {
      toastAlert.error({
        title: "Verification error",
        description: "An error occurred while verifying your email address.",
        duration: 5000,
      })
      verifyEmail(email)
      setIsLoading(false)
      return
    }


    await authClient.signIn.email({
      email: email,
      password: password,
    }, {
      onRequest: () => {
        // Ne pas supprimer le toast de chargement ici
        // Retirer cette ligne: toast.dismiss(loadingToastId);
      },
      onSuccess: async () => {
        // Supprimer le toast de chargement à la réussite
        toast.dismiss(loadingToastId);

          toastAlert.success({
            title: "Login successful",
            description: "You are now logged into your account.",
            duration: 4000,
          });
          redirect("/dashboard");

      },
      onError: (ctx) => {
        // Supprimer le toast de chargement en cas d'erreur
        toast.dismiss(loadingToastId);

        if(ctx.error.message === "Invalid email or password") {
          toastAlert.error({
            title: "Login error",
            description: "Incorrect email or password.",
            duration: 3000,
          });
        } else {
          toast.dismiss(loadingToastId)
          toastAlert.error({
            title: "Login error",
            description: "An error occurred during login. Please try again.",
            duration: 3000,
          });
        }
      },
    });

    setIsLoading(false);
  }

  return (
      <div className="login-container flex min-h-screen bg-black overflow-hidden">
        {/* Partie image (côté droit) */}
        <SideImageForm
            backgroundImage={'url("/auth/login.png")'}
            motivationalQuotes={motivationalQuotes}
            currentQuote={currentQuote}
        />

        {/* Formulaire de connexion (côté gauche) */}
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
                Login to your account
              </h1>
              <p className="text-zinc-400 text-center">
                Enter your credentials to access your personal space
              </p>
            </div>

            <AuthForm
                schema={loginSchema}
                fields={loginFields}
                submitButtonText="Login"
                isLoading={isLoading}
                onSubmit={handleSubmit}
                footerText="Don't have an account?"
                footerLinkText="Create an account"
                footerLinkHref="/register"
                socialButtons={true}
                forgotPasswordLink={true}
            />
          </div>
        </div>
      </div>
  )
}