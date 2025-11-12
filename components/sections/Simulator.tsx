"use client";

import { Calculator, Server, Network, Globe, Users, MessageSquare, DollarSign } from "lucide-react";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Opções de Infraestrutura
const infrastructureOptions = [
  { id: "serverless", name: "Serverless (AWS Lambda, Azure Functions)", costPerMillion: 0.2, baseCost: 0 },
  { id: "containers", name: "Containers (Kubernetes, Docker)", costPerMillion: 0.15, baseCost: 200 },
  { id: "vm", name: "VMs (EC2, Azure VM)", costPerMillion: 0.1, baseCost: 500 },
  { id: "dedicated", name: "Servidores Dedicados", costPerMillion: 0.05, baseCost: 2000 },
];

// Opções de Arquitetura
const architectureOptions = [
  { id: "monolith", name: "Monolito", multiplier: 1.0, complexity: "Baixa" },
  { id: "microservices", name: "Microsserviços", multiplier: 1.2, complexity: "Média" },
  { id: "serverless-arch", name: "Serverless Completo", multiplier: 1.1, complexity: "Média" },
  { id: "hybrid", name: "Híbrido (Microsserviços + Serverless)", multiplier: 1.3, complexity: "Alta" },
];

// Opções de Frontend
const frontendOptions = [
  { id: "web", name: "Web (React, Next.js)", costPerUser: 0, monthlyCost: 0 },
  { id: "mobile", name: "Mobile (React Native, Flutter)", costPerUser: 0.5, monthlyCost: 100 },
  { id: "desktop", name: "Desktop (Electron)", costPerUser: 0.3, monthlyCost: 50 },
  { id: "multi", name: "Multiplataforma", costPerUser: 0.8, monthlyCost: 200 },
];

// Opções de Entrega/Canais
const deliveryOptions = [
  { id: "web-widget", name: "Widget Web", costPerMillion: 0, setupCost: 0 },
  { id: "api", name: "API REST", costPerMillion: 0, setupCost: 0 },
  { id: "whatsapp", name: "WhatsApp Business API", costPerMillion: 0.05, setupCost: 100 },
  { id: "slack", name: "Slack Integration", costPerMillion: 0, setupCost: 50 },
  { id: "teams", name: "Microsoft Teams", costPerMillion: 0, setupCost: 50 },
  { id: "voice", name: "Voz (Telefonia)", costPerMillion: 0.1, setupCost: 200 },
  { id: "multi-channel", name: "Multi-canal", costPerMillion: 0.08, setupCost: 300 },
];

// Opções de Modelo de Cobrança
const billingOptions = [
  { id: "pay-per-use", name: "Pay-per-use", description: "Pague apenas pelo que usar" },
  { id: "subscription", name: "Assinatura Fixa", description: "Valor fixo mensal" },
  { id: "hybrid-billing", name: "Híbrido", description: "Base fixa + uso excedente" },
  { id: "freemium", name: "Freemium", description: "Gratuito até certo limite" },
];

