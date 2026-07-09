const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "lista-idiomas",
    alias: ["list-languajes"],

run (client, message, args){

 const embed = new Discord.MessageEmbed()

 .setTitle("Lista de idiomas disponibles")
 .setDescription("**es** (español)\n**ar** (arabe)\n**en**(ingles)\n**fr** (francés)\n**af** (africano)\n**de** (aleman)\n**am** (armenio)")

 message.channel.send(embed)

    
 }
 
}