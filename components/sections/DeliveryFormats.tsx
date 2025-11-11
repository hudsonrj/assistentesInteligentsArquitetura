"use client";

import { Globe, Smartphone, Code, MessageSquare, Mic } from "lucide-react";
import Section from "@/components/layout/Section";
import InfoCard from "@/components/ui/InfoCard";
import CodeBlock from "@/components/ui/CodeBlock";
import Infographic from "@/components/ui/Infographic";
import { motion } from "framer-motion";

const formats = [
  {
    icon: Globe,
    title: "Chat em Páginas Web",
    description: "Assistentes incorporados em sites via widgets ou portais, permitindo atendimento direto ao cliente 24/7.",
    code: `// Exemplo: Widget de chat em React
import { ChatWidget } from '@assistente-ia/react';

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
    icon: Smartphone,
    title: "Aplicativos Móveis e Desktop",
    description: "Assistentes integrados em apps móveis ou desktop, melhorando a experiência do usuário com ajuda instantânea.",
    code: `// Exemplo: Integração em app React Native
import { Assistant } from '@assistente-ia/native';

const ChatScreen = () => {
  return (
    <Assistant
      provider="openai"
      model="gpt-4"
      onMessage={(msg) => console.log(msg)}
    />
  );
};`,
  },
  {
    icon: Code,
    title: "APIs e Plataformas de Desenvolvimento",
    description: "APIs que permitem integrar capacidades de IA em qualquer aplicação, oferecendo flexibilidade máxima.",
    code: `// Exemplo: Integração via API REST
const response = await fetch('https://api.assistente-ia.com/chat', {
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
    icon: MessageSquare,
    title: "Integrações em Mensagerias",
    description: "Assistentes em ferramentas que os usuários já usam: Slack, Teams, WhatsApp, Telegram, etc.",
    code: `// Exemplo: Bot para WhatsApp
import { WhatsAppBot } from '@assistente-ia/whatsapp';

const bot = new WhatsAppBot({
  token: 'seu-token',
  assistant: {
    provider: 'openai',
    model: 'gpt-4'
  }
});

bot.on('message', async (msg) => {
  const response = await bot.assistant.respond(msg.text);
  await bot.send(msg.from, response);
});`,
  },
  {
    icon: Mic,
    title: "Assistentes de Voz",
    description: "Integrações com smart speakers (Alexa, Google Assistant) ou centrais telefônicas para interação por fala.",
    code: `// Exemplo: Assistente de voz
import { VoiceAssistant } from '@assistente-ia/voice';

const assistant = new VoiceAssistant({
  provider: 'google',
  language: 'pt-BR'
});

assistant.on('speech', async (transcript) => {
  const response = await processMessage(transcript);
  await assistant.speak(response);
});`,
  },
];

const deliveryStats = [
  { icon: Globe, label: "Web Widgets", value: "24/7", color: "#0ea5e9" },
  { icon: Smartphone, label: "Apps Móveis", value: "2.5B+", color: "#d946ef" },
  { icon: MessageSquare, label: "Mensagerias", value: "5B+", color: "#10b981" },
  { icon: Code, label: "APIs", value: "∞", color: "#f59e0b" },
];

export default function DeliveryFormats() {
  return (
    <Section id="formatos" title="Formatos de Entrega" subtitle="Diversas formas de disponibilizar assistentes de IA para seus usuários">
      <div className="space-y-12">
        {/* Infográfico de Formatos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Infographic
            title="Alcance dos Formatos de Entrega"
            items={deliveryStats}
            layout="grid"
          />
        </motion.div>
        {formats.map((format, index) => (
          <motion.div
            key={format.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <InfoCard
              icon={format.icon}
              title={format.title}
              description={format.description}
              delay={index * 0.1}
            />
            <CodeBlock code={format.code} language="typescript" title={format.title} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

