// Script para inicializar o banco de dados com dados de exemplo
// Execute com: node scripts/init-db.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Inicializando banco de dados...');

  // Criar provedores de exemplo
  const providers = [
    {
      name: 'OpenAI',
      description: 'Pioneira em modelos de linguagem de última geração',
      models: JSON.stringify(['GPT-4', 'GPT-3.5', 'DALL-E', 'Whisper']),
      features: JSON.stringify(['Modelos avançados', 'API simples', 'Integração Azure']),
      pricing: JSON.stringify({ type: 'pay-per-use', costPerToken: 0.002 }),
    },
    {
      name: 'Microsoft Azure',
      description: 'Parceiro exclusivo do OpenAI para hospedagem dos modelos GPT',
      models: JSON.stringify(['GPT-4', 'GPT-3.5', 'DALL-E']),
      features: JSON.stringify(['Segurança empresarial', 'Escalabilidade', 'Integração Office']),
      pricing: JSON.stringify({ type: 'subscription', basePrice: 500 }),
    },
  ];

  for (const provider of providers) {
    await prisma.provider.upsert({
      where: { name: provider.name },
      update: provider,
      create: provider,
    });
  }

  console.log('Banco de dados inicializado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

