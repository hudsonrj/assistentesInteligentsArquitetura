"use client";

import { Cloud, Database, Zap, Code2, Shield, TrendingUp, Users, Globe } from "lucide-react";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import CodeBlock from "@/components/ui/CodeBlock";
import Infographic from "@/components/ui/Infographic";
import { motion } from "framer-motion";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const providers = [
  {
    name: "OpenAI",
    icon: Zap,
    description: "Pioneira em modelos de linguagem de última geração (GPT-3, GPT-4). Oferece acesso via API própria e através do Microsoft Azure.",
    models: ["GPT-4", "GPT-3.5", "DALL-E", "Whisper"],
    features: ["Modelos mais avançados", "API simples", "Integração Azure"],
    code: `// Integração OpenAI
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Olá!" }],
});

console.log(completion.choices[0].message.content);`,
    color: "#10a37f",
  },
  {
    name: "Microsoft Azure",
    icon: Cloud,
    description: "Parceiro exclusivo do OpenAI para hospedagem dos modelos GPT. Oferece Azure OpenAI Service com controles empresariais.",
    models: ["GPT-4", "GPT-3.5", "DALL-E", "Embeddings"],
    features: ["Segurança empresarial", "Escalabilidade", "Integração Office"],
    code: `// Azure OpenAI
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const client = new OpenAIClient(
  endpoint,
  new AzureKeyCredential(apiKey)
);

const result = await client.getChatCompletions(
  "gpt-4",
  [{ role: "user", content: "Olá!" }]
);`,
    color: "#0078d4",
  },
  {
    name: "Google Cloud",
    icon: Database,
    description: "Vertex AI oferece acesso aos grandes modelos do Google (PaLM, Gemini) e ferramentas para construir modelos customizados.",
    models: ["Gemini", "PaLM 2", "Dialogflow", "Vertex AI"],
    features: ["Modelos próprios", "Integração GCP", "Dialogflow"],
    code: `// Google Cloud Vertex AI
import { VertexAI } from '@google-cloud/vertexai';

const vertexAI = new VertexAI({
  project: 'seu-projeto',
  location: 'us-central1',
});

const model = vertexAI.getGenerativeModel({
  model: 'gemini-pro',
});

const result = await model.generateContent('Olá!');`,
    color: "#4285f4",
  },
  {
    name: "Amazon Web Services",
    icon: Cloud,
    description: "Amazon Bedrock oferece acesso a múltiplos modelos foundation de parceiros através de um único endpoint.",
    models: ["Claude (Anthropic)", "Llama2", "Titan", "Jurassic"],
    features: ["Múltiplos modelos", "Bedrock", "Infraestrutura robusta"],
    code: `// AWS Bedrock
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "us-east-1" });

const response = await client.send(new InvokeModelCommand({
  modelId: "anthropic.claude-v2",
  body: JSON.stringify({
    prompt: "Olá!",
    max_tokens_to_sample: 300,
  }),
}));`,
    color: "#ff9900",
  },
  {
    name: "Hugging Face",
    icon: Code2,
    description: "Plataforma aberta focada em comunidade e modelos open-source. Model Hub com milhares de modelos pré-treinados.",
    models: ["BERT", "GPT-2", "BLOOM", "Llama", "Mistral"],
    features: ["Open-source", "Sem vendor lock-in", "Comunidade"],
    code: `// Hugging Face
import { HfInference } from '@huggingface/inference';

const hf = new HfInference('seu-token');

const result = await hf.textGeneration({
  model: 'mistralai/Mistral-7B-Instruct-v0.1',
  inputs: 'Olá!',
});`,
    color: "#ffd21e",
  },
];

// Dados de preços aproximados por 1M tokens (input) - valores em USD
const pricingData = [
  {
    provider: "OpenAI",
    "GPT-4": 30,
    "GPT-3.5": 0.5,
    color: "#10a37f",
  },
  {
    provider: "Azure",
    "GPT-4": 30,
    "GPT-3.5": 0.5,
    color: "#0078d4",
  },
  {
    provider: "Google Cloud",
    "Gemini Pro": 0.25,
    "PaLM 2": 0.2,
    color: "#4285f4",
  },
  {
    provider: "AWS",
    "Claude": 8,
    "Llama2": 0.75,
    color: "#ff9900",
  },
  {
    provider: "Hugging Face",
    "Open Source": 0,
    "Inference API": 0.2,
    color: "#ffd21e",
  },
];

// Dados para gráfico comparativo simples (preço médio por provedor)
const comparisonPricingData = [
  { name: "OpenAI GPT-4", preco: 30, modelo: "Premium" },
  { name: "OpenAI GPT-3.5", preco: 0.5, modelo: "Standard" },
  { name: "Azure GPT-4", preco: 30, modelo: "Premium" },
  { name: "Azure GPT-3.5", preco: 0.5, modelo: "Standard" },
  { name: "Google Gemini", preco: 0.25, modelo: "Econômico" },
  { name: "AWS Claude", preco: 8, modelo: "Intermediário" },
  { name: "AWS Llama2", preco: 0.75, modelo: "Econômico" },
  { name: "Hugging Face", preco: 0.2, modelo: "Open Source" },
];

