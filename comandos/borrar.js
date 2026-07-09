const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "borrar",
    alias: ["borrar"],

run (client, message, args){

message.delete()

const cantidad = args.join(" ");

var perms = message.member.hasPermission("MANAGE_MESSAGES")
if(!perms) return message.channel.send("Debes tener los permisos de **Gestionar mensajes** para usar este comando!").then(x => x.delete({timeout:5000}))

if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Necesito el permiso **Gestionar mensajes**!").then(x => x.delete({timeout:5000}))

if(cantidad === "0") return message.channel.send("Debes escribir un numero mayor que 0!").then(x => x.delete({timeout:5000}))


message.channel.bulkDelete(cantidad).then(()=> {
  message.channel.send(`✅**${cantidad}** Mensajes borrados correctamente!`).then(x => x.delete({timeout:5000}))
})

    
 }
 
}