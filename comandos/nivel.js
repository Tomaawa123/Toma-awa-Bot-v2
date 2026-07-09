const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
let nivel = new db.crearDB('niveles');

module.exports = {
    name: "rank",
    alias: ["level"],

async run (client, message, args){

 var idid = message.guild.id + message.author.id
 var xps = await nivel.obtener(`${idid}.xp`)
 var levels = await nivel.obtener(`${idid}.nivel`)

 message.channel.send(`Tu nivel es ${levels}.`)

    
 }
 
}