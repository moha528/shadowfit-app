import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteConfirmationModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    exerciseName: string | undefined
    isLoading: boolean
    onConfirm: () => Promise<void>
}

export function DeleteConfirmationModal({
                                            isOpen,
                                            setIsOpen,
                                            exerciseName,
                                            isLoading,
                                            onConfirm
                                        }: DeleteConfirmationModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-zinc-900 border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">
                        Confirm Delete
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <p className="text-zinc-300">
                        Are you sure you want to delete the exercise <span className="font-semibold text-white">{exerciseName}</span>?
                        This action cannot be undone.
                    </p>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="border-zinc-700 hover:bg-zinc-800"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {isLoading ? "Loading..." : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}