
/*
  # Discord Bot List Botu
  # Soulfly Tarafından Yapılmıştır.
  # MIT Lisansı Geçerlidir, Uyulmaz İse Adli İşlemlere Başvurulacaktır.
  # Ayrıca Kod Sunucurında Benden İzinsiz Paylaşılması Yasaktır.
  # MIT Lisance ile Korunmaktador.
  # Support: https://discord.gg/9HcSgc8CWJ
*/

// Lisans ve Dediklerim Dışına Çıkılırsa, Adli İşlem Başlatılacaktır. 

const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL }, disableMentions: 'everyone'});
const db = require('quick.db');


client.commands = new Map();
 
 fs.readdir('./commands', (err, files) => {
   files.forEach(file => {
	 if(file.endsWith(".js")){
	  var command = require(`./commands/${file}`);
	  console.log(command.name)
	   client.commands.set(command.name, command)
	 }
   })	
   console.log("Commands Loaded.")   
 })
 
client.settings = {
    prefix: "!",
    token: "",
    addChannel: "825013976710119454",
    logChannel :"825013976710119454",
    modRole: "824228805224300554",	
    processChannel: "825013976710119454",
    emoji: "☑️",
    devRole: "824228804145709096"
 }
 
client.on('ready', () => {
	client.user.setStatus('online');
    client.user.setActivity(`?? Soulfly | ${client.settings.prefix}yardim`, {type: "PLAYING"});
    console.log("I Was Successfully Active.")
})

client.on('message', async message => {
	if(message.author.bot || !message.guild) return;
	let prefix = client.settings.prefix;
    if(message.channel.id == (client.settings.addChannel || null)) message.delete({timeout: 3000})
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ /g)
	var argCommand = args.shift().toLowerCase()

    const command = client.commands.get(argCommand);

    if(command){
      if(!client.settings.addChannel || !client.settings.logChannel || !client.settings.modRole || !client.settings.processChannel || !client.settings.emoji || !client.settings.devRole){
		return message.channel.send(`All Settings Required To Use Bot.`)
	  }
	  command.run(client, message, args)
	}
})

client.on('guildMemberRemove', async member => {
	member.guild.members.cache.filter(s => db.fetch(`serverData.${member.guild.id}.botsData.${s.id}`)).forEach(x => {
      let bot = db.fetch(`serverData.${member.guild.id}.botsData.${x.id}`);
	  if(bot){
	  if(bot.owner == member.id){
             member.guild.members.ban(x, {reason: "Owner Left Server."})
	     db.set(`serverData.${member.guild.id}.botsData.${x.id}.status`, "Denied")
	     db.set(`serverData.${member.guild.id}.botsData.${x.id}.redReason`, "Owner Left Server.")
	  }
    }
  })
})

client.login("ODIzOTAzNjk3Nzc5NDI1Mjkx.YFnmHA.tkaeUiam9vIjDBn3pkmYS7ffE0Y")

/*

Yazılımların Telif Haklarının İhlali Durumunda Verilecek Cezalar Nelerdir?

Yazılımların telif haklarının ihlal edilmesi durumunda  hem Sınai Mülkiyet Kanunu uyarınca hemde Türk Ceza Kanunu uyarınca yaptırım uygulanması öngörülmüştür. Bu anlamda fail hakkında 2 yıldan 6 yıla kadar hapis cezasına ve/veya 50.000 Türk Lirası ile 150.000 Türk Lirası arasında para cezasına hükmolunur. verilmektedir. Hükmolunacak cezanın tespiti noktasında işlenilen suçun türü önem arz etmektedir. Sınai Mülkiyet Kanunu uyarınca bu suçu işleyen kimse ya da kimseler hakkında 1 yıldan 4 yıla kadar hapis cezasına hükmolunabilmektedir. Şayet suç Vergi Usul Kanunu kapsamında vergi kaçakçılığı suçuna da sebebiyet veriyor ise bu suçtan dolayı da ayrıca yazılımların telif hakkı ihlali suçunu işleyen kimse ya da kimseler hakkında hapis cezası ya da para cezasına hükmolunmaktadır.
Yukarıda Açıklanan Hususlar Hakkında Detaylı Bilgi ve Hukuki Danışmanlık Almak İçin Büromuz Avukatları ile İletişime Geçmeniz Tavsiye Olunur.

# İlgili Makale: https://www.celikavukatlik.com.tr/yazilimlarin-telif-hakki-korunmasi-ihlali-ve-cezasi/

*/
