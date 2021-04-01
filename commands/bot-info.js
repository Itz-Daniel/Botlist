const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
	name: "bot-info",
	run: (client, message, args) => {
     let inviteUrl = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=0`
	 const duration = moment.duration(client.uptime).format('M [Moon],  W [Week], D[Day], H [Hour], m [Minute]');    
		 const embed = new Discord.MessageEmbed()
		.setColor("BLUE")
        .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	    .setTimestamp()
		.addField("Number of Servers", client.guilds.cache.size)
		.addField("Number of Members", client.guilds.cache.reduce((a, b) => a + b.memberCount, 0))
		.addField("Uptime Time", duration)
	    .addField(`Links`, ` [[Invite]](${inviteUrl}) | [[Support Server]](https://discord.gg/9HcSgc8CWJ)`)
        .setFooter(client.user.username, client.user.avatarURL())
		.setDescription("Bot is Now Closed for Global Environment.")
		message.channel.send(embed)
  }
}