// Provedores de IA e seus preços (por 1M tokens input)
const aiProviders = [
  // OpenAI
  { id: "openai-gpt4", name: "OpenAI GPT-4", costPerMillion: 30, category: "Premium" },
  { id: "openai-gpt4-turbo", name: "OpenAI GPT-4 Turbo", costPerMillion: 10, category: "Premium" },
  { id: "openai-gpt35", name: "OpenAI GPT-3.5 Turbo", costPerMillion: 0.5, category: "Standard" },
  { id: "openai-o1", name: "OpenAI O1", costPerMillion: 15, category: "Premium" },
  
  // Azure
  { id: "azure-gpt4", name: "Azure GPT-4", costPerMillion: 30, category: "Premium" },
  { id: "azure-gpt35", name: "Azure GPT-3.5", costPerMillion: 0.5, category: "Standard" },
  
  // Google
  { id: "google-gemini-pro", name: "Google Gemini Pro", costPerMillion: 0.25, category: "Econômico" },
  { id: "google-gemini-ultra", name: "Google Gemini Ultra", costPerMillion: 1.25, category: "Premium" },
  { id: "google-palm2", name: "Google PaLM 2", costPerMillion: 0.2, category: "Econômico" },
  
  // AWS/Anthropic
  { id: "aws-claude-3-opus", name: "AWS Claude 3 Opus", costPerMillion: 15, category: "Premium" },
  { id: "aws-claude-3-sonnet", name: "AWS Claude 3 Sonnet", costPerMillion: 3, category: "Standard" },
  { id: "aws-claude-3-haiku", name: "AWS Claude 3 Haiku", costPerMillion: 0.25, category: "Econômico" },
  { id: "aws-llama2", name: "AWS Llama2", costPerMillion: 0.75, category: "Econômico" },
  { id: "aws-llama3", name: "AWS Llama3", costPerMillion: 0.8, category: "Econômico" },
  
  // Outros provedores
  { id: "deepseek", name: "DeepSeek", costPerMillion: 0.14, category: "Econômico" },
  { id: "deepseek-chat", name: "DeepSeek Chat", costPerMillion: 0.14, category: "Econômico" },
  { id: "openrouter", name: "OpenRouter (Múltiplos modelos)", costPerMillion: 0.5, category: "Standard" },
  { id: "grok", name: "Grok (xAI)", costPerMillion: 0.5, category: "Standard" },
  { id: "groq", name: "Groq (Llama/Mixtral)", costPerMillion: 0.1, category: "Econômico" },
  { id: "nanos", name: "Nanos AI", costPerMillion: 0.3, category: "Econômico" },
  { id: "lft", name: "LFT AI", costPerMillion: 0.4, category: "Standard" },
  { id: "huggingface", name: "Hugging Face", costPerMillion: 0.2, category: "Econômico" },
  { id: "custom-model", name: "Modelo Próprio (Self-hosted)", costPerMillion: 0.05, category: "Custom", baseCost: 1000 },
  { id: "mistral", name: "Mistral AI", costPerMillion: 0.2, category: "Econômico" },
  { id: "cohere", name: "Cohere", costPerMillion: 1.5, category: "Standard" },
];

// Opções de RAG (Retrieval Augmented Generation)
const ragOptions = [
  { id: "none", name: "Sem RAG", costPerGB: 0, baseCost: 0 },
  { id: "pinecone", name: "Pinecone (Vector DB)", costPerGB: 70, baseCost: 0 },
  { id: "weaviate", name: "Weaviate Cloud", costPerGB: 25, baseCost: 0 },
  { id: "qdrant", name: "Qdrant Cloud", costPerGB: 20, baseCost: 0 },
  { id: "chroma", name: "Chroma (Self-hosted)", costPerGB: 0, baseCost: 100 },
  { id: "milvus", name: "Milvus (Self-hosted)", costPerGB: 0, baseCost: 200 },
  { id: "pgvector", name: "pgvector (PostgreSQL)", costPerGB: 5, baseCost: 50 },
  { id: "opensearch", name: "OpenSearch (AWS)", costPerGB: 10, baseCost: 0 },
];

// Opções de Storage
const storageOptions = [
  { id: "s3", name: "AWS S3", costPerGB: 0.023, baseCost: 0 },
  { id: "azure-blob", name: "Azure Blob Storage", costPerGB: 0.018, baseCost: 0 },
  { id: "gcp-storage", name: "Google Cloud Storage", costPerGB: 0.020, baseCost: 0 },
  { id: "supabase", name: "Supabase Storage", costPerGB: 0.021, baseCost: 0 },
  { id: "cloudflare-r2", name: "Cloudflare R2", costPerGB: 0.015, baseCost: 0 },
  { id: "local", name: "Storage Local", costPerGB: 0, baseCost: 50 },
];

// Ferramentas de Automação
const automationTools = [
  { id: "none", name: "Sem Automação", monthlyCost: 0, executionCost: 0 },
  { id: "n8n", name: "n8n Cloud", monthlyCost: 20, executionCost: 0.001 },
  { id: "n8n-self", name: "n8n Self-hosted", monthlyCost: 0, executionCost: 0 },
  { id: "make", name: "Make (Integromat)", monthlyCost: 9, executionCost: 0.0005 },
  { id: "zapier", name: "Zapier", monthlyCost: 20, executionCost: 0.002 },
  { id: "airplane", name: "Airplane", monthlyCost: 10, executionCost: 0.001 },
  { id: "windmill", name: "Windmill", monthlyCost: 0, executionCost: 0 },
  { id: "temporal", name: "Temporal Cloud", monthlyCost: 25, executionCost: 0.0003 },
];

