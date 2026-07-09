const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "text-fortnite",
    alias: [],

run (client, message, args){

 let color = args[0]
    if(!color) return message.channel.send("Necesitas poner un color!")

    let texto = args.slice(1).join(" ")
    if(!texto) return message.channel.send("Necesitas poner un texto!")

    let imagen = new Discord.MessageAttachment(`http://fortnitefontgenerator.com/img.php?fontsize=38&textcolor=${color}&text=${texto}`, "LDfortnite.png")

    message.channel.send(imagen)

    
 }
 
}