import type { Metadata } from "next"
import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, ListFilter, MoveUpRight, Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

import ExerciseList from "@/features/training/training/training-page"
import { getExercisesAction } from "@/actions/training.action"
import CreateExercise from "@/features/training/training/create-exercise"
import { Exercise } from "@prisma/client";
import QuickTips from "@/features/training/training/quick-tips";
import ExerciseStats from "@/features/training/training/exercise-stats";

export const metadata: Metadata = {
    title: "New Training",
    description: "Create a new training",
}

interface SearchParams {
    search?: string
    muscleGroup?: string
    intensity?: string
    gender?: string
}

export default async function NewTrainingPage({
                                                  searchParams,
                                              }: {
    searchParams: SearchParams
}) {
    // Retrieve exercises with applied filters
    const exercisesResponse = await getExercisesAction({
        search: searchParams.search,
        muscleGroup: searchParams.muscleGroup,
        intensity: searchParams.intensity,
        gender: searchParams.gender,
    })

    // Check if we have valid data
    if (!exercisesResponse || !exercisesResponse.data || exercisesResponse.data.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
                <main className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1 className="text-3xl font-bold">No exercises found</h1>
                        <p className="text-gray-400">Try modifying your search criteria.</p>
                    </div>
                </main>
            </div>
        )
    }

    // Use filtered exercises
    const filteredExercises = exercisesResponse.data;

    return (
        <div className="min-h-screen text-white">
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Dumbbell className="h-8 w-8 text-cyan-400" />
                            New Training
                        </h1>
                        <p className="text-gray-400">Create and manage your fitness exercise collection</p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <div className="bg-cyan-400/10 px-4 py-2 rounded-lg flex items-center gap-2">
                            <span className="text-cyan-400 font-medium">{filteredExercises.length}</span>
                            <span className="text-gray-400">Exercises</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc- shadow-xl overflow-hidden">
                            <Tabs defaultValue="library" className="w-full">
                                <div className="px-6 pt-6 border-b border-zinc-">
                                    <TabsList className="bg-zinc-900 grid w-full grid-cols-2">
                                        <TabsTrigger
                                            value="library"
                                            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                                        >
                                            <ListFilter className="mr-2 h-4 w-4" />
                                            Exercise Library
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="create"
                                            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                                        >
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Exercise
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="library" className="p-0 m-0">
                                    <Suspense fallback={<ExerciseListSkeleton />}>
                                        <ExerciseList data={filteredExercises} />
                                    </Suspense>
                                </TabsContent>

                                <TabsContent value="create" className="p-0 m-0">
                                    <CreateExercise />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>

                    <div className="lg:col-span-1 max-h-screen order-1 lg:order-2">
                        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc- shadow-xl h-full">
                            <div className="p-6 border-b border-zinc- flex justify-between items-center">
                                <h3 className="text-xl font-semibold flex items-center">
                                    <MoveUpRight className="mr-2 h-5 w-5 text-cyan-400" />
                                    Filtered Exercise Statistics
                                </h3>
                            </div>

                            <div className="p-6 space-y-6">
                                <ExerciseStats exercises={filteredExercises} />
                                <QuickTips />

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

function ExerciseListSkeleton() {
    return (
        <div className="p-6 space-y-6">
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    )
}

