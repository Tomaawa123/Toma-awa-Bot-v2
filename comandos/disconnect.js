const { getQueue, destroyQueue } = require("../utils/musicManager");

module.exports = {
  name: "disconnect",
  alias: ["d"],
  run: async (client, message, args) => {
    const queue = getQueue(message.guild.id);
    if (!queue) {
      return message.channel.send("⚠️ No estoy conectado a ningún canal de voz.");
    }
    destroyQueue(message.guild.id);
    return message.channel.send("👋 Salí del canal de voz.");
  },
};
