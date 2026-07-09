const { MessageEmbed } = require("discord.js");
const { ensureQueue, playSong, searchSong } = require("../utils/musicManager");

module.exports = {
  name: "play",
  alias: ["p"],
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send("⚠️ Debes estar en un canal de voz para usar este comando.");
    }
    if (!args.length) {
      return message.channel.send("⚠️ Escribe el nombre o link de la canción. Ejemplo: `t!play nombre de la canción`");
    }

    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send("⚠️ No tengo permisos para conectarme o hablar en ese canal de voz.");
    }

    const query = args.join(" ");
    const searching = await message.channel.send(`🔎 Buscando: **${query}**...`);

    let song;
    try {
      song = await searchSong(query);
    } catch (err) {
      console.error(err);
      return searching.edit("❌ Ocurrió un error buscando la canción, intenta de nuevo.");
    }

    if (!song) {
      return searching.edit("❌ No encontré resultados para esa búsqueda.");
    }

    const queue = ensureQueue(message.guild, voiceChannel, message.channel);
    queue.songs.push(song);

    if (!queue.playing) {
      await playSong(message.guild.id, queue.songs[0]);
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`▶️ Reproduciendo ahora: **${song.title}**`)
        .setTimestamp();
      return searching.edit(embed);
    } else {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`✅ Agregado a la cola: **${song.title}**`)
        .setTimestamp();
      return searching.edit(embed);
    }
  },
};
