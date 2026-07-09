const { getQueue } = require("../utils/musicManager");

module.exports = {
  name: "loopqueue",
  alias: ["lq"],
  run: async (client, message, args) => {
    const queue = getQueue(message.guild.id);
    if (!queue || !queue.songs.length) {
      return message.channel.send("⚠️ No hay ninguna canción reproduciéndose.");
    }
    queue.loopQueue = !queue.loopQueue;
    return message.channel.send(queue.loopQueue ? "🔁 Repetición de la cola activada." : "🔁 Repetición de la cola desactivada.");
  },
};
