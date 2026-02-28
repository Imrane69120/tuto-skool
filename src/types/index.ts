export type Priority = 'high' | 'medium' | 'low'
export type Category = 'work' | 'personal' | 'health' | 'other'

export interface Todo {
  id: string
  title: string
  completed: boolean
  priority: Priority
  category: Category
  dueDate?: string
  createdAt: string
}

export interface SleepEntry {
  id: string
  date: string
  bedtime: string
  wakeTime: string
  durationMinutes: number
  quality: 1 | 2 | 3 | 4 | 5
  notes?: string
}

export interface DailyEntry {
  id: string
  date: string
  productivity: number
  energy: number
  focus: number
  mood: number
  goal: string
  review: string
}
