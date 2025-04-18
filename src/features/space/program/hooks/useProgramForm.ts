import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { createProgram, checkExistingProgram } from "@/actions/program.actions"
import { programFormSchema, ProgramFormValues } from "@/schemas/space.schema"
import { MuscleGroup, DayOfWeek } from "@prisma/client"

export const useProgramForm = (userId: string) => {
    const [isOpen, setIsOpen] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [hasExistingProgram, setHasExistingProgram] = useState(false)
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<Record<number, MuscleGroup[]>>({})

    useEffect(() => {
        const checkProgram = async () => {
            const result = await checkExistingProgram(userId)
            setHasExistingProgram(result.exists)
        }
        checkProgram()
    }, [userId])

    const form = useForm<ProgramFormValues>({
        resolver: zodResolver(programFormSchema),
        defaultValues: {
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            days: [],
        },
    })

    const handleMuscleGroupChange = (index: number, muscleGroup: MuscleGroup) => {
        const currentGroups = selectedMuscleGroups[index] || []
        let newGroups: MuscleGroup[]

        if (currentGroups.includes(muscleGroup)) {
            newGroups = currentGroups.filter((group) => group !== muscleGroup)
        } else {
            newGroups = [...currentGroups, muscleGroup]
        }

        setSelectedMuscleGroups((prev) => ({
            ...prev,
            [index]: newGroups,
        }))

        form.setValue(`days.${index}.muscleTargets`, newGroups)
    }

    const removeMuscleGroup = (index: number, muscleGroup: MuscleGroup) => {
        handleMuscleGroupChange(index, muscleGroup)
    }

    const getAvailableDays = (currentIndex: number) => {
        const allDays = Object.values(DayOfWeek)
        const selectedDays = form.getValues("days").map((d, i) => i !== currentIndex ? d.dayOfWeek : null)
        return allDays.filter(day => !selectedDays.includes(day))
    }

    const onSubmit = async (data: ProgramFormValues) => {
        if (hasExistingProgram) {
            setShowConfirmation(true)
            return
        }
        await submitProgram(data)
    }

    const submitProgram = async (data: ProgramFormValues) => {
        const result = await createProgram(userId, data.startDate, data.endDate, data.days)

        if (result.success) {
            toast.success("Programme créé avec succès")
            setIsOpen(false)
            form.reset()
            setHasExistingProgram(true)
        } else {
            toast.error("Erreur lors de la création du programme")
        }
    }

    const removeDay = (index: number) => {
        const currentDays = form.getValues("days")
        const newDays = [...currentDays]
        newDays.splice(index, 1)
        form.setValue("days", newDays)

        const newSelectedGroups = { ...selectedMuscleGroups }
        delete newSelectedGroups[index]

        const reindexedGroups: Record<number, MuscleGroup[]> = {}
        Object.keys(newSelectedGroups).forEach((key, i) => {
            const numKey = Number.parseInt(key)
            if (numKey > index) {
                reindexedGroups[numKey - 1] = newSelectedGroups[numKey]
            } else {
                reindexedGroups[numKey] = newSelectedGroups[numKey]
            }
        })

        setSelectedMuscleGroups(reindexedGroups)
    }

    return {
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
    }
} 