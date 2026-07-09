const { ensureQueue } = require("../utils/musicManager");

module.exports = {
  name: "join",
  alias: ["j"],
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send("⚠️ Debes estar en un canal de voz para usar este comando.");
    }
    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send("⚠️ No tengo permisos para conectarme o hablar en ese canal de voz.");
    }
    ensureQueue(message.guild, voiceChannel, message.channel);
    return message.channel.send(`✅ Me uní a **${voiceChannel.name}**.`);
  },
};
