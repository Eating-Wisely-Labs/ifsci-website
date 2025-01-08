import { useMemo } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface PaginationProps {
  current: number
  total: number
  onChange: (page: number) => void
  className?: string
}

export function Pagination({ current, total, onChange, className = '' }: PaginationProps) {
  const pages = useMemo(() => {
    const items: (number | string)[] = []
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        items.push(i)
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) {
          items.push(i)
        }
        items.push('...')
        items.push(total)
      } else if (current >= total - 3) {
        items.push(1)
        items.push('...')
        for (let i = total - 4; i <= total; i++) {
          items.push(i)
        }
      } else {
        items.push(1)
        items.push('...')
        for (let i = current - 1; i <= current + 1; i++) {
          items.push(i)
        }
        items.push('...')
        items.push(total)
      }
    }
    return items
  }, [current, total])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > total) return
    onChange(page)
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        onClick={() => handlePageChange(current - 1)}
        disabled={current === 1}
        className="flex size-8 items-center justify-center rounded-lg border border-[#333] text-white transition-colors hover:border-[#9eff00] hover:text-[#9eff00] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#333] disabled:hover:text-white"
      >
        <ChevronLeftIcon className="size-4" />
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          disabled={page === '...'}
          className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm transition-colors ${
            page === current
              ? 'bg-[#9eff00] font-medium text-black'
              : page === '...'
                ? 'cursor-default text-white'
                : 'border border-[#333] text-white hover:border-[#9eff00] hover:text-[#9eff00]'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(current + 1)}
        disabled={current === total}
        className="flex size-8 items-center justify-center rounded-lg border border-[#333] text-white transition-colors hover:border-[#9eff00] hover:text-[#9eff00] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#333] disabled:hover:text-white"
      >
        <ChevronRightIcon className="size-4" />
      </button>
    </div>
  )
}
