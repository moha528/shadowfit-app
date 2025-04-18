import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { CrudForm } from "@/components/crud-form"
import {Exercise} from "@prisma/client";
import {ExerciseFormValues, exerciseSchema} from "@/schemas/training.schema";
import { exerciseFields } from "../field-schema-form";



interface EditExerciseModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    currentExercise: Exercise | null
    isLoading: boolean
    uploadProgress: number
    initialValues: ExerciseFormValues | undefined
    onSubmit: (values: ExerciseFormValues) => Promise<void>
}

export function EditExerciseModal({
                                      isOpen,
                                      setIsOpen,
                                      currentExercise,
                                      isLoading,
                                      uploadProgress,
                                      initialValues,
                                      onSubmit
                                  }: EditExerciseModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="top-0 z-10 pb-4">
                    <DialogTitle className="text-xl font-bold text-white">
                        Edit Exercise: {currentExercise?.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 px-1">
                    {currentExercise && (
                        <>
                            {/* Current image preview */}
                            {currentExercise.image && (
                                <div className="mb-4">
                                    <p className="text-sm text-zinc-400 mb-2">Current Image:</p>
                                    <div className="h-40 bg-zinc-800 rounded-md overflow-hidden">
                                        <img
                                            src={currentExercise.image}
                                            alt={currentExercise.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Upload progress */}
                            {uploadProgress > 0 && uploadProgress < 100 && (
                                <div className="mb-4">
                                    <Progress value={uploadProgress} className="h-2" />
                                    <p className="text-xs text-zinc-400 mt-1">Uploading: {uploadProgress}%</p>
                                </div>
                            )}

                            {/* Edit form */}
                            <CrudForm
                                schema={exerciseSchema}
                                fields={exerciseFields as any}
                                mode="edit"
                                initialData={initialValues}
                                isLoading={isLoading}
                                onSubmit={onSubmit}
                                onCancel={() => setIsOpen(false)}
                                title=""
                                subtitle=""
                            />
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}