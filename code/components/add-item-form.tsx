"use client"

import type React from "react"

import { useState } from "react"
import type { ChecklistCategory } from "@/types/checklist"
import { Plus } from "lucide-react"

interface AddItemFormProps {
  onAdd: (text: string, category: ChecklistCategory) => void
}

const categories: ChecklistCategory[] = [
  "Funcionalidade",
  "Usabilidade",
  "Desempenho",
  "Segurança",
  "Manutenibilidade",
  "Compatibilidade",
  "Testabilidade",
]

export function AddItemForm({ onAdd }: AddItemFormProps) {
  const [text, setText] = useState("")
  const [category, setCategory] = useState<ChecklistCategory>("Funcionalidade")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim(), category)
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center gap-2 border-t border-white/5 pt-4">
        <Plus className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-foreground">Adicionar item personalizado</h3>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Descrição do item (ex: Logs implementados)"
          className="flex-1 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ChecklistCategory)}
          className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-blue-700"
        >
          Adicionar
        </button>
      </div>
    </form>
  )
}
