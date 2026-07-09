const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "ayuda",
    alias: ["ayuda"],
 
run (client, message, args){


  const embed = new Discord.MessageEmbed()

  .setTitle("MI LISTA DE COMANDOS")
  .setThumbnail(client.user.displayAvatarURL())
  .setDescription("Prefix: t! \n Moderacion: \n uptime \n invite \n ticket \n close (ticket) \n uptime \n traducir \n lista-idiomas \n :tada: Fun: \n musica \n hack \n say \n  text-fortnite <color> <texto> \n addmoney \n afk \n work \n with \n shop \n buy \n confess \n crime \n dep \n pescar \n rob \n bal \n say \n rank \n underage: NSFW: \n 4k \n ass \n si tienes ideas para mas comandos puedes decirle a tomaawa#4877 para que me agregue mas comandos")
  .setColor("RANDOM")
  .setFooter("Toma awa v35")

  message.channel.send(embed)

 }

}