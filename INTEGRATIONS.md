# Ecossistema de Integrações

## 🔗 CRMs (Customer Relationship Management)

### 1. **Salesforce**
- **Website:** https://www.salesforce.com/
- **Preço:** $25-300/usuário/mês
- **API:** REST, SOAP, Streaming
- **Características:**
  - Líder de mercado
  - Altamente customizável
  - AppExchange com 5,000+ apps

**Integrações Típicas:**
- Sincronizar contatos e leads
- Criar casos automaticamente
- Atualizar status de oportunidades
- Registrar interações do assistente

**SDK/Libraries:**
```typescript
import jsforce from 'jsforce';

const conn = new jsforce.Connection({
  oauth2: {
    loginUrl: 'https://login.salesforce.com',
    clientId: process.env.SF_CLIENT_ID,
    clientSecret: process.env.SF_CLIENT_SECRET,
  }
});

// Criar lead
await conn.sobject('Lead').create({
  FirstName: 'João',
  LastName: 'Silva',
  Company: 'Empresa ABC',
  Email: 'joao@empresa.com',
  LeadSource: 'Chatbot'
});
```

---

### 2. **HubSpot**
- **Website:** https://www.hubspot.com/
- **Preço:** Grátis até 1,000 contacts, $50-3,600/mês
- **API:** REST
- **Características:**
  - Fácil de usar
  - Marketing automation
  - Free tier generoso

**SDK:**
```typescript
import { Client } from '@hubspot/api-client';

const hubspot = new Client({ accessToken: process.env.HUBSPOT_TOKEN });

// Criar contato
await hubspot.crm.contacts.basicApi.create({
  properties: {
    firstname: 'João',
    lastname: 'Silva',
    email: 'joao@empresa.com',
    lifecyclestage: 'lead'
  }
});

// Registrar interação
await hubspot.crm.objects.notes.basicApi.create({
  properties: {
    hs_note_body: 'Conversa com chatbot sobre produto X',
    hs_timestamp: Date.now()
  },
  associations: [{
    to: { id: contactId },
    types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }]
  }]
});
```

---

### 3. **Pipedrive**
- **Website:** https://www.pipedrive.com/
- **Preço:** $14-99/usuário/mês
- **API:** REST
- **Características:**
  - Interface simples
  - Focado em vendas
  - Ótimo para SMB

**SDK:**
```typescript
import Pipedrive from 'pipedrive';

const client = new Pipedrive.Client(process.env.PIPEDRIVE_TOKEN);

// Criar deal
await client.Deals.add({
  title: 'Oportunidade via Chatbot',
  value: 1000,
  currency: 'BRL',
  person_id: personId,
  stage_id: 1
});
```

---

### 4. **Zoho CRM**
- **Preço:** $14-52/usuário/mês
- **Características:** Suite completa, forte na Índia

### 5. **RD Station (Brasil)**
- **Website:** https://www.rdstation.com/
- **Preço:** A partir de R$ 59/mês
- **Características:** Marketing automation brasileiro

### 6. **Microsoft Dynamics 365**
- **Preço:** $65-210/usuário/mês
- **Características:** Integrado com Microsoft

---

## 💳 Gateways de Pagamento

### 1. **Stripe**
- **Website:** https://stripe.com/
- **Preço:** 2.9% + $0.30 por transação
- **Países:** 46+ países
- **Características:**
  - Developer-friendly
  - Subscriptions
  - Connect (marketplaces)

**SDK:**
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Criar checkout session
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'brl',
      product_data: {
        name: 'Plano Premium',
      },
      unit_amount: 9900, // R$ 99,00
    },
    quantity: 1,
  }],
  mode: 'subscription',
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
});
```

---

### 2. **Mercado Pago** (América Latina)
- **Website:** https://www.mercadopago.com.br/
- **Preço:** 3.99% + R$ 0.39 (débito), 4.99% + R$ 0.39 (crédito)
- **Países:** Brasil, Argentina, México, Chile, etc.

**SDK:**
```typescript
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

