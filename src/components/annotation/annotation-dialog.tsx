import { IAnnotationResult } from '@/apis/post.api'
import { useWallet } from '@solana/wallet-adapter-react'
import { X, Loader2, PartyPopper } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface AnnotationDialogProps {
  open: boolean
  onClose: () => void
  status: 'loading' | 'success' | 'fail' | 'error'
  result: IAnnotationResult
}

export default function AnnotationDialog({ open, onClose, status, result }: AnnotationDialogProps) {
  const navigate = useNavigate()
  const { publicKey } = useWallet()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open, onClose])

  if (!open) return null

  const handleViewRecords = () => {
    navigate(`/annotations/${publicKey?.toString()}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-[480px] rounded-3xl bg-[#1A1A1A] p-12 text-center">
        {/* Close Button */}
        <button onClick={onClose} className="absolute right-4 top-4 text-white/50 transition-colors hover:text-white">
          <X size={24} />
        </button>

        {/* Icon */}
        <div className="mb-8 flex justify-center">
          {status === 'loading' && (
            <div className="flex size-20 items-center justify-center rounded-full bg-white/10">
              <Loader2 className="size-10 animate-spin text-primary" />
            </div>
          )}
          {status === 'success' && (
            <div className="flex size-20 items-center justify-center">
              <PartyPopper className="size-20 text-primary" />
            </div>
          )}
          {status === 'error' && (
            <div className="flex size-20 items-center justify-center rounded-full bg-[#D92B2B] p-4">
              <X className="size-20 text-white" />
            </div>
          )}
          {status === 'fail' && (
            <div className="flex size-20 items-center justify-center rounded-full bg-[#D92B2B] p-4">
              <X className="size-20 text-white" />
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="mb-4 text-3xl font-bold text-white">
          {status === 'loading' && <span>Processing...</span>}
          {status === 'error' && <span>Something went wrong</span>}
          {status === 'fail' && <span>Failed to earn reward!</span>}
          {status === 'success' && <span>{result.score} tokens Awarded!</span>}
        </h2>

        {/* Description */}
        <p className="text-lg text-white/80">
          {status === 'loading' && 'Please wait while we process your submission...'}
          {status === 'success' && 'Thank you for your data annotation! Your rewards have been issued.'}
          {status === 'error' && 'Something went wrong. Please try again later.'}
          {status === 'fail' && <span>{result.reason}</span>}
        </p>

        {/* Action Button */}
        {status === 'success' && (
          <button
            onClick={handleViewRecords}
            className="mt-6 rounded-full bg-[#65D01E] px-8 py-3 text-lg font-medium text-black transition-colors hover:bg-[#65D01E]/90"
          >
            View records
          </button>
        )}
      </div>
    </div>
  )
}
