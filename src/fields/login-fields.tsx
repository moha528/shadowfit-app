import {LoginFormValues} from "@/schemas/auth.schema";


export const loginFields: Array<{
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