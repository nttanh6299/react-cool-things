import { useState, useEffect, useRef } from 'react'

const useInView = (
  elRef, //: MutableRefObject<HTMLElement | null>,
  onChange//?: (_inView: boolean) => void
) => {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (!elRef.current) return

      const boundingRect = elRef.current.getBoundingClientRect()
      const elementHeight = elRef.current.offsetHeight
      const offsetTop = boundingRect.top
      const windowHeight = window.innerHeight
      const isVisible =
        offsetTop + elementHeight > 0 && offsetTop < windowHeight
      if (isVisible && !inView) {
        setInView(isVisible)
        onChange && onChange(isVisible)
      } else if (!isVisible && inView) {
        setInView(isVisible)
        onChange && onChange(isVisible)
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [elRef, onChange, inView])

  return inView
}

export default useInView

export const App = () => {
  const elementRef = useRef(null)
  // use as a variable
  const inView = useInView(elementRef)
  // or use a callback
  useInView(elementRef, (isInView) => {
    console.log(isInView ? 'element has appeared' : 'element has disappeared');
  })

  return (
    <div className="w-full max-w-screen-md">
      <div className="h-screen"></div>
      <div
        ref={elementRef}
        className={`py-6 text-center ${inView ? 'bg-blue-100' : 'bg-red-100'
          }`}>
        Is in view: {inView ? 'true' : 'false'}
      </div>
      <div className="h-screen"></div>
    </div>
  )
}
