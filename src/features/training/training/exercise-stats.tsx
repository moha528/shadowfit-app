"use client"
import {Exercise} from "@prisma/client";

export default function ExerciseStats({ exercises }: { exercises: Exercise[] }) {

    console.log("exercises", exercises)
    // Count exercises by muscle group
    const muscleGroupCounts: Record<string, number> = {};
    // Count exercises by intensity
    const intensityCounts: Record<string | number, number> = { 1: 0, 2: 0, 3: 0 };
    // Count exercises by gender
    const genderCounts: Record<string, number> = {};

    // Analyze exercise data
    exercises.forEach((exercise) => {
        // Count by muscle group
        if (Array.isArray(exercise.muscleGroups)) {
            exercise.muscleGroups.forEach((group: string) => {
                muscleGroupCounts[group] = (muscleGroupCounts[group] || 0) + 1;
            });
        }

        // Count by intensity
        const intensity = Number(exercise.intensity) || 0;
        intensityCounts[intensity] = (intensityCounts[intensity] || 0) + 1;

        // Count by gender
        const exerciseType = exercise.type || "UNKNOWN";
        genderCounts[exerciseType] = (genderCounts[exerciseType] || 0) + 1;
    });

    // Get the 4 most popular muscle groups
    const topMuscleGroups = Object.entries(muscleGroupCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([name, count]) => ({ name, count }));

    // Colors for different intensities
    const intensityColors: Record<number, string> = {
        1: "bg-green-500", // Low
        2: "bg-yellow-500", // Medium
        3: "bg-red-500", // High
    };

    // Names for different intensities
    const intensityNames: Record<number, string> = {
        1: "Low",
        2: "Medium",
        3: "High",
    };

    return (
        <div className="space-y-6">
            {/* Muscle groups */}
            <div className="space-y-4">
                <h4 className="font-medium text-gray-300">Popular muscle groups</h4>
                <div className="grid grid-cols-2 gap-3">
                    {topMuscleGroups.length > 0 ? (
                        topMuscleGroups.map((group) => (
                            <div key={group.name} className="bg-zinc-900/50 rounded-lg p-3 flex flex-col">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">{group.name}</span>
                                    <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
                                </div>
                                <span className="text-xl font-bold">{group.count}</span>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 text-gray-400 text-sm">No muscle group found</div>
                    )}
                </div>
            </div>

            {/* Intensities */}
            <div className="space-y-4">
                <h4 className="font-medium text-gray-300">Distribution by intensity</h4>
                <div className="space-y-3">
                    {[1, 2, 3].map((level) => {
                        const count = intensityCounts[level] || 0;
                        return (
                            <div key={level} className="flex items-center">
                                <div className="w-24 text-sm text-gray-400">{intensityNames[level]}</div>
                                <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${intensityColors[level]}`}
                                        style={{ width: `${exercises.length ? (count / exercises.length) * 100 : 0}%` }}
                                    ></div>
                                </div>
                                <div className="w-10 text-right text-sm text-gray-400 ml-2">{count}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Types (genders) */}
            <div className="space-y-4">
                <h4 className="font-medium text-gray-300">Exercise types</h4>
                <div className="grid grid-cols-2 gap-3">
                    {Object.entries(genderCounts).map(([type, count]) => (
                        <div key={type} className="bg-zinc-900/50 rounded-lg p-3 flex flex-col">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">{type}</span>
                                <span className={`h-2 w-2 rounded-full ${type === "MALE" ? "bg-blue-500" : "bg-pink-500"}`}></span>
                            </div>
                            <span className="text-xl font-bold">{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}