const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')

module.exports = {
    name: "bal",
    alias: [],

async run (client, message, args){

  const user = message.mentions.members.first() || message.member;

 if(!dinero.tiene(`${user.id}`)){
   dinero.establecer(`${user.id}`, 0)
 }

 if(!dinerobanco.tiene(`${user.id}`)){
   dinerobanco.establecer(`${user.id}`, 0)
 }

 const dinerototal = await dinero.obtener(`${user.id}`)
 const dinerobancototal = await dinerobanco.obtener(`${user.id}`)
    
 const embed = new Discord.MessageEmbed()

 .setTitle(`Dinero de ${message.author.tag}`)
 .setDescription(`Dinero: **${dinerototal}**\n\nDinero en el banco: **${dinerobancototal}**\n\nDinero en total: **${dinerototal + dinerobancototal}**`)
 .setColor("GREEN")

 message.channel.send(embed)
 }
 
}