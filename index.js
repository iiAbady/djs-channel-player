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
let _dispatcher; 
this.dispatcher = _dispatcher; 
const client = this.client
const channel = this.channel
const queue = []; 
const youtube = new YouTube(this.ytkey); 
const playlist = await youtube.getPlaylist(this.playlist);
const getVideos = await playlist.getVideos(); 
getVideos.filter(v => v.thumbnails !== undefined).forEach(video => {
queue.push({
    title: video.title, 
    url: video.url
})
})

this.queue = queue;

client.on('ready', () => {
 client.user.setActivity("Loading...", {type: "LISTENING"}) 
 stream(client, channel); 
})


async function stream() {
    let connection = await client.channels.get(channel).join(); 
    if(client.voice.connections.get(channel)) connection = client.voice.connections.get(channel);
    const dispatcher = connection.playStream(ytdl(queue[0].url, {
        filter: 'audioonly',
        quality: 'highestaudio',
        audioEncoding: "opus"
    }))
    _dispatcher = dispatcher
    client.user.setActivity(`${queue[0].title}`, {type: "LISTENING"});

    dispatcher.on('end', () => {
        const loop = queue.shift();
        queue.push(loop);
        return stream(client, channel, queue[0].url);
    })
     }}
     skip() {
         this.dispatcher.end("skip");
     }


}

module.exports = Player