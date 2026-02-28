'use client'

import { useState } from 'react'
import { Todo, Priority, Category } from '@/types'
import { Input, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface TodoFormProps {
  initial?: Todo
  onSave: (title: string, priority: Priority, category: Category, dueDate?: string) => void
  onCancel: () => void
}

export function TodoForm({ initial, onSave, onCancel }: TodoFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? 'medium')
  const [category, setCategory] = useState<Category>(initial?.category ?? 'work')
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSave(title.trim(), priority, category, dueDate || undefined)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Décris ta tâche..."
        maxLength={200}
        autoFocus
        required
      />

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Priorité"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="high">Haute</option>
          <option value="medium">Moyenne</option>
          <option value="low">Basse</option>
        </Select>

        <Select
          label="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          <option value="work">Travail</option>
          <option value="personal">Perso</option>
          <option value="health">Santé</option>
          <option value="other">Autre</option>
        </Select>
      </div>

      <Input
        label="Date d'échéance (optionnel)"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <div className="flex gap-2">
        <Button type="button" variant="ghost" onClick={onCancel} className="flex-1">
          Annuler
        </Button>
        <Button type="submit" className="flex-1">
          {initial ? 'Modifier' : 'Ajouter'}
        </Button>
      </div>
    </form>
  )
}
