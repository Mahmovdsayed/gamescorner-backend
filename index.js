import express from 'express'
import { config } from 'dotenv'

import { initiateApp } from './src/initiate-app.js'
config({ path: './config/dev.config.env' })
import cors from 'cors'
import "dotenv/config";
import { Client, GatewayIntentBits, ActivityType } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: "idle",
    activities: [
      {
        name: "Tayloor",
        type: ActivityType.Watching, // WATCHING
      },
    ],
  });
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() === "link") {
    message.channel.send(`https://discord.gg/tayloor`);
  }
});

client.login(process.env.TOKEN);



const app = express();
app.use(cors())
initiateApp(app, express)
