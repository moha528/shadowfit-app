import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"

interface NoResultsFoundProps {
    clearFilters: () => void
}

export function NoResultsFound({ clearFilters }: NoResultsFoundProps) {
    return (
        <div className="col-span-3 py-16 flex flex-col items-center justify-center text-center">
            <Filter className="h-16 w-16 text-zinc-700 mb-4" />
            <h3 className="text-xl text-zinc-400 font-medium">No exercises match your filters</h3>
            <p className="text-zinc-600 mt-2 max-w-lg">
                Try adjusting your search terms or clearing some filters
            </p>
            <Button
                variant="outline"
                className="mt-4 border-zinc-700"
                onClick={clearFilters}
            >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
            </Button>
        </div>
    )
}