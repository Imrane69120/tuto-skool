'use client'

import { Todo } from '@/types'
import { PriorityBadge, CategoryBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Pencil, Trash2 } from 'lucide-react'
import { formatDate } from '@/lib/formatDate'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
      todo.completed ? 'border-[#222222] bg-[#111111]' : 'border-[#333333] bg-[#1a1a1a]'
    }`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-[#2563EB] border-[#2563EB]'
            : 'border-[#555555] hover:border-[#2563EB]'
        }`}
        aria-label={todo.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
      >
        {todo.completed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium break-words ${todo.completed ? 'line-through text-[#555555]' : 'text-white'}`}>
          {todo.title}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
          <PriorityBadge priority={todo.priority} />
          <CategoryBadge category={todo.category} />
          {todo.dueDate && (
            <span className="text-xs text-[#AAAAAA]">📅 {formatDate(todo.dueDate)}</span>
          )}
        </div>
      </div>

      <div className="flex gap-1 flex-shrink-0">
        <button
          onClick={() => onEdit(todo)}
          className="text-[#AAAAAA] hover:text-white transition-colors p-1"
          aria-label="Modifier"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-[#AAAAAA] hover:text-[#DC2626] transition-colors p-1"
          aria-label="Supprimer"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
