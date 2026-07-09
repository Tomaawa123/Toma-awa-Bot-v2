const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    alias: ["help"],
 
run (client, message, args){


  const embed = new Discord.MessageEmbed()

  .setTitle ("MY COMMAND LIST")
  .setThumbnail (client.user.displayAvatarURL ())
  .setDescription ("Prefix: t! \n Moderation: \n invite \n ticket \n close (ticket) \n tranlate \n list-languaje \n :tada: Fun: \n say \n hack \n text-fortnite <color> <text> \n addmoney \n afk \n work \n with \n shop \n buy \n confess \n crime \n dep \n fish \n rob \n bal \n say \n rank \n :underage: NSFW: \n 4k \n ass \n gif \n anal \n hentai \n pussy \n yaoi \n if you have an idea to add another command you can tell tomaawa#4877 to get me more commands")
  .setColor ("RANDOM")
  .setFooter("Take water v35")

  message.channel.send(embed)

 }

}