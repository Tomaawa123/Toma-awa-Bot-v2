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
const ytSearch = require("yt-search"); // Librería estable

const guildQueues = new Map();
const adapters = new Map();
let voiceEventsRegistered = false;

// --- ADAPTADORES V12 (NO TOCAR) ---
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

// --- GESTIÓN DE COLAS ---
function getQueue(guildId) {
  return guildQueues.get(guildId);
}

function destroyQueue(guildId) {
  const queue = guildQueues.get(guildId);
  if (queue) {
    try { queue.player.stop(); queue.connection.destroy(); } catch (e) {}
    guildQueues.delete(guildId);
  }
}

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

// --- BUSQUEDA ESTABLE ---
async function searchSong(query) {
  try {
    if (ytdl.validateURL(query)) {
      const info = await ytdl.getBasicInfo(query);
      return { title: info.videoDetails.title, url: info.videoDetails.video_url };
    }
    const result = await ytSearch(query);
    const video = result.videos[0];
    return video ? { title: video.title, url: video.url } : null;
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

module.exports = { 
  guildQueues, 
  ensureQueue, 
  playSong, 
  searchSong, 
  getQueue, 
  destroyQueue, 
  registerVoiceEvents 
};