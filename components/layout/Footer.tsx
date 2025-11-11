import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-dark-700/50 bg-dark-900/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary-400" />
              <span className="text-lg font-bold gradient-text">Assistentes IA</span>
            </div>
            <p className="text-dark-400 text-sm">
              Guia completo sobre estratégia de negócio e desenvolvimento de assistentes virtuais de IA.
            </p>
          </div>

          <div>
            <h3 className="text-dark-200 font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm text-dark-400">
              <li><a href="#formatos" className="hover:text-primary-400 transition-colors">Formatos de Entrega</a></li>
              <li><a href="#cobranca" className="hover:text-primary-400 transition-colors">Modelos de Cobrança</a></li>
              <li><a href="#provedores" className="hover:text-primary-400 transition-colors">Provedores de IA</a></li>
              <li><a href="#setores" className="hover:text-primary-400 transition-colors">Ideias por Setor</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-dark-200 font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm text-dark-400">
              <li><a href="#demo" className="hover:text-primary-400 transition-colors">Demo Interativo</a></li>
              <li><a href="#arquitetura" className="hover:text-primary-400 transition-colors">Arquitetura Técnica</a></li>
              <li><a href="#negocios" className="hover:text-primary-400 transition-colors">Modelos de Negócio</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700/50 mt-8 pt-8 text-center text-sm text-dark-500">
          <p>© 2025 Assistentes IA. Desenvolvido com Next.js e TypeScript.</p>
        </div>
      </div>
    </footer>
  );
}

