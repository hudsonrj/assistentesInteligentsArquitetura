"use client";

import { Target, Link2, Rocket, Shield, Zap, TrendingUp, DollarSign, Users, Clock } from "lucide-react";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Infographic from "@/components/ui/Infographic";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const strategies = [
  {
    icon: Target,
    title: "Especialização e Verticalização",
    description: "Focar em setores específicos ou casos de uso bem definidos, oferecendo soluções sob medida.",
    example: "Assistentes jurídicos (Harvey AI), médicos, financeiros especializados",
    impact: "Alta",
    color: "#0ea5e9",
  },
  {
    icon: Link2,
    title: "Integração Omnichannel",
    description: "Integrar assistentes em CRMs, suítes de produtividade e múltiplos canais de comunicação.",
    example: "Salesforce Einstein GPT, Microsoft Copilot integrado ao Office 365",
    impact: "Muito Alta",
    color: "#d946ef",
  },
  {
    icon: Rocket,
    title: "Aumento de Autonomia (Agentes)",
    description: "Assistentes que executam ações completas de forma autônoma, não apenas respondem perguntas.",
    example: "ServiceNow Now Assist - US$250M em ACV, projeção de US$1B até 2026",
    impact: "Muito Alta",
    color: "#10b981",
  },
  {
    icon: Shield,
    title: "Confiança e Compliance",
    description: "Posicionamento de IA confiável com guardrails robustos, privacidade e conformidade regulatória.",
    example: "IBM Watson com foco em AI Ethics e hospedagem on-premises",
    impact: "Alta",
    color: "#f59e0b",
  },
  {
    icon: Zap,
    title: "Time-to-Market Rápido",
    description: "Agilidade em inovar, lançar funcionalidades cedo e melhorar constantemente o assistente.",
    example: "OpenAI rapidamente adicionou voz e imagem ao ChatGPT",
    impact: "Média",
    color: "#8b5cf6",
  },
  {
    icon: TrendingUp,
    title: "ROI e Métricas Claras",
    description: "Quantificar benefícios tangíveis: redução de tempo, aumento de conversão, resolução automática.",
    example: "Nubank: 55% consultas resolvidas, 70% redução tempo resposta",
    impact: "Alta",
    color: "#ef4444",
  },
];

const roiData = [
  { month: "Jan", conversao: 20, resolucao: 30, satisfacao: 65 },
  { month: "Fev", conversao: 25, resolucao: 40, satisfacao: 70 },
  { month: "Mar", conversao: 32, resolucao: 48, resolucao: 75 },
  { month: "Abr", conversao: 38, resolucao: 52, satisfacao: 78 },
  { month: "Mai", conversao: 42, resolucao: 55, satisfacao: 82 },
  { month: "Jun", conversao: 46, resolucao: 55, satisfacao: 85 },
];

const adoptionData = [
  { year: 2023, adoption: 15 },
  { year: 2024, adoption: 35 },
  { year: 2025, adoption: 60 },
  { year: 2026, adoption: 85 },
];

const businessStats = [
  { icon: DollarSign, label: "ROI Médio", value: "340%", color: "#0ea5e9" },
  { icon: Users, label: "Redução de Custos", value: "70%", color: "#d946ef" },
  { icon: Clock, label: "Tempo de Resposta", value: "-85%", color: "#10b981" },
  { icon: TrendingUp, label: "Aumento de Vendas", value: "46%", color: "#f59e0b" },
];

export default function BusinessModels() {
  return (
    <Section id="negocios" title="Modelos de Negócio e Posicionamento" subtitle="Estratégias para se diferenciar no mercado de assistentes de IA">
      <div className="space-y-12">
        {/* Infográfico de Negócios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Infographic
            title="Impacto dos Assistentes de IA nos Negócios"
            items={businessStats}
            layout="grid"
          />
        </motion.div>
        {/* Cards de Estratégias */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover>
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${strategy.color}20`, borderColor: strategy.color }}
                  >
                    <strategy.icon className="w-6 h-6" style={{ color: strategy.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-dark-100 mb-2">{strategy.title}</h3>
                    <p className="text-dark-300 text-sm mb-3">{strategy.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 rounded bg-dark-800 text-dark-400">
                        Impacto: {strategy.impact}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-dark-700">
                  <p className="text-xs text-dark-400">
                    <span className="font-semibold text-primary-400">Exemplo:</span> {strategy.example}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Gráfico de ROI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h3 className="text-2xl font-semibold text-dark-100 mb-6">Evolução de Métricas (Exemplo Real)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="conversao"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  name="Aumento Conversão (%)"
                />
                <Line
                  type="monotone"
                  dataKey="resolucao"
                  stroke="#d946ef"
                  strokeWidth={2}
                  name="Resolução Automática (%)"
                />
                <Line
                  type="monotone"
                  dataKey="satisfacao"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Satisfação (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Timeline de Adoção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h3 className="text-2xl font-semibold text-dark-100 mb-6">Projeção de Adoção de Assistentes de IA</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={adoptionData}>
                <defs>
                  <linearGradient id="colorAdoption" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => `${value}%`}
                />
                <Area
                  type="monotone"
                  dataKey="adoption"
                  stroke="#0ea5e9"
                  fillOpacity={1}
                  fill="url(#colorAdoption)"
                  name="Adoção (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-sm text-dark-400 mt-4 text-center">
              Projeção: Até 30% dos novos aplicativos até 2026 terão agentes de IA embutidos
            </p>
          </Card>
        </motion.div>

        {/* Cases de Sucesso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h3 className="text-2xl font-semibold text-dark-100 mb-6">Cases de Sucesso</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-dark-800 rounded-lg border border-dark-700">
                <h4 className="text-lg font-semibold text-primary-400 mb-2">Nubank</h4>
                <ul className="space-y-2 text-sm text-dark-300">
                  <li>• 55% das consultas resolvidas automaticamente</li>
                  <li>• 70% de redução no tempo de resposta</li>
                  <li>• Mais de 2 milhões de conversas/mês</li>
                </ul>
              </div>
              <div className="p-6 bg-dark-800 rounded-lg border border-dark-700">
                <h4 className="text-lg font-semibold text-accent-400 mb-2">Grupo Boticário</h4>
                <ul className="space-y-2 text-sm text-dark-300">
                  <li>• +46% de aumento na taxa de conversão</li>
                  <li>• Ticket médio 7,4% maior</li>
                  <li>• Assistente virtual de beleza integrado</li>
                </ul>
              </div>
              <div className="p-6 bg-dark-800 rounded-lg border border-dark-700">
                <h4 className="text-lg font-semibold text-green-400 mb-2">ServiceNow</h4>
                <ul className="space-y-2 text-sm text-dark-300">
                  <li>• US$250M em ACV (Annual Contract Value)</li>
                  <li>• Projeção de US$1B até 2026</li>
                  <li>• Agentes autônomos para automação</li>
                </ul>
              </div>
              <div className="p-6 bg-dark-800 rounded-lg border border-dark-700">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">Allen & Overy</h4>
                <ul className="space-y-2 text-sm text-dark-300">
                  <li>• 3.500+ advogados usando Harvey AI</li>
                  <li>• Automação de pesquisa jurídica</li>
                  <li>• Economia de horas de trabalho</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

