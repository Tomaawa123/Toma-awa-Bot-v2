const Discord = require('discord.js');

module.exports = {
  name: "unlock",
  alias: [],

run(client, message, args){

var perms = message.member.hasPermission("MANAGE_MESSAGES");

if(!perms){
  return message.channel.send("No tienes permisos para ejecutar este comando!")
}

let channel = message.mentions.channels.first() || message.channel; 

let rol = message.mentions.roles.first() || message.guild.roles.cache.find(aus => aus.name === "@here");

message.delete();


channel.updateOverwrite(rol,{
  READ_MESSAGE_HISTORY: true,
  SEND_MESSAGES: true,
  ADD_REACTIONS: true
})


const embed = new Discord.MessageEmbed()

.setTitle("🔓Canal Desbloqueado")
.setDescription('El canal ha sido desbloqueado. para el rol con la id '+ rol)
.setColor('RANDOM')


message.channel.send(embed)

  }
}