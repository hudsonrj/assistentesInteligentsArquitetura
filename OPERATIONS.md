# Operações, Sustentação e Infraestrutura

## 🚀 DevOps e CI/CD

### Plataformas de CI/CD

#### 1. **GitHub Actions**
- **Preço:** Gratuito (2,000 min/mês), depois $0.008/min
- **Uso:** Build, test, deploy
- **Exemplo:**

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

#### 2. **GitLab CI/CD**
- **Preço:** Gratuito (400 min/mês), $29/usuário/mês (Ultimate)
- **Uso:** Full DevOps platform

#### 3. **CircleCI**
- **Preço:** Gratuito (6,000 min/mês), depois $15/mês
- **Uso:** CI/CD especializado

#### 4. **Jenkins**
- **Preço:** Gratuito (self-hosted)
- **Uso:** Open-source automation server

#### 5. **AWS CodePipeline**
- **Preço:** $1/pipeline ativo/mês
- **Uso:** CI/CD nativo AWS

---

## 📦 Container Orchestration

### 1. **Kubernetes**

#### Managed Kubernetes Services

| Provider | Serviço | Custo Control Plane | Custo Nodes |
|----------|---------|---------------------|-------------|
| **AWS** | EKS | $0.10/hora ($73/mês) | $0.0416/hora (t3.medium) |
| **Google** | GKE | Grátis (até 1 cluster) | $0.034/hora (e2-medium) |
| **Azure** | AKS | Grátis | $0.042/hora (B2s) |
| **DigitalOcean** | DOKS | $12/mês | $12/mês (2GB node) |

#### Ferramentas Kubernetes Essenciais

```yaml
# Helm - Package manager
# Cert-Manager - SSL/TLS certificates
# Ingress-NGINX - Load balancing
# Prometheus + Grafana - Monitoring
# ArgoCD - GitOps deployment
```

**Custo estimado (Small cluster):**
```
3 nodes t3.medium: 3 × $30 = $90/mês
EKS control plane: $73/mês
Load Balancer: $18/mês
TOTAL: ~$180/mês
```

---

### 2. **Docker Swarm**
- **Preço:** Gratuito (built-in Docker)
- **Uso:** Alternativa simples ao Kubernetes

---

### 3. **Nomad (HashiCorp)**
- **Preço:** Gratuito (open-source)
- **Uso:** Orquestração leve

---

## 🌐 Load Balancing

### 1. **AWS Application Load Balancer (ALB)**
- **Preço:** $0.0225/hora + $0.008/LCU
- **Características:** Layer 7, path-based routing

### 2. **AWS Network Load Balancer (NLB)**
- **Preço:** $0.0225/hora + $0.006/NLCU
- **Características:** Layer 4, ultra-low latency

### 3. **Google Cloud Load Balancing**
- **Preço:** $0.025/hora + $0.008/GB processado

### 4. **Nginx**
- **Preço:** Gratuito (open-source) ou NGINX Plus ($2,500/ano/instância)
- **Uso:** Self-managed load balancer

### 5. **HAProxy**
- **Preço:** Gratuito (open-source)
- **Uso:** High-performance load balancer

### 6. **Cloudflare Load Balancing**
- **Preço:** $5/mês + $0.50/500K requests

---

## 🔐 Segurança e Compliance

### SSL/TLS Certificates

#### Gratuitos:
- **Let's Encrypt** - Certificados grátis (renovação a cada 90 dias)
- **AWS Certificate Manager (ACM)** - Grátis para uso em AWS
- **Cloudflare SSL** - Grátis

#### Pagos:
- **DigiCert** - $267-$799/ano
- **GoDaddy SSL** - $64-$300/ano
- **GlobalSign** - Enterprise pricing

---

### WAF (Web Application Firewall)

#### 1. **AWS WAF**
- **Preço:** $5/mês + $1/regra + $0.60/1M requests
- **Características:** Protection contra OWASP Top 10

#### 2. **Cloudflare WAF**
- **Preço:** $20/mês (Pro)
- **Características:** DDoS protection incluso

#### 3. **Azure Web Application Firewall**
- **Preço:** $5/mês + $0.015/GB processado

---

### Secrets Management

#### 1. **AWS Secrets Manager**
- **Preço:** $0.40/secret/mês + $0.05/10K API calls
- **Uso:** Rotação automática de secrets