// Tipos de Assistente
const assistantTypes = [
  { id: "text", name: "Assistente de Texto (Chatbot)", multiplier: 1.0, requiresSTT: false, requiresTTS: false, requiresTelephony: false },
  { id: "voice", name: "Assistente de Voz", multiplier: 1.3, requiresSTT: true, requiresTTS: true, requiresTelephony: false },
  { id: "ura", name: "URA Inteligente (IVR)", multiplier: 1.5, requiresSTT: true, requiresTTS: true, requiresTelephony: true },
  { id: "multimodal", name: "Multimodal (Texto + Voz)", multiplier: 1.4, requiresSTT: true, requiresTTS: true, requiresTelephony: false },
  { id: "contact-center", name: "Central de Atendimento", multiplier: 2.0, requiresSTT: true, requiresTTS: true, requiresTelephony: true },
];

// Speech-to-Text (STT) Providers
const sttProviders = [
  { id: "none", name: "Sem STT", costPerMinute: 0 },
  { id: "openai-whisper", name: "OpenAI Whisper", costPerMinute: 0.006 },
  { id: "google-stt", name: "Google Cloud STT (Standard)", costPerMinute: 0.024 },
  { id: "google-stt-enhanced", name: "Google Cloud STT (Enhanced)", costPerMinute: 0.036 },
  { id: "azure-stt", name: "Azure Speech-to-Text", costPerMinute: 0.017 },
  { id: "amazon-transcribe", name: "Amazon Transcribe", costPerMinute: 0.024 },
  { id: "assemblyai", name: "AssemblyAI", costPerMinute: 0.015 },
  { id: "deepgram", name: "Deepgram", costPerMinute: 0.0125 },
];

// Text-to-Speech (TTS) Providers
const ttsProviders = [
  { id: "none", name: "Sem TTS", costPerMillion: 0 },
  { id: "openai-tts", name: "OpenAI TTS (Standard)", costPerMillion: 15 },
  { id: "openai-tts-hd", name: "OpenAI TTS HD", costPerMillion: 30 },
  { id: "google-tts-standard", name: "Google TTS (Standard)", costPerMillion: 4 },
  { id: "google-tts-wavenet", name: "Google TTS (WaveNet)", costPerMillion: 16 },
  { id: "google-tts-neural", name: "Google TTS (Neural2)", costPerMillion: 16 },
  { id: "azure-tts", name: "Azure TTS (Neural)", costPerMillion: 15 },
  { id: "amazon-polly-standard", name: "Amazon Polly (Standard)", costPerMillion: 4 },
  { id: "amazon-polly-neural", name: "Amazon Polly (Neural)", costPerMillion: 16 },
  { id: "elevenlabs-starter", name: "ElevenLabs (30K chars)", costPerMillion: 167, monthlyCost: 5 },
  { id: "elevenlabs-creator", name: "ElevenLabs (100K chars)", costPerMillion: 220, monthlyCost: 22 },
  { id: "playht", name: "Play.ht", costPerMillion: 63, monthlyCost: 19 },
  { id: "resemble", name: "Resemble AI", costPerMillion: 200 },
];

// Telefonia/VoIP Providers
const telephonyProviders = [
  { id: "none", name: "Sem Telefonia", costPerMinuteInbound: 0, costPerMinuteOutbound: 0, monthlyCost: 0 },
  { id: "twilio", name: "Twilio", costPerMinuteInbound: 0.0085, costPerMinuteOutbound: 0.013, monthlyCost: 1 },
  { id: "plivo", name: "Plivo", costPerMinuteInbound: 0.0050, costPerMinuteOutbound: 0.0140, monthlyCost: 1 },
  { id: "vonage", name: "Vonage/Nexmo", costPerMinuteInbound: 0.0070, costPerMinuteOutbound: 0.0468, monthlyCost: 0 },
  { id: "signalwire", name: "SignalWire", costPerMinuteInbound: 0.0040, costPerMinuteOutbound: 0.0120, monthlyCost: 0 },
  { id: "totalvoice", name: "Total Voice (BR)", costPerMinuteInbound: 0.0060, costPerMinuteOutbound: 0.0150, monthlyCost: 0 },
  { id: "bandwidth", name: "Bandwidth", costPerMinuteInbound: 0.0045, costPerMinuteOutbound: 0.0130, monthlyCost: 0 },
];

