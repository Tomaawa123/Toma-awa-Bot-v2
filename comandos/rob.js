const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')

module.exports = {
    name: "rob",
    alias: ["robar"],

async run (client, message, args){

 const user = message.author
 const persona = message.mentions.users.first()

 if(!persona) return message.channel.send("Debes mencionar a alguien para robarle!")

 let dineropersona = await dinero.obtener(`${persona.id}`)
 let dinerouser = await dinero.obtener(`${user.id}`)

 let dineroaleatorio = Math.floor(Math.random() * dineropersona) + 1

 if(persona.id === message.author.id) return message.channel.send("No te puedes robar a ti mismo!")
 if(!isNaN(args[0])) return message.channel.send("Eso no es un usuario valido.")

 if(!dinero.tiene(`${persona.id}`)) return message.channel.send("Este usuario no tiene dinero!")

 let posibilidades = ['bien', 'mal']
 let posibiladfinal = posibilidades[Math.floor(Math.random() * posibilidades.length)]

 if(posibiladfinal === 'bien'){
   dinero.restar(persona.id, dineroaleatorio)

   dinero.sumar(user.id, dineroaleatorio)

   message.channel.send(`Has robado a ${persona.tag} y has conseguido **${dineroaleatorio}**`)
 }

 if(posibiladfinal === 'mal'){

   dinero.restar(user.id, dineroaleatorio)

   message.channel.send(`Has intentado robar a ${persona.tag} y has perdido **${dineroaleatorio}**`)
 }
 

 }
 
}