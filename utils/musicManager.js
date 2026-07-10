const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
  StreamType,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search"); // CAMBIO: Usamos yt-search

const guildQueues = new Map();
const adapters = new Map();
let voiceEventsRegistered = false;

// ... [MANTÉN TUS FUNCIONES registerVoiceEvents Y createDiscordJsV12Adapter IGUALES] ...
// (No he modificado estas funciones para que tus otros comandos no fallen)

function registerVoiceEvents(client) {
  if (voiceEventsRegistered) return;
  voiceEventsRegistered = true;
  client.ws.on("VOICE_SERVER_UPDATE", (payload) => {
    const adapter = adapters.get(payload.guild_id);
    if (adapter) adapter.onVoiceServerUpdate(payload);
  });
  client.ws.on("VOICE_STATE_UPDATE", (payload) => {
    if (payload.user_id !== client.user.id) return;
    const adapter = adapters.get(payload.guild_id);
    if (adapter) adapter.onVoiceStateUpdate(payload);
  });
}

function createDiscordJsV12Adapter(guild) {
  return (methods) => {
    adapters.set(guild.id, methods);
    return {
      sendPayload: (data) => {
        try {
          guild.shard.send(data);
          return true;
        } catch (e) {
          return false;
        }
      },
      destroy: () => { adapters.delete(guild.id); },
    };
  };
}

// ensureQueue, playSong y searchSong modificadas:

function ensureQueue(guild, voiceChannel, textChannel) {
  let queue = guildQueues.get(guild.id);
  if (queue) return queue;

  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: guild.id,
    adapterCreator: createDiscordJsV12Adapter(guild),
  });

  queue = {
    connection,
    player: createAudioPlayer(),
    textChannel,
    songs: [],
    playing: false,
  };

  connection.subscribe(queue.player);
  guildQueues.set(guild.id, queue);
  return queue;
}

async function playSong(guildId, song) {
  const queue = guildQueues.get(guildId);
  if (!queue) return;
  
  const stream = ytdl(song.url, {
    filter: "audioonly",
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  });

  const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
  queue.player.play(resource);
  queue.playing = true;
}

async function searchSong(query) {
  try {
    // Si es un link directo
    if (ytdl.validateURL(query)) {
      const info = await ytdl.getBasicInfo(query);
      return { title: info.videoDetails.title, url: info.videoDetails.video_url };
    }

    // BUSQUEDA ESTABLE CON YT-SEARCH
    const result = await ytSearch(query);
    if (!result || result.videos.length === 0) return null;
    
    return { title: result.videos[0].title, url: result.videos[0].url };
  } catch (err) {
    console.error("Error en búsqueda:", err);
    return null;
  }
}

module.exports = { guildQueues, registerVoiceEvents, ensureQueue, playSong, searchSong };