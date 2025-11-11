"use client";

import { DollarSign, CreditCard, Gift, Building2, TrendingUp, Zap } from "lucide-react";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

const pricingModels = [
  {
    icon: Zap,
    title: "Pay-per-use",
    description: "Pague conforme o consumo - tokens processados ou horas de computação utilizadas.",
    pros: ["Baixo custo inicial", "Escalável", "Ideal para testes"],
    cons: ["Difícil prever custos", "Gastos crescem com uso"],
    color: "#0ea5e9",
  },
  {
    icon: CreditCard,
    title: "Assinatura Fixa",
    description: "Valor fixo periódico com limites predefinidos de uso ou usuários.",
    pros: ["Previsibilidade", "Custo controlado", "Planos flexíveis"],
    cons: ["Custo inicial maior", "Pode pagar por não usar"],
    color: "#d946ef",
  },
  {
    icon: Gift,
    title: "Freemium",
    description: "Versão gratuita básica e planos pagos com recursos avançados.",
    pros: ["Teste gratuito", "Baixa barreira de entrada", "Atrai usuários"],
    cons: ["Limites na versão grátis", "Pode não ser suficiente"],
    color: "#10b981",
  },
  {
    icon: Building2,
    title: "Licenciamento Enterprise",
    description: "Licença para uso interno, muitas vezes instalado em servidores próprios.",
    pros: ["Controle total", "Compliance", "Personalização"],
    cons: ["Alto custo inicial", "Requer infraestrutura"],
    color: "#f59e0b",
  },
  {
    icon: TrendingUp,
    title: "Modelo Híbrido",
    description: "Combinação de mensalidade base + cobrança variável por uso excedente.",
    pros: ["Flexibilidade", "Previsibilidade + escalabilidade", "Melhor dos dois mundos"],
    cons: ["Pode ser complexo", "Necessita planejamento"],
    color: "#8b5cf6",
  },
  {
    icon: DollarSign,
    title: "Value-based",
    description: "Cobrança atrelada ao ROI obtido ou valor entregue.",
    pros: ["Alinhado com resultados", "Risco compartilhado"],
    cons: ["Difícil de medir", "Menos comum"],
    color: "#ef4444",
  },
];

const comparisonData = [
  { name: "Pay-per-use", custoInicial: 0, escalabilidade: 95, previsibilidade: 30 },
  { name: "Assinatura", custoInicial: 60, escalabilidade: 70, previsibilidade: 90 },
  { name: "Freemium", custoInicial: 0, escalabilidade: 80, previsibilidade: 50 },
  { name: "Enterprise", custoInicial: 100, escalabilidade: 60, previsibilidade: 95 },
  { name: "Híbrido", custoInicial: 40, escalabilidade: 85, previsibilidade: 75 },
];

export default function PricingModels() {
  const [selectedModel, setSelectedModel] = useState(0);
  const [usage, setUsage] = useState(1000);
  const [costPerUnit, setCostPerUnit] = useState(0.002);

  const calculateCost = () => {
    const payPerUse = usage * costPerUnit;
    const subscription = 500; // R$ 500/mês base
    const hybrid = subscription + Math.max(0, (usage - 10000) * costPerUnit * 0.5);
    return { payPerUse, subscription, hybrid };
  };

  const costs = calculateCost();

  return (
    <Section id="cobranca" title="Modelos de Cobrança" subtitle="Diferentes abordagens para monetizar assistentes de IA">
      <div className="space-y-12">
        {/* Cards de Modelos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingModels.map((model, index) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                hover
                className={`cursor-pointer transition-all ${
                  selectedModel === index ? "ring-2 ring-primary-500" : ""
                }`}
                onClick={() => setSelectedModel(index)}
              >
                <model.icon className="w-8 h-8 mb-4" style={{ color: model.color }} />
                <h3 className="text-xl font-semibold text-dark-100 mb-2">{model.title}</h3>
                <p className="text-dark-300 mb-4 text-sm">{model.description}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-green-400 mb-1">Vantagens:</p>
                    <ul className="text-xs text-dark-400 space-y-1">
                      {model.pros.map((pro, i) => (
                        <li key={i}>✓ {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-400 mb-1">Desvantagens:</p>
                    <ul className="text-xs text-dark-400 space-y-1">
                      {model.cons.map((con, i) => (
                        <li key={i}>✗ {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Gráfico Comparativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h3 className="text-2xl font-semibold text-dark-100 mb-6">Comparação de Modelos</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="custoInicial" fill="#0ea5e9" name="Custo Inicial (%)" />
                <Bar dataKey="escalabilidade" fill="#d946ef" name="Escalabilidade (%)" />
                <Bar dataKey="previsibilidade" fill="#10b981" name="Previsibilidade (%)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Calculadora de Custos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h3 className="text-2xl font-semibold text-dark-100 mb-6">Calculadora de Custos</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Volume de Mensagens/Mês
                  </label>
                  <input
                    type="number"
                    value={usage}
                    onChange={(e) => setUsage(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Custo por Mensagem (R$)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={costPerUnit}
                    onChange={(e) => setCostPerUnit(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-dark-800 rounded-lg border border-dark-700">
                  <p className="text-sm text-dark-400 mb-1">Pay-per-use</p>
                  <p className="text-2xl font-bold text-primary-400">{formatCurrency(costs.payPerUse)}</p>
                </div>
                <div className="p-4 bg-dark-800 rounded-lg border border-dark-700">
                  <p className="text-sm text-dark-400 mb-1">Assinatura Fixa</p>
                  <p className="text-2xl font-bold text-accent-400">{formatCurrency(costs.subscription)}</p>
                </div>
                <div className="p-4 bg-dark-800 rounded-lg border border-dark-700">
                  <p className="text-sm text-dark-400 mb-1">Modelo Híbrido</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(costs.hybrid)}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

