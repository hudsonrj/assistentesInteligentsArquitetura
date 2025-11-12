# Infraestrutura de Dados, Bancos de Dados e Data Lakes

## 🗄️ Bancos de Dados Relacionais (SQL)

### 1. **PostgreSQL**
- **Tipo:** Open Source RDBMS
- **Uso:** Dados transacionais, analytics
- **Características:**
  - ACID compliant
  - JSON support
  - Extensions (pg_vector para embeddings)
  - Replicação robusta

**Hosting:**
- **Self-hosted:** Gratuito
- **AWS RDS:** $0.017/hora (db.t3.micro)
- **Azure Database:** $0.017/hora
- **Google Cloud SQL:** $0.017/hora
- **Supabase:** Grátis até 500MB, depois $25/mês
- **Neon:** Grátis até 3GB, depois $19/mês

**Quando usar:**
- Dados estruturados e relacionais
- Transações complexas
- Integridade de dados crítica
- Sistema de usuários, pedidos, etc.

---

### 2. **MySQL/MariaDB**
- **Tipo:** Open Source RDBMS
- **Uso:** Web applications, CMS
- **Características:**
  - Alto desempenho para leitura
  - Amplamente suportado
  - Replicação simples

**Hosting:**
- **Self-hosted:** Gratuito
- **AWS RDS:** $0.017/hora
- **PlanetScale:** Grátis até 5GB, depois $29/mês
- **DigitalOcean:** $15/mês (1GB RAM)

---

### 3. **Microsoft SQL Server**
- **Tipo:** Enterprise RDBMS
- **Uso:** Aplicações enterprise Microsoft
- **Características:**
  - Integração com ecosystem Microsoft
  - Performance otimizada
  - BI nativo

**Hosting:**
- **Azure SQL:** $5-4,000+/mês
- **AWS RDS:** A partir de $0.088/hora

---

## 📦 Bancos de Dados NoSQL

### 1. **MongoDB**
- **Tipo:** Document Database
- **Uso:** Dados semi-estruturados, flexibilidade de schema
- **Características:**
  - JSON/BSON documents
  - Escalabilidade horizontal
  - Aggregation framework

**Hosting:**
- **Self-hosted:** Gratuito
- **MongoDB Atlas:** Grátis até 512MB, depois $9/mês
- **AWS DocumentDB:** $0.10/hora

**Quando usar:**
- Logs de conversação
- Configurações dinâmicas
- Prototyping rápido
- Dados não estruturados

**Exemplo de documento:**
```json
{
  "_id": "conv_123",
  "userId": "user_456",
  "messages": [
    {
      "role": "user",
      "content": "Qual o status do meu pedido?",
      "timestamp": "2024-01-15T10:30:00Z"
    },
    {
      "role": "assistant",
      "content": "Seu pedido #789 está em trânsito",
      "timestamp": "2024-01-15T10:30:02Z",
      "metadata": {
        "model": "gpt-4",
        "tokens": 45,
        "sentiment": "positive"
      }
    }
  ],
  "metadata": {
    "channel": "whatsapp",
    "language": "pt-BR",
    "tags": ["order", "tracking"]
  }
}
```

---

### 2. **DynamoDB (AWS)**
- **Tipo:** Key-Value NoSQL
- **Uso:** Alta escala, baixa latência
- **Características:**
  - Serverless
  - Auto-scaling
  - Single-digit millisecond latency

**Preços:**
- **On-demand:** $1.25/milhão writes, $0.25/milhão reads
- **Provisioned:** $0.00065/hora por WCU

**Quando usar:**
- Session storage
- User profiles
- Real-time bidding
- IoT data

---

### 3. **Redis**
- **Tipo:** In-Memory Key-Value
- **Uso:** Cache, sessions, pub/sub
- **Características:**
  - Extremamente rápido (< 1ms)
  - Data structures (strings, hashes, lists, sets)
  - Pub/Sub messaging
  - Persistence opcional

**Hosting:**
- **Self-hosted:** Gratuito
- **Redis Cloud:** Grátis até 30MB, depois $7/mês
- **AWS ElastiCache:** $0.017/hora
- **Upstash:** Pay-per-request, $0.20/100K commands

**Quando usar:**
- Cache de respostas de LLM
- Session storage
- Rate limiting
- Real-time leaderboards

