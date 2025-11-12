# Personalização e Customização de Assistentes de IA

## 🎯 Estratégias de Personalização

### 1. **Personalização por Contexto de Usuário**
### 2. **Customização de Modelo (Fine-Tuning)**
### 3. **Prompt Engineering Dinâmico**
### 4. **RAG (Retrieval Augmented Generation)**
### 5. **Memory Systems (Memória de Longo Prazo)**

---

## 👤 Perfil de Usuário (User Profiling)

### Dados a Coletar

```typescript
interface UserProfile {
  // Identidade
  id: string;
  name: string;
  email: string;
  phone?: string;

  // Demografia
  age?: number;
  gender?: string;
  location?: {
    country: string;
    city: string;
    timezone: string;
  };
  language: string;

  // Preferências
  preferences: {
    communicationStyle: 'formal' | 'casual' | 'professional';
    language: string;
    topics_of_interest: string[];
    channel_preference: 'whatsapp' | 'voice' | 'email' | 'sms';
    notification_settings: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };

  // Histórico comportamental
  behavior: {
    total_interactions: number;
    last_interaction: Date;
    average_session_duration: number;
    preferred_time_of_day: string;
    sentiment_history: Array<{
      date: Date;
      sentiment: 'positive' | 'neutral' | 'negative';
    }>;
  };

  // Contexto de negócio
  business_context: {
    customer_tier: 'free' | 'premium' | 'enterprise';
    lifetime_value: number;
    account_status: 'active' | 'churned' | 'at_risk';
    purchase_history: Array<{
      product_id: string;
      date: Date;
      value: number;
    }>;
    support_tickets: Array<{
      id: string;
      topic: string;
      status: string;
      date: Date;
    }>;
  };

  // Contexto técnico
  technical_context: {
    devices: string[];
    browser?: string;
    app_version?: string;
    last_ip?: string;
  };
}
```

### Exemplo de Uso

```typescript
// Adaptar resposta baseado no perfil
function personalizeResponse(
  user: UserProfile,
  baseResponse: string
): string {
  let response = baseResponse;

  // Ajustar formalidade
  if (user.preferences.communicationStyle === 'formal') {
    response = makeFormal(response);
  } else if (user.preferences.communicationStyle === 'casual') {
    response = makeCasual(response);
  }

  // Incluir contexto relevante
  if (user.business_context.customer_tier === 'premium') {
    response += "\n\nComo cliente Premium, você tem acesso prioritário ao nosso time de especialistas.";
  }

  // Recomendar baseado em histórico
  if (user.business_context.purchase_history.length > 0) {
    const lastPurchase = user.business_context.purchase_history[0];
    response += `\n\nVejo que você adquiriu ${lastPurchase.product_id}. Posso ajudar com algo relacionado?`;
  }

  return response;
}
```

---

## 🧠 Memory Systems

### 1. **Short-Term Memory (Memória de Curto Prazo)**

Contexto da conversação atual.

```typescript
interface ConversationContext {
  session_id: string;
  user_id: string;
  started_at: Date;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
  }>;
  entities_mentioned: {
    [key: string]: any; // Ex: order_id, product_name, etc.
  };
  intent_history: string[];
  unresolved_issues: string[];
}
```

**Implementação:**
```typescript
// Redis para memória de sessão
const conversationKey = `conversation:${sessionId}`;
await redis.setex(conversationKey, 3600, JSON.stringify(context)); // 1 hora
```

---

### 2. **Long-Term Memory (Memória de Longo Prazo)**

Informações que persistem entre conversações.

```typescript
interface LongTermMemory {
  user_id: string;
  facts: Array<{
    key: string;
    value: any;
    confidence: number; // 0-1
    learned_at: Date;
    last_confirmed: Date;
  }>;
  preferences: UserProfile['preferences'];
  conversation_summaries: Array<{
    date: Date;
    summary: string;
    topics: string[];
    sentiment: string;
  }>;
}
```

**Exemplo:**
```typescript
const memory: LongTermMemory = {
  user_id: "user_123",
  facts: [
    {
      key: "preferred_shipping_address",
      value: "Rua ABC, 123",
      confidence: 0.9,
      learned_at: new Date("2024-01-01"),
      last_confirmed: new Date("2024-01-15")
    },
    {
      key: "has_pet",
      value: "dog named Max",
      confidence: 0.8,
      learned_at: new Date("2024-01-10"),
      last_confirmed: new Date("2024-01-10")
    }
  ],
  // ...
};
```

