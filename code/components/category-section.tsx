"use client"

import type { ChecklistItem } from "@/types/checklist"
import { ChecklistItemComponent } from "./checklist-item"
import { categoryColors, categoryIcons } from "@/lib/checklist-data"
import type { CheckStatus } from "@/types/checklist"

interface CategorySectionProps {
  category: string
  items: ChecklistItem[]
  onUpdateStatus: (id: number, status: CheckStatus) => void
  onUpdateNotes: (id: number, notes: string) => void
  onRemove: (id: number) => void
}

export function CategorySection({ category, items, onUpdateStatus, onUpdateNotes, onRemove }: CategorySectionProps) {
  const total = items.length
  const conformes = items.filter((i) => i.status === "ok").length
  const progress = total > 0 ? (conformes / total) * 100 : 0

  const colorClass = categoryColors[category as keyof typeof categoryColors] || "from-gray-500 to-gray-600"
  const icon = categoryIcons[category as keyof typeof categoryIcons] || "📋"

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <h3 className="text-sm font-semibold text-foreground">{category}</h3>
          <span className="text-xs text-muted-foreground">
            ({conformes}/{total})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/5">
            <div
              className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <ChecklistItemComponent
            key={item.id}
            item={item}
            onUpdateStatus={onUpdateStatus}
            onUpdateNotes={onUpdateNotes}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  )
}
