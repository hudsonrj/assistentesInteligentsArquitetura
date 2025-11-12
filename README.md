# Site Assistentes Virtuais de IA

Site completo sobre estratégia de negócio e desenvolvimento de assistentes virtuais de inteligência artificial.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **Framer Motion** - Animações e transições
- **Recharts** - Gráficos interativos
- **Prisma** - ORM para banco de dados
- **React Syntax Highlighter** - Highlight de código

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure o banco de dados:
```bash
npx prisma generate
npx prisma db push
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse [http://localhost:3000](http://localhost:3000)

## 🏗️ Estrutura do Projeto

```
assisteentes/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── ui/               # Componentes base
│   ├── layout/           # Componentes de layout
│   └── sections/         # Seções da página
├── lib/                  # Utilitários
├── prisma/               # Schema do banco
└── public/               # Assets estáticos
```

## 📄 Seções do Site

1. **Hero** - Página inicial com estatísticas
2. **Formatos de Entrega** - Diferentes formas de disponibilizar assistentes
3. **Modelos de Cobrança** - Estratégias de monetização
4. **Provedores de IA** - Principais plataformas (LLM, STT, TTS, Telefonia)
5. **Arquitetura Técnica** - Estruturas modernas
6. **Modelos de Negócio** - Estratégias de mercado
7. **Ideias por Setor** - Aplicações específicas
8. **Simulador de Custos** - Calculadora interativa de custos
9. **Demo Interativo** - Chatbot funcional

## 🎙️ Recursos de Voz e Telefonia

Este projeto suporta assistentes virtuais com capacidades completas de voz e telefonia:

### Tipos de Assistentes Suportados

- **Assistente de Texto (Chatbot)** - Chat tradicional via texto
- **Assistente de Voz** - Interação por voz natural (STT + LLM + TTS)
- **URA Inteligente (IVR)** - Atendimento telefônico automatizado
- **Multimodal** - Texto + Voz integrados
- **Central de Atendimento** - Contact center completo com IA

### Provedores Integrados

#### Speech-to-Text (STT)
- OpenAI Whisper
- Google Cloud Speech-to-Text
- Azure Speech Services
- Amazon Transcribe
- AssemblyAI
- Deepgram

#### Text-to-Speech (TTS)
- OpenAI TTS (Standard/HD)
- Google Cloud TTS (Standard/WaveNet/Neural2)
- Azure TTS
- Amazon Polly (Standard/Neural)
- ElevenLabs (alta qualidade)
- Play.ht
- Resemble AI

#### Telefonia/VoIP
- Twilio (recomendado para URA)
- Plivo
- Vonage/Nexmo
- SignalWire
- Total Voice (Brasil)
- Bandwidth

#### Plataformas de Contact Center
- Twilio Flex
- Amazon Connect
- Genesys Cloud
- Five9
- RingCentral
- Talkdesk
- Zendesk Talk
- Zenvia (Brasil)
- Huggy (Brasil)
- Movidesk (Brasil)
- Chatwoot (Open Source)

## 📚 Documentação Técnica Completa

### Guias de Serviços
- **[VOICE_SERVICES.md](./VOICE_SERVICES.md)** - Guia completo de STT, TTS e telefonia
  - 8 provedores de Speech-to-Text
  - 13 provedores de Text-to-Speech
  - 6 provedores de telefonia/VoIP
  - Tabelas comparativas de custos
  - Exemplos de integração

- **[ASSISTANT_TYPES.md](./ASSISTANT_TYPES.md)** - Tipos de assistentes e casos de uso
  - 10 tipos diferentes de assistentes (texto, voz, URA, multimodal, etc.)
  - Casos de uso por setor
  - Arquiteturas e padrões de implementação
  - Matriz de comparação completa

- **[CONTACT_CENTER.md](./CONTACT_CENTER.md)** - Plataformas de contact center
  - 8 plataformas internacionais (Twilio Flex, Amazon Connect, Genesys, etc.)
  - 6 soluções brasileiras (Zenvia, Huggy, Movidesk, etc.)
  - Soluções open source (Asterisk, FreeSWITCH, Chatwoot)
  - Comparação completa de custos
  - Recomendações por tamanho de empresa

### Infraestrutura e Operações
- **[DATA_INFRASTRUCTURE.md](./DATA_INFRASTRUCTURE.md)** - Bancos de dados e data lakes
  - Bancos de dados SQL (PostgreSQL, MySQL, SQL Server)
  - NoSQL (MongoDB, DynamoDB, Redis, Cassandra)
  - Data Lakes (AWS S3, BigQuery, Snowflake)
  - Data Warehouses e ETL/ELT
  - Vector databases para RAG
  - Message queues (Kafka, RabbitMQ, SQS)
  - Estratégias de backup e disaster recovery
  - Estimativas de custos por volume

- **[OPERATIONS.md](./OPERATIONS.md)** - Operações e sustentação
  - DevOps e CI/CD (GitHub Actions, GitLab, CircleCI)
  - Kubernetes e container orchestration
  - Load balancing (ALB, NLB, Nginx, HAProxy)
  - Segurança e compliance (LGPD, GDPR, HIPAA, PCI-DSS)
  - Secrets management (AWS Secrets Manager, Vault)
  - DDoS protection (Cloudflare, AWS Shield)
  - Auto-scaling e caching
  - Rate limiting
  - Runbooks e incident management
  - Custos de infraestrutura por tier

- **[QUALITY_MONITORING.md](./QUALITY_MONITORING.md)** - Qualidade e monitoramento
  - Ferramentas de QA (MaestroQA, Playvox, Klaus)
  - Análise de sentimento
  - Métricas e KPIs essenciais (CSAT, NPS, FCR, AHT, etc.)
  - Speech analytics (CallMiner, Verint)
  - APM (Datadog, New Relic, Dynatrace)
  - Logging (ELK Stack, Splunk, CloudWatch)
  - Error tracking (Sentry, Rollbar)
  - Alerting (PagerDuty, Opsgenie)
  - Dashboards e relatórios
  - Call scoring framework

### Personalização e Integrações
- **[PERSONALIZATION.md](./PERSONALIZATION.md)** - Personalização e customização
  - User profiling e segmentação
  - Memory systems (curto e longo prazo)
  - Customização de personalidade do assistente
  - Fine-tuning de modelos
  - RAG (Retrieval Augmented Generation)
  - Respostas adaptativas
  - Frameworks (LangChain, LlamaIndex)
  - Estimativas de custos de personalização

- **[INTEGRATIONS.md](./INTEGRATIONS.md)** - Ecossistema de integrações
  - CRMs (Salesforce, HubSpot, Pipedrive, RD Station)
  - Pagamentos (Stripe, Mercado Pago, PagSeguro, PayPal)
  - Calendário (Google Calendar, Calendly, Outlook)
  - Email marketing (SendGrid, Mailchimp, Amazon SES)
  - Mensageria (Twilio SMS, WhatsApp, Slack, Teams)
  - Help desk (Zendesk, Freshdesk, Jira)
  - E-commerce (Shopify, WooCommerce, VTEX)
  - Analytics (GA4, Mixpanel, Segment)
  - Exemplos de código e SDKs

### Segurança
- **[SECURITY.md](./SECURITY.md)** - Guia de segurança
  - Gerenciamento de API keys
  - Boas práticas de segurança
  - Rotação de chaves
  - Links para dashboards dos provedores
  - Procedimentos em caso de exposição

### Configuração
- **[.env.example](./.env.example)** - Template completo de variáveis de ambiente
  - APIs de LLM (OpenAI, Groq, Azure, Hugging Face, etc.)
  - APIs de voz (STT/TTS de todos os provedores)
  - APIs de telefonia (Twilio, Plivo, Vonage, etc.)
  - Contact center platforms
  - WhatsApp Business API
  - Analytics e monitoring

## 💰 Simulador de Custos

O site inclui um simulador interativo que permite:

- Escolher tipo de assistente (texto, voz, URA, multimodal, contact center)
- Selecionar provedores de LLM, STT, TTS e telefonia
- Configurar volume de uso (chamadas, minutos, usuários)
- Calcular custos estimados mensais e anuais
- Comparar diferentes configurações
- Ver breakdown detalhado por componente
- Projeções anuais e custo por interação

## 🎨 Design

- Design moderno e criativo
- Modo escuro por padrão
- Animações suaves com Framer Motion
- Totalmente responsivo
- Gráficos interativos

## 📝 Scripts

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run db:push` - Atualizar schema do banco
- `npm run db:studio` - Abrir Prisma Studio

## 🔧 Configuração

O projeto usa variáveis de ambiente para configurações sensíveis. Crie um arquivo `.env.local`:

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="sua-chave-aqui" # Opcional para demos
```

## 📚 Conteúdo

Todo o conteúdo é baseado no estudo fornecido sobre assistentes virtuais de IA, incluindo:
- Formatos de entrega
- Modelos de cobrança
- Provedores e infraestrutura
- Arquiteturas técnicas
- Estratégias de negócio
- Casos de uso por setor

## 🚀 Deploy

O projeto está pronto para deploy em plataformas como:
- Vercel (recomendado para Next.js)
- Netlify
- AWS Amplify
- Qualquer plataforma que suporte Next.js

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

