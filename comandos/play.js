const { MessageEmbed } = require("discord.js");
const { ensureQueue, playSong, searchSong } = require("../utils/musicManager"); // Asegura que la ruta sea correcta

module.exports = {
  name: "play",
  alias: ["p"],
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send("⚠️ Debes estar en un canal de voz.");
    
    if (!args.length) return message.channel.send("⚠️ Escribe el nombre o link de la canción.");

    const query = args.join(" ");
    const searching = await message.channel.send(`🔎 Buscando: **${query}**...`);

    let song = await searchSong(query);

    if (!song) {
      return searching.edit("❌ No encontré resultados para esa búsqueda.");
    }

    const queue = ensureQueue(message.guild, voiceChannel, message.channel);
    queue.songs.push(song);

    if (!queue.playing) {
      await playSong(message.guild.id, queue.songs[0]);
      searching.edit(`▶️ Reproduciendo ahora: **${song.title}**`);
    } else {
      searching.edit(`✅ Agregado a la cola: **${song.title}**`);
    }
  },
};