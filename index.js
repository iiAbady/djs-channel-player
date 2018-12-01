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
const youtube = new YouTube(this.ytkey); 
const playlist = await youtube.getPlaylist(this.playlist);
const getVideos = await playlist.getVideos(); 
const queue = getVideos.filter(v => v.thumbnails !== undefined);  
this.queue = queue;


const stream = (this, async () => {
    try {
        var connection = await this.client.channels.get(this.channel).join();    
    } catch (error) {
        console.error(`[ERROR:CONNECTION] Error occurred when joining voice channel.`)
    }
    const ytStream = ytdl(queue[0].url, {
        filter: "audioonly"
    }).on("error", err => {
        console.error(`[ERROR:STREAMING] Couldn't play **${queue[0].title}**`, err)
        queue.shift(); 
    })
    const dispatcher = connection.playStream(ytStream)
    .on('end', () => {
        const loop = queue.shift();
        queue.push(loop);
        stream(this.client, this.channel).then(dispatcher => this.dispatcher = dispatcher).catch(err => console.log(`[ERROR:STREAMING] ${err}`));
    }).on('error', (err) => {
        console.error(`[ERROR:DISPATCHER] ${err}`);
    }).on('start', () => {
        connection.player.streamingData.pausedTime = 0; 
        this.client.user.setActivity(`${queue[0].title}`, {type: "LISTENING"});
        console.log(`[INFO] Started streaming: ${queue[0].title} at ${this.client.channels.get(this.channel).name}.`)
    }); 
    return dispatcher;
})

this.client.on('error', console.error);
this.client.user.setActivity("Loading...", {type: "LISTENING"}) 
stream(this.client, this.channel).then(dispatcher => this.dispatcher = dispatcher).catch(err => console.error(`[ERROR:STREAMING] ${err}`)); 

     }}

module.exports = Player