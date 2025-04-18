export default function QuickTips() {
    return (
        <div className="space-y-4">
            <h4 className="font-medium text-gray-300">Tips for Good Exercises</h4>
            <div className="space-y-3">
                {[
                    "Use descriptive names without spaces",
                    "Include detailed step-by-step instructions",
                    "Select up to 3 main muscle groups",
                    "Add clear images showing the correct form",
                ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                        <div className="mt-0.5 h-4 w-4 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                            <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                        </div>
                        <span className="text-gray-300">{tip}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}