import { useEffect, useRef, useState } from 'react'

export interface TToastProps {
  type: 'success' | 'fail' | null
  message?: string
  timeStamp?: number
}

export default function Toast({ type, message, timeStamp }: TToastProps) {
  const timer = useRef<NodeJS.Timeout>()
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    if (type && message && timeStamp) {
      console.log('Toast', type, message, timeStamp)

      clearTimeout(timer.current)

      setShow(true)
      timer.current = setTimeout(() => {
        setShow(false)
      }, 4000)
    }
  }, [type, message, timeStamp])

  return !show ? (
    <></>
  ) : (
    <div className="fixed left-1/2 top-12 z-[1000] flex -translate-x-1/2 items-center justify-center lg:top-20">
      <div className="m-auto flex max-w-[300px] gap-2 rounded-lg border border-[#0000000F] bg-white px-4 py-3 text-sm font-medium shadow-[0_0_10px_0_rgba(0,0,0,0.06),0_0_17px_0_rgba(0,0,0,0.07),0_0_27px_0_rgba(0,0,0,0.08)]">
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 shrink-0"
        >
          {type === 'success' ? (
            <path
              d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.03 8.20001L9.35999 12.86C9.21999 13.01 9.02999 13.08 8.82999 13.08C8.63999 13.08 8.44999 13.01 8.29999 12.86L5.97 10.53C5.68 10.24 5.68 9.75997 5.97 9.46997C6.26 9.17997 6.74 9.17997 7.03 9.46997L8.82999 11.27L12.97 7.14001C13.26 6.84001 13.74 6.84001 14.03 7.14001C14.32 7.43001 14.32 7.90001 14.03 8.20001Z"
              fill="#009E8C"
              fillOpacity="0.929412"
            />
          ) : (
            <path
              d="M10.8926 0C5.37258 0 0.892578 4.48 0.892578 10C0.892578 15.52 5.37258 20 10.8926 20C16.4126 20 20.8926 15.52 20.8926 10C20.8926 4.48 16.4126 0 10.8926 0ZM14.4226 12.47C14.7126 12.76 14.7126 13.24 14.4226 13.53C14.2726 13.68 14.0826 13.75 13.8926 13.75C13.7026 13.75 13.5126 13.68 13.3626 13.53L10.8926 11.06L8.42258 13.53C8.27258 13.68 8.08258 13.75 7.89258 13.75C7.70258 13.75 7.51258 13.68 7.36258 13.53C7.07258 13.24 7.07258 12.76 7.36258 12.47L9.83258 10L7.36258 7.53003C7.07258 7.24003 7.07258 6.75997 7.36258 6.46997C7.65258 6.17997 8.13258 6.17997 8.42258 6.46997L10.8926 8.94L13.3626 6.46997C13.6526 6.17997 14.1326 6.17997 14.4226 6.46997C14.7126 6.75997 14.7126 7.24003 14.4226 7.53003L11.9526 10L14.4226 12.47Z"
              fill="#DE4545"
            />
          )}
        </svg>
        <span>{message}</span>
      </div>
    </div>
  )
}
