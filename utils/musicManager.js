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

// --- MANTENEMOS TUS ADAPTADORES (NO TOCAR PARA QUE T!J FUNCIONE) ---
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
        try { guild.shard.send(data); return true; } catch (e) { return false; }
      },
      destroy: () => { adapters.delete(guild.id); },
    };
  };
}

// --- LOGICA DE COLA ---
function ensureQueue(guild, voiceChannel, textChannel) {
  let queue = guildQueues.get(guild.id);
  if (queue) return queue;
  
  registerVoiceEvents(guild.client);
  
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: guild.id,
    adapterCreator: createDiscordJsV12Adapter(guild),
  });

  const player = createAudioPlayer();
  connection.subscribe(player);
  
  queue = { connection, player, textChannel, songs: [], playing: false };
  guildQueues.set(guild.id, queue);
  return queue;
}

// --- BUSQUEDA ESTABLE (SOLUCIONA EL FALLO) ---
async function searchSong(query) {
  try {
    if (ytdl.validateURL(query)) {
      const info = await ytdl.getBasicInfo(query);
      return { title: info.videoDetails.title, url: info.videoDetails.video_url };
    }
    
    const result = await ytSearch(query);
    const video = result.videos[0];
    
    if (!video) return null;
    return { title: video.title, url: video.url };
  } catch (err) {
    console.error("Error en búsqueda:", err);
    return null;
  }
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

module.exports = { guildQueues, ensureQueue, playSong, searchSong, registerVoiceEvents };