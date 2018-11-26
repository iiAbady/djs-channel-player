const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api')

class Player { 
    /**
     * @param {Client} client - Your d.js client. 
     * @param {String} ytkey - Your Youtube v3 data key. 
     * @param {String} channel - The channel you want bot to stay in id.
     * @param {String} playlist - playlist or video for the bot to play.
     */
constructor(client, ytkey , channel, playlist) {
this.client = client || null
this.ytkey = ytkey || null
this.channel = channel || null
this.playlist = playlist || null
this.queue = null; 
this.dispatcher = null; 
}

async play() {
const client = this.client
const channel = this.channel
const youtube = new YouTube(this.ytkey); 
const playlist = await youtube.getPlaylist(this.playlist);
const getVideos = await playlist.getVideos(); 
const queue = getVideos.filter(v => v.thumbnails !== undefined);  
this.queue = queue;

client.user.setActivity("Loading...", {type: "LISTENING"}) 
stream(client, channel).then(dispatcher => this.dispatcher = dispatcher).catch(err => console.log(`[ERROR:STREAMING] ${err}`)); 

async function stream() {
    const connection = await client.channels.get(channel).join();
    const dispatcher = connection.playStream(ytdl(queue[0].url, {
        filter: 'audioonly'
    })).on('end', () => {
        const loop = queue.shift();
        queue.push(loop);
        stream(client, channel).then(dispatcher => this.dispatcher = dispatcher).catch(err => console.log(`[ERROR:STREAMING] ${err}`));
    }).on('error', (err) => {
        console.error(`[ERROR:DISPATCHER]`, err);
    }).on('start', () => {
        connection.player.streamingData.pausedTime = 0; 
        client.user.setActivity(`${queue[0].title}`, {type: "LISTENING"});
        console.log(`[INFO] Started streaming ${queue[0].title} at ${client.channels.get(channel).name}.`)
    }); 

    return dispatcher; 

     }}
}

module.exports = Player