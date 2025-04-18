import {VerifyEmailFormValues} from "@/schemas/auth.schema";

export const verifyEmailFields:Array<{
    type: "text" | "email" | "password" | "otp"
    name: keyof VerifyEmailFormValues
    label: string
    placeholder: string
    required: boolean
}> = [
    {
        type: "otp",
        name: "otp",
        label: "Verification Code",
        placeholder: "123456",
        required: true,
    },
]