'use client'

import { useState } from 'react'
import { useSleep } from '@/hooks/useSleep'
import { SleepForm } from '@/components/sleep/SleepForm'
import { SleepEntryCard } from '@/components/sleep/SleepEntryCard'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SleepEntry } from '@/types'
import { formatDuration, getWeeklyAverageSleep } from '@/lib/formatDate'
import { Plus, Moon } from 'lucide-react'

export default function SleepPage() {
  const { entries, addEntry, updateEntry, deleteEntry } = useSleep()
  const [addOpen, setAddOpen] = useState(false)
  const [editEntry, setEditEntry] = useState<SleepEntry | null>(null)

  const { avgDuration, avgQuality } = getWeeklyAverageSleep(entries)

  function handleAdd(
    date: string,
    bedtime: string,
    wakeTime: string,
    quality: SleepEntry['quality'],
    notes?: string
  ) {
    addEntry(date, bedtime, wakeTime, quality, notes)
    setAddOpen(false)
  }

  function handleEdit(
    date: string,
    bedtime: string,
    wakeTime: string,
    quality: SleepEntry['quality'],
    notes?: string
  ) {
    if (!editEntry) return
    updateEntry(editEntry.id, { date, bedtime, wakeTime, quality, notes })
    setEditEntry(null)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Sommeil</h1>
          <p className="text-[#AAAAAA] text-sm mt-1">{entries.length} nuit{entries.length !== 1 ? 's' : ''} enregistrée{entries.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={() => setAddOpen(true)} size="sm">
          <Plus size={14} /> Ajouter
        </Button>
      </div>

      {/* Weekly stats */}
      {entries.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="text-center">
            <Moon size={20} className="mx-auto mb-2 text-[#AAAAAA]" />
            <p className="text-2xl font-bold text-white">{formatDuration(avgDuration)}</p>
            <p className="text-xs text-[#AAAAAA] mt-1">Durée moy. (7j)</p>
          </Card>
          <Card className="text-center">
            <p className="text-2xl font-bold text-white mb-1">{avgQuality}<span className="text-sm text-[#AAAAAA] font-normal">/5</span></p>
            <p className="text-xs text-[#AAAAAA]">Qualité moy. (7j)</p>
          </Card>
        </div>
      )}

      {/* History */}
      {entries.length === 0 ? (
        <Card className="text-center py-10">
          <Moon size={32} className="mx-auto mb-3 text-[#AAAAAA]" />
          <p className="text-[#AAAAAA] mb-4">Aucune nuit enregistrée</p>
          <Button onClick={() => setAddOpen(true)}>
            <Plus size={16} /> Enregistrer ma première nuit
          </Button>
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {entries.map((entry) => (
            <SleepEntryCard
              key={entry.id}
              entry={entry}
              onEdit={setEditEntry}
              onDelete={deleteEntry}
            />
          ))}
        </div>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Enregistrer une nuit">
        <SleepForm onSave={handleAdd} onCancel={() => setAddOpen(false)} />
      </Modal>

      <Modal open={!!editEntry} onClose={() => setEditEntry(null)} title="Modifier la nuit">
        {editEntry && (
          <SleepForm initial={editEntry} onSave={handleEdit} onCancel={() => setEditEntry(null)} />
        )}
      </Modal>
    </div>
  )
}
