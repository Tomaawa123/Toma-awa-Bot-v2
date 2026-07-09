const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "ban",
   alias: [],

run (client, message, args){

   if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('No tengo permisos para banear miembros!')

    let user = message.mentions.members.first();
    
    let banReason = args.join(' ').slice(22);

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No tienes suficientes permisos!")
  
    if(!user) return message.channel.send("Debes mencionar a alguien!")

    if(!user) return message.channel.send("Debes mencionar a alguien")

    if(user === message.author) return message.channel.send("No puedes banearte a ti mismo!")

    if(!banReason) return message.channel.send("Debes decir una razon!")

    user.ban({ reason: banReason})

    const banembed = new Discord.MessageEmbed()

    .setTitle("✅Usuario baneado correctamente!")
    .setDescription(`El usuario <@${user.id}> ha sido baneado! \n Baneado por el moderador: ${message.author.tag} por **${banReason}**`)
    .setColor("BLACK")
    .setTimestamp()
    .setFooter("BAN")

    message.channel.send(banembed)

    user.send(`Te han baneado en el servidor **${message.guild.name}** por **${banReason}**`)

 }
 
}