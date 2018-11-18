# Discord.js Channel Player
> A simple lib that make your bot play songs still in a voice channel with your playlist.

## Install 
```bash
npm i djs-channel-player
```

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
client.login('token'); 
Player.play();

client.on('ready', () => {
    console.log(`Yo its ready. `)
})

client.on('message', (message) => {
    if(message.content == 'np') {
    return message.channel.send(`Now Playing: **${Player.playlist[0].title}** Watch it here: **${Player.playlist[0].url}**`);
    } else if(message.content == 'queue') {
        return message
    }
})
```