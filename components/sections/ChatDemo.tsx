"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! Sou um assistente virtual de IA. Como posso ajudá-lo hoje?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      // Preparar histórico de mensagens
      const history = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Chamar API real do Groq
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          history: history,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Section id="demo" title="Demo Interativo" subtitle="Experimente um assistente virtual de IA em ação">
      <div className="max-w-4xl mx-auto">
        <Card className="p-0 overflow-hidden">
          {/* Header do Chat */}
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Assistente Virtual de IA</h3>
                <p className="text-white/80 text-sm">Demo interativo com Groq (Llama 3.1)</p>
              </div>
            </div>
          </div>

          {/* Área de Mensagens */}
          <div className="h-96 overflow-y-auto bg-dark-900 p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="p-2 bg-primary-500/20 rounded-full">
                        <Bot className="w-5 h-5 text-primary-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary-500 text-white"
                        : "bg-dark-800 text-dark-100 border border-dark-700"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {message.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="p-2 bg-accent-500/20 rounded-full">
                      <User className="w-5 h-5 text-accent-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 justify-start"
              >
                <div className="p-2 bg-primary-500/20 rounded-full">
                  <Bot className="w-5 h-5 text-primary-400" />
                </div>
                <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                  <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-dark-700 p-4 bg-dark-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-6"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-dark-500 mt-2 text-center">
              Demo funcional usando Groq API com modelo Llama 3.1 8B Instant
            </p>
          </div>
        </Card>

        {/* Informações sobre Integração */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <Card>
            <h3 className="text-xl font-semibold text-dark-100 mb-4">
              Como Integrar em Seu Projeto
            </h3>
            <div className="space-y-4 text-dark-300">
              <p>
                Este demo mostra como um assistente de IA pode ser integrado em seu site ou aplicativo.
                Para implementação real, você precisará:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Escolher um provedor de IA (OpenAI, Azure, GCP, AWS, etc.)</li>
                <li>Configurar API routes no backend</li>
                <li>Implementar interface de chat no frontend</li>
                <li>Adicionar tratamento de erros e loading states</li>
                <li>Configurar segurança e rate limiting</li>
              </ul>
              <p className="text-sm text-dark-400 mt-4">
                Veja exemplos de código nas seções anteriores para começar!
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

