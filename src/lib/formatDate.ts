export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatTime(timeStr: string): string {
  return timeStr
}

export function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

export function calculateDurationMinutes(bedtime: string, wakeTime: string): number {
  const [bh, bm] = bedtime.split(':').map(Number)
  const [wh, wm] = wakeTime.split(':').map(Number)

  let bedMinutes = bh * 60 + bm
  let wakeMinutes = wh * 60 + wm

  if (wakeMinutes <= bedMinutes) {
    wakeMinutes += 24 * 60
  }

  return wakeMinutes - bedMinutes
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h${String(m).padStart(2, '0')}`
}

export function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split('T')[0]
  })
}

export function getWeeklyAverageSleep(
  entries: { date: string; durationMinutes: number; quality: number }[]
): { avgDuration: number; avgQuality: number } {
  const last7 = getLast7Days()
  const recent = entries.filter((e) => last7.includes(e.date))
  if (recent.length === 0) return { avgDuration: 0, avgQuality: 0 }
  const avgDuration = Math.round(recent.reduce((s, e) => s + e.durationMinutes, 0) / recent.length)
  const avgQuality = Math.round((recent.reduce((s, e) => s + e.quality, 0) / recent.length) * 10) / 10
  return { avgDuration, avgQuality }
}
