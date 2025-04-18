"use client"

import { useState } from "react"
import { CrudForm } from "@/components/crud-form"
import { toastAlert } from "@/components/ui/sonner-v2"
import {Dumbbell, Info, Check,} from "lucide-react"
import {createExercisesAction} from "@/actions/training.action";
import {useEdgeStore} from "@/lib/edgestore";
import {toast} from "sonner";
import {Progress} from "@/components/ui/progress";
import {exerciseFields} from "@/features/training/field-schema-form";
import { ExerciseFormValues, exerciseSchema } from "@/schemas/training.schema"

export default function ExerciseFormPage() {
    const [isLoading, setIsLoading] = useState(false)
    const { edgestore } = useEdgeStore();
    const [uploadProgress, setUploadProgress] = useState(0)

    const handleSubmit = async (values: ExerciseFormValues) => {
        setIsLoading(true)
        setUploadProgress(0)

        let imageUrl = null
        const toastId = toastAlert.loading(
            {
                title: "Uploading image...",
                description: "Please wait while we upload the image",
                duration: 0,
            },
        )
        try {

            if (values.image) {
                const res = await edgestore.publicFiles.upload({
                    file: values.image,
                    onProgressChange: (progress) => {
                        setUploadProgress(progress)
                        toast.dismiss(toastId)

                    },
                })
                imageUrl = res.url

            }

            const result = await createExercisesAction({
                name: values.name,
                description: values.description               ? values.description : "",
                muscleGroups: values.muscleGroups               ? values.muscleGroups : [],
                intensity: values.intensity,
                type: values.type,
                image: imageUrl               ? imageUrl : "",
            })

            if (result.error) {
                toastAlert.error({
                    title: "Error",
                    description: result.error,
                })
                return
            }



            toastAlert.success({
                title: "Success!",
                description: "Exercise created successfully",
            })
        } catch (error) {
            console.error("Submission error:", error)
            toastAlert.error({
                title: "Error",
                description: "An error occurred while creating the exercise",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Logo et titre en haut */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center gap-2 font-bold text-2xl logo-glow">
                        <Dumbbell className="h-7 w-7 text-gray-400" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                            ShadowFit
                        </span>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne principale avec le formulaire */}
                    <div className="col-span-2">
                        <div className="bg-zinc-900/70 rounded-xl shadow-2xl overflow-hidden border border-zinc-800">
                            {/* En-tête du formulaire */}
                            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-2">Create New Exercise</h2>
                                    <p className="text-zinc-400">
                                        Enter the details to add a new exercise to your training catalog
                                    </p>
                                </div>
                                <div className="hidden sm:flex items-center">
                                    <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 font-medium text-sm">Training Module</span>
                                </div>
                            </div>

                            {/* Corps du formulaire */}
                            <div className="p-8">
                                <CrudForm
                                    schema={exerciseSchema}
                                    fields={exerciseFields as any}
                                    mode="create"
                                    isLoading={isLoading}
                                    onSubmit={handleSubmit}
                                    title=""
                                    subtitle=""
                                    className="space-y-6"
                                />
                                {uploadProgress > 0 && uploadProgress < 100 && (
                                    <div className="mb-4">
                                        <Progress value={uploadProgress} className="h-2" />
                                        <p className="text-xs text-zinc-400 mt-1">Uploading: {uploadProgress}%</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Colonne latérale avec les conseils */}
                    <div className="hidden lg:block">
                        <div className="bg-zinc-900/70 rounded-xl shadow-2xl p-6 border border-zinc-800 mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center mb-4">
                                <Info className="w-5 h-5 mr-2 text-sky-400" />
                                Tips for Creating Exercises
                            </h3>
                            <ul className="mt-6 space-y-4 text-zinc-300">
                                <li className="flex items-start">
                                    <span className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 shadow-lg shadow-sky-500/20">
                                        <Check className="w-3 h-3" />
                                    </span>
                                    <span>Choose a descriptive name without spaces</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 shadow-lg shadow-sky-500/20">
                                        <Check className="w-3 h-3" />
                                    </span>
                                    <span>Include detailed step-by-step instructions</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 shadow-lg shadow-sky-500/20">
                                        <Check className="w-3 h-3" />
                                    </span>
                                    <span>Select up to 3 primary muscle groups</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 shadow-lg shadow-sky-500/20">
                                        <Check className="w-3 h-3" />
                                    </span>
                                    <span>Add a clear image showing proper form</span>
                                </li>
                            </ul>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}