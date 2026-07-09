const { getQueue } = require("../utils/musicManager");

module.exports = {
  name: "skip",
  alias: ["s"],
  run: async (client, message, args) => {
    const queue = getQueue(message.guild.id);
    if (!queue || !queue.songs.length) {
      return message.channel.send("⚠️ No hay ninguna canción reproduciéndose.");
    }
    queue.player.stop();
    return message.channel.send("⏭️ Canción saltada.");
  },
};
