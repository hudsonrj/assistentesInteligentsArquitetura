import { NextRequest, NextResponse } from "next/server";

const examples = [
  {
    id: "web-chat",
    title: "Widget de Chat em React",
    category: "web",
    language: "typescript",
    code: `import { ChatWidget } from '@assistente-ia/react';

function App() {
  return (
    <ChatWidget
      apiKey="sua-api-key"
      position="bottom-right"
      theme="modern"
    />
  );
}`,
  },
  {
    id: "api-integration",
    title: "Integração via API REST",
    category: "api",
    language: "typescript",
    code: `const response = await fetch('https://api.assistente-ia.com/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sua-api-key'
  },
  body: JSON.stringify({
    message: 'Olá, preciso de ajuda',
    context: 'ecommerce'
  })
});`,
  },
  {
    id: "microservice",
    title: "Microserviço de LLM",
    category: "architecture",
    language: "typescript",
    code: `import express from 'express';
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
});`,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (category) {
    const filtered = examples.filter((ex) => ex.category === category);
    return NextResponse.json(filtered);
  }

  return NextResponse.json(examples);
}

