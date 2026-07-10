const { createAudioResource, StreamType } = require("@discordjs/voice");
const play = require("play-dl");

const guildQueues = new Map();

// Función auxiliar para obtener o crear la cola
function ensureQueue(guild, voiceChannel, textChannel) {
  let queue = guildQueues.get(guild.id);
  if (!queue) {
    queue = {
      voiceChannel,
      textChannel,
      player: null, // Deberás inicializarlo en tu lógica principal
      songs: [],
      playing: false,
    };
    guildQueues.set(guild.id, queue);
  }
  return queue;
}

async function searchSong(query) {
  try {
    // 1. Validar si es enlace directo
    if (play.yt_validate(query) === 'video') {
      const info = await play.video_info(query);
      return {
        title: info.video_details.title,
        url: info.video_details.url,
      };
    }

    // 2. Buscar por nombre si no es un link
    const searchResults = await play.search(query, { source: { youtube: "video" }, limit: 1 });
    if (!searchResults || searchResults.length === 0) return null;

    return {
      title: searchResults[0].title,
      url: searchResults[0].url,
    };
  } catch (err) {
    console.error("Error en searchSong:", err);
    return null;
  }
}

async function playSong(guildId, song) {
  const queue = guildQueues.get(guildId);
  if (!queue) return;

  try {
    // Obtenemos el stream directamente con play-dl
    const streamData = await play.stream(song.url);
    const resource = createAudioResource(streamData.stream, {
      inputType: streamData.type,
    });

    queue.player.play(resource);
    queue.playing = true;
  } catch (err) {
    console.error("Error al reproducir:", err);
    queue.textChannel.send("❌ Error al intentar reproducir el audio.");
  }
}

module.exports = { guildQueues, ensureQueue, searchSong, playSong };