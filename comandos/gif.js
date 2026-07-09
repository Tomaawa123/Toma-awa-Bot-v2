const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

const NSFW_CHANNEL_ID = "1524868049675485244";

module.exports = {
  name: "gif",
  aliases: [],
  description: "Muestra un gif aleatorio +18",
  category: "NSFW",
  usage: "gif",
  run: async (client, message, args) => {
    if (message.channel.id !== NSFW_CHANNEL_ID || !message.channel.nsfw) {
      const nsfwembed = new MessageEmbed()
        .setColor("RED")
        .setDescription("⚠️ | Este comando solo se puede usar en el canal NSFW autorizado (marcado como +18 en Discord).")
        .setFooter(`Solicitado por ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
      return message.reply({ embeds: [nsfwembed] });
    }

    const loading = new MessageEmbed().setDescription("Por favor espera...").setTimestamp();
    const sent = await message.channel.send({ embeds: [loading] });

    try {
      const response = await superagent.get("https://nekobot.xyz/api/image").query({ type: "pgif" });
      const embed = new MessageEmbed()
        .setDescription(`:underage:\n**[¿No carga la imagen? haz clic aquí](${response.body.message})**`)
        .setColor("RANDOM")
        .setImage(response.body.message)
        .setFooter(`Solicitado por ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
      await sent.edit({ embeds: [embed] });
    } catch (err) {
      await sent.edit({ content: "Ocurrió un error al obtener la imagen, intenta de nuevo." });
    }
  },
};
