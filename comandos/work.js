const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinero')
const multiplicador = new db.crearDB('multiplicador')

let cooldown = new Set();

module.exports = {
    name: "work",
    alias: ["w"],

async run (client, message, args){

 if(cooldown.has(message.author.id)){
   message.channel.send(`${message.author}, tienes que esperar 30 segundos antes de volver a usar el comando`)

   return;
 }

 cooldown.add(message.author.id);

 setTimeout(() => {
   cooldown.delete(message.author.id);
 }, 30000);

 const user = message.author;

 if(!dinero.tiene(user.id)){
   dinero.establecer(`${user.id}`, 0)
 }

 if(!dinerobanco.tiene(user.id)){
   dinerobanco.establecer(`${user.id}`, 0)
 }

  let random = Math.floor(Math.random() * 175) + 100
  let randomaumentado = Math.floor(Math.random() * 10175) + 500

  let trabajo = ["policia", "profesor", "bombero"]
  let randomtrabajo = trabajo[Math.floor(Math.random() * trabajo.length)]

  let objetodinero = await multiplicador.obtener(`${user.id}`)

  if(objetodinero > 0){

  

    dinero.sumar(`${user.id}`, randomaumentado)
    multiplicador.restar(`${user.id}`, 1)

  const embed = new Discord.MessageEmbed()

  .setTitle("Trabajo")
  .setDescription(`El usuario **${user}** ha trabajado de **${randomtrabajo}** y ganó **${randomaumentado}$**`)
  .setColor("RANDOM")

  message.channel.send(embed)

  }

  dinero.sumar(`${user.id}`, random)

  const embed = new Discord.MessageEmbed()

  .setTitle("Trabajo")
  .setDescription(`El usuario **${user}** ha trabajado de **${randomtrabajo}** y ganó **${random}$**`)
  .setColor("RANDOM")

  message.channel.send(embed)
    
 }
 
}