#### 2. **HashiCorp Vault**
- **Preço:** Gratuito (open-source) ou $0.03/hora (HCP Vault)
- **Uso:** Secrets e encryption management

#### 3. **Azure Key Vault**
- **Preço:** $0.03/10K operations
- **Uso:** Keys, secrets, certificates

#### 4. **Google Secret Manager**
- **Preço:** $0.06/10K acessos
- **Uso:** Secrets management nativo GCP

---

### Compliance

#### Frameworks:
- **LGPD** (Brasil) - Lei Geral de Proteção de Dados
- **GDPR** (Europa) - General Data Protection Regulation
- **HIPAA** (EUA - Saúde) - Health Insurance Portability Act
- **PCI-DSS** (Pagamentos) - Payment Card Industry
- **SOC 2** - Security audit standard
- **ISO 27001** - Information security management

#### Ferramentas de Compliance:

**1. Vanta**
- **Preço:** $3,000-12,000/ano
- **Uso:** SOC 2, HIPAA, ISO 27001 automation

**2. Drata**
- **Preço:** Similar a Vanta
- **Uso:** Compliance automation

**3. Secureframe**
- **Preço:** Similar
- **Uso:** SOC 2, ISO 27001, GDPR

---

## 🛡️ DDoS Protection

### 1. **Cloudflare**
- **Preço:** $20/mês (Pro) - DDoS protection incluso
- **Características:** Global CDN + WAF

### 2. **AWS Shield**
- **Standard:** Gratuito
- **Advanced:** $3,000/mês
- **Características:** DDoS protection gerenciado

### 3. **Akamai Prolexic**
- **Preço:** Enterprise (> $10K/mês)
- **Características:** Enterprise DDoS protection

---

## 💾 Backup e Disaster Recovery

### Estratégia 3-2-1
```
3 cópias dos dados
2 tipos de mídia diferentes
1 cópia offsite
```

### Serviços de Backup

#### 1. **AWS Backup**
- **Preço:** $0.05/GB/mês (S3) + restore costs
- **Características:** Centralized backup

#### 2. **Azure Backup**
- **Preço:** $0.05/GB/mês
- **Características:** Backup gerenciado

#### 3. **Veeam**
- **Preço:** $500-2,000/year por workload
- **Uso:** Enterprise backup (self-managed)

#### 4. **Acronis**
- **Preço:** $0.80-1.20/GB/mês
- **Uso:** Cloud backup

---

### Disaster Recovery Tiers

| Tier | RPO | RTO | Estratégia | Custo Mensal |
|------|-----|-----|------------|--------------|
| **Tier 0** | < 1min | < 1min | Active-Active Multi-Region | $5,000+ |
| **Tier 1** | < 15min | < 1h | Hot Standby | $2,000 |
| **Tier 2** | < 4h | < 4h | Warm Standby | $500 |
| **Tier 3** | < 24h | < 24h | Cold Backup | $100 |

---

## 📈 Auto-Scaling

### Application Auto-Scaling

#### AWS Auto Scaling Group
```yaml
AutoScalingGroup:
  MinSize: 2
  MaxSize: 20
  DesiredCapacity: 4
  TargetTrackingScaling:
    - TargetValue: 70  # CPU %
    - ScaleOutCooldown: 60
    - ScaleInCooldown: 300
```

#### Kubernetes HPA (Horizontal Pod Autoscaler)
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: assistant-api
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: assistant-api
  minReplicas: 2
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

---

## 🌍 CDN (Content Delivery Network)

### 1. **Cloudflare CDN**
- **Preço:** Gratuito (básico), $20/mês (Pro)
- **Características:** 300+ PoPs globais

### 2. **AWS CloudFront**
- **Preço:** $0.085/GB (primeiros 10TB)
- **Características:** Integrado com AWS

### 3. **Fastly**
- **Preço:** $0.12/GB
- **Características:** Real-time purging

### 4. **Akamai**
- **Preço:** Enterprise (> $2,000/mês)
- **Características:** Maior CDN do mundo

### 5. **Bunny CDN**
- **Preço:** $0.01/GB
- **Características:** Mais barato

---

## 🔄 Caching Strategy

### Níveis de Cache

