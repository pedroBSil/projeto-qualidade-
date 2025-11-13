# Checklist de Qualidade de Software

Uma aplicação moderna e interativa para avaliar a qualidade de software, construída com Next.js 16, React 19 e TypeScript.

## Funcionalidades

- **Interface Moderna**: Design dark elegante com gradientes e animações suaves
- **Categorias Completas**: 7 categorias cobrindo todos os aspectos de qualidade
  - Funcionalidade
  - Usabilidade
  - Desempenho
  - Segurança
  - Manutenibilidade
  - Compatibilidade
  - Testabilidade
- **Sistema de Avaliação**: Marque itens como Conforme, Não Conforme ou N/A
- **Notas e Comentários**: Adicione observações detalhadas a cada item
- **Filtros e Busca**: Encontre rapidamente itens específicos
- **Progresso Visual**: Acompanhe o progresso geral e por categoria
- **Exportação/Importação**: Salve e compartilhe checklists em JSON
- **Relatórios**: Gere relatórios formatados em texto
- **Auto-save**: Dados salvos automaticamente no localStorage
- **Itens Personalizados**: Adicione seus próprios critérios de avaliação
- **Totalmente Responsivo**: Funciona perfeitamente em mobile e desktop

## Tecnologias Utilizadas

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19.2 com TypeScript
- **Estilização**: Tailwind CSS v4
- **Componentes**: shadcn/ui + Radix UI
- **Ícones**: Lucide React
- **Análise**: Vercel Analytics

## Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm, yarn ou pnpm

### Passos

1. Clone ou baixe este projeto
2. Instale as dependências:

\`\`\`bash
npm install
# ou
yarn install
# ou
pnpm install
\`\`\`

3. Execute o servidor de desenvolvimento:

\`\`\`bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
\`\`\`

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## Estrutura do Projeto

\`\`\`
├── app/
│   ├── layout.tsx          # Layout raiz da aplicação
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globais e tema
├── components/
│   ├── actions-toolbar.tsx # Barra de ações (exportar, importar, etc)
│   ├── add-item-form.tsx   # Formulário para adicionar itens
│   ├── category-section.tsx # Seção de categoria com itens
│   ├── checklist-item.tsx  # Item individual do checklist
│   ├── filter-bar.tsx      # Barra de filtros e busca
│   ├── summary-card.tsx    # Card com resumo e progresso
│   └── ui/                 # Componentes UI do shadcn
├── hooks/
│   └── use-checklist.ts    # Hook customizado para gerenciar estado
├── lib/
│   ├── checklist-data.ts   # Dados padrão e configurações
│   └── utils.ts            # Funções utilitárias
├── types/
│   └── checklist.ts        # Definições de tipos TypeScript
└── public/                 # Arquivos estáticos
\`\`\`

## Como Usar

### Avaliar Itens

1. Clique no ícone ✓ para marcar como **Conforme**
2. Clique no ícone ✗ para marcar como **Não Conforme**
3. Clique em **N/A** para itens não aplicáveis

### Adicionar Notas

1. Clique no ícone de mensagem 💬 em qualquer item
2. Digite suas observações
3. Clique em **Salvar**

### Filtrar e Buscar

- Use a barra de busca para encontrar itens específicos
- Selecione uma categoria para ver apenas itens daquela categoria

### Adicionar Itens Personalizados

1. Role até o final da página
2. Digite a descrição do item
3. Selecione a categoria
4. Clique em **Adicionar**

### Exportar/Importar

- **Gerar Relatório**: Exporta um relatório formatado em .txt
- **Exportar JSON**: Salva o checklist completo em JSON
- **Importar**: Carrega um checklist salvo anteriormente

### Reset

- Clique em **Reset** para restaurar o checklist para o estado padrão
- **ATENÇÃO**: Esta ação não pode ser desfeita!

## Personalização

### Adicionar Novas Categorias

Edite `lib/checklist-data.ts` e adicione novos itens ao array `defaultChecklist`:

\`\`\`typescript
{
  id: 21,
  category: "NovaCategoria",
  text: "Descrição do critério",
  status: null,
  order: 20
}
\`\`\`

Adicione também a cor e ícone:

\`\`\`typescript
export const categoryColors = {
  NovaCategoria: "from-indigo-500 to-indigo-600",
  // ...
}

export const categoryIcons = {
  NovaCategoria: "🎯",
  // ...
}
\`\`\`

### Modificar Cores do Tema

Edite as variáveis CSS em `app/globals.css`:

\`\`\`css
@theme inline {
  --background: oklch(0.13 0 0);
  --foreground: oklch(0.98 0 0);
  /* ... */
}
\`\`\`

## Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Importe o projeto no [Vercel](https://vercel.com)
3. Deploy automático!

### Outras Plataformas

\`\`\`bash
npm run build
npm start
\`\`\`

## Contribuindo

Sinta-se à vontade para abrir issues e pull requests com melhorias!

## Licença

MIT - Use livremente para projetos pessoais ou comerciais.

## Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

---

Desenvolvido com ♥ usando v0 e Next.js
