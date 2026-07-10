const { MessageEmbed } = require("discord.js");
const { addReactionRole } = require("../utils/reactionRoles");

module.exports = {
  name: "autorol",
  alias: ["autorole", "reactionrole"],
  run: async (client, message, args) => {
    const perms = message.member.hasPermission("MANAGE_ROLES");
    if (!perms) return message.channel.send("⚠️ No tienes permisos para usar este comando.");

    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Autoroles con reacciones")
        .setDescription(
          "**Cómo usarlo:**\n" +
          "1. Envía el mensaje al que quieres que la gente reaccione (puede ser cualquier mensaje tuyo o del bot).\n" +
          "2. Copia el ID de ese mensaje (activa el modo desarrollador en Discord: Ajustes > Avanzado > Modo Desarrollador, luego clic derecho al mensaje > Copiar ID).\n" +
          "3. Escribe:\n`t!autorol <ID del mensaje> <emoji> @rol`\n" +
          "4. El bot reaccionará automáticamente al mensaje con ese emoji.\n" +
          "5. Cuando alguien reaccione con ese emoji, recibirá el rol. Si quita su reacción, se le quita el rol.\n\n" +
          "Ejemplo:\n`t!autorol 123456789012345678 🎮 @Gamer`"
        );
      return message.channel.send(embed);
    }

    const [messageId, emojiRaw, ...rest] = args;
    const role = message.mentions.roles.first();

    if (!messageId || !emojiRaw || !role) {
      return message.channel.send("⚠️ Uso: `t!autorol <ID del mensaje> <emoji> @rol`");
    }

    let targetMessage;
    try {
      targetMessage = await message.channel.messages.fetch(messageId);
    } catch (e) {
      return message.channel.send("❌ No encontré ese mensaje en este canal. Asegúrate de usar el comando en el mismo canal donde está el mensaje.");
    }

    const customEmojiMatch = emojiRaw.match(/^<a?:\w+:(\d+)>$/);
    const emojiToReact = customEmojiMatch ? customEmojiMatch[1] : emojiRaw;
    const emojiKeyValue = customEmojiMatch ? customEmojiMatch[1] : emojiRaw;

    try {
      await targetMessage.react(emojiToReact);
    } catch (e) {
      return message.channel.send("❌ No pude reaccionar con ese emoji. Verifica que sea válido y que el bot tenga acceso a él.");
    }

    addReactionRole(message.guild.id, targetMessage.id, emojiKeyValue, role.id);

    return message.channel.send(`✅ Listo. Ahora quien reaccione con ${emojiRaw} en ese mensaje recibirá el rol **${role.name}**.`);
  },
};
