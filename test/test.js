const {Client, RichEmbed} = require('discord.js');
const client = new Client(); 
const player = require('../index'); 
const Player = new player(client, process.env.YT_KEY, process.env.CHANNEL, process.env.PLAYLIST); 
client.login(process.env.TOKEN); 

client.on('ready', () => {
Player.play();
})

client.on('message', (message) => {
    if(message.channel.id === "406529468828614666" || "514155011056467971") {
      if(message.content == 'np') {
      return message.channel.send(new RichEmbed().setDescription(`🎵 Now Playing:\n**[${Player.queue[0].title}](${Player.queue[0].url})**`).setThumbnail(Player.queue[0].thumbnails.high.url));
      } else if(message.content == 'queue') {
          let i = 0
          return message.channel.send(new RichEmbed()
  .setDescription(`🎵 Now Playing:\n**[${Player.queue[0].title}](${Player.queue[0].url})** \n\n🎵 Queue\n`+Player.queue.slice(1, 10).map(item => `${++i}. [${item.title}](${item.url})`).join('\n'))
  .setFooter(`Only displaying the first 10 items in the queue`).setColor('RANDOM').setThumbnail(Player.queue[0].thumbnails.high.url)); 
      }
    }
  })
  