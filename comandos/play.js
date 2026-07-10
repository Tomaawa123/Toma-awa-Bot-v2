const { searchSong, guildQueues, playSong } = require("../utils/musicManager");

module.exports = {
  name: "play",
  run: async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send("⚠️ Debes estar en un canal de voz.");

    const query = args.join(" ");
    if (!query) return message.channel.send("⚠️ Escribe el nombre o link.");

    const song = await searchSong(query);
    if (!song) return message.channel.send("❌ No encontré resultados.");

    let queue = guildQueues.get(message.guild.id);
    if (!queue) {
      const connection = await voiceChannel.join();
      queue = { connection, songs: [], playing: false };
      guildQueues.set(message.guild.id, queue);
    }

    queue.songs.push(song);
    message.channel.send(`✅ Agregado: **${song.title}**`);

    if (!queue.playing) playSong(message.guild, queue.songs[0], message.channel);
  },
};