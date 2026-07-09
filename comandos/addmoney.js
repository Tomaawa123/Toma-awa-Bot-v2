const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')

module.exports = {
    name: "addmoney",
    alias: [],

run (client, message, args){

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No tienes permisos para utilizar este comando.")

  const user = message.mentions.users.first()
  if(!user) return message.channel.send("Debes mencionar a un usuario para añadirle dinero.")

 if(!dinero.tiene(user.id)){
   dinero.establecer(user.id, 0)
 }

 const dinerocantidad = args.slice(1).join(" ")
 if(!dinerocantidad) return message.channel.send("Debes decir que cantidad añades al usuario.")

 dinero.sumar(message.author.id, dinerocantidad)

 message.channel.send(`El usuario ${user} ha recibido **${dinerocantidad}**`)

 }
 
}