---

### 3. **Vector Memory (para busca semântica)**

```typescript
// Armazenar embeddings de conversas anteriores
interface VectorMemory {
  id: string;
  user_id: string;
  content: string;
  embedding: number[]; // 1536 dimensões (OpenAI)
  metadata: {
    timestamp: Date;
    topic: string;
    sentiment: string;
  };
}

// Buscar conversas similares
async function findSimilarConversations(
  query: string,
  userId: string
): Promise<VectorMemory[]> {
  const queryEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query
  });

  // Buscar no Pinecone/Weaviate/etc
  const results = await vectorDB.query({
    vector: queryEmbedding.data[0].embedding,
    filter: { user_id: userId },
    topK: 5
  });

  return results;
}
```

---

## 🎨 Customização de Personalidade

### Definir Personalidade do Assistente

```typescript
interface AssistantPersonality {
  name: string;
  role: string;
  traits: {
    formality: 1 | 2 | 3 | 4 | 5; // 1=muito casual, 5=muito formal
    enthusiasm: 1 | 2 | 3 | 4 | 5;
    verbosity: 'concise' | 'balanced' | 'detailed';
    humor: boolean;
    empathy_level: 1 | 2 | 3 | 4 | 5;
  };
  tone: string;
  values: string[];
  forbidden_topics?: string[];
  example_phrases: string[];
}
```

### Exemplos de Personalidades

#### 1. **Assistente Corporativo Formal**
```typescript
const corporateAssistant: AssistantPersonality = {
  name: "Dr. Silva",
  role: "Assistente Executivo",
  traits: {
    formality: 5,
    enthusiasm: 2,
    verbosity: 'concise',
    humor: false,
    empathy_level: 3
  },
  tone: "Professional, objective, and precise",
  values: ["Efficiency", "Accuracy", "Professionalism"],
  example_phrases: [
    "Certamente, posso auxiliá-lo com isso.",
    "Conforme solicitado, segue a informação:",
    "Fico à disposição para demais esclarecimentos."
  ]
};
```

#### 2. **Assistente Amigável de E-commerce**
```typescript
const friendlyAssistant: AssistantPersonality = {
  name: "Júlia",
  role: "Consultora de Vendas",
  traits: {
    formality: 2,
    enthusiasm: 5,
    verbosity: 'balanced',
    humor: true,
    empathy_level: 5
  },
  tone: "Warm, friendly, and helpful",
  values: ["Customer delight", "Authenticity", "Helpfulness"],
  example_phrases: [
    "Oi! 😊 Como posso te ajudar hoje?",
    "Que legal! Temos opções perfeitas pra você!",
    "Pode contar comigo! Estou aqui pra isso 💙"
  ]
};
```

#### 3. **Assistente Técnico Especializado**
```typescript
const technicalAssistant: AssistantPersonality = {
  name: "Alex",
  role: "Suporte Técnico Especializado",
  traits: {
    formality: 3,
    enthusiasm: 3,
    verbosity: 'detailed',
    humor: false,
    empathy_level: 4
  },
  tone: "Knowledgeable, patient, and thorough",
  values: ["Accuracy", "Thoroughness", "Problem-solving"],
  example_phrases: [
    "Vou te guiar passo a passo para resolver isso.",
    "Para diagnosticar melhor, preciso de algumas informações:",
    "Entendo a frustração. Vamos resolver isso juntos."
  ]
};
```

### Implementação de Personalidade

```typescript
function buildSystemPrompt(personality: AssistantPersonality, user: UserProfile): string {
  return `You are ${personality.name}, a ${personality.role}.

Your personality traits:
- Formality: ${personality.traits.formality}/5
- Enthusiasm: ${personality.traits.enthusiasm}/5
- Verbosity: ${personality.traits.verbosity}
- Use humor: ${personality.traits.humor ? 'yes' : 'no'}
- Empathy level: ${personality.traits.empathy_level}/5

Tone: ${personality.tone}

Core values: ${personality.values.join(', ')}

${personality.forbidden_topics ? `Never discuss: ${personality.forbidden_topics.join(', ')}` : ''}

Example phrases you use:
${personality.example_phrases.map(p => `- "${p}"`).join('\n')}

