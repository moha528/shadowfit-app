"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { motion } from "framer-motion"
import { PlusCircle } from "lucide-react"
import { useProgramForm } from "./hooks/useProgramForm"
import { DateRangePicker } from "./components/DateRangePicker"
import { TrainingDayForm } from "./components/TrainingDayForm"
import { CreateProgramFormProps } from "./types/program.types"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function CreateProgramForm({ userId }: CreateProgramFormProps) {
    const {
        isOpen,
        setIsOpen,
        showConfirmation,
        setShowConfirmation,
        hasExistingProgram,
        form,
        selectedMuscleGroups,
        handleMuscleGroupChange,
        removeMuscleGroup,
        getAvailableDays,
        onSubmit,
        submitProgram,
        removeDay
    } = useProgramForm(userId)

    return (
        <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create a program
                </Button>
            </motion.div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Create a program</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-6">
                                <DateRangePicker control={form.control} />

                                <TrainingDayForm
                                    control={form.control}
                                    selectedMuscleGroups={selectedMuscleGroups}
                                    handleMuscleGroupChange={handleMuscleGroupChange}
                                    removeMuscleGroup={removeMuscleGroup}
                                    getAvailableDays={getAvailableDays}
                                    removeDay={removeDay}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="h-8 text-sm">
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-black hover:bg-gray-900 text-white h-8 text-sm">
                                    Create program
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <AlertDialogContent className="bg-background border-border">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-foreground">Existing Program</AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground">
                            A program already exists for this user. Creating a new program will overwrite the existing one.
                            Do you want to continue?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="text-sm">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                submitProgram(form.getValues())
                                setShowConfirmation(false)
                            }}
                            className="bg-black hover:bg-gray-900 text-white text-sm"
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
