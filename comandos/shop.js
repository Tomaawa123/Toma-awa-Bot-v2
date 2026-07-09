const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "tienda",
    alias: ["shop"],

run (client, message, args){

 const embed = new Discord.MessageEmbed()

 .setTitle("Tienda")
 .setDescription(`Mas dinero en el comando: work \nPrecio: 10 000\nNombre: multiplicador`)
 .addField("pronto mas ventas")
 .setColor("RED")

 message.channel.send(embed)

    
 }
 
}