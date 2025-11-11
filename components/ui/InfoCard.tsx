"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import Card from "./Card";
import { motion } from "framer-motion";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string | ReactNode;
  className?: string;
  delay?: number;
}

export default function InfoCard({ icon: Icon, title, description, className, delay = 0 }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={className}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30">
            <Icon className="w-6 h-6 text-primary-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-dark-100 mb-2">{title}</h3>
            <div className="text-dark-300 leading-relaxed">
              {typeof description === "string" ? <p>{description}</p> : description}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

