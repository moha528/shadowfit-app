import {RegisterFormValues} from "@/schemas/auth.schema";

export const registerFields: Array<{
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