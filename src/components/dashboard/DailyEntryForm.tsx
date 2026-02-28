'use client'

import { useState } from 'react'
import { DailyEntry } from '@/types'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Input'
import { Range } from '@/components/ui/Input'

interface DailyEntryFormProps {
  initial?: DailyEntry
  date: string
  onSave: (entry: Omit<DailyEntry, 'id'>) => void
}

export function DailyEntryForm({ initial, date, onSave }: DailyEntryFormProps) {
  const [productivity, setProductivity] = useState(initial?.productivity ?? 5)
  const [energy, setEnergy] = useState(initial?.energy ?? 5)
  const [focus, setFocus] = useState(initial?.focus ?? 5)
  const [mood, setMood] = useState(initial?.mood ?? 3)
  const [goal, setGoal] = useState(initial?.goal ?? '')
  const [review, setReview] = useState(initial?.review ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave({ date, productivity, energy, focus, mood, goal, review })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Range label="Productivité" value={productivity} min={1} max={10} onChange={setProductivity} />
      <Range label="Énergie" value={energy} min={1} max={10} onChange={setEnergy} />
      <Range label="Focus" value={focus} min={1} max={10} onChange={setFocus} />
      <Range label="Humeur" value={mood} min={1} max={5} onChange={setMood} />

      <Textarea
        label="Objectif du jour"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Qu'est-ce que tu veux accomplir aujourd'hui ?"
        maxLength={500}
        rows={2}
      />
      <Textarea
        label="Bilan du jour"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Comment s'est passée ta journée ?"
        maxLength={1000}
        rows={3}
      />

      <Button type="submit" className="w-full">
        Sauvegarder
      </Button>
    </form>
  )
}
