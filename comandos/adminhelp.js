const Discord = require('discord.js');

module.exports = {
    name: "adminhelp",
    alias: ["adminhelp"],

run(client, message, args){

  var perms = message.member.hasPermission("MANAGE_MESSAGES")
  if(!perms) return message.channel.send("You do not have permissions to use this command.")

  const embed = new Discord.MessageEmbed()
    .setTitle("🛠️ Admin command list - Toma awa")
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RANDOM")
    .setDescription("Prefix: `t!` (works with uppercase or lowercase)")
    .addField("🧑‍⚖️ Moderation", "`ban`, `kick`, `hackban`, `mute`, `tempmute`, `unmute`, `warn`, `warns`, `unwarn`, `nuke`, `clear`, `lock`, `unlock`, `private`, `snipe` (view deleted messages)\n update (send update message to logs channel) \nAuto protections: anti-links, anti-badwords, anti-spam")
    .addField("⚙️ Server setup", "`setbienvenidas`, `setdespedidas`, `set-prefix`, `ticket`, `close` (close ticket), `invite`, `uptime`")
    .addField("🎵 Music", "`play/p`, `join/j`, `skip/s`, `pause/pa`, `resume/r`, `loop/l`, `loopqueue/lq`, `disconnect/d`, `music` (music help)")
    .addField("🔊 Private channels", "`crearcanal <name> @friends` create a private voice room\n`expulsarcanal @user` kick someone from a room")
    .addField("🎭 Roles", "`autorol` set up reaction roles")
    .addField("🎉 Fun & economy", "`say`, `hack`, `tictactoe`, `text-fortnite <color> <text>`, `addmoney`, `work`, `with`, `shop`, `buy`, `confess`, `crime`, `dep`, `fish`, `rob`, `bal`, `rank`, `traducir`, `lista-idiomas`")
    .addField("🔞 NSFW (allowed channel only)", "`4k`, `ass`, `gif`, `anal`, `hentai`, `pussy`, `yaoi`")
    .setFooter("Take water v35 | If you have ideas for more commands, tell tomaawa#4877")

  message.channel.send(embed)

 }

}
