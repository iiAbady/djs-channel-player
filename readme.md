# Discord.js Channel Player
[![NPM](https://nodei.co/npm/djs-channel-player.png)](https://nodei.co/npm/djs-channel-player/)

#About 
> A simple lib that make your bot play songs still in a voice channel with your playlist.

## Pre-installation
Before you start to use this library, please don't forget to download [**FFMPEG**](http://ffmpeg.org/download.html) and make sure it's installed correctly in your OS.

## Usage 
```js
const {Client} = require("discord.js")
const client = new Client();
const Player = require('djs-channel-player')
const player = new Player(client, 'Your Youtube v3 Key', 'the voice channel ID here', 'the youtube playlist')
```

## Example
```js
const {Client} = require('discord.js');
const client = new Client(); 
const player = require('./index'); 
const Player = new player(client, 'secert yt key (:', '473645724568125451', 'https://www.youtube.com/watch?v=wXcdYBh3hgg&list=PLVuQBUGB87-gomoG36CV4wMZCkGPGKw3p'); 
client.login('token here'); 
Player.play();

client.on('ready', () => {
    console.log(`Yo its ready. `)
})

client.on('message', (message) => {
    if(message.content == 'np') {
    return message.channel.send(`Now Playing: **${Player.queue[0].title}** Watch it here: **${Player.queue[0].url}**`);
    } else if(message.content == 'queue') {
        let i = 0
        return message.channel.send(new RichEmbed().setAuthor(message.guild.name, message.guild.iconURL).setDescription(Player.queue.map(item => `#**${++i}** ${item.title}`).join('\n')).setColor('RANDOM')); 
    }
})
```