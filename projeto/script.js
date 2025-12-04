// Dados iniciais expandidos
const defaultChecklist = [
  {
    id: 1,
    category: "Funcionalidade",
    text: "Todos os requisitos funcionais foram implementados",
    status: null,
    note: "",
  },
  {
    id: 2,
    category: "Funcionalidade",
    text: "Validação de entrada de dados funciona corretamente",
    status: null,
    note: "",
  },
  {
    id: 3,
    category: "Funcionalidade",
    text: "Tratamento de erros está implementado adequadamente",
    status: null,
    note: "",
  },

  { id: 4, category: "Usabilidade", text: "Interface é intuitiva e fácil de usar", status: null, note: "" },
  {
    id: 5,
    category: "Usabilidade",
    text: "Design é responsivo e funciona em diferentes dispositivos",
    status: null,
    note: "",
  },
  { id: 6, category: "Usabilidade", text: "Mensagens de feedback são claras e úteis", status: null, note: "" },

  { id: 7, category: "Desempenho", text: "Tempo de carregamento é aceitável (< 3 segundos)", status: null, note: "" },
  { id: 8, category: "Desempenho", text: "Aplicação responde rapidamente às ações do usuário", status: null, note: "" },
  {
    id: 9,
    category: "Desempenho",
    text: "Otimização de recursos (memória, CPU) foi realizada",
    status: null,
    note: "",
  },

  { id: 10, category: "Segurança", text: "Autenticação e autorização estão implementadas", status: null, note: "" },
  { id: 11, category: "Segurança", text: "Dados sensíveis são criptografados", status: null, note: "" },
  {
    id: 12,
    category: "Segurança",
    text: "Proteção contra vulnerabilidades comuns (SQL injection, XSS)",
    status: null,
    note: "",
  },

  { id: 13, category: "Manutenibilidade", text: "Código está documentado adequadamente", status: null, note: "" },
  { id: 14, category: "Manutenibilidade", text: "Código segue padrões e boas práticas", status: null, note: "" },
  { id: 15, category: "Manutenibilidade", text: "Arquitetura é modular e fácil de modificar", status: null, note: "" },

  {
    id: 16,
    category: "Compatibilidade",
    text: "Funciona nos principais navegadores (Chrome, Firefox, Safari)",
    status: null,
    note: "",
  },
  {
    id: 17,
    category: "Compatibilidade",
    text: "Compatível com diferentes sistemas operacionais",
    status: null,
    note: "",
  },

  { id: 18, category: "Testabilidade", text: "Testes unitários foram implementados", status: null, note: "" },
  { id: 19, category: "Testabilidade", text: "Testes de integração foram realizados", status: null, note: "" },
  { id: 20, category: "Testabilidade", text: "Cobertura de testes é adequada (> 70%)", status: null, note: "" },
]

const categoryIcons = {
  Funcionalidade: "🎯",
  Usabilidade: "👤",
  Desempenho: "⚡",
  Segurança: "🔒",
  Manutenibilidade: "🔧",
  Compatibilidade: "💻",
  Testabilidade: "🧪",
}

let checklist = []
let currentFilter = "all"
let searchTerm = ""
const STORAGE_KEY = "checklist_qualidade_v2"

// Elementos do DOM
const listContainer = document.getElementById("listContainer")
const statusPercent = document.getElementById("statusPercent")
const progressBar = document.getElementById("progressBar")
const totalItemsEl = document.getElementById("totalItems")
const conformesEl = document.getElementById("conformes")
const naoConformesEl = document.getElementById("naoConformes")
const pendentesEl = document.getElementById("pendentes")
const categoryProgressEl = document.getElementById("categoryProgress")
const addItemBtn = document.getElementById("addItemBtn")
const newItemText = document.getElementById("newItemText")
const newItemCategory = document.getElementById("newItemCategory")
const saveBtn = document.getElementById("saveBtn")
const reportBtn = document.getElementById("reportBtn")
const exportBtn = document.getElementById("exportBtn")
const importBtn = document.getElementById("importBtn")
const resetBtn = document.getElementById("resetBtn")
const searchInput = document.getElementById("searchInput")
const filterButtons = document.querySelectorAll(".filter-btn")
const modal = document.getElementById("modal")
const closeModal = document.getElementById("closeModal")
const modalBody = document.getElementById("modalBody")
const copyReport = document.getElementById("copyReport")
const downloadReport = document.getElementById("downloadReport")

// Inicializar
function init() {
  load()
  setupEventListeners()
}

