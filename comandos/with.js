const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')

module.exports = {
    name: "with",
    alias: [],

async run (client, message, args){

 const user = message.author;

 const cantidad = args[0]
 if(!cantidad) return message.channel.send("Debes escribir una cantidad.")

 if(cantidad === 'all'){
   const dinerobancototal = await dinerobanco.obtener(`${user.id}`)

   dinero.sumar(`${user.id}`, dinerobancototal)
   dinerobanco.restar(`${user.id}`, dinerobancototal)

   message.channel.send(`Sacate **${dinerobancototal}** monedas del banco`)
 }

 const dinerobancot = await dinerobanco.obtener(`${user.id}`)

 if(dinerobancot < cantidad){
   return message.channel.send("No tienes tanto dinero en el banco.")
 }

 dinero.sumar(`${user.id}`, cantidad)
 dinerobanco.restar(`${user.id}`, cantidad)

 message.channel.send(`Has sacado **${cantidad}** de dinero en el banco.`)

    
 }
 
}