**Exemplo de uso:**
```typescript
// Cache de resposta do LLM
const cacheKey = `llm:${hash(prompt)}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const response = await openai.chat.completions.create({...});
await redis.setex(cacheKey, 3600, JSON.stringify(response)); // 1 hora
```

---

### 4. **Cassandra**
- **Tipo:** Wide-Column Store
- **Uso:** Big Data, alta disponibilidade
- **Características:**
  - Linear scalability
  - Multi-datacenter replication
  - No single point of failure

**Hosting:**
- **DataStax Astra:** Grátis até 80GB, depois $0.10/milhão reads

**Quando usar:**
- Logs de alta volume
- Time-series data
- Eventos de streaming

---

## 🌊 Data Lakes e Big Data

### 1. **AWS S3 + Athena**
- **Uso:** Data lake serverless
- **Características:**
  - Query SQL em S3
  - Pay-per-query
  - Integra com Glue para ETL

**Preços:**
- **S3:** $0.023/GB/mês (Standard)
- **Athena:** $5/TB scaneado

**Arquitetura:**
```
S3 Bucket (Data Lake)
├── raw/                    # Dados brutos
│   ├── conversations/
│   ├── call_recordings/
│   └── logs/
├── processed/              # Dados processados
│   ├── analytics/
│   └── ml_training/
└── aggregated/             # Dados agregados
    └── reports/
