const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "adminhelp",
    alias: ["adminhelp"],
 
run (client, message, args){

  var perms = message.member.hasPermission("MANAGE_MESSAGES")
  if(!perms) return message.channel.send("You do not have permissions to use this command.")

  const embed = new Discord.MessageEmbed()

 .setTitle ("MY COMMAND LIST")
  .setThumbnail (client.user.displayAvatarURL ())
  .setDescription ("Prefix: t! \n :face_with_monocle: Moderation: \n invite \n clear \n lock \n unlock \n ticket \n close (ticket) \n ban \n kick \n hackban \n mute \tempmute \n nuke \n private \n say \n uptime \n setbienvenidas \n setdespedidas \n ticket \n close \n translate \n list-languaje \n warn \n warns \n unwarn \n snipe (view deleted messages)\n bot: anti-links, anti-badwords, anti-spam \n :tada: Fun: \n tictactoe \n hack \n music \n text-fortnite <color> <text> \n addmoney \n afk \n work \n with \n shop \n buy \n confess \n crime \n dep \n fish \n rob \n bal \n say \n rank \n :underage: NSFW: \n 4k \n ass \n gif \n anal \n hentai \n pussy \n if you have an idea to add another command you can tell tomaawa#4877 to put me on more commands")
  .setColor ("RANDOM")
  .setFooter("Take water v35")

  message.channel.send(embed)

 }

}