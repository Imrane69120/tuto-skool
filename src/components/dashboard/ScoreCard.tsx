import { Card } from '@/components/ui/Card'

interface ScoreCardProps {
  label: string
  value: number
  max: number
  icon?: string
}

export function ScoreCard({ label, value, max, icon }: ScoreCardProps) {
  const pct = (value / max) * 100
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#AAAAAA]">
          {icon && <span className="mr-1">{icon}</span>}
          {label}
        </span>
        <span className="text-xl font-bold text-white">
          {value}
          <span className="text-sm text-[#AAAAAA] font-normal">/{max}</span>
        </span>
      </div>
      <div className="h-1.5 bg-[#333333] rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </Card>
  )
}