// Contact Center Platforms (opcional)
const contactCenterOptions = [
  { id: "none", name: "Sem Contact Center", costPerAgent: 0, minimumAgents: 0 },
  { id: "twilio-flex", name: "Twilio Flex", costPerAgent: 150, minimumAgents: 5 },
  { id: "amazon-connect", name: "Amazon Connect", costPerAgent: 60, minimumAgents: 1 },
  { id: "genesys", name: "Genesys Cloud 2", costPerAgent: 110, minimumAgents: 5 },
  { id: "five9", name: "Five9 Premium", costPerAgent: 169, minimumAgents: 5 },
  { id: "ringcentral", name: "RingCentral Standard", costPerAgent: 80, minimumAgents: 1 },
  { id: "talkdesk", name: "Talkdesk Elevate", costPerAgent: 95, minimumAgents: 5 },
  { id: "zendesk", name: "Zendesk Talk + Support", costPerAgent: 128, minimumAgents: 1 },
  { id: "zenvia", name: "Zenvia (BR)", costPerAgent: 50, minimumAgents: 1 },
  { id: "huggy", name: "Huggy Pro (BR)", costPerAgent: 40, minimumAgents: 1 },
  { id: "movidesk", name: "Movidesk Pro (BR)", costPerAgent: 13, minimumAgents: 1 },
  { id: "chatwoot", name: "Chatwoot Cloud", costPerAgent: 19, minimumAgents: 1 },
];

