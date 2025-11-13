"use client"

import { useState, useEffect } from "react"
import type { ChecklistItem, CheckStatus } from "@/types/checklist"
import { defaultChecklist } from "@/lib/checklist-data"

const STORAGE_KEY = "checklist_qualidade_v2"

export function useChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch {
        setItems([...defaultChecklist])
      }
    } else {
      setItems([...defaultChecklist])
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isLoaded])

  const updateStatus = (id: number, status: CheckStatus) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item)),
    )
  }

  const updateNotes = (id: number, notes: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes, updatedAt: new Date().toISOString() } : item)),
    )
  }

  const addItem = (text: string, category: ChecklistItem["category"]) => {
    const newItem: ChecklistItem = {
      id: Date.now(),
      category,
      text,
      status: null,
      order: items.length,
      updatedAt: new Date().toISOString(),
    }
    setItems((prev) => [...prev, newItem])
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const reset = () => {
    setItems([...defaultChecklist])
  }

  const importData = (data: ChecklistItem[]) => {
    setItems(data)
  }

  return {
    items,
    updateStatus,
    updateNotes,
    addItem,
    removeItem,
    reset,
    importData,
    isLoaded,
  }
}
