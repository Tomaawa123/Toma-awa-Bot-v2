const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "invite",
    alias: [""],

run (client, message, args){

message.channel.send("https://discord.com/api/oauth2/authorize?client_id=905121114085269594&permissions=8&scope=bot")

    
 }
 
}