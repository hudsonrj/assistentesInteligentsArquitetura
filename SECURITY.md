# Guia de Segurança

## Gerenciamento de API Keys

### ⚠️ IMPORTANTE: Nunca compartilhe suas API keys!

As API keys são credenciais sensíveis que dão acesso aos serviços de IA. Siga estas práticas recomendadas:

## ✅ Boas Práticas

### 1. Use Variáveis de Ambiente

**Nunca** coloque API keys diretamente no código:

```typescript
// ❌ ERRADO - NÃO FAÇA ISSO
const openai = new OpenAI({
  apiKey: "sk-proj-abc123..."
});

// ✅ CORRETO - Use variáveis de ambiente
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
```

### 2. Arquivo .env

- O arquivo `.env` contém suas chaves reais e **NUNCA** deve ser commitado
- O arquivo `.env.example` é um template e **PODE** ser commitado
- O `.gitignore` já está configurado para ignorar `.env`

### 3. Verificação Antes de Commit

Antes de fazer commit, verifique:

```bash
# Verifique se o .env está no .gitignore
git check-ignore .env

# Se retornar ".env", está seguro ✅
# Se não retornar nada, adicione ao .gitignore ❌
```

### 4. Rotação de Chaves

Se você acidentalmente expor uma chave:

1. **Revogue imediatamente** a chave no painel do provedor
2. Gere uma nova chave
3. Atualize seu arquivo `.env`
4. Se a chave foi commitada, considere fazer um novo repositório

## 🔒 Provedores e Links de Gerenciamento

### OpenAI
- Dashboard: https://platform.openai.com/api-keys
- Documentação de segurança: https://platform.openai.com/docs/guides/safety-best-practices

### Groq
- Dashboard: https://console.groq.com/keys
- Documentação: https://console.groq.com/docs/quickstart

### Azure OpenAI
- Portal: https://portal.azure.com
- Guia de segurança: https://learn.microsoft.com/azure/ai-services/openai/how-to/managed-identity

### Hugging Face
- Tokens: https://huggingface.co/settings/tokens
- Documentação: https://huggingface.co/docs/hub/security-tokens

### OpenRouter
- Keys: https://openrouter.ai/keys
- Documentação: https://openrouter.ai/docs

## 🚨 Em Caso de Exposição Acidental

1. **Revogue a chave imediatamente**
2. Gere uma nova chave
3. Se foi commitada no git:
   - Use `git filter-branch` ou `BFG Repo-Cleaner` para remover do histórico
   - Ou crie um novo repositório
4. Monitore o uso da chave antiga por atividades suspeitas

## 💡 Dicas Adicionais

- Use chaves diferentes para desenvolvimento e produção
- Configure limites de uso nos dashboards dos provedores
- Habilite alertas de uso nos painéis
- Revise regularmente as chaves ativas e remova as não utilizadas
- Para produção, considere usar serviços de gerenciamento de secrets (AWS Secrets Manager, Azure Key Vault, etc.)

## 📚 Recursos Adicionais

- [OWASP - API Security](https://owasp.org/www-project-api-security/)
- [12 Factor App - Config](https://12factor.net/config)
- [GitHub - Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
