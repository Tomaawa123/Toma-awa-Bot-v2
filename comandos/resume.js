const { getQueue } = require("../utils/musicManager");

module.exports = {
  name: "resume",
  alias: ["r"],
  run: async (client, message, args) => {
    const queue = getQueue(message.guild.id);
    if (!queue) {
      return message.channel.send("⚠️ No hay ninguna canción pausada.");
    }
    queue.player.unpause();
    return message.channel.send("▶️ Canción reanudada.");
  },
};
