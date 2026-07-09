const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "unwarn",
    alias: [],

async run (client, message, args){

  var perms = message.member.hasPermission("ADMINITRATOR")
  if(!perms) return message.channel.send("No tienes permisos para usar este comando")

 const user = message.mentions.members.first()
 if(!user) return message.channel.send("Debes mencionar un usuario!")

 if(!warns.tiene(`${message.guild.id}.${user.id}`)){
   warns.establecer(`${message.guild.id}.${user.id}`, 0)
 }

 const cantidad = await warns.obtener(`${message.guild.id}.${user.id}`)

 if(cantidad < 1) return message.channel.send("Esta persona no tiene warns!")

 warns.restar(`${message.guild.id}.${user.id}`, 1)

 message.channel.send(`El usuario **${message.author.username}** le ha quitado un aviso a **${user.username}**`)



    
 }
 
}