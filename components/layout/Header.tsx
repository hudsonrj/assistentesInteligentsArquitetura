"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Início" },
  { href: "#formatos", label: "Formatos" },
  { href: "#cobranca", label: "Cobrança" },
  { href: "#provedores", label: "Provedores" },
  { href: "#arquitetura", label: "Arquitetura" },
  { href: "#negocios", label: "Negócios" },
  { href: "#setores", label: "Setores" },
  { href: "#simulador", label: "Simulador" },
  { href: "#demo", label: "Demo" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-dark-700/50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-primary-400 group-hover:text-accent-400 transition-colors" />
            <span className="text-xl font-bold gradient-text">Assistentes IA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-dark-300 hover:text-primary-400 transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-dark-300 hover:text-primary-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-dark-300 hover:text-primary-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

