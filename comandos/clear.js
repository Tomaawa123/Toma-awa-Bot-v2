const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "clear",
    alias: ["clear"],

run (client, message, args){

message.delete()

const cantidad = args.join(" ");

var perms = message.member.hasPermission("MANAGE_MESSAGES")
if(!perms) return message.channel.send("You must have **Manage Messages** permissions to use this command!").then(x => x.delete({timeout:5000}))

if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I need the **Manage Messages** permission!").then(x => x.delete({timeout:5000}))

if(cantidad === "0") return message.channel.send("You must write a number greater than 0!").then(x => x.delete({timeout:5000}))


message.channel.bulkDelete(cantidad).then(()=> {
  message.channel.send(`✅**${cantidad}** Messages deleted successfully!`).then(x => x.delete({timeout:5000}))
})

    
 }
 
}