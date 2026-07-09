const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "confess",
    alias: ["confession"],

run (client, message, args){

  message.delete()

 let texto = args.join(' ')
 if(!texto) return message.channel.send("You must say something to confess!").then(x => x.delete({timeout:2000}))

 const embed = new Discord.MessageEmbed()

 .setTitle("New confession!")
 .setDescription(`**${texto}**`)

 message.channel.send(embed)

 }
 
}