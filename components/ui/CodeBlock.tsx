"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-dark-700/50 bg-dark-900">
      {title && (
        <div className="px-4 py-2 bg-dark-800 border-b border-dark-700/50 flex items-center justify-between">
          <span className="text-sm text-dark-300 font-medium">{title}</span>
          <button
            onClick={handleCopy}
            className="text-dark-400 hover:text-primary-400 transition-colors p-1"
            aria-label="Copiar código"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check size={16} />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      )}
      <div className="relative">
        {!title && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 z-10 p-2 text-dark-400 hover:text-primary-400 transition-colors bg-dark-800/80 rounded"
            aria-label="Copiar código"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check size={16} />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            background: "transparent",
            fontSize: "0.875rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

