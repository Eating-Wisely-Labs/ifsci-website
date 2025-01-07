import { useEffect, useState, useCallback } from 'react'

interface UseCountdownReturn {
  remainingSeconds: number
  isFinished: boolean
  start: (seconds: number) => void
  stop: () => void
}

function useCountdown(): UseCountdownReturn {
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning || remainingSeconds <= 0) {
      if (remainingSeconds <= 0) {
        setIsFinished(true)
      }
      return
    }

    const timer = setTimeout(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsFinished(true)
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [remainingSeconds, isRunning])

  const start = useCallback((seconds: number) => {
    setRemainingSeconds(seconds)
    setIsFinished(false)
    setIsRunning(true)
  }, [])

  const stop = useCallback(() => {
    setIsRunning(false)
    setIsFinished(true)
  }, [])

  return {
    remainingSeconds,
    isFinished,
    start,
    stop
  }
}

export default useCountdown