```
1. Browser Cache (Client-side)
   ├── Service Workers
   └── Local Storage

2. CDN Cache (Edge)
   ├── Cloudflare
   └── CloudFront

3. Application Cache (Server-side)
   ├── Redis (Memory)
   └── Memcached

4. Database Cache
   ├── Query cache
   └── Result cache
```

### Redis Caching Patterns

```typescript
// 1. Cache-Aside (Lazy Loading)
async function getData(key: string) {
  // Tentar cache primeiro
  let data = await redis.get(key);

  if (!data) {
    // Se não existe, buscar do DB
    data = await database.query(key);

    // Salvar no cache
    await redis.setex(key, 3600, JSON.stringify(data));
  }

  return JSON.parse(data);
}

// 2. Write-Through
async function saveData(key: string, value: any) {
  // Escrever no DB
  await database.save(key, value);

  // Escrever no cache
  await redis.setex(key, 3600, JSON.stringify(value));
}

// 3. Write-Behind (Async)
async function saveDataAsync(key: string, value: any) {
  // Escrever no cache imediatamente
  await redis.setex(key, 3600, JSON.stringify(value));

  // Enfileirar para salvar no DB
  await queue.add('save-to-db', { key, value });
}
```

### Cache Invalidation

```typescript
// Invalidação por TTL
await redis.setex('user:123', 3600, data); // 1 hora

// Invalidação manual
await redis.del('user:123');

// Invalidação por padrão
await redis.eval(`
  local keys = redis.call('keys', 'user:*')
  for i=1,#keys,5000 do
    redis.call('del', unpack(keys, i, math.min(i+4999, #keys)))
  end
`, 0);

// Invalidação por tags (usando Redis Streams)
await redis.xadd('invalidations', '*', 'tag', 'users');
```

---

## 🔍 Rate Limiting

### Implementação

```typescript
import rateLimit from 'express-rate-limit';

// Basic rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por janela
  message: 'Muitas requisições, tente novamente mais tarde.'
});

app.use('/api/', limiter);

// Rate limiting por usuário (Redis)
import RedisStore from 'rate-limit-redis';

const userLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:user:',
  }),
  windowMs: 60 * 1000,
  max: async (req) => {
    // Diferentes limites por tier
    const user = await getUser(req.userId);

    switch (user.tier) {
      case 'free': return 10;
      case 'pro': return 100;
      case 'enterprise': return 1000;
    }
  }
});

// Rate limiting por IP
const ipLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  keyGenerator: (req) => req.ip
});
```

### Algoritmos de Rate Limiting

1. **Token Bucket** - Permite bursts
2. **Leaky Bucket** - Smooth rate
3. **Fixed Window** - Simples mas impreciso
4. **Sliding Window** - Mais preciso

---

## 📊 Custos de Infraestrutura por Tier

### Tier 1: Startup (<10K req/dia)
```
Hosting: Vercel/Netlify - $20/mês
Database: Supabase - $25/mês
Redis: Upstash - $10/mês
CDN: Cloudflare - Grátis
Monitoring: Sentry - Grátis
TOTAL: ~$55/mês
```

### Tier 2: Crescimento (<100K req/dia)
```
Compute: AWS ECS Fargate - $150/mês
Database: RDS t3.medium - $120/mês
Redis: ElastiCache t3.micro - $15/mês
CDN: CloudFront - $50/mês
Load Balancer: ALB - $25/mês
Monitoring: Datadog - $150/mês
Backup: S3 - $10/mês
TOTAL: ~$520/mês
```

### Tier 3: Escala (<1M req/dia)
```
Compute: ECS/EKS - $800/mês
Database: RDS Multi-AZ - $500/mês
Redis: ElastiCache cluster - $150/mês
CDN: CloudFront - $200/mês
Load Balancer: ALB - $100/mês
WAF: AWS WAF - $100/mês
Monitoring: Datadog + PagerDuty - $400/mês
Backup: S3 + Glacier - $50/mês
TOTAL: ~$2,300/mês
```

### Tier 4: Enterprise (>1M req/dia)
```
Compute: EKS Multi-AZ - $2,500/mês
Database: Aurora Global - $2,000/mês
Redis: ElastiCache cluster - $500/mês
CDN: CloudFront Premium - $1,000/mês
Load Balancer: Multi-region - $300/mês
WAF + DDoS: Shield Advanced - $3,000/mês
Monitoring: Full stack - $1,000/mês
Compliance: Vanta - $500/mês
Backup + DR: Multi-region - $500/mês
TOTAL: ~$11,300/mês
```

---

## 🛠️ Ferramentas Essenciais

### Infrastructure as Code (IaC)

#### 1. **Terraform**
- **Preço:** Gratuito (open-source) ou Terraform Cloud ($20/usuário/mês)
- **Uso:** Multi-cloud IaC

```hcl
resource "aws_instance" "app" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.medium"

  tags = {
    Name = "assistant-api"
  }
}
```

#### 2. **AWS CloudFormation**
- **Preço:** Gratuito
- **Uso:** AWS-only IaC

#### 3. **Pulumi**
- **Preço:** Gratuito (individual) ou $75/usuário/mês (Team)
- **Uso:** IaC com linguagens de programação

#### 4. **Ansible**
- **Preço:** Gratuito (open-source) ou Ansible Automation Platform ($10K/ano)
- **Uso:** Configuration management

---

### Container Registries

- **Docker Hub:** Gratuito (1 private repo), $5/mês (ilimitado)
- **AWS ECR:** $0.10/GB/mês
- **Google Artifact Registry:** $0.10/GB/mês
- **Azure Container Registry:** $5/mês (Basic)
- **GitHub Container Registry:** Gratuito para públicos

---

### Service Mesh

#### 1. **Istio**
- **Preço:** Gratuito (open-source)
- **Uso:** Advanced traffic management

#### 2. **Linkerd**
- **Preço:** Gratuito (open-source)
- **Uso:** Lightweight service mesh

#### 3. **AWS App Mesh**
- **Preço:** $0.0001/proxy/hora
- **Uso:** AWS native service mesh

---

## 📚 Runbooks e Playbooks

### Exemplo de Runbook: Alto Uso de CPU

```markdown
# Runbook: High CPU Usage

## Sintomas
- CPU > 80% por mais de 5 minutos
- Latência da API aumentando
- Alertas do Datadog

## Diagnóstico

1. Verificar métricas:
   ```bash
   kubectl top pods -n production
   ```

2. Identificar pod problemático:
   ```bash
   kubectl describe pod <pod-name> -n production
   ```

3. Ver logs recentes:
   ```bash
   kubectl logs <pod-name> -n production --tail=100
   ```

## Resolução Imediata

1. Escalar horizontalmente:
   ```bash
   kubectl scale deployment assistant-api --replicas=10
   ```

2. Se não resolver, reiniciar pod problemático:
   ```bash
   kubectl delete pod <pod-name> -n production
   ```

## Resolução de Longo Prazo

- Otimizar queries lentas
- Adicionar cache
- Revisar algoritmos ineficientes

## Comunicação

- Alertar time de desenvolvimento
- Atualizar status page se necessário
- Post-mortem após incidente
```

---

## 📞 On-Call e Incident Management

### Ferramentas:
- **PagerDuty** - $21-51/usuário/mês
- **Opsgenie** - $9-29/usuário/mês
- **VictorOps** - $9-49/usuário/mês

### Rotação de Plantão:
```
Semana 1: Dev A (primary), Dev B (backup)
Semana 2: Dev B (primary), Dev C (backup)
Semana 3: Dev C (primary), Dev A (backup)
```

### SLAs Típicos:

| Severidade | Tempo de Resposta | Tempo de Resolução |
|------------|-------------------|--------------------|
| **P0 (Critical)** | 15 minutos | 4 horas |
| **P1 (High)** | 1 hora | 24 horas |
| **P2 (Medium)** | 4 horas | 72 horas |
| **P3 (Low)** | 1 dia útil | 1 semana |

---

## 🚦 Status Page

### Ferramentas:
- **Statuspage (Atlassian)** - $29-899/mês
- **Better Uptime** - $18-89/mês
- **Cachet** - Gratuito (open-source)

### Componentes a Monitorar:
- API
- Website
- Chat Widget
- Telefonia/URA
- Integrações (WhatsApp, etc.)

---

## 📖 Recursos Adicionais

- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Google SRE Book](https://sre.google/sre-book/table-of-contents/)
- [The Twelve-Factor App](https://12factor.net/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)
