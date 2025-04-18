"use client"

import React, { useState } from "react"
import { Control, FieldValues, Path, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z, ZodType } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Loader2, Save, Plus, Trash, Edit } from "lucide-react"
import { CustomFormMail } from "@/components/input-component/mail-input"
import { CustomFormPassword } from "@/components/input-component/password-input"
import { CustomFormText } from "@/components/input-component/text-input"
import { CustomFormOtp } from "@/components/input-component/otp-input"
import { CustomFormSelect } from "@/components/input-component/select-input"
import { CustomFormTextarea } from "@/components/input-component/text-area-input"
import { CustomFormCheckbox } from "@/components/input-component/check-box-input"
import { CustomFormFileUpload } from "@/components/input-component/file-input"
import { CustomFormDatePicker } from "@/components/input-component/date-input"
import { CustomFormNumberInput } from "@/components/input-component/number-input"
import { CustomFormSlider } from "@/components/input-component/slide-input"
import { CustomFormMultiSelect } from "@/components/input-component/multi-select-input";
import { cn } from "@/lib/utils"

type InferFormValues<T extends ZodType<any, any, any>> = z.infer<T>

interface FieldOption {
    value: string
    label: string
}

interface FieldConfig<T extends FieldValues> {
    type: "email" | "password" | "text" | "textarea" | "select" | "checkbox" | "date" | "number" | "otp" | "file" | "slide" | "multi-select"
    name: Path<T>
    label: string
    placeholder?: string
    required?: boolean
    options?: FieldOption[]
    min?: number
    max?: number
    step?: number
    rows?: number
}

interface CrudFormProps<T extends ZodType<any, any, any>> {
    schema: T
    fields: FieldConfig<InferFormValues<T>>[]
    mode: "create" | "edit" | "view" | "delete"
    initialData?: InferFormValues<T>
    isLoading?: boolean
    onSubmit: (values: InferFormValues<T>) => void
    onCancel?: () => void
    title?: string
    subtitle?: string
    className?: string
}

export function CrudForm<T extends ZodType<any, any, any>>({
    schema,
    fields,
    mode,
    initialData,
    isLoading = false,
    onSubmit,
    onCancel,
    title,
    subtitle,
    className,
}: CrudFormProps<T>) {
    type FormValues = InferFormValues<T>

    const [formMode, setFormMode] = useState<"create" | "edit" | "view" | "delete">(mode)

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: initialData || fields.reduce((acc, field) => {
            let defaultValue: any = ""

            if (field.type === "checkbox") defaultValue = false
            else if (field.type === "number") defaultValue = field.min || 0
            else if (field.type === "slide") defaultValue = field.min || 0
            else if (field.type === "multi-select") defaultValue = []

            return { ...acc, [field.name]: defaultValue }
        }, {} as FormValues),
    })

    const handleSubmit = form.handleSubmit((values) => {
        onSubmit(values)
        if (formMode === "create") {
            form.reset()
        }
    })

    const renderField = (field: FieldConfig<FormValues>) => {
        const commonProps = {
            name: field.name,
            control: form.control as Control<FormValues>,
            labelText: field.label,
            placeholder: field.placeholder || `Enter ${field.label.toLowerCase()}`,
            disabled: formMode === "view" || formMode === "delete",
        }

        switch (field.type) {
            case "email":
                return <CustomFormMail {...commonProps} />
            case "password":
                return <CustomFormPassword {...commonProps} />
            case "text":
                return <CustomFormText {...commonProps} />
            case "textarea":
                return <CustomFormTextarea {...commonProps} rows={field.rows || 4} />
            case "select":
                return <CustomFormSelect {...commonProps} options={field.options || []} />
            case "multi-select":
                return <CustomFormMultiSelect  {...commonProps} options={field.options || []} />
            case "checkbox":
                return <CustomFormCheckbox {...commonProps} />
            case "date":
                return <CustomFormDatePicker {...commonProps} />
            case "number":
                return <CustomFormNumberInput
                    {...commonProps}
                    min={field.min}
                    max={field.max}
                    step={field.step || 1}
                />
            case "file":
                return <CustomFormFileUpload {...commonProps} />
            case "slide":
                return <CustomFormSlider
                    {...commonProps}
                    min={field.min || 0}
                    max={field.max || 100}
                    step={field.step || 1}
                />
            case "otp":
                return <CustomFormOtp {...commonProps} />
            default:
                return null
        }
    }

    const getButtonConfig = () => {
        switch (formMode) {
            case "create":
                return {
                    text: "Create",
                    icon: <Plus className="ml-2 h-5 w-5 opacity-70 transition-transform duration-300 group-hover:translate-x-1" />,
                    color: "bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950"
                }
            case "edit":
                return {
                    text: "Save Changes",
                    icon: <Save className="ml-2 h-5 w-5 opacity-70 transition-transform duration-300 group-hover:translate-x-1" />,
                    color: "bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950"
                }
            case "delete":
                return {
                    text: "Confirm Delete",
                    icon: <Trash className="ml-2 h-5 w-5 opacity-70 transition-transform duration-300 group-hover:translate-x-1" />,
                    color: "bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950"
                }
            case "view":
                return {
                    text: "Edit",
                    icon: <Edit className="ml-2 h-5 w-5 opacity-70 transition-transform duration-300 group-hover:translate-x-1" />,
                    color: "bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950"
                }
        }
    }

    const buttonConfig = getButtonConfig()

    const handleEditClick = () => {
        setFormMode("edit")
    }

    return (
        <div className={cn("w-full mx-auto", className)}>
            {title && (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-white">{title}</h2>
                    {subtitle && <p className="text-zinc-400 mt-1 text-sm">{subtitle}</p>}
                </div>
            )}

            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {fields.map((field) => (
                            <div
                                key={field.name as string}
                                className={`${field.type === "textarea" || field.type === "slide" ? "md:col-span-2" : ""}`}
                            >
                                {renderField(field)}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                className="border-zinc-800 hover:bg-zinc-900 h-10 px-4"
                            >
                                Cancel
                            </Button>
                        )}

                        <Button
                            type={formMode !== "view" ? "submit" : "button"}
                            onClick={formMode === "view" ? handleEditClick : undefined}
                            className={`${buttonConfig.color} text-white h-10 px-4`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            {isLoading ? "Loading..." : buttonConfig.text}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}