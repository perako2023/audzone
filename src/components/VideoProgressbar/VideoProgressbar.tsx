import { forwardRef } from 'react'
import css from './VideoProgressbar.module.css'

type VideoProgressbarProps = {
  min?: number
  max?: number
  step?: number
  value?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string | CSSModuleClasses
}

export const VideoProgressbar = forwardRef<
  HTMLInputElement,
  VideoProgressbarProps
>(({ min = 0, max = 100, step = 1, value = 0, onChange, className }, ref) => {
  // console.log(value)

  // const [internalValue, setInternalValue] = useState(value)
  const progress = ((value - min) / (max - min)) * 100

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // setInternalValue(event.target.valueAsNumber)
  //   onChange?.(event)
  // }

  return (
    <input
      ref={ref}
      className={`${css.range} ${className || ''}`}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      /* REVIEW - color */
      style={{
        background: `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`,
      }}
    />
  )
})
