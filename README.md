# Discord.js Channel Player 
<div align="center">
<p>
<a href="https://nodei.co/npm/djs-channel-player/"><img src="https://nodei.co/npm/djs-channel-player.png"></a>
</p>
<br />
 <p>
 <a href="https://www.npmjs.com/package/djs-channel-player"><img src="https://img.shields.io/npm/v/djs-channel-player.svg?maxAge=3600" alt="NPM version" /></a>
<a href="https://www.npmjs.com/package/djs-channel-player"><img src="https://img.shields.io/npm/dt/djs-channel-player.svg?maxAge=3600" alt="NPM downloads" /></a>
<a href="https://david-dm.org/discordjs/djs-channel-player"><img src="https://img.shields.io/david/Abady321x123/djs-channel-player.svg?maxAge=3600" alt="Dependencies" /></a>
  </p>
</div>

## About 
> A simple lib that make your bot play videos still in a voice channel with your playlist.

## توضيح
أي إستعمال خاطئ للبكج يصدر منك إنت وأنا أتبرا منك فيه.

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
# 1.8.6
* Upgrade lib deps

# 1.8.5
* Upgrade lib deps

# 1.8.4
* Changes lib deps
* * ytdl-core-discord --> ytdl-core

# 1.8.3
Upgrade d.js version to 11.5.0

# 1.8.0
* Changes lib deps 
* * node-opus --> opusscript
* * ytdl-core --> ytdl-core-discord

# 1.2.8
* Bug fixes.

# 1.2.7
* Fixed the delay streaming issue.
* Added Dispatcher. 

# 1.2.6
* Some fixes.
* Deleted some non-important.