User context:
- Name: ${user.name}
- Preferred communication style: ${user.preferences.communicationStyle}
- Customer tier: ${user.business_context.customer_tier}
- Language: ${user.language}

Always maintain your personality while being helpful and respectful.`;
}
```

---

## 🔧 Fine-Tuning de Modelos

### Quando Fazer Fine-Tuning?

✅ **Fazer Fine-Tuning quando:**
- Domínio muito específico (médico, jurídico, etc.)
- Terminologia técnica única
- Formato de resposta muito particular
- Alto volume de uso (ROI justifica o custo)

❌ **NÃO fazer Fine-Tuning quando:**
- Prompt engineering resolve
- RAG é suficiente
- Volume baixo de uso
- Domínio genérico

### Provedores que Oferecem Fine-Tuning

| Provider | Modelos | Custo Training | Custo Inference |
|----------|---------|----------------|-----------------|
| **OpenAI** | GPT-3.5-turbo | $8/1M tokens | $12/1M tokens |
| **OpenAI** | GPT-4 | - | - (não disponível) |
| **Google Vertex AI** | PaLM 2 | $50/1K steps | Standard + 20% |
| **Azure** | GPT-3.5 | Similar OpenAI | Similar OpenAI |
| **Cohere** | Command | $2/1M tokens | $15/1M tokens |
| **Anthropic** | Claude | Enterprise only | Enterprise only |

### Processo de Fine-Tuning

#### 1. **Preparar Dataset**

```jsonl
{"messages": [{"role": "system", "content": "You are a customer support assistant for AcmeBank."}, {"role": "user", "content": "How do I check my balance?"}, {"role": "assistant", "content": "You can check your balance in 3 ways:\n1. Via our app\n2. By calling *123#\n3. At any ATM\n\nWhich method would you prefer?"}]}
{"messages": [{"role": "system", "content": "You are a customer support assistant for AcmeBank."}, {"role": "user", "content": "Como faço para bloquear meu cartão?"}, {"role": "assistant", "content": "Para bloquear seu cartão imediatamente:\n\n1. Abra o app do AcmeBank\n2. Vá em 'Meus Cartões'\n3. Selecione o cartão\n4. Toque em 'Bloquear'\n\nOu ligue gratuitamente para 0800-XXX-XXXX, disponível 24/7.\n\nJá bloqueou?"}]}
```

**Requisitos:**
- Mínimo: 50-100 exemplos
- Recomendado: 500-1,000 exemplos
- Ideal: 5,000+ exemplos

#### 2. **Treinar Modelo (OpenAI)**

```typescript
import OpenAI from 'openai';

const openai = new OpenAI();

// Upload dataset
const file = await openai.files.create({
  file: fs.createReadStream("training_data.jsonl"),
  purpose: "fine-tune"
});

// Iniciar fine-tuning
const fineTune = await openai.fineTuning.jobs.create({
  training_file: file.id,
  model: "gpt-3.5-turbo-0125",
  hyperparameters: {
    n_epochs: 3
  }
});

// Monitorar progresso
const job = await openai.fineTuning.jobs.retrieve(fineTune.id);
console.log(job.status); // 'validating_files' | 'running' | 'succeeded' | 'failed'
```

#### 3. **Usar Modelo Fine-Tuned**

```typescript
const response = await openai.chat.completions.create({
  model: "ft:gpt-3.5-turbo:acmebank:v1:abc123",
  messages: [
    { role: "user", content: "Como faço um TED?" }
  ]
});
```

---

## 📚 Base de Conhecimento (RAG)

### Arquitetura RAG

```
1. Ingestão:
   Documentos → Chunking → Embeddings → Vector DB

2. Query:
   User Query → Embedding → Similarity Search → Contexto Relevante

3. Geração:
   User Query + Contexto → LLM → Resposta
```

### Implementação Completa

