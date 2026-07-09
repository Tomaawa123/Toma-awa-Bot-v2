const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "hackban",
    alias: [],

async run (client, message, args){

  var perms = message.member.hasPermission("BAN_MEMBERS")
  if(!perms) return message.channel.send("Español: No tienes suficientes permisos! \n English: You don't have enough permissions!")

  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Español: No tengo suficientes permisos! \n English: I don't have enough permits!")

  const id = args.join(' ')
  if(!id) return message.channel.send("Español: Debes colocar una ID! \n English: You must put an ID!")

  const member = await client.users.fetch(id)
  message.guild.members.ban(member.id)

  message.channel.send(`Español: ✅ El usuario **${member.username}** fue baneado correctamente! \n English: ✅ User **${member.username}** was successfully banned!`)



    
 }
 
}