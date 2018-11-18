const {Client, RichEmbed} = require('discord.js');
const client = new Client(); 
const player = require('../index'); 
const Player = new player(client, process.env.YT_KEY, process.env.CHANNEL, process.env.PLAYLIST); 
client.login(process.env.TOKEN); 
Player.play();

client.on('ready', () => {
    console.log(client.voiceConnections.array())
    console.log(client.voiceConnections.find(voice => voice.channel.id === '473645724568125451')); 
    console.log(`Yo its ready. `)
})

client.on('message', (message) => {
    if(message.content == 'np') {
    return message.channel.send(`Now Playing: **${Player.queue[0].title}** Watch it here: **${Player.queue[0].url}**`);
    } else if(message.content == 'queue') {
        let i = 0
        return message.channel.send(new RichEmbed().setAuthor(`${message.guild.name} - ${Player.queue.length} songs.`, message.guild.iconURL).setDescription(Player.queue.slice(0, 10).map(item => `#**${++i}** ${item.title}`).join('\n')).setFooter(`Only displaying the first 10 items in the queue`).setColor('RANDOM')); 
    }
})