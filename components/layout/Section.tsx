"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function Section({ children, id, className, title, subtitle }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} ref={ref} className={cn("py-20 lg:py-32", className)}>
      <Container>
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-dark-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}

