const {Client, RichEmbed} = require('discord.js');
const client = new Client(); 
const player = require('../index'); 
const Player = new player(client, process.env.YT_KEY, process.env.CHANNEL, process.env.PLAYLIST); 
client.login(process.env.TOKEN); 

Player.play();


client.on('message', (message) => {
    if(message.content == 'np') {
    console.log(Player.dispatcher); 
    return message.channel.send(`Now Playing: **${Player.queue[0].title}** Watch it here: **${Player.queue[0].url}**`);
    } else if(message.content == 'queue') {
        let i = 0
        return message.channel.send(new RichEmbed().setAuthor(`${message.guild.name} - ${Player.queue.length} songs.`, message.guild.iconURL).setDescription(Player.queue.slice(0, 10).map(item => `#**${++i}** ${item.title}`).join('\n')).setFooter(`Only displaying the first 10 items in the queue`).setColor('RANDOM')); 
    }
})

if(client.voice.connections.get(''))
process.on('unhandledRejection', (reason) => {
    console.log(reason); 
}).on('exit', (n) => {
    console.log(`Process Exited with ${n}`);
})
client.on('error', (error) => {
    console.log(error)
}).on('reconnecting', () => {
    console.log('reconnecting')
}).on('disconnect', () => {
    console.log('disconnecting')
})