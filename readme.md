# Discord.js Channel player
[![NPM](https://nodei.co/npm/djs-channel-player.png)](https://nodei.co/npm/djs-channel-player/)
***

## About 
> A simple lib that make your bot play songs still in a voice channel with your playlist.

## Pre-installation
Before you start to use this library, please don't forget to download [**FFMPEG**](http://ffmpeg.org/download.html) and make sure it's installed correctly in your OS.

## Usage 
```js
const {Client} = require("discord.js")
const client = new Client();
const { Player } = require('djs-channel-player')
const player = new player(client, 'Your Youtube v3 Key', 'the voice channel ID here', 'the youtube playlist')
client.on('ready' () => {
    player.play(); 
})
```

## Example
```js
const {Client, RichEmbed} = require('discord.js');
const client = new Client(); 
const player = require('djs-channel-player'); 
const player = new player(client, process.env.YT_KEY, process.env.CHANNEL, process.env.PLAYLIST); 
client.login(process.env.TOKEN); 

client.on('ready', () => {
player.play(); // This will play once the bot is started!
}) 

client.on('message', (message) => {
    if(message.content == 'np') { 
    return message.channel.send(`Now Playing: **${player.queue[0].title}** Watch it here: **${player.queue[0].url}**`);
    } else if(message.content == 'queue') {
        let i = 0
        return message.channel.send(new RichEmbed().setAuthor(`${message.guild.name} - ${player.queue.length} songs.`, message.guild.iconURL).setDescription(player.queue.slice(0, 10).map(item => `#**${++i}** ${item.title}`).join('\n')).setFooter(`Only displaying the first 10 items in the queue`).setColor('RANDOM')); 
    }
})
```
# Changelog (last 3 versions)
***  
## 1.2.8
* Bug fixes.

## 1.2.7
* Fixed the delay streaming issue.
* Added Dispatcher. 

## 1.2.6
* Some fixes.
* Deleted some non-important.