// Setup event listeners
function setupEventListeners() {
  addItemBtn.addEventListener("click", addNewItem)
  saveBtn.addEventListener("click", save)
  reportBtn.addEventListener("click", showReport)
  exportBtn.addEventListener("click", exportData)
  importBtn.addEventListener("click", importData)
  resetBtn.addEventListener("click", resetChecklist)
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.toLowerCase()
    render()
  })

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      currentFilter = btn.dataset.filter
      render()
    })
  })

  closeModal.addEventListener("click", () => modal.classList.add("hidden"))
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden")
  })

  copyReport.addEventListener("click", copyReportToClipboard)
  downloadReport.addEventListener("click", downloadReportFile)

  newItemText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addNewItem()
  })
}

// Carregar do localStorage
function load() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      checklist = JSON.parse(raw)
    } catch {
      checklist = JSON.parse(JSON.stringify(defaultChecklist))
    }
  } else {
    checklist = JSON.parse(JSON.stringify(defaultChecklist))
  }
  render()
}

// Salvar no localStorage
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist))
  showToast("✓ Checklist salvo com sucesso!")
}

// Auto-save
function autoSave() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist))
}

// Filtrar itens
function getFilteredItems() {
  return checklist.filter((item) => {
    const matchesFilter = currentFilter === "all" || item.status === currentFilter
    const matchesSearch =
      !searchTerm || item.text.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm)
    return matchesFilter && matchesSearch
  })
}

