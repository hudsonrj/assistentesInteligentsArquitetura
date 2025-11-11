import { NextResponse } from "next/server";

const sectors = [
  {
    id: "ecommerce",
    name: "E-commerce",
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
    id: "educacao",
    name: "Educação",
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
    id: "financeiro",
    name: "Financeiro",
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
    id: "juridico",
    name: "Jurídico",
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
];

export async function GET() {
  return NextResponse.json(sectors);
}

