"use client"

import type { ChecklistItem } from "@/types/checklist"
import { CheckCircle2, XCircle, BarChart3 } from "lucide-react"

interface SummaryCardProps {
  items: ChecklistItem[]
}

export function SummaryCard({ items }: SummaryCardProps) {
  const total = items.length
  const conformes = items.filter((i) => i.status === "ok").length
  const naoConformes = items.filter((i) => i.status === "bad").length
  const pendentes = total - conformes - naoConformes
  const progress = total > 0 ? Math.round((conformes / total) * 100) : 0

  const getStatusColor = () => {
    if (progress >= 80) return "text-green-400"
    if (progress >= 50) return "text-orange-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-4 rounded-xl border border-white/5 bg-white/[0.02] p-5">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-blue-400" />
        <h2 className="text-base font-semibold text-foreground">Resumo Geral</h2>
      </div>

      <div className="space-y-3">
        <div className="text-center">
          <div className={`text-4xl font-bold ${getStatusColor()}`}>{progress}%</div>
          <p className="text-xs text-muted-foreground">Conformidade</p>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-center">
            <div className="flex justify-center">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
            </div>
            <div className="mt-1 text-xl font-bold text-green-400">{conformes}</div>
            <div className="text-xs text-green-400/70">Conformes</div>
          </div>

          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center">
            <div className="flex justify-center">
              <XCircle className="h-4 w-4 text-red-400" />
            </div>
            <div className="mt-1 text-xl font-bold text-red-400">{naoConformes}</div>
            <div className="text-xs text-red-400/70">Não conformes</div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
            <div className="flex justify-center">
              <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
            </div>
            <div className="mt-1 text-xl font-bold text-muted-foreground">{pendentes}</div>
            <div className="text-xs text-muted-foreground">Pendentes</div>
          </div>
        </div>

        <div className="space-y-1.5 border-t border-white/5 pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total de itens</span>
            <span className="font-medium text-foreground">{total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Avaliados</span>
            <span className="font-medium text-foreground">{conformes + naoConformes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
