"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      className={cn(
        "glass rounded-xl p-6 border border-dark-700/50",
        hover && "card-hover cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

