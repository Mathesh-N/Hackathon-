import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">About SentimentFlow</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-600 leading-relaxed text-lg">
            SentimentFlow is an AI-powered brand sentiment monitoring platform that helps businesses track real-time
            customer opinions, measure brand reputation, and respond proactively.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
