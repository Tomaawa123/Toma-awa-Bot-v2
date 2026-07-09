const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "musica",
    alias: ["musica"],

run (client, message, args){

 const embed = new Discord.MessageEmbed()

    
.setTitle("Música")
.setDescription("Obtenga una lista de todos los comandos de música disponibles con sus funciones y uso.\n Unirse \n Escriba t!join o t!j para que me una al canal de voz al que se ha unido.\nReproducir\nEscriba t!play o t!p nombre de la canción para reproducir una canción en un canal de voz o para poner canciones en cola.\nBucle\nEscriba t!loop o t!l para reproducir la canción actual en un bucle o para detener el bucle.\nBucle de cola\nEscriba t!loopqueue o t!lq para reproducir la cola actual en bucle o para detener el bucle.\nSaltar\nEscriba t!skip o t!s para saltar la canción que se está reproduciendo actualmente.\nPausa\nEscriba t!pause o t!pa para pausar la canción que se está reproduciendo actualmente.\nReanudar\nEscriba t!resume o t!r para reanudar la canción que ha sido pausada.\nDesconectar\nEscribe t!disconnect o t!d para hacerme salir del canal de voz.")

    message.channel.send(embed)


  }
}