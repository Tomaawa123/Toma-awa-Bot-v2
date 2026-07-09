const { Client, MessageEmbed } = require('discord.js');
const Discord = require("discord.js")



module.exports = {
    name: "uptime",
    alias: [],


  async run(client, message, args) {

    try {
const uptime = Math.floor((new Date().getTime() - client.uptime) / 1000);

    const uptimeEmbed = new Discord.MessageEmbed()
     .setDescription(` Estoy encendido desde el <t:${uptime}>`)
      .setColor("RANDOM")

    message.channel.send(uptimeEmbed)
    /* message.channel.send("prueba")
    i.reply({ embeds: [uptimeEmbed] }) */
  } catch (error){
      console.error(error);
  }
  }
}
