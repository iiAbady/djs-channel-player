const ytdl = require('ytdl-core-discord');
const YouTube = require('simple-youtube-api');
const { version } = require('./package.json');

class Player {
	/**
     * @param {Client} client - Your d.js client.
     * @param {string} ytkey - Your Youtube v3 data key.
     * @param {string} channel - The channel you want bot to stay in id.
     * @param {string} playlist - playlist or video for the bot to play.
     */
	constructor(client, ytkey, channel, playlist) {
		this.client = client;
		this.ytkey = ytkey;
		this.channel = channel;
		this.playlist = playlist;
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
				// eslint-disable-next-line no-var
				var connection = await this.client.channels.get(this.channel).join();
			} catch (error) {
				console.error(`[ERROR:CONNECTION] Error occurred when joining voice channel.`);
			}
			const ytStream = await ytdl(queue[0].url).on('error', err => {
				console.error(`[ERROR:STREAMING] Couldn't play **${queue[0].title}**`, err);
				queue.shift();
			});
			// eslint-disable-next-line block-scoped-var
			const thisDispatcher = connection.playOpusStream(ytStream)
				.on('end', () => {
					const loop = queue.shift();
					queue.push(loop);
					stream(this.client, this.channel).then(dispatcher => this.dispatcher = dispatcher).catch(err => console.log(`[ERROR:STREAMING] ${err}`));
				}).on('error', err => {
					console.error(`[ERROR:DISPATCHER] ${err}`);
				})
				.on('start', () => {
					// eslint-disable-next-line block-scoped-var
					connection.player.streamingData.pausedTime = 0;
					this.client.user.setActivity(`${queue[0].title}`, { type: 'LISTENING' });
					console.log(`[INFO] Started streaming: ${queue[0].title} at ${this.client.channels.get(this.channel).name}.`);
				});
			return thisDispatcher;
		});

		this.client.user.setActivity('Loading...', { type: 'LISTENING' });
		stream(this.client, this.channel).then(dispatcher => this.dispatcher = dispatcher).catch(err => console.error(`[ERROR:STREAMING] ${err}`));
	}
}

module.exports = Player;
exports.version = version;
