const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const knowledgeBase = [
  {
    keywords: ['price', 'pricing', 'cost', 'plan'],
    reply: "Our plans start at $15/month for the Starter plan, $49/month for Pro (up to 10 users), and custom pricing for Enterprise. Want details on a specific plan?"
  },
  {
    keywords: ['refund', 'cancel', 'cancellation'],
    reply: "You can cancel anytime from your account settings. Refunds are available within 14 days of purchase - would you like me to start that process?"
  },
  {
    keywords: ['login', 'password', 'sign in', 'locked out'],
    reply: "Sorry you're having trouble logging in! Try resetting your password via the Forgot Password link. If that doesn't work, I can escalate this to our support team."
  },
  {
    keywords: ['feature', 'integration', 'does it support'],
    reply: "We support integrations with Slack, Google Workspace, and Zapier. Is there a specific tool you're hoping to connect?"
  },
  {
    keywords: ['demo', 'trial', 'buy', 'interested', 'purchase'],
    reply: "Great to hear you're interested! Could you tell me a bit about your team size and main use case? I'll recommend the best plan for you."
  },
  {
    keywords: ['hours', 'support hours', 'available'],
    reply: "Our support team is available Monday-Friday, 9am-6pm EST. For urgent issues outside these hours, please email urgent@techflow.com."
  },
  {
    keywords: ['human', 'agent', 'talk to someone', 'representative'],
    reply: "I can connect you with a human agent. Could you briefly describe your issue so I can route you to the right team?"
  }
];

function getReply(message) {
  const lower = message.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some(keyword => lower.includes(keyword))) {
      return entry.reply;
    }
  }
  return "Thanks for reaching out! Could you tell me a bit more about what you need help with - pricing, technical support, or something else?";
}

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const reply = getReply(message);
  res.json({ reply });
});

const PORT = 3000;
app.listen(PORT, () => console.log('Server running on http://localhost:${PORT}'));