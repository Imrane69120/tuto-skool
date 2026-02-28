'use client'

import { useDashboard } from '@/hooks/useDashboard'
import { useSleep } from '@/hooks/useSleep'
import { Card } from '@/components/ui/Card'
import { formatDate, formatDuration, getLast7Days } from '@/lib/formatDate'
import { BarChart2 } from 'lucide-react'

function avg(arr: number[]): number {
  if (arr.length === 0) return 0
  return Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10
}

export default function StatsPage() {
  const { entries: dailyEntries } = useDashboard()
  const { entries: sleepEntries } = useSleep()

  const last7 = getLast7Days()

  const recentDaily = dailyEntries.filter((e) => last7.includes(e.date))
  const recentSleep = sleepEntries.filter((e) => last7.includes(e.date))

  const avgProductivity = avg(recentDaily.map((e) => e.productivity))
  const avgEnergy = avg(recentDaily.map((e) => e.energy))
  const avgFocus = avg(recentDaily.map((e) => e.focus))
  const avgMood = avg(recentDaily.map((e) => e.mood))
  const avgSleepDuration = avg(recentSleep.map((e) => e.durationMinutes))
  const avgSleepQuality = avg(recentSleep.map((e) => e.quality))

  const hasData = recentDaily.length > 0 || recentSleep.length > 0

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Statistiques</h1>
        <p className="text-[#AAAAAA] text-sm mt-1">Moyennes sur les 7 derniers jours</p>
      </div>

      {!hasData ? (
        <Card className="text-center py-12">
          <BarChart2 size={32} className="mx-auto mb-3 text-[#AAAAAA]" />
          <p className="text-[#AAAAAA]">Pas encore de données à afficher</p>
          <p className="text-[#555555] text-sm mt-1">Commence à remplir ton dashboard et ton sommeil</p>
        </Card>
      ) : (
        <>
          {recentDaily.length > 0 && (
            <section className="mb-6">
              <h2 className="text-white font-semibold mb-3">Productivité (7j)</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <StatCard label="Productivité moy." value={avgProductivity} max={10} />
                <StatCard label="Énergie moy." value={avgEnergy} max={10} />
                <StatCard label="Focus moy." value={avgFocus} max={10} />
                <StatCard label="Humeur moy." value={avgMood} max={5} />
              </div>
              <div className="flex flex-col gap-2">
                {recentDaily
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((e) => (
                    <Card key={e.id} className="flex items-center justify-between py-2">
                      <span className="text-[#AAAAAA] text-sm">{formatDate(e.date)}</span>
                      <div className="flex gap-3 text-xs text-white">
                        <span>⚡{e.productivity}</span>
                        <span>🔋{e.energy}</span>
                        <span>🎯{e.focus}</span>
                        <span>😊{e.mood}</span>
                      </div>
                    </Card>
                  ))}
              </div>
            </section>
          )}

          {recentSleep.length > 0 && (
            <section>
              <h2 className="text-white font-semibold mb-3">Sommeil (7j)</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Card className="text-center">
                  <p className="text-2xl font-bold text-white">{formatDuration(avgSleepDuration)}</p>
                  <p className="text-xs text-[#AAAAAA] mt-1">Durée moy.</p>
                </Card>
                <Card className="text-center">
                  <p className="text-2xl font-bold text-white">{avgSleepQuality}<span className="text-sm text-[#AAAAAA] font-normal">/5</span></p>
                  <p className="text-xs text-[#AAAAAA] mt-1">Qualité moy.</p>
                </Card>
              </div>
              <div className="flex flex-col gap-2">
                {recentSleep
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((e) => (
                    <Card key={e.id} className="flex items-center justify-between py-2">
                      <span className="text-[#AAAAAA] text-sm">{formatDate(e.date)}</span>
                      <div className="flex gap-3 text-sm text-white">
                        <span>{formatDuration(e.durationMinutes)}</span>
                        <span>{'★'.repeat(e.quality)}{'☆'.repeat(5 - e.quality)}</span>
                      </div>
                    </Card>
                  ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

function StatCard({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-[#AAAAAA]">{label}</span>
        <span className="text-lg font-bold text-white">{value}<span className="text-xs text-[#AAAAAA] font-normal">/{max}</span></span>
      </div>
      <div className="h-1 bg-[#333333] rounded-full overflow-hidden">
        <div className="h-full bg-white rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </Card>
  )
}
