const Discord = require('discord.js');

module.exports = {
  name: "private",
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
  VIEW_CHANNEL: false,
  READ_MESSAGE_HISTORY: false,
  SEND_MESSAGES: false,
  ADD_REACTIONS: false
})


const embed = new Discord.MessageEmbed()

.setTitle("🔒Channel blocked")
.setDescription('The channel has been blocked. for the role with the id '+ rol)
.setColor('RANDOM')


message.channel.send(embed)

  }
}