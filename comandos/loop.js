const { getQueue } = require("../utils/musicManager");

module.exports = {
  name: "loop",
  alias: ["l"],
  run: async (client, message, args) => {
    const queue = getQueue(message.guild.id);
    if (!queue || !queue.songs.length) {
      return message.channel.send("⚠️ No hay ninguna canción reproduciéndose.");
    }
    queue.loop = !queue.loop;
    return message.channel.send(queue.loop ? "🔁 Repetición de la canción activada." : "🔁 Repetición de la canción desactivada.");
  },
};
