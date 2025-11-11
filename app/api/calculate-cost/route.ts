import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { usage, costPerUnit, model } = await request.json();

    if (typeof usage !== "number" || typeof costPerUnit !== "number") {
      return NextResponse.json(
        { error: "Parâmetros inválidos" },
        { status: 400 }
      );
    }

    // Cálculos de diferentes modelos
    const payPerUse = usage * costPerUnit;
    const subscription = 500; // R$ 500/mês base
    const hybrid = subscription + Math.max(0, (usage - 10000) * costPerUnit * 0.5);
    
    // Freemium: primeiros 1000 mensagens grátis
    const freemium = usage > 1000 
      ? (usage - 1000) * costPerUnit 
      : 0;

    // Enterprise: custo fixo alto mas com desconto por volume
    const enterprise = usage > 50000 
      ? 5000 + (usage - 50000) * costPerUnit * 0.3
      : 5000;

    return NextResponse.json({
      payPerUse: Math.round(payPerUse * 100) / 100,
      subscription: subscription,
      hybrid: Math.round(hybrid * 100) / 100,
      freemium: Math.round(freemium * 100) / 100,
      enterprise: Math.round(enterprise * 100) / 100,
      usage,
      costPerUnit,
    });
  } catch (error) {
    console.error("Erro no cálculo:", error);
    return NextResponse.json(
      { error: "Erro ao calcular custos" },
      { status: 500 }
    );
  }
}

