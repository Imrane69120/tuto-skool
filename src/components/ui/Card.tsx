import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-[#1a1a1a] border border-[#333333] rounded-lg p-4 ${className}`}>
      {children}
    </div>
  )
}
