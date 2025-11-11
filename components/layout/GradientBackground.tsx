"use client";

import { ReactNode } from "react";

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
}

export default function GradientBackground({ children, className }: GradientBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-accent-900/20 to-primary-900/20 animate-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

