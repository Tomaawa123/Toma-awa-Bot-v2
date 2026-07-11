const Discord = require('discord.js');

module.exports = {
    name: "ayuda",
    alias: ["ayuda"],

run(client, message, args){

  const embed = new Discord.MessageEmbed()
    .setTitle("📖 Lista de comandos - Toma awa")
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RANDOM")
    .setDescription("Prefix: `t!` (funciona en mayúsculas o minúsculas)")
    .addField("🎵 Música", "`play/p` reproduce una canción\n`join/j` me uno a tu canal de voz\n`skip/s` salta la canción\n`pause/pa` pausa\n`resume/r` reanuda\n`loop/l` repetir canción\n`loopqueue/lq` repetir la cola\n`disconnect/d` me desconecto\n`musica` ver ayuda de música")
    .addField("🔊 Canales privados", "`crearcanal <nombre> @amigos` crea tu propia sala de voz privada\n`expulsarcanal @usuario` expulsa a alguien de tu sala \n `ticket`, `close` (cerrar ticket),")
    .addField("🎭 Roles", "`autorol` configura roles automáticos por reacción (solo administradores)")
    .addField("🎉 Diversión y economía", "`musica`, `hack`, `say`, `text-fortnite <color> <texto>`, `addmoney`, `work`, `with`, `shop`, `buy`, `confesar`, `crime`, `dep`, `pescar`, `rob`, `bal`, `rank`, `tictactoe`, `traducir`, `lista-idiomas`")
    .addField("🔞 NSFW (solo en el canal autorizado +18)", "`4k`, `ass`, `gif`, `anal`, `hentai`, `pussy`, `yaoi`")
    .setFooter("Toma awa v35 | Si tienes ideas para más comandos, dile a tomaawa#4877")

  message.channel.send(embed)

 }

}
