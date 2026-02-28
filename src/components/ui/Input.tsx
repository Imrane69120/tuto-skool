import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode, useId } from 'react'

const baseInput = 'w-full bg-[#111111] border border-[#333333] text-white rounded-md px-3 py-2 text-sm placeholder-[#555555] focus:outline-none focus:border-[#2563EB] transition-colors'

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label?: string }

export function Input({ label, className = '', id, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={inputId} className="text-sm text-[#AAAAAA]">{label}</label>}
      <input id={inputId} className={`${baseInput} ${className}`} {...props} />
    </div>
  )
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }

export function Textarea({ label, className = '', id, ...props }: TextareaProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={inputId} className="text-sm text-[#AAAAAA]">{label}</label>}
      <textarea id={inputId} className={`${baseInput} resize-none ${className}`} {...props} />
    </div>
  )
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { label?: string; children: ReactNode }

export function Select({ label, className = '', children, id, ...props }: SelectProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={inputId} className="text-sm text-[#AAAAAA]">{label}</label>}
      <select id={inputId} className={`${baseInput} ${className}`} {...props}>
        {children}
      </select>
    </div>
  )
}

interface RangeProps {
  label?: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  showValue?: boolean
}

export function Range({ label, value, min, max, onChange, showValue = true }: RangeProps) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex justify-between items-center">
          <label htmlFor={id} className="text-sm text-[#AAAAAA]">{label}</label>
          {showValue && <span className="text-sm text-white font-medium" aria-live="polite">{value}</span>}
        </div>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      <div className="flex justify-between text-xs text-[#555555]" aria-hidden="true">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}
