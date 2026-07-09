const { getQueue } = require("../utils/musicManager");

module.exports = {
  name: "pause",
  alias: ["pa"],
  run: async (client, message, args) => {
    const queue = getQueue(message.guild.id);
    if (!queue || !queue.playing) {
      return message.channel.send("⚠️ No hay ninguna canción reproduciéndose.");
    }
    queue.player.pause();
    return message.channel.send("⏸️ Canción pausada.");
  },
};
