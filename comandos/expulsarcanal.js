const { getRoomByOwner } = require("../utils/tempVoiceManager");

module.exports = {
  name: "expulsarcanal",
  alias: ["ec"],
  run: async (client, message, args) => {
    const room = getRoomByOwner(message.guild.id, message.author.id);
    if (!room) {
      return message.channel.send("⚠️ No tienes un canal privado creado.");
    }

    const target = message.mentions.members.first();
    if (!target) {
      return message.channel.send("⚠️ Uso: `t!expulsarcanal @usuario`");
    }

    const channel = message.guild.channels.cache.get(room.channelId);
    if (!channel) {
      return message.channel.send("⚠️ Tu canal privado ya no existe.");
    }

    const role = message.guild.roles.cache.get(room.roleId);
    if (role) {
      await target.roles.remove(role).catch(() => {});
    }

    if (target.voice.channel && target.voice.channel.id === channel.id) {
      await target.voice.kick().catch(() => {});
    }

    return message.channel.send(`👢 ${target} fue expulsado de tu canal privado.`);
  },
};
