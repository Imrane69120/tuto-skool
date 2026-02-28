'use client'

import { useState } from 'react'
import { SleepEntry } from '@/types'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { todayISO } from '@/lib/formatDate'

interface SleepFormProps {
  initial?: SleepEntry
  onSave: (
    date: string,
    bedtime: string,
    wakeTime: string,
    quality: SleepEntry['quality'],
    notes?: string
  ) => void
  onCancel: () => void
}

export function SleepForm({ initial, onSave, onCancel }: SleepFormProps) {
  const [date, setDate] = useState(initial?.date ?? todayISO())
  const [bedtime, setBedtime] = useState(initial?.bedtime ?? '23:00')
  const [wakeTime, setWakeTime] = useState(initial?.wakeTime ?? '07:00')
  const [quality, setQuality] = useState<SleepEntry['quality']>(initial?.quality ?? 3)
  const [notes, setNotes] = useState(initial?.notes ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(date, bedtime, wakeTime, quality, notes || undefined)
  }

  const qualityLabels: Record<number, string> = {
    1: '😴 Très mauvaise',
    2: '😕 Mauvaise',
    3: '😐 Correcte',
    4: '😊 Bonne',
    5: '🤩 Excellente',
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Date (nuit du...)"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Heure de coucher"
          type="time"
          value={bedtime}
          onChange={(e) => setBedtime(e.target.value)}
          required
        />
        <Input
          label="Heure de lever"
          type="time"
          value={wakeTime}
          onChange={(e) => setWakeTime(e.target.value)}
          required
        />
      </div>
      <Select
        label="Qualité du sommeil"
        value={quality}
        onChange={(e) => {
          const v = Number(e.target.value)
          if (v >= 1 && v <= 5) setQuality(v as SleepEntry['quality'])
        }}
      >
        {([1, 2, 3, 4, 5] as const).map((v) => (
          <option key={v} value={v}>{qualityLabels[v]}</option>
        ))}
      </Select>
      <Textarea
        label="Notes (optionnel)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Rêves, perturbations, remarques..."
        maxLength={500}
        rows={2}
      />
      <div className="flex gap-2">
        <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">Annuler</Button>
        <Button type="submit" className="flex-1">{initial ? 'Modifier' : 'Enregistrer'}</Button>
      </div>
    </form>
  )
}