// Renderizar interface
function render() {
  const filteredItems = getFilteredItems()
  listContainer.innerHTML = ""

  const categorias = {}
  filteredItems.forEach((item) => {
    if (!categorias[item.category]) categorias[item.category] = []
    categorias[item.category].push(item)
  })

  for (const categoria in categorias) {
    const section = document.createElement("div")
    section.classList.add("category")

    const icon = categoryIcons[categoria] || "📋"
    const items = categorias[categoria]

    section.innerHTML = `
      <div class="category-header">
        <div class="category-title">
          <span>${icon}</span>
          <span>${categoria}</span>
        </div>
        <span class="category-badge">${items.length} ${items.length === 1 ? "item" : "itens"}</span>
      </div>
    `

    items.forEach((item) => {
      const div = document.createElement("div")
      div.classList.add("item")

      if (item.status === "ok") div.classList.add("status-ok")
      else if (item.status === "bad") div.classList.add("status-bad")

      div.innerHTML = `
        <div class="item-content">
          <div class="item-text">${escapeHtml(item.text)}</div>
          <div class="item-controls">
            <button class="btn ${item.status === "ok" ? "btn-primary" : "btn-secondary"}" onclick="updateStatus(${item.id}, 'ok')">✓ Conforme</button>
            <button class="btn ${item.status === "bad" ? "btn-danger" : "btn-secondary"}" onclick="updateStatus(${item.id}, 'bad')">✗ Não conforme</button>
            <button class="btn btn-secondary" onclick="updateStatus(${item.id}, null)">⏳ Pendente</button>
            <button class="btn btn-secondary" onclick="removeItem(${item.id})">🗑️</button>
          </div>
        </div>
        <div class="item-note">
          <textarea placeholder="💬 Adicionar observações..." onchange="updateNote(${item.id}, this.value)">${escapeHtml(item.note || "")}</textarea>
        </div>
      `

      section.appendChild(div)
    })

    listContainer.appendChild(section)
  }

  if (filteredItems.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
        <p style="font-size: 48px; margin-bottom: 16px;">🔍</p>
        <p>Nenhum item encontrado</p>
      </div>
    `
  }

  updateSummary()
}

// Atualizar resumo
function updateSummary() {
  const total = checklist.length
  const conformes = checklist.filter((i) => i.status === "ok").length
  const naoConformes = checklist.filter((i) => i.status === "bad").length
  const pendentes = checklist.filter((i) => i.status === null).length
  const percent = total ? Math.round((conformes / total) * 100) : 0

  totalItemsEl.textContent = total
  conformesEl.textContent = conformes
  naoConformesEl.textContent = naoConformes
  pendentesEl.textContent = pendentes
  statusPercent.textContent = percent + "%"
  progressBar.style.width = percent + "%"

  updateCategoryProgress()
}

// Atualizar progresso por categoria
function updateCategoryProgress() {
  const categories = {}

  checklist.forEach((item) => {
    if (!categories[item.category]) {
      categories[item.category] = { total: 0, conformes: 0 }
    }
    categories[item.category].total++
    if (item.status === "ok") categories[item.category].conformes++
  })

  categoryProgressEl.innerHTML = "<h4 style='margin-bottom: 12px; font-size: 14px;'>📊 Progresso por Categoria</h4>"

  for (const cat in categories) {
    const { total, conformes } = categories[cat]
    const percent = total ? Math.round((conformes / total) * 100) : 0
    const icon = categoryIcons[cat] || "📋"

    const div = document.createElement("div")
    div.classList.add("category-stat")
    div.innerHTML = `
      <span class="category-stat-name">${icon} ${cat}</span>
      <div class="category-stat-bar">
        <div class="category-stat-fill" style="width: ${percent}%"></div>
      </div>
      <span class="category-stat-value">${percent}%</span>
    `
    categoryProgressEl.appendChild(div)
  }
}

// Atualizar status
function updateStatus(id, status) {
  const item = checklist.find((i) => i.id === id)
  if (item) {
    item.status = status
    render()
    autoSave()
  }
}

// Atualizar nota
function updateNote(id, note) {
  const item = checklist.find((i) => i.id === id)
  if (item) {
    item.note = note
    autoSave()
  }
}

// Remover item
function removeItem(id) {
  if (confirm("Tem certeza que deseja remover este item?")) {
    checklist = checklist.filter((i) => i.id !== id)
    render()
    autoSave()
    showToast("Item removido com sucesso")
  }
}

// Adicionar novo item
function addNewItem() {
  const text = newItemText.value.trim()
  const category = newItemCategory.value

  if (!text) {
    showToast("⚠️ Digite a descrição do item!")
    return
  }

  checklist.push({
    id: Date.now(),
    category,
    text,
    status: null,
    note: "",
  })

  newItemText.value = ""
  render()
  autoSave()
  showToast("✓ Item adicionado com sucesso!")
}

// Resetar checklist
function resetChecklist() {
  if (confirm("⚠️ Tem certeza que deseja resetar todo o checklist? Esta ação não pode ser desfeita.")) {
    checklist = JSON.parse(JSON.stringify(defaultChecklist))
    render()
    autoSave()
    showToast("Checklist resetado com sucesso")
  }
}

// Gerar relatório
function showReport() {
  const total = checklist.length
  const conformes = checklist.filter((i) => i.status === "ok").length
  const naoConformes = checklist.filter((i) => i.status === "bad").length
  const pendentes = checklist.filter((i) => i.status === null).length
  const percent = total ? Math.round((conformes / total) * 100) : 0

  let report = `═══════════════════════════════════════════════════════
   RELATÓRIO DE QUALIDADE DE SOFTWARE
═══════════════════════════════════════════════════════

📊 RESUMO GERAL
─────────────────────────────────────────────────────
• Status: ${percent}% completo
• Total de itens: ${total}
• ✓ Conformes: ${conformes}
• ✗ Não conformes: ${naoConformes}
• ⏳ Pendentes: ${pendentes}

`

  const categories = {}
  checklist.forEach((item) => {
    if (!categories[item.category]) categories[item.category] = []
    categories[item.category].push(item)
  })

  for (const cat in categories) {
    const items = categories[cat]
    const icon = categoryIcons[cat] || "📋"
    report += `\n${icon} ${cat.toUpperCase()}\n${"─".repeat(55)}\n`

    items.forEach((item, index) => {
      const statusIcon = item.status === "ok" ? "✓" : item.status === "bad" ? "✗" : "⏳"
      const statusText = item.status === "ok" ? "Conforme" : item.status === "bad" ? "Não conforme" : "Pendente"
      report += `${index + 1}. ${item.text}\n   Status: ${statusIcon} ${statusText}\n`
      if (item.note) {
        report += `   Observação: ${item.note}\n`
      }
      report += "\n"
    })
  }

  report += `\n═══════════════════════════════════════════════════════
Relatório gerado em: ${new Date().toLocaleString("pt-BR")}
═══════════════════════════════════════════════════════`

  modalBody.textContent = report
  modal.classList.remove("hidden")
}

// Copiar relatório
function copyReportToClipboard() {
  const text = modalBody.textContent
  navigator.clipboard.writeText(text).then(() => {
    showToast("✓ Relatório copiado para a área de transferência!")
  })
}

// Download relatório
function downloadReportFile() {
  const text = modalBody.textContent
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = `relatorio-qualidade-${Date.now()}.txt`
  a.click()
  showToast("✓ Relatório baixado com sucesso!")
}

// Exportar dados
function exportData() {
  const blob = new Blob([JSON.stringify(checklist, null, 2)], { type: "application/json" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = `checklist-qualidade-${Date.now()}.json`
  a.click()
  showToast("✓ Dados exportados com sucesso!")
}

// Importar dados
function importData() {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = "application/json"
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        checklist = JSON.parse(reader.result)
        render()
        autoSave()
        showToast("✓ Checklist importado com sucesso!")
      } catch {
        showToast("⚠️ Erro ao importar arquivo. Verifique o formato.")
      }
    }
    reader.readAsText(file)
  }
  input.click()
}

// Escapar HTML
function escapeHtml(unsafe = "") {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// Mostrar toast
function showToast(msg) {
  const toast = document.createElement("div")
  toast.classList.add("toast")
  toast.textContent = msg
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 3000)
}

// Inicializar app
init()
