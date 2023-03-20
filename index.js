const express = require("express");
const { Telegraf } = require("telegraf");
const { Wit, log } = require("node-wit");

// Config .env
require("dotenv").config();

// Config Wit client
const client = new Wit({
  accessToken: process.env.WIT_TOKEN,
  logger: new log.Logger(log.DEBUG),
});

const app = express();

// Creación bot Telegram
const bot = new Telegraf(process.env.BOT_TOKEN);

// Configuración Telegraf
app.use(bot.webhookCallback("/url-telegram"));
bot.telegram.setWebhook(`${process.env.BOT_URL}/url-telegram`);

app.post("/url-telegram", (req, res) => {
  res.send("FIN");
});

// COMANDOS
bot.command("test", require("/test"));
bot.command("tiempo", require("/tiempo"));
bot.command("donde", require("/donde"));

bot.on("text", async (ctx) => {
  const response = await client.message(ctx.message.text);

  if (response.intents.length === 0 || response.intents[0].confidence < 0.8) {
    return ctx.reply("No te entiendo");
  }

  const intent = response.intents[0].name;

  ctx.reply(`Me has dicho un ${intent}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
