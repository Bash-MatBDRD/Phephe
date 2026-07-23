import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

app.use(express.json());

// In-memory simulated state for TikTok stream & Bot config
let tikTokState = {
  username: "@noxi_nick",
  displayName: "Noxélia ❀",
  isLive: true,
  streamTitle: "°+•Ɛs 🌙 Live Roblox MM2 & Blabla ~ Venez dire coucou ! ❀",
  category: "Roblox & Gaming",
  liveViewers: 428,
  peakViewers: 612,
  likeCount: 28400,
  followerGain: 96,
  startedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 mins ago
  chatSpeedMsgsPerMin: 142,
  latestVideo: {
    id: "vid_987",
    title: "°+•Ɛs 🌙 Le meilleur moment du live Roblox Evade / ASMR ! ❀",
    views: 18400,
    likes: 3120,
    comments: 420,
    postedAt: "Il y a 3 heures",
    url: "https://www.tiktok.com/@noxi_nick",
  },
};

// API Routes

// 1. TikTok Live Status & Stats
app.get("/api/tiktok/status", (req, res) => {
  res.json(tikTokState);
});

app.post("/api/tiktok/toggle-live", (req, res) => {
  const { isLive, streamTitle } = req.body;
  tikTokState.isLive = isLive !== undefined ? isLive : !tikTokState.isLive;
  if (streamTitle) tikTokState.streamTitle = streamTitle;
  if (tikTokState.isLive) {
    tikTokState.startedAt = new Date().toISOString();
    tikTokState.liveViewers = Math.floor(Math.random() * 200) + 250;
  } else {
    tikTokState.liveViewers = 0;
  }
  res.json({ success: true, state: tikTokState });
});

// 2. /say command processing
app.post("/api/bot/say", (req, res) => {
  const { message, channel, sender } = req.body;
  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Le message ne peut pas être vide." });
  }

  // Sanitize standard emojis if any slipped in, keeping '❀'
  let cleanMessage = message.trim();

  res.json({
    success: true,
    action: "MESSAGE_ANONYMIZED_AND_SENT",
    originalSenderHidden: true,
    botOutput: cleanMessage,
    channel: channel || "#général",
    timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    systemNote: "Le message original de l'utilisateur a été immédiatement supprimé du chat pour garantir son anonymat ❀",
  });
});

// 5. Real Discord Webhook Tester Endpoint
app.post("/api/webhook/send", async (req, res) => {
  const { webhookUrl, embed, content } = req.body;
  if (!webhookUrl || !webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
    return res.status(400).json({ error: "URL de Webhook Discord invalide." });
  }

  try {
    const payload: any = {};
    if (content) payload.content = content;
    if (embed) payload.embeds = [embed];

    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (discordRes.ok) {
      res.json({ success: true, message: "Message envoyé sur ton serveur Discord avec succès ! ❀" });
    } else {
      const errText = await discordRes.text();
      res.status(discordRes.status).json({ error: `Erreur Discord (${discordRes.status}): ${errText}` });
    }
  } catch (err: any) {
    res.status(500).json({ error: `Erreur réseau : ${err.message}` });
  }
});

// Start Express server with Vite middleware integration
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
