import { Loader } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
      <div className="flex flex-col items-center">
        <Loader className="h-12 w-12 animate-spin text-terminal-green" />
        <div className="mt-4 text-terminal-green text-lg">
          <span className="inline-block animate-pulse">Loading system...</span>
        </div>
      </div>
    </div>
  )
}
