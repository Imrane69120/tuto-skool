'use client'

import { useState, useEffect, useCallback } from 'react'
import { DailyEntry } from '@/types'
import { getDailyEntries, saveDailyEntries } from '@/lib/storage'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function persist(updater: (prev: DailyEntry[]) => DailyEntry[]): (prev: DailyEntry[]) => DailyEntry[] {
  return (prev) => {
    const updated = updater(prev)
    saveDailyEntries(updated)
    return updated
  }
}

export function useDashboard() {
  const [entries, setEntries] = useState<DailyEntry[]>([])

  useEffect(() => {
    setEntries(getDailyEntries())
  }, [])

  const saveEntry = useCallback((entry: Omit<DailyEntry, 'id'>) => {
    setEntries(
      persist((prev) => {
        const existing = prev.find((e) => e.date === entry.date)
        if (existing) {
          return prev.map((e) => (e.id === existing.id ? { ...e, ...entry } : e))
        }
        return [{ id: generateId(), ...entry }, ...prev]
      })
    )
  }, [])

  const getEntryByDate = useCallback(
    (date: string): DailyEntry | undefined => {
      return entries.find((e) => e.date === date)
    },
    [entries]
  )

  return { entries, saveEntry, getEntryByDate }
}
