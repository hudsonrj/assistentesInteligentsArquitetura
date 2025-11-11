"use client";

import { motion } from "framer-motion";
import { Cloud, Database, Zap, Server, Network, Globe } from "lucide-react";

export default function AnimatedArchitecture() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full h-full min-h-[600px] max-w-md mx-auto flex flex-col items-center justify-center py-8"
    >
      {/* Background Grid sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-6 grid-rows-6 gap-4 w-full h-full">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className="border border-primary-500/30 rounded"
            />
          ))}
        </div>
      </div>

      {/* Camada Frontend - Topo */}
      <motion.div
        variants={itemVariants}
        className="relative z-30 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-primary-500 to-accent-500 p-5 rounded-xl shadow-xl border-2 border-white/20 flex items-center gap-4 min-w-[280px]"
        >
          <Globe className="w-7 h-7 text-white flex-shrink-0" />
          <div>
            <div className="text-white font-bold text-base">Frontend</div>
            <div className="text-white/90 text-sm">React / Next.js</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Linha de conexão 1 */}
      <motion.div
        variants={itemVariants}
        className="relative z-20 w-1 h-12 bg-gradient-to-b from-primary-500 to-accent-500 mb-4"
      />

      {/* Camada API Gateway */}
      <motion.div
        variants={itemVariants}
        className="relative z-20 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-dark-800/90 backdrop-blur-sm p-5 rounded-xl shadow-xl border-2 border-accent-500/60 flex items-center gap-4 min-w-[280px]"
        >
          <Network className="w-7 h-7 text-accent-400 flex-shrink-0" />
          <div>
            <div className="text-dark-100 font-bold text-base">API Gateway</div>
            <div className="text-dark-400 text-sm">Next.js API Routes</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Linha de conexão 2 */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 w-1 h-16 bg-gradient-to-b from-accent-500 to-primary-500 mb-6"
      />

      {/* Camada de Serviços - Grid Horizontal */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 flex flex-wrap justify-center gap-4 mb-8 w-full px-4"
      >
        {/* LLM Service */}
        <motion.div
          whileHover={{ scale: 1.08, y: -8 }}
          className="bg-dark-800/90 backdrop-blur-sm p-4 rounded-lg border-2 border-primary-500/60 shadow-lg flex flex-col items-center min-w-[140px]"
        >
          <Zap className="w-6 h-6 text-primary-400 mb-2" />
          <div className="text-sm font-semibold text-dark-200 mb-1">LLM</div>
          <div className="text-xs text-dark-400 text-center">OpenAI / Claude</div>
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="absolute -top-2 -right-2 w-4 h-4 bg-primary-400 rounded-full border-2 border-dark-900"
          />
        </motion.div>

        {/* RAG Service */}
        <motion.div
          whileHover={{ scale: 1.08, y: -8 }}
          className="bg-dark-800/90 backdrop-blur-sm p-4 rounded-lg border-2 border-purple-500/60 shadow-lg flex flex-col items-center min-w-[140px]"
        >
          <Database className="w-6 h-6 text-purple-400 mb-2" />
          <div className="text-sm font-semibold text-dark-200 mb-1">RAG</div>
          <div className="text-xs text-dark-400 text-center">Vector DB</div>
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full border-2 border-dark-900"
          />
        </motion.div>

        {/* Backend Service */}
        <motion.div
          whileHover={{ scale: 1.08, y: -8 }}
          className="bg-dark-800/90 backdrop-blur-sm p-4 rounded-lg border-2 border-green-500/60 shadow-lg flex flex-col items-center min-w-[140px]"
        >
          <Server className="w-6 h-6 text-green-400 mb-2" />
          <div className="text-sm font-semibold text-dark-200 mb-1">Backend</div>
          <div className="text-xs text-dark-400 text-center">CRM / ERP</div>
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-dark-900"
          />
        </motion.div>
      </motion.div>

      {/* Linha de conexão 3 */}
      <motion.div
        variants={itemVariants}
        className="relative z-0 w-1 h-12 bg-gradient-to-b from-primary-500 to-accent-500 mb-6"
      />

      {/* Camada Cloud - Base */}
      <motion.div
        variants={itemVariants}
        className="relative z-0"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-accent-500/30 to-primary-500/30 backdrop-blur-md p-6 rounded-xl border-2 border-accent-500/40 shadow-xl min-w-[300px]"
        >
          <Cloud className="w-8 h-8 text-accent-400 mx-auto mb-3" />
          <div className="text-dark-100 font-bold text-base text-center mb-1">Cloud Infrastructure</div>
          <div className="text-dark-400 text-sm text-center">AWS / Azure / GCP</div>
        </motion.div>
      </motion.div>

      {/* Partículas animadas - menos e mais espaçadas */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-60"
          style={{
            left: `${15 + i * 25}%`,
            top: `${20 + (i % 2) * 60}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}
