const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "nuke",
    alias: [],

run (client, message, args){

  var perms = message.member.hasPermission("MANAGE_MESSAGES")
  if(!perms) return message.channel.send("No tienes permisos para utilizar este comando.")


let  link = "https://cdn.discordapp.com/attachments/786627691267751976/787745289523691541/6c485efad8b910e5289fc7968ea1d22f.gif"

const nuke = new Discord.MessageAttachment(link, "nuke.gif")

var posicion = message.channel.position

message.channel.clone().then((canal) => {
  message.channel.delete()

  canal.send("Este canal fue nukeado", nuke)
})

    
 }
 
}