```

---

### 2. **Google BigQuery**
- **Uso:** Data warehouse serverless
- **Características:**
  - SQL standard
  - Escala automática
  - ML integrado (BigQuery ML)
  - Streaming inserts

**Preços:**
- **Storage:** $0.02/GB/mês (Active), $0.01/GB/mês (Long-term)
- **Queries:** $5/TB processado
- **Streaming:** $0.05/GB

**Quando usar:**
- Analytics em grande escala
- Relatórios complexos
- Machine learning

---

### 3. **Azure Data Lake**
- **Uso:** Data lake enterprise
- **Características:**
  - Hierárquico
  - Segurança granular
  - Integração Azure

**Preços:**
- **Storage:** $0.018/GB/mês
- **Transactions:** $0.065/10K

---

### 4. **Databricks**
- **Uso:** Unified analytics platform
- **Características:**
  - Apache Spark managed
  - Delta Lake
  - ML workflows
  - Collaborative notebooks

**Preços:**
- A partir de $0.10/DBU (compute unit)
- Enterprise: Sob consulta

---

### 5. **Snowflake**
- **Uso:** Cloud data platform
- **Características:**
  - Separação compute/storage
  - Zero-copy cloning
  - Time travel
  - Multi-cloud

**Preços:**
- **Storage:** $40/TB/mês
- **Compute:** $2-4/credit hour

---

## 📊 Data Warehouses

### 1. **Amazon Redshift**
- **Preço:** $0.25/hora (dc2.large) = ~$180/mês
- **Uso:** Analytics SQL em grande escala

### 2. **Google BigQuery**
- Ver seção acima

### 3. **Azure Synapse Analytics**
- **Preço:** A partir de $1.20/hora
- **Uso:** Analytics integrado com Azure

### 4. **ClickHouse**
- **Tipo:** Open Source OLAP
- **Uso:** Analytics em tempo real
- **Preço:** Gratuito (self-hosted) ou ClickHouse Cloud ($0.40/hora)

---

## 🔍 Search e Full-Text Search

### 1. **Elasticsearch**
- **Uso:** Full-text search, logs, analytics
- **Características:**
  - Busca rápida e relevante
  - Aggregations
  - Real-time indexing

**Hosting:**
- **Self-hosted:** Gratuito
- **Elastic Cloud:** $95/mês (Standard)
- **AWS OpenSearch:** $0.032/hora

**Quando usar:**
- Busca em base de conhecimento
- Logs centralizados
- Analytics de texto

---

### 2. **Algolia**
- **Uso:** Search-as-a-Service
- **Características:**
  - Ultrarrápido
  - Typo tolerance
  - Faceted search

**Preços:**
- **Build:** Grátis até 10K records
- **Grow:** $1/1K records/mês

---

### 3. **Meilisearch**
- **Tipo:** Open Source Search
- **Uso:** Alternative to Algolia
- **Preço:** Gratuito (self-hosted) ou Meilisearch Cloud ($0.80/1K docs/mês)

---

## 📈 Time-Series Databases

### 1. **InfluxDB**
- **Uso:** Métricas, IoT, monitoring
- **Características:**
  - Otimizado para time-series
  - SQL-like query language
  - Retention policies

**Preços:**
- **Self-hosted:** Gratuito
- **InfluxDB Cloud:** $0.36/GB/mês (storage) + queries

**Quando usar:**
- Métricas de sistema
- Performance monitoring
- Usage tracking

---

### 2. **TimescaleDB**
- **Tipo:** PostgreSQL extension
- **Uso:** Time-series em PostgreSQL
- **Preço:** Gratuito (open-source) ou Timescale Cloud ($0.25/GB/mês)

---

### 3. **Prometheus**
- **Tipo:** Open Source monitoring
- **Uso:** Métricas e alerting
- **Preço:** Gratuito
- **Hosting:** Grafana Cloud (grátis até 10K series)

---

## 🧠 Vector Databases (para RAG)

### 1. **Pinecone**
- **Uso:** Vector similarity search
- **Preço:** Grátis até 1M vectors, depois $70/1M vectors/mês

### 2. **Weaviate**
- **Uso:** Vector database com ML
- **Preço:** $25/GB/mês (cloud)

### 3. **Qdrant**
- **Uso:** High-performance vector search
- **Preço:** $20/GB/mês

### 4. **Chroma**
- **Uso:** Embedding database
- **Preço:** Gratuito (self-hosted)

### 5. **pgvector (PostgreSQL)**
- **Uso:** Vectors em PostgreSQL
- **Preço:** Custo do PostgreSQL

**Comparação detalhada em VOICE_SERVICES.md**

---

## 🔄 ETL/ELT Tools

### 1. **Airbyte**
- **Tipo:** Open Source EL(T)
- **Uso:** Data integration
- **Características:**
  - 300+ conectores
  - Self-hosted ou cloud

**Preços:**
- **Self-hosted:** Gratuito
- **Cloud:** $2.50/credit (1 credit = 1GB synced)

---

### 2. **Fivetran**
- **Uso:** Managed ELT
- **Preço:** $120/mês + volume
- **Características:** 150+ conectores, zero-maintenance

---

### 3. **Stitch (Talend)**
- **Uso:** Data integration
- **Preço:** $100/mês (Standard)

---

### 4. **AWS Glue**
- **Uso:** Serverless ETL
- **Preço:** $0.44/DPU-hour

---

### 5. **dbt (Data Build Tool)**
- **Tipo:** Transformation tool
- **Uso:** SQL-based transformations
- **Preço:** Gratuito (open-source) ou dbt Cloud ($100/mês)

---

## 📦 Message Queues e Event Streaming

### 1. **Apache Kafka**
- **Uso:** Event streaming platform
- **Características:**
  - High throughput
  - Persistent
  - Distributed

**Hosting:**
- **Self-hosted:** Gratuito
- **Confluent Cloud:** $1/hora + $0.15/GB
- **AWS MSK:** $0.21/hora (kafka.t3.small)

**Quando usar:**
- Event sourcing
- Real-time data pipelines
- Microservices communication

---

### 2. **RabbitMQ**
- **Uso:** Message broker
- **Características:**
  - AMQP protocol
  - Multiple exchange types
  - Easy to use

**Hosting:**
- **Self-hosted:** Gratuito
- **CloudAMQP:** Grátis até 1M msgs/mês, depois $19/mês

---

### 3. **AWS SQS**
- **Uso:** Managed message queue
- **Preço:** $0.40/milhão requests (após 1M grátis)

---

### 4. **Redis Pub/Sub**
- **Uso:** Real-time messaging
- **Características:** Fast, simple

---

### 5. **Google Pub/Sub**
- **Uso:** Asynchronous messaging
- **Preço:** $40/TB/mês

---

## 🏗️ Arquiteturas de Dados Recomendadas

### Arquitetura 1: Startup (< 100K interações/mês)

```
┌─────────────────────────────────────┐
│ Application Layer                   │
│ ├── Next.js Frontend                │
│ └── Node.js Backend                 │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Data Layer                          │
│ ├── PostgreSQL (Supabase)          │
│ │   └── Users, Conversations, etc  │
│ ├── Redis (Upstash)                │
│ │   └── Cache, Sessions            │
│ └── S3                              │
│     └── File storage                │
└─────────────────────────────────────┘

Custo: ~$50-100/mês
```

---

### Arquitetura 2: Crescimento (100K-1M interações/mês)

```
┌─────────────────────────────────────┐
│ Application Layer                   │
│ ├── Load Balancer                   │
│ ├── App Servers (Auto-scaling)     │
│ └── API Gateway                     │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Data Layer                          │
│ ├── PostgreSQL (RDS Multi-AZ)      │
│ │   └── Transactional data         │
│ ├── Redis Cluster                  │
│ │   └── Cache, Rate limiting       │
│ ├── MongoDB (Atlas)                │
│ │   └── Conversations, Logs        │
│ └── S3 + CloudFront                │
│     └── Static assets               │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Analytics Layer                     │
│ ├── Firehose → S3                  │
│ ├── Athena (SQL queries)           │
│ └── QuickSight (Dashboards)        │
└─────────────────────────────────────┘

