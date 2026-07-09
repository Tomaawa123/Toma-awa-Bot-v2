const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const canalbienvenidos = new db.crearDB('canalbienvenidos')

module.exports = {
    name: "setbienvenidas",
    alias: [""],

async run (client, message, args){

  var perms = message.member.hasPermission("MANAGE_MESSAGES")
 if(!perms) return message.channel.send("No tienes permisos para utilizar este comando!")

  const canal = message.mentions.channels.first()

  if(!canal) return message.channel.send("Debes mencionar un canal para que se notifiquen las bienvenidas.")
 
  message.channel.send("Se ha establecido el canal para las bienvenidas.")

  canalbienvenidos.establecer(`${message.guild.id}` , `${canal.id}`)
    
 }
 
}