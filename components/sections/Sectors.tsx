"use client";

import { ShoppingCart, GraduationCap, DollarSign, Scale, Heart, Briefcase } from "lucide-react";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useState } from "react";

const sectors = [
  {
    icon: ShoppingCart,
    name: "E-commerce",
    color: "#0ea5e9",
    applications: [
      "Assistente de compras virtual",
      "Suporte ao cliente 24/7",
      "Consultor de produtos com IA",
      "Integração com estoque e CRM",
    ],
    benefits: [
      "Aumento na conversão",
      "Atendimento instantâneo",
      "Personalização de recomendações",
      "Redução de custos operacionais",
    ],
    example: {
      company: "Grupo Boticário",
      results: [
        "+46% de aumento na taxa de conversão",
        "Ticket médio 7,4% maior",
        "Assistente virtual de beleza integrado",
      ],
    },
  },
  {
    icon: GraduationCap,
    name: "Educação",
    color: "#d946ef",
    applications: [
      "Tutor virtual personalizado",
      "Assistente para professores",
      "Plantão de dúvidas 24/7",
      "Mentoria e motivação",
    ],
    benefits: [
      "Aprendizado personalizado",
      "Disponibilidade constante",
      "Redução de evasão",
      "Suporte individualizado em escala",
    ],
    example: {
      company: "Mainstay / Khan Academy",
      results: [
        "Maior envolvimento dos estudantes",
        "Redução da evasão",
        "Tutorias interativas com GPT-4",
      ],
    },
  },
  {
    icon: DollarSign,
    name: "Financeiro",
    color: "#10b981",
    applications: [
      "Assistente bancário virtual",
      "Suporte em investimentos",
      "Automação no atendimento",
      "Detecção de fraude",
    ],
    benefits: [
      "Resolução rápida de consultas",
      "Disponibilidade 24/7",
      "Redução de custos operacionais",
      "Melhoria na experiência do cliente",
    ],
    example: {
      company: "Nubank",
      results: [
        "55% das consultas resolvidas automaticamente",
        "70% de redução no tempo de resposta",
        "Mais de 2 milhões de conversas/mês",
      ],
    },
  },
  {
    icon: Scale,
    name: "Jurídico",
    color: "#f59e0b",
    applications: [
      "Assistente jurídico para pesquisas",
      "Análise de contratos e compliance",
      "Atendimento ao cliente de escritórios",
      "Suporte interno em departamentos legais",
    ],
    benefits: [
      "Agilização de pesquisas",
      "Economia de horas de trabalho",
      "Análise automatizada de documentos",
      "Melhoria na produtividade",
    ],
    example: {
      company: "Allen & Overy",
      results: [
        "3.500+ advogados usando Harvey AI",
        "Automação de pesquisa jurídica",
        "Geração de minutas de contratos",
      ],
    },
  },
  {
    icon: Heart,
    name: "Saúde",
    color: "#ef4444",
    applications: [
      "Triagem de sintomas",
      "Orientação de pacientes",
      "Agendamento de consultas",
      "Lembretes de medicação",
    ],
    benefits: [
      "Acesso mais rápido ao cuidado",
      "Redução de carga em profissionais",
      "Melhoria na adesão ao tratamento",
      "Otimização de recursos",
    ],
    example: {
      company: "Exemplos diversos",
      results: [
        "Triagem inicial automatizada",
        "Orientação 24/7 para pacientes",
        "Redução de visitas desnecessárias",
      ],
    },
  },
  {
    icon: Briefcase,
    name: "Recursos Humanos",
    color: "#8b5cf6",
    applications: [
      "Triagem de currículos",
      "Resposta a dúvidas de candidatos",
      "Onboarding automatizado",
      "Suporte a funcionários",
    ],
    benefits: [
      "Aceleração no recrutamento",
      "Melhoria na experiência do candidato",
      "Redução de tempo em processos",
      "Escalabilidade de operações",
    ],
    example: {
      company: "Empresas diversas",
      results: [
        "Triagem automática de CVs",
        "Respostas instantâneas a candidatos",
        "Processo de onboarding otimizado",
      ],
    },
  },
];

export default function Sectors() {
  const [selectedSector, setSelectedSector] = useState<number | null>(null);

  return (
    <Section id="setores" title="Ideias Inovadoras por Setor" subtitle="Aplicações específicas de assistentes de IA em diferentes indústrias">
      <div className="space-y-12">
        {/* Grid de Setores */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                hover
                className={`cursor-pointer transition-all ${
                  selectedSector === index ? "ring-2 ring-primary-500" : ""
                }`}
                onClick={() => setSelectedSector(selectedSector === index ? null : index)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${sector.color}20`, borderColor: sector.color }}
                  >
                    <sector.icon className="w-6 h-6" style={{ color: sector.color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-100">{sector.name}</h3>
                </div>

                {selectedSector === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-dark-700 space-y-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-primary-400 mb-2">Aplicações:</p>
                      <ul className="space-y-1">
                        {sector.applications.map((app, i) => (
                          <li key={i} className="text-xs text-dark-300 flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span> {app}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-accent-400 mb-2">Benefícios:</p>
                      <ul className="space-y-1">
                        {sector.benefits.map((benefit, i) => (
                          <li key={i} className="text-xs text-dark-300 flex items-start gap-2">
                            <span className="text-blue-400 mt-1">✓</span> {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-dark-800 rounded border border-dark-700">
                      <p className="text-xs font-semibold text-yellow-400 mb-1">
                        Exemplo: {sector.example.company}
                      </p>
                      <ul className="space-y-1">
                        {sector.example.results.map((result, i) => (
                          <li key={i} className="text-xs text-dark-400">{result}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {selectedSector !== index && (
                  <p className="text-sm text-dark-400 mt-2">
                    Clique para ver detalhes e exemplos
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparação Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h3 className="text-2xl font-semibold text-dark-100 mb-6">Comparação de Impacto por Setor</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {sectors.map((sector) => (
                <div
                  key={sector.name}
                  className="p-4 bg-dark-800 rounded-lg border border-dark-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-dark-200">{sector.name}</span>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: sector.color }}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-dark-400">
                      <span>ROI Potencial</span>
                      <span className="font-semibold text-green-400">Alto</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-dark-400">
                      <span>Complexidade</span>
                      <span className="font-semibold text-yellow-400">Média</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-dark-400">
                      <span>Adoção</span>
                      <span className="font-semibold text-primary-400">Crescendo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

