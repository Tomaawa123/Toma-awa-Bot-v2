const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

const NSFW_CHANNEL_ID = "1524868049675485244";

module.exports = {
  name: "yaoi",
  aliases: ["gay"],
  description: "Muestra un gif aleatorio +18 de hombres",
  category: "NSFW",
  usage: "yaoi",
  run: async (client, message, args) => {
    if (message.channel.id !== NSFW_CHANNEL_ID || !message.channel.nsfw) {
      const nsfwembed = new MessageEmbed()
        .setColor("RED")
        .setDescription("⚠️ | Este comando solo se puede usar en el canal NSFW autorizado (marcado como +18 en Discord).")
        .setFooter(`Solicitado por ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
      return message.reply(nsfwembed);
    }

    const loading = new MessageEmbed().setDescription("Por favor espera...").setTimestamp();
    const sent = await message.channel.send(loading);

    try {
      const response = await superagent.get("https://purrbot.site/api/img/nsfw/yaoi/gif");
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(response.body.link)
        .setFooter(`Solicitado por ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
      await sent.edit(embed);
    } catch (err) {
      await sent.edit("Ocurrió un error al obtener la imagen, intenta de nuevo.");
    }
  },
};
