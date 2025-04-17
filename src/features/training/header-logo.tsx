import { Dumbbell } from "lucide-react"

export function HeaderLogo() {
    return (
        <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2 font-bold text-2xl logo-glow">
                <Dumbbell className="h-7 w-7 text-gray-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
                    ShadowFit - Exercise Library
                </span>
            </div>
        </div>
    )
}
