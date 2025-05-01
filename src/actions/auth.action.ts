"use server"

import {AuthService} from "@/services/auth.service";

export async function verifiedEmailAction(email: string) {
    try {
        await AuthService.updateEmailVerified(email)
        return { success: true }
    } catch (error) {

        return {
            error: error instanceof Error
                ? error.message
                : "OOps we encountered an error while verifying your email. Please try again later."
        }
    }
}

export async function verifyEmailAction(email: string) {
    try {
        const result = await AuthService.verifyEmail(email)
        return result || { error: "Erreur inconnue" }
    } catch {
        return { error: "Échec de la vérification de l'email" }
    }
}


export async function completeProfileAction(gender:"male"|"female"){
    try {
        await AuthService.addGenderAndCompleteProfile(gender)
        return { success: true }
    } catch (error) {
        return {
            error: error instanceof Error
                ? error.message
                : " OOps we encountered an error while completing your profile. Please try again later."
        }
    }
}