export default function Simulator() {
  const [callsPerMonth, setCallsPerMonth] = useState(100000);
  const [users, setUsers] = useState(1000);
  const [storageGB, setStorageGB] = useState(100);
  const [ragDocuments, setRagDocuments] = useState(1000);
  const [automationExecutions, setAutomationExecutions] = useState(10000);
  const [voiceMinutesPerMonth, setVoiceMinutesPerMonth] = useState(5000);
  const [numberOfAgents, setNumberOfAgents] = useState(5);
  const [inboundCallRatio, setInboundCallRatio] = useState(60); // % de chamadas recebidas

  const [selectedAssistantType, setSelectedAssistantType] = useState("text");
  const [selectedInfra, setSelectedInfra] = useState("serverless");
  const [selectedArch, setSelectedArch] = useState("microservices");
  const [selectedFrontend, setSelectedFrontend] = useState("web");
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>(["web-widget"]);
  const [selectedBilling, setSelectedBilling] = useState("pay-per-use");
  const [selectedAIProvider, setSelectedAIProvider] = useState("openai-gpt35");
  const [selectedRAG, setSelectedRAG] = useState("none");
  const [selectedStorage, setSelectedStorage] = useState("s3");
  const [selectedAutomation, setSelectedAutomation] = useState("none");
  const [selectedSTT, setSelectedSTT] = useState("openai-whisper");
  const [selectedTTS, setSelectedTTS] = useState("openai-tts");
  const [selectedTelephony, setSelectedTelephony] = useState("none");
  const [selectedContactCenter, setSelectedContactCenter] = useState("none");

  // Calcular custos
  const calculateCosts = () => {
    const assistantType = assistantTypes.find((t) => t.id === selectedAssistantType)!;
    const infra = infrastructureOptions.find((i) => i.id === selectedInfra)!;
    const arch = architectureOptions.find((a) => a.id === selectedArch)!;
    const frontend = frontendOptions.find((f) => f.id === selectedFrontend)!;
    const aiProvider = aiProviders.find((p) => p.id === selectedAIProvider)!;
    const rag = ragOptions.find((r) => r.id === selectedRAG)!;
    const storage = storageOptions.find((s) => s.id === selectedStorage)!;
    const automation = automationTools.find((a) => a.id === selectedAutomation)!;
    const stt = sttProviders.find((s) => s.id === selectedSTT)!;
    const tts = ttsProviders.find((t) => t.id === selectedTTS)!;
    const telephony = telephonyProviders.find((t) => t.id === selectedTelephony)!;
    const contactCenter = contactCenterOptions.find((c) => c.id === selectedContactCenter)!;

    // Custo de infraestrutura base
    const infraBaseCost = infra.baseCost;
    const infraUsageCost = (callsPerMonth / 1000000) * infra.costPerMillion * arch.multiplier * assistantType.multiplier;

    // Custo de IA (maior componente) + base cost se houver
    const aiBaseCost = aiProvider.baseCost || 0;
    const aiCost = (callsPerMonth / 1000000) * aiProvider.costPerMillion + aiBaseCost;

    // Custo de frontend
    const frontendCost = frontend.monthlyCost + (users * frontend.costPerUser);

    // Custo de entrega/canais
    const deliveryCosts = selectedDelivery.reduce((total, deliveryId) => {
      const delivery = deliveryOptions.find((d) => d.id === deliveryId)!;
      return total + delivery.setupCost + ((callsPerMonth / 1000000) * delivery.costPerMillion);
    }, 0);

    // Custo de RAG (vector database)
    // Assumindo ~1KB por documento para embeddings
    const ragGB = ragDocuments * 0.001; // Converter documentos para GB aproximado
    const ragCost = rag.baseCost + (ragGB * rag.costPerGB);

    // Custo de Storage
    const storageCost = storage.baseCost + (storageGB * storage.costPerGB);

    // Custo de Automação
    const automationCost = automation.monthlyCost + (automationExecutions * automation.executionCost);

    // Custo de Speech-to-Text (STT)
    const sttCost = assistantType.requiresSTT ? voiceMinutesPerMonth * stt.costPerMinute : 0;

    // Custo de Text-to-Speech (TTS)
    // Estimando ~200 caracteres por resposta de voz
    const ttsCharacters = assistantType.requiresTTS ? (voiceMinutesPerMonth * 150) : 0; // ~150 chars/min
    const ttsBaseCost = tts.monthlyCost || 0;
    const ttsCost = assistantType.requiresTTS ? ttsBaseCost + ((ttsCharacters / 1000000) * tts.costPerMillion) : 0;

    // Custo de Telefonia
    const inboundMinutes = voiceMinutesPerMonth * (inboundCallRatio / 100);
    const outboundMinutes = voiceMinutesPerMonth * ((100 - inboundCallRatio) / 100);
    const telephonyCost = assistantType.requiresTelephony
      ? telephony.monthlyCost + (inboundMinutes * telephony.costPerMinuteInbound) + (outboundMinutes * telephony.costPerMinuteOutbound)
      : 0;

    // Custo de Contact Center
    const effectiveAgents = Math.max(numberOfAgents, contactCenter.minimumAgents);
    const contactCenterCost = contactCenter.id !== "none" ? effectiveAgents * contactCenter.costPerAgent : 0;

    // Custo total
    const totalCost = infraBaseCost + infraUsageCost + aiCost + frontendCost + deliveryCosts + ragCost + storageCost + automationCost + sttCost + ttsCost + telephonyCost + contactCenterCost;

    // Aplicar modelo de cobrança
    let finalCost = totalCost;
    let breakdown = {
      infra: infraBaseCost + infraUsageCost,
      ai: aiCost,
      frontend: frontendCost,
      delivery: deliveryCosts,
      rag: ragCost,
      storage: storageCost,
      automation: automationCost,
      stt: sttCost,
      tts: ttsCost,
      telephony: telephonyCost,
      contactCenter: contactCenterCost,
      total: totalCost,
    };

    if (selectedBilling === "subscription") {
      // Assinatura fixa: média dos últimos 3 meses ou mínimo
      finalCost = Math.max(totalCost * 0.8, 500);
      breakdown.total = finalCost;
    } else if (selectedBilling === "hybrid-billing") {
      // Híbrido: base fixa + excedente
      const baseCost = 300;
      const excessCost = Math.max(0, totalCost - 1000) * 0.5;
      finalCost = baseCost + excessCost;
      breakdown.total = finalCost;
    } else if (selectedBilling === "freemium") {
      // Freemium: grátis até 10k chamadas
      if (callsPerMonth <= 10000) {
        finalCost = 0;
      } else {
        finalCost = (callsPerMonth - 10000) / 1000000 * aiProvider.costPerMillion;
      }
      breakdown.total = finalCost;
    }

    return { ...breakdown, final: finalCost };
  };

  const costs = calculateCosts();

  // Dados para gráfico de pizza
  const pieData = [
    { name: "Infraestrutura", value: costs.infra, color: "#0ea5e9" },
    { name: "IA/LLM", value: costs.ai, color: "#d946ef" },
    { name: "Frontend", value: costs.frontend, color: "#10b981" },
    { name: "Entrega/Canais", value: costs.delivery, color: "#f59e0b" },
    { name: "RAG/Vector DB", value: costs.rag, color: "#8b5cf6" },
    { name: "Storage", value: costs.storage, color: "#06b6d4" },
    { name: "Automação", value: costs.automation, color: "#ef4444" },
    { name: "Speech-to-Text", value: costs.stt, color: "#3b82f6" },
    { name: "Text-to-Speech", value: costs.tts, color: "#ec4899" },
    { name: "Telefonia/VoIP", value: costs.telephony, color: "#14b8a6" },
    { name: "Contact Center", value: costs.contactCenter, color: "#f97316" },
  ].filter((item) => item.value > 0);

  const handleDeliveryToggle = (deliveryId: string) => {
    setSelectedDelivery((prev) =>
      prev.includes(deliveryId)
        ? prev.filter((id) => id !== deliveryId)
        : [...prev, deliveryId]
    );
  };

  return (
    <Section id="simulador" title="Simulador de Custos" subtitle="Calcule os custos do seu assistente de IA baseado em suas escolhas">
      <div className="space-y-8">
        {/* Controles Principais */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-6 h-6 text-primary-400" />
              <h3 className="text-xl font-semibold text-dark-100">Volume de Uso</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Chamadas por Mês: {callsPerMonth.toLocaleString("pt-BR")}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={callsPerMonth}
                  onChange={(e) => setCallsPerMonth(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-dark-500 mt-1">
                  <span>1K</span>
                  <span>10M</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Usuários Ativos: {users.toLocaleString("pt-BR")}
                </label>
                <input
                  type="range"
                  min="10"
                  max="100000"
                  step="10"
                  value={users}
                  onChange={(e) => setUsers(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-dark-500 mt-1">
                  <span>10</span>
                  <span>100K</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Storage (GB): {storageGB.toLocaleString("pt-BR")}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10000"
                  step="10"
                  value={storageGB}
                  onChange={(e) => setStorageGB(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-dark-500 mt-1">
                  <span>1 GB</span>
                  <span>10 TB</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Documentos RAG: {ragDocuments.toLocaleString("pt-BR")}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="100"
                  value={ragDocuments}
                  onChange={(e) => setRagDocuments(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-dark-500 mt-1">
                  <span>0</span>
                  <span>1M</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">
                  Execuções de Automação/mês: {automationExecutions.toLocaleString("pt-BR")}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="1000"
                  value={automationExecutions}
                  onChange={(e) => setAutomationExecutions(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-dark-500 mt-1">
                  <span>0</span>
                  <span>1M</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Resultado Total */}
          <Card className="bg-gradient-to-br from-primary-500/10 to-accent-500/10 border-primary-500/30">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-primary-400" />
              <h3 className="text-xl font-semibold text-dark-100">Custo Mensal Estimado</h3>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">
                {formatCurrency(costs.final)}
              </div>
              <p className="text-sm text-dark-400">
                Baseado em {callsPerMonth.toLocaleString("pt-BR")} chamadas, {users.toLocaleString("pt-BR")} usuários, {storageGB.toLocaleString("pt-BR")} GB storage, {ragDocuments.toLocaleString("pt-BR")} docs RAG e {automationExecutions.toLocaleString("pt-BR")} execuções de automação
              </p>
            </div>
          </Card>
        </div>

        {/* Opções de Configuração */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Infraestrutura */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-primary-400" />
              <h3 className="font-semibold text-dark-100">Infraestrutura</h3>
            </div>
            <div className="space-y-2">
              {infrastructureOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-2 p-2 rounded cursor-pointer transition-colors ${
                    selectedInfra === option.id
                      ? "bg-primary-500/20 border border-primary-500/50"
                      : "hover:bg-dark-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="infra"
                    value={option.id}
                    checked={selectedInfra === option.id}
                    onChange={(e) => setSelectedInfra(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-dark-200">{option.name}</div>
                    <div className="text-xs text-dark-400">
                      Base: {formatCurrency(option.baseCost)}/mês
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Arquitetura */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Network className="w-5 h-5 text-accent-400" />
              <h3 className="font-semibold text-dark-100">Arquitetura</h3>
            </div>
            <div className="space-y-2">
              {architectureOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-2 p-2 rounded cursor-pointer transition-colors ${
                    selectedArch === option.id
                      ? "bg-accent-500/20 border border-accent-500/50"
                      : "hover:bg-dark-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="arch"
                    value={option.id}
                    checked={selectedArch === option.id}
                    onChange={(e) => setSelectedArch(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-dark-200">{option.name}</div>
                    <div className="text-xs text-dark-400">
                      Multiplicador: {option.multiplier}x
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Frontend */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-dark-100">Frontend</h3>
            </div>
            <div className="space-y-2">
              {frontendOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-2 p-2 rounded cursor-pointer transition-colors ${
                    selectedFrontend === option.id
                      ? "bg-green-500/20 border border-green-500/50"
                      : "hover:bg-dark-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="frontend"
                    value={option.id}
                    checked={selectedFrontend === option.id}
                    onChange={(e) => setSelectedFrontend(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-dark-200">{option.name}</div>
                    <div className="text-xs text-dark-400">
                      {formatCurrency(option.monthlyCost)}/mês
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Provedor de IA */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold text-dark-100">Provedor de IA</h3>
            </div>
            <select
              value={selectedAIProvider}
              onChange={(e) => setSelectedAIProvider(e.target.value)}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {aiProviders.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} - ${provider.costPerMillion}/1M tokens ({provider.category})
                </option>
              ))}
            </select>
          </Card>
        </div>

        {/* RAG, Storage e Automação */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* RAG */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Network className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-dark-100">RAG / Vector DB</h3>
            </div>
            <div className="space-y-2">
              {ragOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-2 p-2 rounded cursor-pointer transition-colors ${
                    selectedRAG === option.id
                      ? "bg-purple-500/20 border border-purple-500/50"
                      : "hover:bg-dark-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="rag"
                    value={option.id}
                    checked={selectedRAG === option.id}
                    onChange={(e) => setSelectedRAG(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-dark-200">{option.name}</div>
                    {option.baseCost > 0 && (
                      <div className="text-xs text-dark-400">
                        Base: {formatCurrency(option.baseCost)}/mês
                      </div>
                    )}
                    {option.costPerGB > 0 && (
                      <div className="text-xs text-dark-400">
                        {formatCurrency(option.costPerGB)}/GB
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Storage */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-cyan-400" />
              <h3 className="font-semibold text-dark-100">Storage</h3>
            </div>
            <div className="space-y-2">
              {storageOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-2 p-2 rounded cursor-pointer transition-colors ${
                    selectedStorage === option.id
                      ? "bg-cyan-500/20 border border-cyan-500/50"
                      : "hover:bg-dark-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="storage"
                    value={option.id}
                    checked={selectedStorage === option.id}
                    onChange={(e) => setSelectedStorage(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-dark-200">{option.name}</div>
                    {option.baseCost > 0 && (
                      <div className="text-xs text-dark-400">
                        Base: {formatCurrency(option.baseCost)}/mês
                      </div>
                    )}
                    <div className="text-xs text-dark-400">
                      {formatCurrency(option.costPerGB)}/GB/mês
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Automação */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-red-400" />
              <h3 className="font-semibold text-dark-100">Automação</h3>
            </div>
            <div className="space-y-2">
              {automationTools.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-2 p-2 rounded cursor-pointer transition-colors ${
                    selectedAutomation === option.id
                      ? "bg-red-500/20 border border-red-500/50"
                      : "hover:bg-dark-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="automation"
                    value={option.id}
                    checked={selectedAutomation === option.id}
                    onChange={(e) => setSelectedAutomation(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-dark-200">{option.name}</div>
                    {option.monthlyCost > 0 && (
                      <div className="text-xs text-dark-400">
                        {formatCurrency(option.monthlyCost)}/mês
                      </div>
                    )}
                    {option.executionCost > 0 && (
                      <div className="text-xs text-dark-400">
                        {formatCurrency(option.executionCost)}/execução
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </Card>
        </div>

        {/* Canais de Entrega */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-dark-100">Canais de Entrega</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {deliveryOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center gap-2 p-3 rounded cursor-pointer transition-colors border ${
                  selectedDelivery.includes(option.id)
                    ? "bg-purple-500/20 border-purple-500/50"
                    : "bg-dark-800 border-dark-700 hover:border-dark-600"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedDelivery.includes(option.id)}
                  onChange={() => handleDeliveryToggle(option.id)}
                  className="rounded"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-dark-200">{option.name}</div>
                  {option.setupCost > 0 && (
                    <div className="text-xs text-dark-400">
                      Setup: {formatCurrency(option.setupCost)}
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </Card>

        {/* Modelo de Cobrança */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-dark-100">Modelo de Cobrança</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {billingOptions.map((option) => (
              <label
                key={option.id}
                className={`flex flex-col gap-2 p-3 rounded cursor-pointer transition-colors border ${
                  selectedBilling === option.id
                    ? "bg-red-500/20 border-red-500/50"
                    : "bg-dark-800 border-dark-700 hover:border-dark-600"
                }`}
              >
                <input
                  type="radio"
                  name="billing"
                  value={option.id}
                  checked={selectedBilling === option.id}
                  onChange={(e) => setSelectedBilling(e.target.value)}
                  className="self-start"
                />
                <div>
                  <div className="text-sm font-medium text-dark-200">{option.name}</div>
                  <div className="text-xs text-dark-400">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </Card>

        {/* Gráficos de Breakdown */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-xl font-semibold text-dark-100 mb-6">Distribuição de Custos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-dark-100 mb-6">Breakdown Detalhado</h3>
            <div className="space-y-4">
              {pieData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-dark-200">{item.name}</span>
                    <span className="text-sm font-bold text-primary-400">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                  <div className="w-full bg-dark-800 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(item.value / costs.total) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-dark-700 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-dark-100">Total Mensal</span>
                  <span className="text-2xl font-bold gradient-text">
                    {formatCurrency(costs.final)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Projeção Anual */}
        <Card>
          <h3 className="text-xl font-semibold text-dark-100 mb-6">Projeção Anual</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-dark-800 rounded-lg border border-dark-700">
              <div className="text-sm text-dark-400 mb-1">Custo Mensal</div>
              <div className="text-2xl font-bold text-primary-400">
                {formatCurrency(costs.final)}
              </div>
            </div>
            <div className="p-4 bg-dark-800 rounded-lg border border-dark-700">
              <div className="text-sm text-dark-400 mb-1">Custo Anual</div>
              <div className="text-2xl font-bold text-accent-400">
                {formatCurrency(costs.final * 12)}
              </div>
            </div>
            <div className="p-4 bg-dark-800 rounded-lg border border-dark-700">
              <div className="text-sm text-dark-400 mb-1">Custo por Chamada</div>
              <div className="text-2xl font-bold text-green-400">
                {formatCurrency(costs.final / callsPerMonth)}
              </div>
            </div>
            <div className="p-4 bg-dark-800 rounded-lg border border-dark-700">
              <div className="text-sm text-dark-400 mb-1">Custo por Usuário</div>
              <div className="text-2xl font-bold text-yellow-400">
                {formatCurrency(costs.final / users)}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

