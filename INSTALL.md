# Guia de Instalação Rápida

## Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

## Passos de Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar banco de dados:**
```bash
npx prisma generate
npx prisma db push
```

3. **Iniciar servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acessar o site:**
Abra [http://localhost:3000](http://localhost:3000) no navegador

## Estrutura de Arquivos Principais

- `app/` - Páginas e rotas do Next.js
- `components/` - Componentes React reutilizáveis
- `lib/` - Utilitários e helpers
- `prisma/` - Schema e configuração do banco de dados
- `public/` - Arquivos estáticos

## Comandos Úteis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter
- `npm run db:studio` - Abre Prisma Studio (interface visual do banco)

## Configuração Opcional

Para usar APIs reais de IA (em vez de simulações), crie um arquivo `.env.local`:

```env
OPENAI_API_KEY=sua-chave-aqui
DATABASE_URL="file:./prisma/dev.db"
```

## Troubleshooting

### Erro ao gerar Prisma Client
```bash
npx prisma generate
```

### Erro de módulos não encontrados
```bash
rm -rf node_modules package-lock.json
npm install
```

### Porta 3000 já em uso
Altere a porta no comando:
```bash
PORT=3001 npm run dev
```

## Próximos Passos

1. Explore as diferentes seções do site
2. Teste o demo interativo de chat
3. Veja os exemplos de código
4. Experimente a calculadora de custos
5. Explore os diferentes provedores de IA

