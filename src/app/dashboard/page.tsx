'use client'

import { useState } from 'react'
import { useDashboard } from '@/hooks/useDashboard'
import { ScoreCard } from '@/components/dashboard/ScoreCard'
import { DailyEntryForm } from '@/components/dashboard/DailyEntryForm'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { todayISO, formatDate } from '@/lib/formatDate'
import { DailyEntry } from '@/types'
import { Plus, Edit2 } from 'lucide-react'

export default function DashboardPage() {
  const { entries, saveEntry, getEntryByDate } = useDashboard()
  const [modalOpen, setModalOpen] = useState(false)
  const today = todayISO()
  const todayEntry = getEntryByDate(today)

  function handleSave(entry: Omit<DailyEntry, 'id'>) {
    saveEntry(entry)
    setModalOpen(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-[#AAAAAA] text-sm mt-1">{formatDate(today)}</p>
        </div>
        <Button onClick={() => setModalOpen(true)} size="sm">
          {todayEntry ? <><Edit2 size={14} /> Modifier</> : <><Plus size={14} /> Saisir</>}
        </Button>
      </div>

      {todayEntry ? (
        <>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <ScoreCard label="Productivité" value={todayEntry.productivity} max={10} icon="⚡" />
            <ScoreCard label="Énergie" value={todayEntry.energy} max={10} icon="🔋" />
            <ScoreCard label="Focus" value={todayEntry.focus} max={10} icon="🎯" />
            <ScoreCard label="Humeur" value={todayEntry.mood} max={5} icon="😊" />
          </div>

          {todayEntry.goal && (
            <Card className="mb-3">
              <p className="text-xs text-[#AAAAAA] mb-1">Objectif du jour</p>
              <p className="text-white text-sm">{todayEntry.goal}</p>
            </Card>
          )}
          {todayEntry.review && (
            <Card>
              <p className="text-xs text-[#AAAAAA] mb-1">Bilan</p>
              <p className="text-white text-sm">{todayEntry.review}</p>
            </Card>
          )}
        </>
      ) : (
        <Card className="text-center py-12">
          <p className="text-[#AAAAAA] mb-4">Aucune entrée pour aujourd'hui</p>
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={16} /> Saisir ma journée
          </Button>
        </Card>
      )}

      {entries.length > 1 && (
        <div className="mt-8">
          <h2 className="text-white font-semibold mb-3">Historique récent</h2>
          <div className="flex flex-col gap-2">
            {entries
              .filter((e) => e.date !== today)
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 5)
              .map((entry) => (
                <Card key={entry.id} className="flex items-center justify-between py-3">
                  <span className="text-[#AAAAAA] text-sm">{formatDate(entry.date)}</span>
                  <div className="flex gap-4 text-sm">
                    <span className="text-white">⚡ {entry.productivity}/10</span>
                    <span className="text-white">🔋 {entry.energy}/10</span>
                    <span className="text-white">😊 {entry.mood}/5</span>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={todayEntry ? 'Modifier ma journée' : 'Ma journée du ' + formatDate(today)}
      >
        <DailyEntryForm initial={todayEntry} date={today} onSave={handleSave} />
      </Modal>
    </div>
  )
}
