const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const multiplicador = new db.crearDB('multiplicador')

module.exports = {
    name: "buy",
    alias: ["comprar"],

async run (client, message, args){

  const user = message.author;

 const objeto = args.join(' ')
 if(!objeto) return message.channel.send("Debes escribir un objeto para comprarlo.")

 if(!multiplicador.tiene(`${user.id}`)){
   multiplicador.establecer(`${user.id}`, 0)
 }

 const dinerouser = await dinero.obtener(`${user.id}`)

 if(objeto === 'multiplicador'){

   if(dinerouser < 10000) return message.channel.send("No tienes suficiente dinero para comprar este multiplicador!")

   multiplicador.sumar(`${user.id}`, 0)

   message.channel.send("Has comprado el multiplicador del comando: work")

 }

 }
 
}