import {ResetPasswordFormValues} from "@/schemas/auth.schema";

export const resetPasswordFields :Array<{
    type: "text" | "email" | "password"
    name: keyof ResetPasswordFormValues
    label: string
    placeholder: string
    required: boolean
}> = [
    {
        type: "password",
        name: "password",
        label: "New Password",
        placeholder: "••••••••",
        required: true,
    },
    {
        type: "password",
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "••••••••",
        required: true,
    },
]