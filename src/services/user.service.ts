import { PasswordFormData, ProfileFormData } from "@/features/space/profile/types"
import { AccountRepository } from "@/repository/account.repository"
import { UserRepository } from "@/repository/user.repository"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { User } from "@prisma/client"

const filterSchema = z.object({
    role: z.array(z.string()).optional(),
    gender: z.array(z.string()).optional(),
    profileCompleted: z.array(z.string()).optional(),
})

const paramsSchema = z.object({
    page: z.number().int().positive().default(1),
    perPage: z.number().int().positive().default(10),
    sort: z.string().optional(),
    search: z.string().optional(),
    filters: filterSchema.optional(),
})

export const UserService = {
    async updatePassword(userId: string, data: PasswordFormData) {
        const account = await AccountRepository.findAccountByUserId(userId)

        if (!account) {
            return { success: false, message: "Account not found !" }
        }

        if (!account.password) {
            return { success: false, message: "No password set for this account !" }
        }

        const isPasswordCorrect = await bcrypt.compare(data.currentPassword, account.password)

        if (!isPasswordCorrect) {
            return { success: false, message: "Current password is incorrect !" }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.newPassword, salt);
        const result = await AccountRepository.updatePassword(account.id, hashedPassword)

        if (!result) {
            return { success: false, message: "Failed to update password !" }
        }

        return { success: true, message: "Password updated successfully !" }
    },

    async updateProfile(userId: string, data: ProfileFormData) {
        const result = await UserRepository.updateUser(userId, {
            name: data.name,
            goals: data.goals,
            gender: data.gender,
        })

        if (!result) {
            return { success: false, message: "Failed to update profile !" }
        }

        return { success: true, message: "Profile updated successfully !" }
    },

    async getUsersWithPagination(params: z.infer<typeof paramsSchema>) {
        try {
            const validatedParams = paramsSchema.parse(params)
            
            const result = await UserRepository.getUsersWithPagination(validatedParams)
            
            return {
                success: true,
                data: result
            }
        } catch (error) {
            console.error("Error fetching users:", error)
            return {
                success: false,
                error: "Failed to fetch users"
            }
        }
    },

    async deleteUser(userId: string) {
        try {
            const result = await UserRepository.deleteUser(userId)
            return {
                success: true,
                data: result
            }
        } catch (error) {
            console.error("Error deleting user:", error)
            return {
                success: false,
                error: "Failed to delete user"
            }
        }
    },

    async updateUser(userId: string, data: Partial<User>) {
        try {
            const result = await UserRepository.updateUser(userId, data)
            return {
                success: true,
                data: result
            }
        } catch (error) {
            console.error("Error updating user:", error)
            return {
                success: false,
                error: "Failed to update user"
            }
        }
    }
}

