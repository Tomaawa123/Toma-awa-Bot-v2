const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "confesar",
    alias: [],

run (client, message, args){

  message.delete()

 let texto = args.join(' ')
 if(!texto) return message.channel.send("Debes decir algo para confesar!").then(x => x.delete({timeout:2000}))

 const embed = new Discord.MessageEmbed()

 .setTitle("Nueva confesion!")
 .setDescription(`**${texto}**`)

 message.channel.send(embed)

 }
 
}