const Discord = require('discord.js');

module.exports = {
    name: "help",
    alias: ["help"],

run(client, message, args){

  const embed = new Discord.MessageEmbed()
    .setTitle("📖 Command list - Toma awa")
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RANDOM")
    .setDescription("Prefix: `t!` (works with uppercase or lowercase)")
    .addField("🎵 Music", "`play/p` play a song\n`join/j` join your voice channel\n`skip/s` skip song\n`pause/pa` pause\n`resume/r` resume\n`loop/l` loop song\n`loopqueue/lq` loop queue\n`disconnect/d` disconnect\n`music` music help")
    .addField("🔊 Private channels", "`crearcanal <name> @friends` create your own private voice room\n`expulsarcanal @user` kick someone from your room \n `ticket`, `close` (cerrar ticket),")
    .addField("🎭 Roles", "`autorol` set up reaction roles (admins only)")
    .addField("🎉 Fun & economy", "`say`, `hack`, `text-fortnite <color> <text>`, `addmoney`, `work`, `with`, `shop`, `buy`, `confess`, `crime`, `dep`, `fish`, `rob`, `bal`, `rank`, `tictactoe`, `traducir`, `lista-idiomas`")
    .addField("🔞 NSFW (allowed channel only)", "`4k`, `ass`, `gif`, `anal`, `hentai`, `pussy`, `yaoi`")
    .setFooter("Take water v35 | If you have ideas for more commands, tell tomaawa#4877")

  message.channel.send(embed)

 }

}
