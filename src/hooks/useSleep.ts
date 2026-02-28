'use client'

import { useState, useEffect, useCallback } from 'react'
import { SleepEntry } from '@/types'
import { getSleepEntries, saveSleepEntries } from '@/lib/storage'
import { calculateDurationMinutes } from '@/lib/formatDate'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function persist(updater: (prev: SleepEntry[]) => SleepEntry[]): (prev: SleepEntry[]) => SleepEntry[] {
  return (prev) => {
    const updated = updater(prev)
    saveSleepEntries(updated)
    return updated
  }
}

export function useSleep() {
  const [entries, setEntries] = useState<SleepEntry[]>([])

  useEffect(() => {
    setEntries(getSleepEntries())
  }, [])

  const addEntry = useCallback(
    (
      date: string,
      bedtime: string,
      wakeTime: string,
      quality: SleepEntry['quality'],
      notes?: string
    ) => {
      const entry: SleepEntry = {
        id: generateId(),
        date,
        bedtime,
        wakeTime,
        durationMinutes: calculateDurationMinutes(bedtime, wakeTime),
        quality,
        notes,
      }
      setEntries(persist((prev) => [entry, ...prev]))
    },
    []
  )

  const updateEntry = useCallback((id: string, updates: Partial<Omit<SleepEntry, 'id'>>) => {
    setEntries(
      persist((prev) =>
        prev.map((e) => {
          if (e.id !== id) return e
          const updated = { ...e, ...updates }
          if (updates.bedtime !== undefined || updates.wakeTime !== undefined) {
            updated.durationMinutes = calculateDurationMinutes(
              updates.bedtime ?? e.bedtime,
              updates.wakeTime ?? e.wakeTime
            )
          }
          return updated
        })
      )
    )
  }, [])

  const deleteEntry = useCallback((id: string) => {
    setEntries(persist((prev) => prev.filter((e) => e.id !== id)))
  }, [])

  return { entries, addEntry, updateEntry, deleteEntry }
}
