import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { UserRepository } from "@/repository/user.repository";
import { Gender } from "@prisma/client";

export class AuthService {
    static async updateEmailVerified(email: string) {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user || session.user.email !== email) {
            return { error: "User not authenticated" }
        }

        return await UserRepository.updateUser(session.user.id, {
            emailVerified: true,
        })
    }

    static async verifyEmail(email: string) {
        const user = await UserRepository.getUserByEmail(email)
        if (!user) {
            return { error: "Utilisateur non trouvé" }
        }
        if (!user.emailVerified) {
            return { error: "Email non vérifié" }
        }
        return { success: true }
    }

    static async addGenderAndCompleteProfile(gender: "male" | "female") {
        const headersValue = await headers()
        const session = await auth.api.getSession({ headers: headersValue })

        if (!session?.user) {
            return { error: "User not found" }
        }


        return UserRepository.updateUser(session.user.id, { profileCompleted: true, gender: gender === "male" ? Gender.MALE : Gender.FEMALE })
    }
}

