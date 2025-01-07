import { ReactNode } from 'react'

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-[10px] rounded-lg border border-primary bg-white/[0.08] px-5 py-4 shadow-[0_2px_12px_0_rgba(252,160,28,0.12)] lg:w-[260px]">
      <div className="h-[10px] rounded-[4px] bg-primary/15"></div>
      <div className="h-[10px] rounded-[4px] bg-primary/15"></div>
      <div className="h-[10px] w-1/2 rounded-[4px] bg-primary/15"></div>
      <div className="h-20 rounded-[4px] bg-primary/15"></div>
      <div className="flex justify-end">
        <div className="relative h-6">
          {children}
          <svg
            width="11"
            height="18"
            viewBox="0 0 11 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-[-10px] right-0"
          >
            <path
              d="M6.091 9.30025L8.66717 16.3781L6.31792 17.2332L3.74175 10.1553L0.264893 12.7852L1.50717 0.360985L10.4449 9.07992L6.091 9.30025Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