const providerStats = [
  { icon: TrendingUp, label: "Crescimento", value: "300%", color: "#0ea5e9" },
  { icon: Users, label: "Usuários Ativos", value: "100M+", color: "#d946ef" },
  { icon: Globe, label: "Disponibilidade", value: "99.9%", color: "#10b981" },
  { icon: Zap, label: "Latência Média", value: "<500ms", color: "#f59e0b" },
];

export default function Providers() {
  const [selectedProvider, setSelectedProvider] = useState(0);

  return (
    <Section id="provedores" title="Provedores de IA e Infraestrutura" subtitle="Principais plataformas para construir assistentes de IA">
      <div className="space-y-12">
        {/* Infográfico de Provedores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Infographic
            title="Métricas dos Provedores de IA"
            items={providerStats}
            layout="grid"
          />
        </motion.div>
        {/* Grid de Provedores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider, index) => (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                hover
                className={`cursor-pointer transition-all ${
                  selectedProvider === index ? "ring-2 ring-primary-500" : ""
                }`}
                onClick={() => setSelectedProvider(index)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${provider.color}20`, borderColor: provider.color }}
                  >
                    <provider.icon className="w-6 h-6" style={{ color: provider.color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-100">{provider.name}</h3>
                </div>
                <p className="text-dark-300 text-sm mb-4">{provider.description}</p>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-primary-400">Modelos:</p>
                  <div className="flex flex-wrap gap-2">
                    {provider.models.map((model) => (
                      <span
                        key={model}
                        className="px-2 py-1 text-xs bg-dark-800 rounded border border-dark-700 text-dark-300"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-accent-400 mt-3">Diferenciais:</p>
                  <ul className="text-xs text-dark-400 space-y-1">
                    {provider.features.map((feature, i) => (
                      <li key={i}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Exemplo de Código do Provedor Selecionado */}
        <motion.div
          key={selectedProvider}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h3 className="text-2xl font-semibold text-dark-100 mb-4">
              Exemplo de Integração - {providers[selectedProvider].name}
            </h3>
            <CodeBlock
              code={providers[selectedProvider].code}
              language="typescript"
              title={`Integração com ${providers[selectedProvider].name}`}
            />
          </Card>
        </motion.div>

        {/* Gráfico Comparativo de Preços */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h3 className="text-2xl font-semibold text-dark-100 mb-6">
              Comparação de Preços de APIs (USD por 1M tokens - Input)
            </h3>
            <p className="text-sm text-dark-400 mb-6">
              Valores aproximados para modelos principais. Preços podem variar conforme região, volume e modelo específico.
            </p>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={comparisonPricingData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis 
                  stroke="#94a3b8"
                  label={{ value: 'Preço (USD)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }}
                  scale="log"
                  domain={[0.1, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                  labelFormatter={(label) => `Modelo: ${label}`}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                />
                <Bar 
                  dataKey="preco" 
                  fill="#0ea5e9"
                  name="Preço por 1M tokens (USD)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 p-4 bg-dark-800 rounded-lg border border-dark-700">
              <p className="text-xs text-dark-400 mb-2">
                <span className="font-semibold text-primary-400">Nota:</span> Os preços são aproximados e podem variar. 
                Consulte os sites oficiais dos provedores para valores atualizados. Preços em escala logarítmica para melhor visualização.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4 text-xs text-dark-400">
                <div>
                  <p className="font-semibold text-dark-300 mb-1">Modelos Premium:</p>
                  <p>GPT-4, Claude - Melhor qualidade, preço mais alto</p>
                </div>
                <div>
                  <p className="font-semibold text-dark-300 mb-1">Modelos Econômicos:</p>
                  <p>GPT-3.5, Gemini, Llama2 - Boa relação custo-benefício</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Comparação Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h3 className="text-2xl font-semibold text-dark-100 mb-6">Comparação de Provedores</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="pb-4 text-dark-300 font-semibold">Provedor</th>
                    <th className="pb-4 text-dark-300 font-semibold">Modelos Principais</th>
                    <th className="pb-4 text-dark-300 font-semibold">Diferencial</th>
                    <th className="pb-4 text-dark-300 font-semibold">Ideal Para</th>
                  </tr>
                </thead>
                <tbody className="text-dark-400">
                  {providers.map((provider) => (
                    <tr key={provider.name} className="border-b border-dark-800">
                      <td className="py-4 font-medium text-dark-200">{provider.name}</td>
                      <td className="py-4">
                        <div className="flex flex-wrap gap-1">
                          {provider.models.slice(0, 2).map((model) => (
                            <span key={model} className="text-xs bg-dark-800 px-2 py-1 rounded">
                              {model}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 text-sm">{provider.features[0]}</td>
                      <td className="py-4 text-sm">
                        {provider.name === "OpenAI" && "Uso geral, APIs"}
                        {provider.name === "Microsoft Azure" && "Empresas, Office 365"}
                        {provider.name === "Google Cloud" && "Integração GCP, Apps"}
                        {provider.name === "Amazon Web Services" && "AWS, Escala"}
                        {provider.name === "Hugging Face" && "Open-source, Customização"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

