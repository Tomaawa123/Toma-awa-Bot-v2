const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
module.exports = {
  name: "actualizacion",
  alias: ["update"],
  run: async (client, message, args) => {
    const logChannelId = '1525200688240656525'; // Pon aquí tu ID
    const logChannel = await client.channels.fetch(logChannelId);
    if (!logChannel) {
      return message.channel.send("⚠️ No se encontró el canal de logs.");
    }
    const updateMessage = args.join(" ") || "Se realizó una actualización en el bot.";
    await logChannel.send(`🔧 Actualización: ${updateMessage}`);
    message.channel.send("✅ Mensaje de actualización enviado al canal de logs.");
  },
};