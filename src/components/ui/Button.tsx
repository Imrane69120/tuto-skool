import { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'danger' | 'ghost'
type Size = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white',
  danger: 'bg-[#DC2626] hover:bg-[#B91C1C] text-white',
  ghost: 'bg-transparent hover:bg-[#1a1a1a] text-[#AAAAAA] hover:text-white border border-[#333333]',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
