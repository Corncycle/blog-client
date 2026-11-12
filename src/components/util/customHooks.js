import { useEffect, useRef, useState } from 'react'

export function useAdaptiveAnimation(timeToWaitForLongAnimation = 500) {
  const [shouldShowLoadingAnimation, setShowLoadingAnimation] = useState(false)
  const doneLoadingRef = useRef(false)
  const alertDoneLoading = (val) => {
    doneLoadingRef.current = val
  }

  useEffect(() => {
    ;(async () => {
      console.log(`done loading: ${doneLoadingRef.current}`)
      await new Promise((res) => setTimeout(res, timeToWaitForLongAnimation))
      setShowLoadingAnimation(!doneLoadingRef.current)
      console.log(`done loading: ${doneLoadingRef.current}`)
    })()
  }, [])

  return {
    shouldShowLoadingAnimation,
    alertDoneLoading,
  }
}
