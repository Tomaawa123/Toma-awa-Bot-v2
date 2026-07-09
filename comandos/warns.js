const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const warns = new db.crearDB('warns')

module.exports = {
    name: "warns",
    alias: ["avisos"],

async run (client, message, args){

  var perms = message.member.hasPermission("ADMINISTRATOR")
  if(!perms) return message.channel.send("No tienes permisos para usar este comando!")

  let persona = message.mentions.members.first()
  if(!persona) return message.channel.send("Debes mencionar a alguien.")

 let cantidad = await warns.obtener(`${message.guild.id}.${persona.id}`)

 if(!warns.tiene(`${message.guild.id}.${persona.id}`)){
   message.channel.send("Esa persona no tiene warns.")

   return;
 }

 message.channel.send(`**${persona}** tiene **${cantidad}**`)

    
 }
 
}