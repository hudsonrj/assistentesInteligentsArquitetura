import { NextResponse } from "next/server";

const providers = [
  {
    id: "openai",
    name: "OpenAI",
    description: "Pioneira em modelos de linguagem de última geração (GPT-3, GPT-4).",
    models: ["GPT-4", "GPT-3.5", "DALL-E", "Whisper"],
    features: ["Modelos mais avançados", "API simples", "Integração Azure"],
    website: "https://openai.com",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    description: "Parceiro exclusivo do OpenAI para hospedagem dos modelos GPT.",
    models: ["GPT-4", "GPT-3.5", "DALL-E", "Embeddings"],
    features: ["Segurança empresarial", "Escalabilidade", "Integração Office"],
    website: "https://azure.microsoft.com",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    description: "Vertex AI oferece acesso aos grandes modelos do Google (PaLM, Gemini).",
    models: ["Gemini", "PaLM 2", "Dialogflow", "Vertex AI"],
    features: ["Modelos próprios", "Integração GCP", "Dialogflow"],
    website: "https://cloud.google.com",
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    description: "Amazon Bedrock oferece acesso a múltiplos modelos foundation.",
    models: ["Claude (Anthropic)", "Llama2", "Titan", "Jurassic"],
    features: ["Múltiplos modelos", "Bedrock", "Infraestrutura robusta"],
    website: "https://aws.amazon.com",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    description: "Plataforma aberta focada em comunidade e modelos open-source.",
    models: ["BERT", "GPT-2", "BLOOM", "Llama", "Mistral"],
    features: ["Open-source", "Sem vendor lock-in", "Comunidade"],
    website: "https://huggingface.co",
  },
];

export async function GET() {
  return NextResponse.json(providers);
}

