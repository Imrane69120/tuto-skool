import { Todo, SleepEntry, DailyEntry } from '@/types'

const KEYS = {
  todos: 'productivity_todos',
  sleep: 'productivity_sleep',
  daily: 'productivity_daily',
} as const

function getItem<T>(key: string): T[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : []
  } catch {
    return []
  }
}

function setItem<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(data))
}

export const getTodos = (): Todo[] => getItem<Todo>(KEYS.todos)
export const saveTodos = (todos: Todo[]): void => setItem(KEYS.todos, todos)

export const getSleepEntries = (): SleepEntry[] => getItem<SleepEntry>(KEYS.sleep)
export const saveSleepEntries = (entries: SleepEntry[]): void => setItem(KEYS.sleep, entries)

export const getDailyEntries = (): DailyEntry[] => getItem<DailyEntry>(KEYS.daily)
export const saveDailyEntries = (entries: DailyEntry[]): void => setItem(KEYS.daily, entries)
