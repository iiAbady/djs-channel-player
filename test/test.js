const {Client, RichEmbed} = require('discord.js');
const client = new Client(); 
const player = require('../index'); 
const Player = new player(client, 'AIzaSyC47u9iM3B72Jx-trbZ27xDjEI560i4d44', '473645724568125451', 'https://www.youtube.com/watch?v=wXcdYBh3hgg&list=PLVuQBUGB87-gomoG36CV4wMZCkGPGKw3p'); 
client.login('NDcyMTUyOTUyNzAzMDI1MTUy.DtMlkQ.WIKFOuiORKamoLNayCeacnVimvM'); 
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