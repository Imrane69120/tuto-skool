'use client'

import { SleepEntry } from '@/types'
import { Card } from '@/components/ui/Card'
import { formatDate, formatDuration } from '@/lib/formatDate'
import { Pencil, Trash2 } from 'lucide-react'

interface SleepEntryCardProps {
  entry: SleepEntry
  onEdit: (entry: SleepEntry) => void
  onDelete: (id: string) => void
}

const qualityStars: Record<number, string> = {
  1: '★☆☆☆☆',
  2: '★★☆☆☆',
  3: '★★★☆☆',
  4: '★★★★☆',
  5: '★★★★★',
}

export function SleepEntryCard({ entry, onEdit, onDelete }: SleepEntryCardProps) {
  return (
    <Card className="flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-white font-medium text-sm">{formatDate(entry.date)}</span>
          <span className="text-[#AAAAAA] text-sm">{entry.bedtime} → {entry.wakeTime}</span>
          <span className="text-white font-semibold text-sm">{formatDuration(entry.durationMinutes)}</span>
          <span className="text-yellow-400 text-xs tracking-tighter">{qualityStars[entry.quality]}</span>
        </div>
        {entry.notes && (
          <p className="text-[#AAAAAA] text-xs mt-1 truncate">{entry.notes}</p>
        )}
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <button
          onClick={() => onEdit(entry)}
          className="text-[#AAAAAA] hover:text-white transition-colors p-1"
          aria-label="Modifier"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(entry.id)}
          className="text-[#AAAAAA] hover:text-[#DC2626] transition-colors p-1"
          aria-label="Supprimer"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </Card>
  )
}
