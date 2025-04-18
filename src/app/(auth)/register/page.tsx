// RegisterPage.tsx
"use client"

import { useState } from "react"
import { Dumbbell } from "lucide-react"
import SideImageForm from "@/features/auth/side-image-form"
import { AuthForm } from "@/features/auth/auth-form"
import {authClient} from "@/lib/authClient";
import {toastAlert} from "@/components/ui/sonner-v2";
import {toast} from "sonner";
import {redirect} from "next/navigation";
import { RegisterFormValues, registerSchema } from "@/schemas/auth.schema"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuote,setCurrentQuote] = useState(0)



  const motivationalQuotes = [
    {
      text: "Every new beginning is an opportunity to do something great.",
      author: "Robin Sharma",
    },
    {
      text: "The best time to start is now.",
      author: "Unknown",
    },
    {
      text: "Today's effort is tomorrow's strength.",
      author: "Unknown",
    },
    {
      text: "Your only limit is the one you set for yourself.",
      author: "Unknown",
    },
    {
      text: "Progress isn't linear, but your determination should be.",
      author: "Unknown",
    },
  ]

  // Configuration des champs du formulaire avec typage strict
  const registerFields: Array<{
    type: "text" | "email" | "password"
    name: keyof RegisterFormValues
    label: string
    placeholder: string
    required: boolean
  }> = [
    {
      type: "text",
      name: "fullName",
      label: "Full Name",
      placeholder: "John Doe",
      required: true,
    },
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
  const verifyEmail = async (email: string) => {
    const {  error } = await authClient.emailOtp.sendVerificationOtp({
      email: email,
      type: "email-verification",
    })

    // Redirect to the email verification page or show a success message
    redirect("/verify-email?email=" + email + "&type=email-verification" + "&message=Un email de vérification a été envoyé à votre adresse. Veuillez vérifier votre boîte de réception." + "&error=" + error?.message || "")
  }
  const handleSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true)
    const loadingToastId =     toastAlert.loading({
      title: "Signing up...",
      description: "Please wait while we process your registration.",
      duration: Infinity,
    })
    const { email, password, fullName } = values;
    await authClient.signUp.email({
      email: email,
      password: password,
      name: fullName,
      callbackURL: "/login",
    },{
      onRequest: () => {

      },
      onSuccess: () => {
        toast.dismiss(loadingToastId);
        toastAlert.success({
            title: "Registration successful",
            description: "Your account has been created successfully!",
            duration: 3000,
        });
        //handleClick();
        verifyEmail(email)
      },
      onError: (ctx) => {
        if (ctx.error.message === "Email already exists") {
          toastAlert.error({
            title: "Registration error",
            description: "This email is already in use.",
            duration: 3000,
          });

          // form.setError("email", {
          //   type: "manual",
          //   message: ctx.error.message,
          // })
        }
      },
    });
    setIsLoading(false)
  }

  return (
      <div className="register-container flex min-h-screen bg-black overflow-hidden">
        {/* Partie image (côté droit) */}
        <SideImageForm
            backgroundImage={'url("/auth/register.png")'}
            motivationalQuotes={motivationalQuotes}
            currentQuote={currentQuote}
            setCurrentQuote={setCurrentQuote}
        />

        {/* Formulaire d'inscription (côté gauche) */}
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
                Create an account
              </h1>
              <p className="text-zinc-400 text-center">
                Join our community and start your fitness journey
              </p>
            </div>

            <AuthForm
                schema={registerSchema}
                fields={registerFields}
                submitButtonText="Sign up"
                isLoading={isLoading}
                onSubmit={handleSubmit}
                footerText="Already have an account?"
                footerLinkText="Sign in"
                footerLinkHref="/login"
                socialButtons={true}
                forgotPasswordLink={false}
            />
          </div>
        </div>
      </div>
  )
}