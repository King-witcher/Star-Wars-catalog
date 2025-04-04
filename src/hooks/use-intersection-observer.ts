import { RefCallback, useCallback, useRef } from 'react'

/** Calls a callback when an element becomes visible. */
export function useIntersectionObserver(loadFn: () => void, enabled: boolean) {
  const observerRef = useRef<IntersectionObserver>(null)

  const lastElementRef: RefCallback<Element> = useCallback(
    (node: Element | null) => {
      observerRef.current?.disconnect()

      if (!node || !enabled) return

      observerRef.current = new IntersectionObserver(async ([entry]) => {
        if (entry.isIntersecting) loadFn()
      })

      observerRef.current.observe(node)
    },
    [loadFn, enabled]
  )

  return lastElementRef
}