// Criar preferência de pagamento
const preference = await mercadopago.preferences.create({
  items: [{
    title: 'Plano Premium',
    unit_price: 99.90,
    quantity: 1,
  }],
  back_urls: {
    success: 'https://example.com/success',
    failure: 'https://example.com/failure',
  }
});
```

---

### 3. **PagSeguro** (Brasil)
- **Preço:** 3.99% (débito), 4.99% (crédito)

### 4. **PayPal**
- **Preço:** 4.4% + $0.30
- **Global:** 200+ países

### 5. **Adyen**
- **Preço:** Custom (enterprise)
- **Uso:** Grandes empresas

---

## 📅 Calendário e Agendamento

### 1. **Google Calendar**
- **API:** Google Calendar API
- **Preço:** Gratuito
- **Características:** Universal, integrado

**SDK:**
```typescript
import { google } from 'googleapis';

const calendar = google.calendar({ version: 'v3', auth });

// Criar evento
await calendar.events.insert({
  calendarId: 'primary',
  requestBody: {
    summary: 'Consulta agendada via Chatbot',
    start: {
      dateTime: '2024-02-15T10:00:00-03:00',
      timeZone: 'America/Sao_Paulo',
    },
    end: {
      dateTime: '2024-02-15T11:00:00-03:00',
      timeZone: 'America/Sao_Paulo',
    },
    attendees: [
      { email: 'paciente@email.com' }
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  },
});
```

---

### 2. **Calendly**
- **Website:** https://calendly.com/
- **Preço:** Grátis (básico), $10-16/usuário/mês
- **Características:**
  - Scheduling simples
  - Webhooks
  - Embeddable

**API:**
```typescript
// Webhook para evento agendado
app.post('/webhooks/calendly', (req, res) => {
  const { event, payload } = req.body;

  if (event === 'invitee.created') {
    const { name, email, scheduled_event } = payload;

    // Notificar usuário via assistente
    await sendConfirmation(email, {
      name,
      dateTime: scheduled_event.start_time
    });
  }
});
```

---

### 3. **Microsoft Outlook Calendar**
- **API:** Microsoft Graph API
- **Preço:** Incluído no Microsoft 365

---

## 📧 Email Marketing

### 1. **SendGrid**
- **Website:** https://sendgrid.com/
- **Preço:** Grátis até 100/dia, depois $19.95/mês
- **Uso:** Transactional & Marketing emails

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: 'user@example.com',
  from: 'noreply@myapp.com',
  subject: 'Sua conversa com o assistente',
  html: '<strong>Obrigado por entrar em contato!</strong>',
});
```

---

### 2. **Mailchimp**
- **Preço:** Grátis até 500 contacts, $13-350/mês
- **Uso:** Email marketing, automação

### 3. **Amazon SES**
- **Preço:** $0.10/1,000 emails
- **Uso:** Emails transacionais em escala

### 4. **Postmark**
- **Preço:** $15/mês (10K emails)
- **Uso:** Transactional emails

---

## 📱 Mensageria

### 1. **Twilio SMS**
```typescript
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

await client.messages.create({
  body: 'Seu código de verificação é: 123456',
  from: '+551199999999',
  to: '+551188888888'
});
```

---

### 2. **WhatsApp Business API**

#### Via Twilio:
```typescript
await client.messages.create({
  body: 'Olá! Como posso ajudar?',
  from: 'whatsapp:+141555866',
  to: 'whatsapp:+5511999999999'
});
```

#### Via 360Dialog:
```typescript
import axios from 'axios';

await axios.post('https://waba.360dialog.io/v1/messages', {
  to: '5511999999999',
  type: 'text',
  text: {
    body: 'Olá! Como posso ajudar?'
  }
}, {
  headers: {
    'D360-API-KEY': process.env.DIALOG_360_KEY
  }
});
```

---

## 🏢 Comunicação Corporativa

### 1. **Slack**
- **Website:** https://api.slack.com/
- **Preço:** Grátis (10K histórico), $8/usuário/mês

```typescript
import { WebClient } from '@slack/web-api';

const slack = new WebClient(process.env.SLACK_TOKEN);

// Enviar mensagem
await slack.chat.postMessage({
  channel: '#support',
  text: 'Novo ticket criado via chatbot',
  blocks: [{
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*Novo Ticket #123*\nUsuário: João Silva\nAssunto: Problema com pagamento'
    }
  }]
});
```

---

### 2. **Microsoft Teams**
- **API:** Microsoft Graph API
- **Preço:** Incluído no Microsoft 365

```typescript
// Enviar mensagem via webhook
await axios.post(process.env.TEAMS_WEBHOOK_URL, {
  '@type': 'MessageCard',
  'title': 'Novo Ticket #123',
  'text': 'Usuário: João Silva\\nAssunto: Problema com pagamento',
  'themeColor': '0076D7'
});
```

---

### 3. **Discord**
```typescript
import { Client, GatewayIntentBits } from 'discord.js';

const discord = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

await discord.login(process.env.DISCORD_TOKEN);

const channel = await discord.channels.fetch('CHANNEL_ID');
await channel.send('Novo usuário cadastrado via chatbot!');
```

---

## 🎫 Help Desk e Ticketing

### 1. **Zendesk**
- **API:** REST API
- **Preço:** $19-115/agente/mês

```typescript
// Criar ticket
await axios.post('https://subdomain.zendesk.com/api/v2/tickets.json', {
  ticket: {
    subject: 'Solicitação via Chatbot',
    comment: {
      body: 'Usuário solicita informações sobre produto X'
    },
    requester: {
      name: 'João Silva',
      email: 'joao@email.com'
    },
    priority: 'normal',
    tags: ['chatbot', 'sales']
  }
}, {
  headers: {
    'Authorization': `Basic ${Buffer.from(`${email}/token:${apiToken}`).toString('base64')}`
  }
});
```

---

### 2. **Freshdesk**
- **Preço:** Grátis até 10 agentes, $15-79/agente/mês

### 3. **Jira Service Management**
- **Preço:** $20-60/agente/mês

### 4. **Linear**
- **Preço:** $8/usuário/mês
- **Uso:** Modern issue tracking

---

## 📊 Analytics

### 1. **Google Analytics 4**
```typescript
// Enviar evento personalizado
await fetch('https://www.google-analytics.com/mp/collect', {
  method: 'POST',
  body: JSON.stringify({
    client_id: userId,
    events: [{
      name: 'chatbot_interaction',
      params: {
        intent: 'product_inquiry',
        resolved: true,
        sentiment: 'positive'
      }
    }]
  })
});
```

---

### 2. **Mixpanel**
```typescript
import Mixpanel from 'mixpanel';

const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

mixpanel.track('Chatbot Conversation', {
  distinct_id: userId,
  intent: 'support',
  resolved: true,
  messages_count: 5,
  duration_seconds: 120
});
```

---

### 3. **Segment**
- **Preço:** Grátis até 1K events, depois $120/mês
- **Uso:** CDP (Customer Data Platform)

```typescript
import Analytics from 'analytics-node';

const analytics = new Analytics(process.env.SEGMENT_WRITE_KEY);

analytics.track({
  userId: '123',
  event: 'Chatbot Interaction',
  properties: {
    intent: 'sales',
    product: 'premium_plan'
  }
});
```

---

## 🗺️ Mapas e Localização

### 1. **Google Maps API**
- **Preço:** $7/1K requests (após $200 crédito mensal)

```typescript
// Geocoding
const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
  params: {
    address: 'Av. Paulista, 1000, São Paulo',
    key: process.env.GOOGLE_MAPS_KEY
  }
});

const { lat, lng } = response.data.results[0].geometry.location;
```

---

### 2. **Mapbox**
- **Preço:** Grátis até 100K requests, depois $0.50/1K

---

## 🏦 Banking/Open Finance

### 1. **Plaid** (EUA)
- **Uso:** Account linking, transactions
- **Preço:** $0.25-1.50 por conexão

### 2. **Belvo** (LatAm)
- **Website:** https://belvo.com/
- **Uso:** Open finance API para América Latina

### 3. **Pluggy** (Brasil)
- **Website:** https://pluggy.ai/
- **Uso:** Open finance/banking Brasil

---

## 🛒 E-commerce

### 1. **Shopify**
```typescript
import Shopify from 'shopify-api-node';

const shopify = new Shopify({
  shopName: 'my-shop',
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD
});

// Buscar produtos
const products = await shopify.product.list({ limit: 10 });

// Criar pedido
const order = await shopify.order.create({
  email: 'customer@example.com',
  line_items: [{
    variant_id: 12345,
    quantity: 1
  }]
});
```

---

### 2. **WooCommerce (WordPress)**
```typescript
import WooCommerceAPI from 'woocommerce-api';

const woo = new WooCommerceAPI({
  url: 'https://mystore.com',
  consumerKey: process.env.WOO_KEY,
  consumerSecret: process.env.WOO_SECRET,
  wpAPI: true,
  version: 'wc/v3'
});

// Listar produtos
const products = await woo.getAsync('products');
```

---

### 3. **Magento**
### 4. **VTEX** (Brasil)
### 5. **Nuvemshop** (LatAm)

---

## 📦 Logística e Rastreamento

### 1. **Correios (Brasil)**
- **API:** Rastreamento de encomendas

### 2. **FedEx, UPS, DHL**
- **APIs:** Tracking, shipping rates

### 3. **Melhor Envio** (Brasil)
- **Website:** https://melhorenvio.com.br/
- **Uso:** Agregador de transportadoras

---

## 🔄 Webhooks e Automação

### 1. **Zapier**
- **Preço:** Grátis até 100 tasks, $19.99-599/mês
- **Uso:** No-code automation

### 2. **Make (Integromat)**
- **Preço:** Grátis até 1K ops, $9-299/mês

### 3. **n8n**
- **Preço:** Gratuito (self-hosted) ou $20/mês (cloud)
- **Uso:** Open-source automation

### 4. **Pipedream**
- **Preço:** Grátis até 100K credits
- **Uso:** Developer-first automation

---

## 📋 Comparação de Custos de Integrações

### Setup Básico (Startup)
```
CRM: HubSpot Free
Payment: Stripe (pay-as-you-go)
Email: SendGrid Free
Calendar: Google Calendar Free
Analytics: GA4 Free
TOTAL: $0/mês + transações
```

### Setup Intermediário (SMB)
```
CRM: HubSpot Professional - $800/mês
Payment: Stripe - 2.9% + $0.30
Email: SendGrid - $90/mês
Calendar: Calendly Professional - $12/mês
Analytics: Mixpanel - $28/mês
Help Desk: Freshdesk - $150/mês (10 agentes)
TOTAL: ~$1,080/mês + transações
```

### Setup Enterprise
```
CRM: Salesforce Enterprise - $4,500/mês (15 users)
Payment: Stripe/Adyen - Custom
Email: SendGrid Pro - $300/mês
Calendar: Enterprise calendaring
Analytics: Segment - $500/mês
Help Desk: Zendesk - $1,725/mês (15 agents)
Communication: Slack Business - $160/mês (20 users)
TOTAL: ~$7,185/mês + custom
```

---

## 🔌 SDKs e Libraries Úteis

### Multi-Integration SDKs

**1. Merge.dev**
- **Preço:** $400-800/mês
- **Uso:** Unified API para CRMs, HRISs, etc.

**2. Apideck**
- **Preço:** A partir de $249/mês
- **Uso:** Unified APIs

**3. Alloy**
- **Preço:** Custom
- **Uso:** Embedded iPaaS

---

## 📚 Recursos Adicionais

- [Public APIs Directory](https://github.com/public-apis/public-apis)
- [RapidAPI](https://rapidapi.com/) - API Marketplace
- [Postman](https://www.postman.com/) - API testing
- [Insomnia](https://insomnia.rest/) - API client
- [Webhooks.fyi](https://webhooks.fyi/) - Webhook debugging
