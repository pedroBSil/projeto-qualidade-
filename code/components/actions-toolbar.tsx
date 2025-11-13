"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { ChecklistItem } from "@/types/checklist"
import { Download, Upload, RotateCcw, FileText, AlertCircle } from "lucide-react"

interface ActionsToolbarProps {
  items: ChecklistItem[]
  onImport: (data: ChecklistItem[]) => void
  onReset: () => void
}

export function ActionsToolbar({ items, onImport, onReset }: ActionsToolbarProps) {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toast = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(items, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `checklist-qualidade-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast("✅ Checklist exportado com sucesso!")
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        onImport(data)
        toast("✅ Checklist importado com sucesso!")
      } catch {
        toast("❌ Erro ao importar arquivo")
      }
    }
    reader.readAsText(file)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleGenerateReport = () => {
    const total = items.length
    const conformes = items.filter((i) => i.status === "ok").length
    const naoConformes = items.filter((i) => i.status === "bad").length
    const progress = total > 0 ? Math.round((conformes / total) * 100) : 0

    let report = "═══════════════════════════════════════\n"
    report += "     RELATÓRIO DE QUALIDADE DE SOFTWARE\n"
    report += "═══════════════════════════════════════\n\n"
    report += `📊 Status Geral: ${progress}%\n`
    report += `📝 Total de itens: ${total}\n`
    report += `✅ Conformes: ${conformes}\n`
    report += `❌ Não conformes: ${naoConformes}\n`
    report += `⏳ Pendentes: ${total - conformes - naoConformes}\n\n`

    const categories = Array.from(new Set(items.map((i) => i.category)))
    categories.forEach((cat) => {
      const categoryItems = items.filter((i) => i.category === cat)
      const catConformes = categoryItems.filter((i) => i.status === "ok").length
      const catProgress = Math.round((catConformes / categoryItems.length) * 100)

      report += `\n━━━ ${cat} (${catProgress}%) ━━━\n`
      categoryItems.forEach((item) => {
        const statusIcon = item.status === "ok" ? "✅" : item.status === "bad" ? "❌" : "⏳"
        report += `${statusIcon} ${item.text}\n`
        if (item.notes) {
          report += `   💬 ${item.notes}\n`
        }
      })
    })

    report += `\n\n═══════════════════════════════════════\n`
    report += `Gerado em: ${new Date().toLocaleString("pt-BR")}\n`
    report += `═══════════════════════════════════════\n`

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `relatorio-qualidade-${new Date().toISOString().split("T")[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast("📄 Relatório gerado com sucesso!")
  }

  const handleReset = () => {
    if (confirm("⚠️ Deseja realmente resetar o checklist? Esta ação não pode ser desfeita.")) {
      onReset()
      toast("🔄 Checklist resetado!")
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleGenerateReport}
          className="flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-blue-700"
        >
          <FileText className="h-4 w-4" />
          Gerar Relatório
        </button>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-white/10"
        >
          <Download className="h-4 w-4" />
          Exportar JSON
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-white/10"
        >
          <Upload className="h-4 w-4" />
          Importar
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImport} className="hidden" />

      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-gray-900 px-4 py-3 text-sm text-foreground shadow-lg">
            <AlertCircle className="h-4 w-4" />
            {toastMessage}
          </div>
        </div>
      )}
    </>
  )
}
