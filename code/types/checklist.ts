export type CheckStatus = "ok" | "bad" | null

export type ChecklistCategory =
  | "Funcionalidade"
  | "Usabilidade"
  | "Desempenho"
  | "Segurança"
  | "Manutenibilidade"
  | "Compatibilidade"
  | "Testabilidade"

export interface ChecklistItem {
  id: number
  category: ChecklistCategory
  text: string
  status: CheckStatus
  notes?: string
  order?: number
  updatedAt?: string
}

export interface ChecklistHistory {
  id: number
  itemId: number
  action: string
  timestamp: string
}
