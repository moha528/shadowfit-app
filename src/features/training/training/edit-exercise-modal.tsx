import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { CrudForm } from "@/components/crud-form"
import {  exerciseSchema } from "@/schemas/training.schema"
import { exerciseFields } from "../../../fields/exercise-fields"
import { Dumbbell } from "lucide-react"
import {EditExerciseModalProps} from "@/types/types";
import Particles from "@/components/ui/particles";


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
            <DialogContent className="bg-black border-zinc-800 sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
                <DialogTitle className={"hidden"}>

                </DialogTitle>
                {/* Image at the top */}
                {currentExercise && (
                    <div className="relative w-full h-60">
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 z-10" />
                            {currentExercise.image ? (
                                <>
                                    <img
                                        src={currentExercise.image}
                                        alt={currentExercise.name}
                                        className="w-full h-full object-cover object-center"
                                    />
                                    <Particles/>
                                </>


                            ) : (
                                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                    <Dumbbell className="h-12 w-12 text-zinc-600" />
                                </div>
                            )}
                        </div>

                        {/* Title overlay on the image */}
                        <div className="absolute top-0 inset-x-0 p-4 z-20">
                            <h3 className="text-xl font-bold text-white">{currentExercise.name}</h3>
                        </div>
                    </div>
                )}

                <div className="p-6 space-y-4">
                    {currentExercise && (
                        <>
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