const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')

module.exports = {
    name: "crime",
    alias: ["crimen"],

run (client, message, args){

  const user = message.author

  if(!dinero.tiene(`${user.id}`)){
    dinero.establecer(`${user.id}`, 0)
  }

 const crimenes = ['ha robado un banco', 'ha robado el bolso de una señora', 'ha hackeado']

 const crimenesmalos = ['te pillaron robando']

 let resultadosbuenos = crimenes[Math.floor(Math.random() * crimenes.length)]

 let resultadosmalos = crimenesmalos[Math.floor(Math.random() * crimenesmalos.length)]

 let resultados = [resultadosbuenos, resultadosmalos]

 let resultadofinal = resultados[Math.floor(Math.random() * resultados.length)]

 let dinerobueno = Math.floor(Math.random() * 175) + 100

 let dineromalo = Math.floor(Math.random() * -175) + -100

 if(resultadofinal === resultadosbuenos){

   dinero.sumar(`${user.id}`, dinerobueno)

   const embed = new Discord.MessageEmbed()

   .setTitle("Crimen")
   .setDescription(`${user} ${resultadosbuenos} y ha ganado ${dinerobueno}.`)
   .setColor("GREEN")

   message.channel.send(embed)

  }

 if(resultadofinal === resultadosmalos){

   dinero.sumar(`${user.id}`, dineromalo)

   const embed = new Discord.MessageEmbed()

   .setTitle("Crimen")
   .setDescription(`${user} ${resultadosmalos} y ha perdido ${dineromalo}`)
   .setColor("RED")

   message.channel.send(embed)
 }

 }
 
}