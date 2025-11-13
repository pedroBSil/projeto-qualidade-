"use client"

import { useState } from "react"
import type { ChecklistItem, CheckStatus } from "@/types/checklist"
import { Check, X, MessageSquare, Trash2 } from "lucide-react"

interface ChecklistItemProps {
  item: ChecklistItem
  onUpdateStatus: (id: number, status: CheckStatus) => void
  onUpdateNotes: (id: number, notes: string) => void
  onRemove: (id: number) => void
}

export function ChecklistItemComponent({ item, onUpdateStatus, onUpdateNotes, onRemove }: ChecklistItemProps) {
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState(item.notes || "")

  const handleSaveNotes = () => {
    onUpdateNotes(item.id, notes)
    setShowNotes(false)
  }

  const getStatusColor = () => {
    if (item.status === "ok") return "border-l-green-500 bg-green-500/5"
    if (item.status === "bad") return "border-l-red-500 bg-red-500/5"
    return "border-l-transparent"
  }

  return (
    <div
      className={`group rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04] ${getStatusColor()} border-l-4`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-foreground">{item.text}</p>
          {item.notes && !showNotes && <p className="mt-2 text-xs text-muted-foreground italic">💬 {item.notes}</p>}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onUpdateStatus(item.id, "ok")}
            className={`rounded-md p-1.5 transition-all hover:bg-green-500/20 ${
              item.status === "ok" ? "bg-green-500/20 text-green-400" : "text-muted-foreground"
            }`}
            title="Conforme"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            onClick={() => onUpdateStatus(item.id, "bad")}
            className={`rounded-md p-1.5 transition-all hover:bg-red-500/20 ${
              item.status === "bad" ? "bg-red-500/20 text-red-400" : "text-muted-foreground"
            }`}
            title="Não conforme"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            onClick={() => onUpdateStatus(item.id, null)}
            className={`rounded-md px-2 py-1.5 text-xs transition-all hover:bg-white/10 ${
              item.status === null ? "bg-white/10 text-muted-foreground" : "text-muted-foreground"
            }`}
            title="N/A"
          >
            N/A
          </button>
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`rounded-md p-1.5 transition-all hover:bg-blue-500/20 ${
              item.notes ? "text-blue-400" : "text-muted-foreground"
            }`}
            title="Adicionar nota"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-red-500/20 hover:text-red-400 group-hover:opacity-100"
            title="Excluir"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showNotes && (
        <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-1">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Adicione observações sobre este item..."
            className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowNotes(false)}
              className="rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/5"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveNotes}
              className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
