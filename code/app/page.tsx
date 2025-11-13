"use client"

import { useMemo, useState } from "react"
import { useChecklist } from "@/hooks/use-checklist"
import { CategorySection } from "@/components/category-section"
import { SummaryCard } from "@/components/summary-card"
import { AddItemForm } from "@/components/add-item-form"
import { ActionsToolbar } from "@/components/actions-toolbar"
import { FilterBar } from "@/components/filter-bar"
import { ClipboardCheck } from "lucide-react"

export default function Home() {
  const { items, updateStatus, updateNotes, addItem, removeItem, reset, importData, isLoaded } = useChecklist()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.text.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [items, searchQuery, selectedCategory])

  const categories = useMemo(() => {
    return Array.from(new Set(items.map((item) => item.category))).sort()
  }, [items])

  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof filteredItems> = {}
    filteredItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })
    return groups
  }, [filteredItems])

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto" />
          <p className="mt-4 text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-2.5">
              <ClipboardCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Checklist de Qualidade de Software</h1>
              <p className="text-sm text-muted-foreground">
                Avalie funcionalidades, usabilidade, desempenho, segurança e mais
              </p>
            </div>
          </div>
          <ActionsToolbar items={items} onImport={importData} onReset={reset} />
        </header>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Checklist */}
          <div className="space-y-6">
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
            />

            <div className="space-y-6">
              {Object.entries(groupedItems).map(([category, categoryItems]) => (
                <CategorySection
                  key={category}
                  category={category}
                  items={categoryItems}
                  onUpdateStatus={updateStatus}
                  onUpdateNotes={updateNotes}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <AddItemForm onAdd={addItem} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <SummaryCard items={items} />

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">💡 Importante</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Os dados são salvos automaticamente no seu navegador (localStorage). Use Exportar/Importar para
                compartilhar ou fazer backup do seu checklist.
              </p>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-5">
              <h3 className="mb-2 text-sm font-semibold text-amber-400">📌 Dicas</h3>
              <ul className="space-y-2 text-xs text-amber-400/80">
                <li>• Adicione notas aos itens para contexto adicional</li>
                <li>• Exporte regularmente para backup</li>
                <li>• Use filtros para focar em categorias específicas</li>
                <li>• Gere relatórios para documentação</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-muted-foreground">
          Desenvolvido com ♥ — Template interativo para avaliação de qualidade de software
        </footer>
      </div>
    </div>
  )
}
