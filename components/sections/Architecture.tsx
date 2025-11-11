"use client";

import { Network, Server, Zap, Database, Shield, GitBranch } from "lucide-react";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import CodeBlock from "@/components/ui/CodeBlock";
import { motion } from "framer-motion";

const architectureComponents = [
  {
    icon: Network,
    title: "Microsserviços (LLM as a Service)",
    description: "Arquitetura modular onde diferentes componentes são separados em serviços independentes. O módulo de IA é tratado como um microserviço próprio.",
    benefits: [
      "Escala independente",
      "Isola falhas",
      "Facilita atualizações",
      "Permite diferentes tecnologias",
    ],
    code: `// Exemplo: Microserviço de LLM
// service-llm/src/index.ts
import express from 'express';
import { OpenAI } from 'openai';

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: \`Contexto: \${context}\` },
      { role: "user", content: message }
    ],
  });
  
  res.json({ response: completion.choices[0].message.content });
});

app.listen(3001, () => {
  console.log('LLM Service running on port 3001');
});`,
  },
  {
    icon: Server,
    title: "Containerização e Orquestração",
    description: "Componentes containerizados com Docker e orquestrados com Kubernetes para escalabilidade e portabilidade.",
    benefits: [
      "Portabilidade",
      "Escalonamento automático",
      "Isolamento de dependências",
      "CI/CD facilitado",
    ],
    code: `# Dockerfile para serviço de IA
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3001

CMD ["node", "src/index.js"]

# docker-compose.yml
version: '3.8'
services:
  llm-service:
    build: ./service-llm
    ports:
      - "3001:3001"
    environment:
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '2'
          memory: 4G`,
  },
  {
    icon: Zap,
    title: "Arquitetura Serverless",
    description: "Funções serverless (FaaS) para processar etapas específicas sem servidores rodando continuamente.",
    benefits: [
      "Escalabilidade automática",
      "Pay-per-use",
      "Sem gerenciamento de servidor",
      "Alta disponibilidade",
    ],
    code: `// AWS Lambda - Função Serverless
// handler.js
exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  
  // Processar mensagem com IA
  const response = await processWithAI(message);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ response }),
  };
};

// Azure Functions
module.exports = async function (context, req) {
  const message = req.body.message;
  const response = await processWithAI(message);
  
  context.res = {
    body: { response }
  };
};`,
  },
  {
    icon: GitBranch,
    title: "Pipeline de NLP",
    description: "Fluxo de processamento: Input → NLP → Consultas Backend → Geração LLM → Output, com RAG para conhecimento atualizado.",
    benefits: [
      "Processamento estruturado",
      "Integração com dados",
      "Mitiga alucinações",
      "Respostas contextualizadas",
    ],
    code: `// Pipeline NLP com RAG
async function processMessage(userMessage: string) {
  // 1. NLU - Entender intenção
  const intent = await nluService.analyze(userMessage);
  
  // 2. Buscar contexto relevante (RAG)
  const relevantDocs = await vectorDB.search(userMessage, { limit: 5 });
  
  // 3. Consultar backend se necessário
  const backendData = intent.needsBackend 
    ? await backendAPI.getData(intent.entities)
    : null;
  
  // 4. Gerar resposta com LLM
  const response = await llmService.generate({
    message: userMessage,
    context: relevantDocs,
    backendData: backendData,
  });
  
  // 5. Retornar resposta
  return response;
}`,
  },
  {
    icon: Shield,
    title: "Controle e Monitoramento",
    description: "Logs centralizados, métricas de performance, guardrails de segurança e observabilidade dedicada.",
    benefits: [
      "Visibilidade completa",
      "Detecção de problemas",
      "Segurança",
      "Compliance",
    ],
    code: `// Monitoramento e Logging
import { logger } from './logger';
import { metrics } from './metrics';

async function chatWithMonitoring(message: string) {
  const startTime = Date.now();
  
  try {
    // Guardrails de segurança
    if (containsSensitiveData(message)) {
      logger.warn('Sensitive data detected', { message });
      throw new Error('Sensitive data not allowed');
    }
    
    const response = await llmService.chat(message);
    
    // Métricas
    metrics.increment('chat.requests');
    metrics.timing('chat.response_time', Date.now() - startTime);
    
    // Logs
    logger.info('Chat completed', {
      messageLength: message.length,
      responseLength: response.length,
      duration: Date.now() - startTime,
    });
    
    return response;
  } catch (error) {
    metrics.increment('chat.errors');
    logger.error('Chat error', { error, message });
    throw error;
  }
}`,
  },
];

