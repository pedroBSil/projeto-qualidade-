import type { ChecklistItem } from "@/types/checklist"

export const defaultChecklist: ChecklistItem[] = [
  { id: 1, category: "Funcionalidade", text: "Requisitos funcionais implementados", status: null, order: 0 },
  { id: 2, category: "Funcionalidade", text: "Validações de entrada implementadas", status: null, order: 1 },
  { id: 3, category: "Funcionalidade", text: "Tratamento de erros adequado", status: null, order: 2 },
  { id: 4, category: "Usabilidade", text: "Interface intuitiva e responsiva", status: null, order: 3 },
  { id: 5, category: "Usabilidade", text: "Mensagens de erro claras", status: null, order: 4 },
  { id: 6, category: "Usabilidade", text: "Acessibilidade (WCAG) implementada", status: null, order: 5 },
  { id: 7, category: "Desempenho", text: "Tempo de resposta aceitável (<3s)", status: null, order: 6 },
  { id: 8, category: "Desempenho", text: "Otimização de consultas ao banco", status: null, order: 7 },
  { id: 9, category: "Desempenho", text: "Caching implementado onde necessário", status: null, order: 8 },
  { id: 10, category: "Segurança", text: "Autenticação e autorização aplicadas", status: null, order: 9 },
  { id: 11, category: "Segurança", text: "Proteção contra CSRF/XSS", status: null, order: 10 },
  { id: 12, category: "Segurança", text: "Dados sensíveis criptografados", status: null, order: 11 },
  { id: 13, category: "Manutenibilidade", text: "Código documentado e modular", status: null, order: 12 },
  { id: 14, category: "Manutenibilidade", text: "Padrões de código seguidos", status: null, order: 13 },
  { id: 15, category: "Manutenibilidade", text: "Logs implementados adequadamente", status: null, order: 14 },
  { id: 16, category: "Compatibilidade", text: "Suporte a diferentes navegadores", status: null, order: 15 },
  { id: 17, category: "Compatibilidade", text: "Responsivo em diferentes dispositivos", status: null, order: 16 },
  { id: 18, category: "Testabilidade", text: "Testes unitários implementados", status: null, order: 17 },
  { id: 19, category: "Testabilidade", text: "Testes de integração implementados", status: null, order: 18 },
  { id: 20, category: "Testabilidade", text: "Cobertura de testes adequada (>80%)", status: null, order: 19 },
]

export const categoryColors = {
  Funcionalidade: "from-blue-500 to-blue-600",
  Usabilidade: "from-purple-500 to-purple-600",
  Desempenho: "from-orange-500 to-orange-600",
  Segurança: "from-red-500 to-red-600",
  Manutenibilidade: "from-green-500 to-green-600",
  Compatibilidade: "from-cyan-500 to-cyan-600",
  Testabilidade: "from-pink-500 to-pink-600",
}

export const categoryIcons = {
  Funcionalidade: "⚙️",
  Usabilidade: "👤",
  Desempenho: "⚡",
  Segurança: "🔒",
  Manutenibilidade: "🔧",
  Compatibilidade: "🌐",
  Testabilidade: "🧪",
}
