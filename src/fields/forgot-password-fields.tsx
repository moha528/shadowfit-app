import {ForgotPasswordFormValues} from "@/schemas/user.schema";

export const forgotPasswordFields: Array<{
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