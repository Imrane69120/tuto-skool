import { Priority, Category } from '@/types'

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: { label: 'Haute', className: 'border border-red-600 text-red-400' },
  medium: { label: 'Moyenne', className: 'border border-yellow-600 text-yellow-400' },
  low: { label: 'Basse', className: 'border border-[#333333] text-[#AAAAAA]' },
}

const categoryConfig: Record<Category, { label: string }> = {
  work: { label: 'Travail' },
  personal: { label: 'Perso' },
  health: { label: 'Santé' },
  other: { label: 'Autre' },
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, className } = priorityConfig[priority]
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${className}`}>{label}</span>
  )
}

export function CategoryBadge({ category }: { category: Category }) {
  const { label } = categoryConfig[category]
  return (
    <span className="text-xs px-2 py-0.5 rounded-full border border-[#333333] text-[#AAAAAA]">
      {label}
    </span>
  )
}
