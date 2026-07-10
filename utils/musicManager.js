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
const ytSearch = require("yt-search"); // CAMBIO AQUÍ

const guildQueues = new Map();
const adapters = new Map();
let voiceEventsRegistered = false;

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
  queue = { connection, player, voiceChannel, textChannel, songs: [], playing: false };
  
  player.on(AudioPlayerStatus.Idle, () => {
    queue.songs.shift();
    if (queue.songs.length) playSong(guild.id, queue.songs[0]);
    else queue.playing = false;
  });

  guildQueues.set(guild.id, queue);
  return queue;
}

async function playSong(guildId, song) {
  const queue = guildQueues.get(guildId);
  if (!queue) return;
  const stream = ytdl(song.url, { filter: "audioonly", highWaterMark: 1 << 25 });
  const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
  queue.player.play(resource);
  queue.playing = true;
}

// BUSQUEDA ESTABLE
async function searchSong(query) {
  try {
    if (ytdl.validateURL(query)) {
      const info = await ytdl.getBasicInfo(query);
      return { title: info.videoDetails.title, url: info.videoDetails.video_url };
    }
    const r = await ytSearch(query);
    const video = r.videos[0];
    return video ? { title: video.title, url: video.url } : null;
  } catch (e) {
    console.error("Error en búsqueda:", e);
    return null;
  }
}

module.exports = { ensureQueue, playSong, searchSong, guildQueues };