export default function Architecture() {
  return (
    <Section id="arquitetura" title="Arquitetura Técnica" subtitle="Estruturas modernas para construir assistentes de IA escaláveis">
      <div className="space-y-12">
        {/* Componentes de Arquitetura */}
        {architectureComponents.map((component, index) => (
          <motion.div
            key={component.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="grid md:grid-cols-2 gap-8 items-start"
          >
            <Card>
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30">
                  <component.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-dark-100 mb-2">{component.title}</h3>
                  <p className="text-dark-300 mb-4">{component.description}</p>
                  <div>
                    <p className="text-sm font-semibold text-primary-400 mb-2">Benefícios:</p>
                    <ul className="space-y-1">
                      {component.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-dark-400 flex items-center gap-2">
                          <span className="text-green-400">✓</span> {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
            <CodeBlock code={component.code} language="typescript" title={component.title} />
          </motion.div>
        ))}

        {/* Diagrama de Arquitetura Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h3 className="text-2xl font-semibold text-dark-100 mb-6">Arquitetura Completa</h3>
            <div className="relative p-8 bg-dark-800 rounded-lg border border-dark-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Frontend */}
                <div className="space-y-4">
                  <div className="text-center font-semibold text-primary-400 mb-4">Frontend</div>
                  <div className="p-4 bg-dark-900 rounded border border-primary-500/30 text-center">
                    <div className="text-sm text-dark-300">Web App</div>
                    <div className="text-xs text-dark-500 mt-1">React/Next.js</div>
                  </div>
                  <div className="p-4 bg-dark-900 rounded border border-primary-500/30 text-center">
                    <div className="text-sm text-dark-300">Mobile App</div>
                    <div className="text-xs text-dark-500 mt-1">React Native</div>
                  </div>
                </div>

                {/* API Gateway */}
                <div className="space-y-4">
                  <div className="text-center font-semibold text-accent-400 mb-4">API Gateway</div>
                  <div className="p-4 bg-dark-900 rounded border border-accent-500/30 text-center">
                    <div className="text-sm text-dark-300">API Routes</div>
                    <div className="text-xs text-dark-500 mt-1">Next.js / Express</div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-accent-500 to-primary-500"></div>
                  </div>
                </div>

                {/* Backend Services */}
                <div className="space-y-4">
                  <div className="text-center font-semibold text-green-400 mb-4">Backend Services</div>
                  <div className="p-4 bg-dark-900 rounded border border-green-500/30 text-center">
                    <div className="text-sm text-dark-300">LLM Service</div>
                    <div className="text-xs text-dark-500 mt-1">Microserviço</div>
                  </div>
                  <div className="p-4 bg-dark-900 rounded border border-green-500/30 text-center">
                    <div className="text-sm text-dark-300">RAG Service</div>
                    <div className="text-xs text-dark-500 mt-1">Vector DB</div>
                  </div>
                  <div className="p-4 bg-dark-900 rounded border border-green-500/30 text-center">
                    <div className="text-sm text-dark-300">Backend API</div>
                    <div className="text-xs text-dark-500 mt-1">CRM/ERP</div>
                  </div>
                </div>
              </div>

              {/* Linhas de conexão */}
              <div className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-primary-500/50 via-accent-500/50 to-green-500/50 transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-3/4 w-1/4 h-0.5 bg-gradient-to-r from-accent-500/50 to-green-500/50 transform -translate-y-1/2"></div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

