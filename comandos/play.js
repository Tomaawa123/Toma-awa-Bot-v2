const { searchSong, playSong, ensureQueue } = require("../utils/musicManager");

module.exports = {
  name: "play",
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send("⚠️ Debes estar en un canal de voz.");

    const query = args.join(" ");
    if (!query) return message.channel.send("⚠️ Escribe el nombre o link.");

    const song = await searchSong(query);
    if (!song) return message.channel.send("❌ No encontré resultados.");

    const queue = ensureQueue(message.guild, voiceChannel, message.channel);

    queue.songs.push(song);
    message.channel.send(`✅ Agregado: **${song.title}**`);

    if (!queue.playing) {
      await playSong(message.guild.id, queue.songs[0]);
    }
  },
};