Custo: ~$500-1,500/mês
```

---

### Arquitetura 3: Enterprise (> 1M interações/mês)

```
┌─────────────────────────────────────┐
│ Application Layer                   │
│ ├── CloudFlare (CDN + DDoS)        │
│ ├── API Gateway + WAF              │
│ ├── Kubernetes Cluster             │
│ └── Service Mesh                   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Data Layer (Multi-Region)          │
│ ├── PostgreSQL (Aurora Global)     │
│ │   └── Users, Orders              │
│ ├── DynamoDB                       │
│ │   └── Sessions, Real-time        │
│ ├── MongoDB Cluster                │
│ │   └── Conversations              │
│ ├── Redis Cluster (ElastiCache)   │
│ │   └── Cache, Pub/Sub             │
│ └── S3 + CloudFront                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Event Streaming                     │
│ ├── Kafka (MSK)                    │
│ └── Kinesis                        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Data Lake & Warehouse               │
│ ├── S3 Data Lake                   │
│ │   ├── Raw data                   │
│ │   ├── Processed data             │
│ │   └── ML training data           │
│ ├── Redshift                       │
│ │   └── Data warehouse             │
│ ├── Athena                         │
│ │   └── Ad-hoc queries             │
│ └── EMR / Databricks               │
│     └── Big data processing        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Analytics & ML                      │
│ ├── QuickSight / Tableau           │
│ ├── SageMaker                      │
│ └── Custom ML pipelines            │
└─────────────────────────────────────┘

Custo: ~$5,000-20,000/mês
```

---

## 💾 Estratégia de Backup e Disaster Recovery

### Backup Strategy

#### 1. **Database Backups**
```
PostgreSQL:
- Automated daily backups (7 dias retenção)
- Manual snapshots semanais (30 dias)
- Point-in-time recovery (PITR) habilitado
- Cross-region replication para DR

MongoDB:
- Continuous backups (oplog)
- Daily snapshots
- Retention: 14 dias

Redis:
- AOF (Append Only File) habilitado
- RDB snapshots a cada 6 horas
- Replication para HA
```

#### 2. **Object Storage Backups**
```
S3:
- Versioning habilitado
- Lifecycle policies:
  * Frequent Access: 30 dias
  * Infrequent Access: 31-90 dias
  * Glacier: > 90 dias
- Cross-region replication
```

#### 3. **RPO e RTO**

| Tier | RPO | RTO | Custo |
|------|-----|-----|-------|
| **Basic** | 24h | 4h | $50/mês |
| **Standard** | 1h | 1h | $200/mês |
| **Premium** | 5min | 15min | $500/mês |
| **Mission Critical** | < 1min | < 5min | $2,000+/mês |

---

## 📊 Estimativa de Custos por Volume

### 100K Interações/Mês
```
PostgreSQL (Supabase Pro): $25/mês
Redis (Upstash): $10/mês
S3: $5/mês
Backup: $10/mês
TOTAL: ~$50/mês
```

### 1M Interações/Mês
```
PostgreSQL (RDS db.t3.large): $120/mês
MongoDB (Atlas M10): $60/mês
Redis (ElastiCache): $30/mês
S3 + CloudFront: $50/mês
Backup: $30/mês
TOTAL: ~$290/mês
```

### 10M Interações/Mês
```
PostgreSQL (Aurora): $500/mês
MongoDB (Atlas M40): $400/mês
Redis Cluster: $200/mês
S3 + CloudFront: $200/mês
Kafka (MSK): $400/mês
Data Lake: $300/mês
Backup & DR: $200/mês
TOTAL: ~$2,200/mês
```

---

## 🔧 Ferramentas de Administração

### Database Management
- **DBeaver** (Gratuito) - Universal DB tool
- **pgAdmin** (Gratuito) - PostgreSQL
- **MongoDB Compass** (Gratuito) - MongoDB
- **TablePlus** ($89) - Multi-database client

### Monitoring
- **Datadog Database Monitoring** - $70/host/mês
- **New Relic Database** - Incluído no APM
- **Prometheus + Grafana** - Gratuito (open-source)

### Schema Management
- **Prisma** - ORM + Migrations
- **TypeORM** - TypeScript ORM
- **Liquibase** - Database change management
- **Flyway** - Database migrations

---

## 📚 Recursos Adicionais

- [AWS Database Decision Guide](https://aws.amazon.com/products/databases/)
- [Google Cloud Database Options](https://cloud.google.com/products/databases)
- [Database Comparison Tool](https://db-engines.com/en/)
- [Data Engineering Roadmap](https://github.com/datastacktv/data-engineer-roadmap)
