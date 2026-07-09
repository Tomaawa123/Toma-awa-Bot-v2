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
const ytsr = require("ytsr");

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
      destroy: () => {
        adapters.delete(guild.id);
      },
    };
  };
}

function getQueue(guildId) {
  return guildQueues.get(guildId);
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

  queue = {
    connection,
    player,
    voiceChannel,
    textChannel,
    songs: [],
    loop: false,
    loopQueue: false,
    playing: false,
  };

  player.on(AudioPlayerStatus.Idle, () => {
    if (!queue.songs.length) return;
    if (queue.loop) {
      playSong(guild.id, queue.songs[0]);
      return;
    }
    const finished = queue.songs.shift();
    if (queue.loopQueue && finished) {
      queue.songs.push(finished);
    }
    if (queue.songs.length) {
      playSong(guild.id, queue.songs[0]);
    } else {
      queue.playing = false;
    }
  });

  player.on("error", (err) => {
    console.error("Error de reproducción:", err.message);
    queue.textChannel.send("⚠️ Ocurrió un error reproduciendo la canción, saltando a la siguiente...");
    const finished = queue.songs.shift();
    if (queue.loopQueue && finished) queue.songs.push(finished);
    if (queue.songs.length) playSong(guild.id, queue.songs[0]);
    else queue.playing = false;
  });

  connection.on(VoiceConnectionStatus.Disconnected, async () => {
    try {
      await Promise.race([
        entersState(connection, VoiceConnectionStatus.Signalling, 5000),
        entersState(connection, VoiceConnectionStatus.Connecting, 5000),
      ]);
    } catch (err) {
      guildQueues.delete(guild.id);
      try { connection.destroy(); } catch (e) {}
    }
  });

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
  if (ytdl.validateURL(query)) {
    const info = await ytdl.getBasicInfo(query);
    return { title: info.videoDetails.title, url: info.videoDetails.video_url };
  }
  const filters = await ytsr.getFilters(query);
  const filter = filters.get("Type").get("Videos");
  const search = await ytsr(filter.url, { limit: 5 });
  const video = search.items.find((item) => item.type === "video");
  if (!video) return null;
  return { title: video.title, url: video.url };
}

function destroyQueue(guildId) {
  const queue = guildQueues.get(guildId);
  if (!queue) return;
  try {
    queue.player.stop();
    queue.connection.destroy();
  } catch (e) {}
  guildQueues.delete(guildId);
}

module.exports = {
  getQueue,
  ensureQueue,
  playSong,
  searchSong,
  destroyQueue,
};
