const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const prefix_db = new db.crearDB('prefix')

module.exports = {
    name: "set-prefix",
    alias: ["cambiar-prefix"],

run (client, message, args){



  if(!args[0]) return message.channel.send("Debes escribir un prefix nuevo!")

 message.guild.owner.send(`El prefix a sido cambiado a **${args[0]}**`).catch('error', (err) => message.channel.send("No puedo enviarle un mensaje al dueño, tiene los mensaje de este servidor prohibidos!"))

 prefix_db.establecer(message.guild.id, args[0])

 message.channel.send(`El prefix a sido cambiado a **${args[0]}**`)
 
    
 }
 
}