```typescript
import { OpenAI } from 'openai';
import { PineconeClient } from '@pinecone-database/pinecone';

const openai = new OpenAI();
const pinecone = new PineconeClient();

// 1. Ingerir documentos
async function ingestDocument(document: string, metadata: any) {
  // Dividir em chunks
  const chunks = chunkDocument(document, 1000); // 1000 chars por chunk

  for (const chunk of chunks) {
    // Gerar embedding
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk
    });

    // Salvar no Pinecone
    await pinecone.upsert({
      vectors: [{
        id: generateId(),
        values: embedding.data[0].embedding,
        metadata: {
          text: chunk,
          ...metadata
        }
      }]
    });
  }
}

// 2. Query com RAG
async function queryWithRAG(userQuery: string): Promise<string> {
  // Gerar embedding da query
  const queryEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: userQuery
  });

  // Buscar contexto relevante
  const results = await pinecone.query({
    vector: queryEmbedding.data[0].embedding,
    topK: 5,
    includeMetadata: true
  });

  // Montar contexto
  const context = results.matches
    .map(m => m.metadata.text)
    .join('\n\n---\n\n');

  // Gerar resposta com contexto
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant. Answer questions based on the provided context.

Context:
${context}

If the context doesn't contain enough information to answer, say so.`
      },
      {
        role: "user",
        content: userQuery
      }
    ]
  });

  return response.choices[0].message.content;
}
```

### Chunking Strategies

```typescript
// 1. Fixed-size chunks
function fixedSizeChunking(text: string, size: number, overlap: number = 0): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

// 2. Sentence-based chunking
function sentenceChunking(text: string, maxChunkSize: number): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxChunkSize) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += ' ' + sentence;
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

// 3. Semantic chunking (usando LLM)
async function semanticChunking(text: string): Promise<string[]> {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "user",
      content: `Divide the following text into logical, semantic sections. Return JSON array of chunks:

${text}`
    }]
  });

  return JSON.parse(response.choices[0].message.content);
}
```

---

## 🎭 Adaptive Responses (Respostas Adaptativas)

### Adaptar baseado em Sentiment

```typescript
async function adaptToSentiment(
  userMessage: string,
  baseResponse: string
): Promise<string> {
  // Analisar sentimento
  const sentiment = await analyzeSentiment(userMessage);

  if (sentiment === 'very_negative') {
    return `Entendo sua frustração e sinto muito pelo inconveniente. ${baseResponse}

Como posso tornar isso melhor para você?`;
  }

  if (sentiment === 'very_positive') {
    return `Que ótimo ouvir isso! 😊 ${baseResponse}`;
  }

  return baseResponse;
}
```

### Adaptar baseado em Expertise Level

```typescript
function adaptToExpertiseLevel(
  content: string,
  userExpertise: 'beginner' | 'intermediate' | 'expert'
): string {
  switch (userExpertise) {
    case 'beginner':
      return simplifyExplanation(content);
    case 'expert':
      return addTechnicalDetails(content);
    default:
      return content;
  }
}
```

---

## 💰 Estimativa de Custos de Personalização

### Opção 1: Prompt Engineering + RAG
```
Setup:
- Vector DB (Pinecone Starter): $70/mês
- Embeddings (100K docs): ~$5 one-time
- LLM calls com RAG: +20% tokens = +$6/mês (em cima de $30)

TOTAL: ~$81/mês + $5 setup
```

### Opção 2: Fine-Tuning
```
Setup:
- Training data preparation: tempo
- Fine-tuning (1M tokens): $8
- Inference: $12/1M tokens vs $0.50/1M (GPT-3.5)

Break-even: ~700K tokens/mês para compensar
```

### Opção 3: Memory Systems
```
- Redis (short-term memory): $10-50/mês
- Vector DB (long-term memory): $70/mês
- Embeddings: ~$0.13/1M chars

TOTAL: ~$80-120/mês
```

---

## 📚 Recursos e Ferramentas

### Frameworks
- **LangChain** - Orchestration framework
- **LlamaIndex** - Data framework para LLMs
- **Haystack** - NLP framework
- **Semantic Kernel** (Microsoft) - AI orchestration

### Plataformas No-Code
- **Voiceflow** - Visual bot builder
- **Botpress** - Open-source platform
- **Rasa** - Open-source conversational AI

### Ferramentas de Fine-Tuning
- **OpenAI Fine-Tuning API**
- **Hugging Face AutoTrain**
- **Google Vertex AI**
- **AWS SageMaker**

---

## 📖 Recursos Adicionais

- [OpenAI Fine-Tuning Guide](https://platform.openai.com/docs/guides/fine-tuning)
- [LangChain Documentation](https://python.langchain.com/)
- [RAG Best Practices](https://www.pinecone.io/learn/retrieval-augmented-generation/)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
