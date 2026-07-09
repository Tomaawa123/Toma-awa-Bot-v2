const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const warns = new db.crearDB('warns')

module.exports = {
    name: "warn",
    alias: ["aviso"],

run (client, message, args){

  var perms = message.member.hasPermission("ADMINISTRATOR")
  if(!perms) return message.channel.send("No tienes permisos para utiliza este comando.")

 let persona = message.mentions.users.first()
 if(!persona) return message.channel.send("Debes mencionar al alguien para avisarle.")

 var razon = args.slice(1).join(" ")
 if(!razon) return message.channel.send("Debes escribir una razon.")

 if(!warns.tiene(`${message.guild.id}.${persona.id}`))
 warns.establecer(`${message.guild.id}.${persona.id}`, 0)

 warns.sumar(`${message.guild.id}.${persona.id}`, 1)

 message.channel.send(`El moderador ${message.author.tag} aviso a ${persona.tag} por **${razon}**`)

 persona.send(`Te han avisado en el servidor **${message.guild.name}** por **${razon}**`)

 }
 
}