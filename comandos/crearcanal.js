const { registerRoom, getRoomByOwner } = require("../utils/tempVoiceManager");

module.exports = {
  name: "crearcanal",
  alias: ["cc"],
  run: async (client, message, args) => {
    if (!args.length) {
      return message.channel.send("⚠️ Uso: `t!crearcanal <nombre> @amigo1 @amigo2 ...`");
    }

    const existing = getRoomByOwner(message.guild.id, message.author.id);
    if (existing) {
      return message.channel.send("⚠️ Ya tienes un canal privado creado. Espera a que se elimine (60s después de que todos salgan) antes de crear otro.");
    }

    const mentionedMembers = [...message.mentions.members.values()];
    const nameParts = args.filter((a) => !a.startsWith("<@"));
    const channelName = nameParts.join("-").slice(0, 90) || `sala-${message.author.username}`;

    const botMember = message.guild.me;
    if (!botMember.hasPermission("MANAGE_ROLES") || !botMember.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send("⚠️ Necesito los permisos de Gestionar Roles y Gestionar Canales para crear salas privadas.");
    }

    let role;
    try {
      role = await message.guild.roles.create({
        data: {
          name: `sala-${channelName}`,
          mentionable: false,
          permissions: [],
        },
        reason: `Rol de canal privado creado por ${message.author.tag}`,
      });
    } catch (err) {
      console.error(err);
      return message.channel.send("❌ No pude crear el rol para tu canal privado.");
    }

    await message.member.roles.add(role).catch(() => {});
    for (const member of mentionedMembers) {
      await member.roles.add(role).catch(() => {});
    }

    let channel;
    try {
      channel = await message.guild.channels.create(channelName, {
        type: "voice",
        reason: `Canal privado creado por ${message.author.tag}`,
        permissionOverwrites: [
          {
            id: message.guild.roles.everyone.id,
            deny: ["VIEW_CHANNEL", "CONNECT"],
          },
          {
            id: role.id,
            allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
          },
          {
            id: client.user.id,
            allow: ["VIEW_CHANNEL", "CONNECT", "MOVE_MEMBERS"],
          },
        ],
      });
    } catch (err) {
      console.error(err);
      await role.delete().catch(() => {});
      return message.channel.send("❌ No pude crear el canal de voz privado.");
    }

    registerRoom(message.guild.id, channel.id, role.id, message.author.id);

    const mentionsText = mentionedMembers.length
      ? mentionedMembers.map((m) => m.toString()).join(", ")
      : "nadie más por ahora";

    return message.channel.send(
      `✅ Canal privado **${channel.name}** creado. Invitados: ${mentionsText}\n` +
      `Usa \`t!expulsarcanal @usuario\` para sacar a alguien de tu canal.\n` +
      `El canal se eliminará automáticamente 60 segundos después de que todos salgan de él.`
    );
  },
};
