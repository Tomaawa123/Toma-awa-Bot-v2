const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
traductor = require('@iamtraction/google-translate');

module.exports = {
    name: "traducir",
    alias: ["translate"],

run (client, message, args){

 const idioma = args[0]
 if(!idioma) return message.channel.send('Debes escribir un idioma valido, para conocerlos usa el comando: **lista-idiomas**')

 const texto = args.slice(1).join(" ")
 if(!texto) return message.channel.send('Debes escribir el texto que quieres traducir!')

 traductor(texto, {
   to: idioma
 }).then(res => {
   const embed = new Discord.MessageEmbed()

   .setTitle("Traductor!")
   .addField('Texto para traducir:', texto)
   .addField('Texto traducido:', res.text )
   .setColor("RANDOM")

   message.channel.send(embed)
 })

    
 }
 
}