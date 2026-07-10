const Discord = require('discord.js');

module.exports = {
    name: "ayudaadmin",
    alias: ["ayudaadmin"],

run(client, message, args){

  var perms = message.member.hasPermission("MANAGE_MESSAGES")
  if(!perms) return message.channel.send("No tienes permisos para utilizar este comando.")

  const embed = new Discord.MessageEmbed()
    .setTitle("🛠️ Lista de comandos de administrador - Toma awa")
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RANDOM")
    .setDescription("Prefix: `t!` (funciona en mayúsculas o minúsculas)")
    .addField("🧑‍⚖️ Moderación", "`ban`, `kick`, `hackban`, `mute`, `tempmute`, `unmute`, `warn`, `warns`, `unwarn`, `nuke`, `borrar` (borrar mensajes), `lock`, `unlock`, `private`, `snipe` (ver mensajes borrados)\n actualizar (enviar mensaje de actualizacion al canal logs) \n Protecciones automáticas: anti-links, anti-groserías, anti-spam")
    .addField("⚙️ Configuración del servidor", "`setbienvenidas`, `setdespedidas`, `set-prefix`, `ticket`, `close` (cerrar ticket), `invite`, `uptime`")
    .addField("🎵 Música", "`play/p`, `join/j`, `skip/s`, `pause/pa`, `resume/r`, `loop/l`, `loopqueue/lq`, `disconnect/d`, `musica` (ayuda música)")
    .addField("🔊 Canales privados", "`crearcanal <nombre> @amigos` crea una sala de voz privada\n`expulsarcanal @usuario` expulsa a alguien de una sala")
    .addField("🎭 Roles", "`autorol` configura roles automáticos por reacción")
    .addField("🎉 Diversión y economía", "`say`, `hack`, `text-fortnite <color> <texto>`, `addmoney`, `work`, `with`, `shop`, `buy`, `confesar`, `crime`, `dep`, `pescar`, `rob`, `bal`, `rank`, `tictactoe`, `traducir`, `lista-idiomas`")
    .addField("🔞 NSFW (solo en el canal autorizado +18)", "`4k`, `ass`, `gif`, `anal`, `hentai`, `pussy`, `yaoi`")
    .setFooter("Toma awa v35 | Si tienes ideas para más comandos, dile a tomaawa#4877")

  message.channel.send(embed)

 }

}
