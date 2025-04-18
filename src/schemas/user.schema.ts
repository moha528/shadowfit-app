import { z } from "zod";

export const filterSchema = z.object({
    role: z.array(z.string()).optional(),
    gender: z.array(z.string()).optional(),
    profileCompleted: z.array(z.string()).optional(),
})

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>