"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Zap, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";
import GradientBackground from "@/components/layout/GradientBackground";
import Container from "@/components/layout/Container";
import AnimatedArchitecture from "@/components/ui/AnimatedArchitecture";

export default function Hero() {
  const stats = [
    { icon: Zap, value: "55%", label: "Consultas resolvidas automaticamente" },
    { icon: TrendingUp, value: "70%", label: "Redução no tempo de resposta" },
    { icon: Sparkles, value: "46%", label: "Aumento na conversão" },
  ];

  return (
    <GradientBackground className="min-h-screen flex items-center justify-center">
      <Container className="w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32 w-full max-w-7xl mx-auto">
          {/* Lado Esquerdo - Texto */}
          <div className="w-full text-center lg:text-left flex flex-col items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-dark-300">Guia Completo 2025</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Assistentes Virtuais</span>
              <br />
              <span className="text-dark-100">de Inteligência Artificial</span>
            </h1>
            <p className="text-xl md:text-2xl text-dark-300 max-w-xl mb-10">
              Estratégia de negócio, desenvolvimento e implementação de assistentes de IA
              para transformar sua empresa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
              <Button size="lg" onClick={() => document.getElementById("formatos")?.scrollIntoView({ behavior: "smooth" })}>
                Explorar Formatos
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}>
                Ver Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-2xl lg:max-w-none"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="glass rounded-xl p-6 border border-dark-700/50"
              >
                <stat.icon className="w-8 h-8 text-primary-400 mb-4 mx-auto" />
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-dark-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <ArrowDown className="w-6 h-6 text-dark-400" />
            </motion.div>
          </motion.div>
          </div>

          {/* Lado Direito - Arquitetura Animada */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center w-full"
          >
            <div className="w-full flex justify-center">
              <AnimatedArchitecture />
            </div>
          </motion.div>
        </div>
      </Container>
    </GradientBackground>
  );
}

