"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InfographicProps {
  title: string;
  items: {
    icon: LucideIcon;
    label: string;
    value: string | number;
    color: string;
  }[];
  layout?: "horizontal" | "vertical" | "grid";
}

export default function Infographic({ title, items, layout = "grid" }: InfographicProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const layoutClasses = {
    horizontal: "flex flex-row gap-4 overflow-x-auto",
    vertical: "flex flex-col gap-4",
    grid: "grid grid-cols-2 md:grid-cols-4 gap-4",
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-dark-100 mb-6 text-center">{title}</h3>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={layoutClasses[layout]}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex flex-col items-center p-6 bg-dark-800 rounded-xl border border-dark-700 hover:border-primary-500/50 transition-all cursor-pointer min-w-[150px]"
          >
            <div
              className="p-4 rounded-full mb-4"
              style={{
                backgroundColor: `${item.color}20`,
                borderColor: item.color,
                borderWidth: "2px",
              }}
            >
              <item.icon className="w-8 h-8" style={{ color: item.color }} />
            </div>
            <div className="text-2xl font-bold gradient-text mb-2">{item.value}</div>
            <div className="text-sm text-dark-300 text-center">{item.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

