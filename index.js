const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api')

class Player { 
    /**
     * @param {EventListenerObject} client - Your d.js client. 
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
}

async play() {
const queue = []; 
const youtube = new YouTube(this.ytkey); 
const playlist = await youtube.getPlaylist(this.playlist);
const getVideos = await playlist.getVideos(); 
await getVideos.forEach(video => {
queue.push({
    title: video.title, 
    url: video.url
})
})
this.queue = queue;  

this.client.on('ready', async () => {
    stream(this.client, this.channel)
})


const client = this.client
const channel = this.channel

async function stream() {
    const connection = await client.channels.get(channel).join(); 
    const dispatcher = connection.playStream(ytdl(queue[0].url, {
        filter: 'audioonly',
        quality: 'highestaudio',
        audioEncoding: "opus"
    }))
    client.user.setActivity(`${queue[0].title}`, {type: "LISTENING"});

    dispatcher.on('end', async () => {
        const loop = queue.shift();
        await queue.push(loop);
        this.queue = queue;
        return stream(client, channel, queue[0].url);
    })
     }}


}

module.exports = Player