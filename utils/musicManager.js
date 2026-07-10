const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const guildQueues = new Map();

async function searchSong(query) {
    if (ytdl.validateURL(query)) {
        const info = await ytdl.getInfo(query);
        return { title: info.videoDetails.title, url: info.videoDetails.video_url };
    }
    const r = await ytSearch(query);
    return r.videos[0] ? { title: r.videos[0].title, url: r.videos[0].url } : null;
}

function playSong(guild, song, channel) {
    const queue = guildQueues.get(guild.id);
    const stream = ytdl(song.url, { filter: 'audioonly' });
    const dispatcher = queue.connection.play(stream);

    dispatcher.on('finish', () => {
        queue.songs.shift();
        if (queue.songs.length > 0) playSong(guild, queue.songs[0], channel);
        else {
            queue.playing = false;
            // Opcional: desconectar si quieres
            // queue.connection.disconnect();
        }
    });
    
    dispatcher.on('error', console.error);
    queue.playing = true;
}

module.exports = { guildQueues, searchSong, playSong };