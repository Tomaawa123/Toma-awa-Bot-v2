const Discord = require('discord.js');

module.exports = {
  name: "lock",
  alias: [],

run(client, message, args){

var perms = message.member.hasPermission("MANAGE_MESSAGES");

if(!perms){
  return message.channel.send("No tienes permisos para ejecutar este comando!")
}

let channel = message.mentions.channels.first() || message.channel; 

let rol = message.mentions.roles.first() || message.guild.roles.cache.find(aus => aus.name === "@everyone");

message.delete();


channel.updateOverwrite(rol,{
  READ_MESSAGE_HISTORY: true,
  SEND_MESSAGES: false,
  ADD_REACTIONS: false
})



const embed = new Discord.MessageEmbed()

.setTitle("🔒Canal Bloqueado")
.setDescription('El canal ha sido bloqueado. para el rol con la id '+ rol)
.setColor('RANDOM')


message.channel.send(embed)

  }
}
