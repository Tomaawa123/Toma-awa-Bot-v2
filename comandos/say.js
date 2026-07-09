const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "say",
    alias: ["say"],

run (client, message, args){

  message.delete()

 let texto = args.join(' ')
 if(!texto) return message.channel.send("Debes escribir algo para que pueda repetirlo!")

 message.channel.send(texto)

 }
 
}