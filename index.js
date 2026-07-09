const Discord = require('discord.js')
const db = require('megadb')
let nivel = new db.crearDB('niveles');
const client = new Discord.Client()
const { vivo } = require("./server.js")
const { badwords } = require("./data.json")
require('dotenv').config();
const { links } = require("./links.json")
const { Client, Collection, Guild } = require('discord.js')

const fs = require('fs');


client.on('message', async message => {
  if (message.author.bot) {
    return;
  }

  let user = message.author.tag

  var idid = message.guild.id + message.author.id
  if (!nivel.tiene(`${idid}`)) {
    nivel.establecer(idid, { xp: 1, nivel: 1 })
  }
  var xps = await nivel.obtener(`${idid}.xp`)
  var level = await nivel.obtener(`${idid}.nivel`)
  var a = level * 25
  if (xps >= a) {
    nivel.establecer(idid, { xp: 0, nivel: level + 1 })
    message.channel.send(`${user} Subiste a nivel ` + parseInt(level + 1))
  }

  nivel.sumar(`${idid}-xp`, 10, "-")
  if (message.content === 'nivel') {
    message.channel.send(`tu xp es: ${xps} / ${a}, estas en nivel : ${level} `)
  }
})

client.on("message", (message) => {

  let confirm = false;

  var i;
  for (i = 0; i < badwords.length; i++) {

    if (message.content.toLowerCase().includes(badwords[i].toLowerCase()))
      confirm = true;

  }

  if (confirm) {
    message.delete()
    message.channel.send("No digas malas palabras!").then(x => x.delete({ timeout: 5000 }))
  }


});

client.on("message", (message) => {
  client.on("hasPermission", (hasPermission) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {

      let confirm = false;

      var i;
      for (i = 0; i < links.length; i++) {

        if (message.content.toLowerCase().includes(links[i].toLowerCase()))
          confirm = true;

      }

      if (confirm) {
        message.delete()
        message.channel.send("No puedes enviar enlaces!").then(x => x.delete({ timeout: 5000 }))
      }
    }
  });
});

let prefix = "t!"

///////////////////HANDLER////////////////

client.commands = new Discord.Collection();
const commandfiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandfiles) {
  const command = require(`./comandos/${file}`);
  client.commands.set(command.name, command);


}

client.on("message", (message) => {

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;



  let usuario = message.mentions.members.first() || message.member;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes
    (command));
  if (cmd) (
    cmd.run(client, message, args))
  if (!cmd) {
    return message.reply(`Error :x: Comando \`${command}\` no encontrado`).then(x => x.delete({ timeout: 5000 }))
  }
})

///////////////////BOT////////////////

client.on("ready", async (peo) => {

  const array = [
    {
      name: 'Among Us',
      type: 'PLAYING',
    },
    {
      name: 'v35 coming out!',
      type: 'WATCHING',
    },
    {
      name: 'v35!',
      type: 'WATCHING',
    },
    {
      name: `${client.guilds.cache.size} servidores | ${client.users.cache.size} miembros`,
      type: 'WATCHING',
    }
  ]
  setInterval(() => {
    function presence() {
      client.user.setPresence({
        status: 'dnd',
        activity: array[Math.floor(Math.random() * array.length)],
      });
    }

    //Toma awa :D
    presence();

  }, 5000);

  console.log("Estoy Listo!")
});
//////////////Evento Message///////////////

client.snipes = new Map()

//////////////////////////////////////////



client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }

});

client.on("message", (message) => {
  if (message.content.startsWith("t!ping")) {
    const embed = new Discord.MessageEmbed()
      .setTitle(`Mi ping: **${client.ws.ping}ms**`)
      .setColor("RANDOM")

    message.channel.send(embed)
  }

});

//////////////////////////////////////

client.on('message', async (message) => {

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {

    const embedmencion = new Discord.MessageEmbed()
      .setTitle("Toma awa")
      .setDescription("Español: \n Hola, mi prefix: t! \n comandos: ayuda \n ayudaadmin \n si tienes una idea para agregar otro comando puedes decirle a Toma awa#7593 para que me ponga mas comandos")
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("RANDOM")
      .setFooter("Toma awa v34")

    message.channel.send(embedmencion)
  }
})

client.on('message', async (message) => {

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {

    const embedmencion = new Discord.MessageEmbed()
      .setTitle("Take water")
      .setDescription("English: \n Hello, my prefix: t! \n commands: help and adminhelp \n if you have an idea to add another command you can tell Toma awa#7593 to give me more commands")
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("RANDOM")
      .setFooter("Take water v34")

    message.channel.send(embedmencion)
  }
})

///////////////Comandos////////////////

client.on('messageDelete', message => {
  client.snipes.set(message.channel.id, {
    content: message.content,
    delete: message.author,
    canal: message.channel
  })
})

//////////////Bienvenidas//////////////

const db1 = require('megadb')
const canalbienvenidos = new db.crearDB("canalbienvenidos")

client.on('guildMemberAdd', async (member) => {

  let canal = await canalbienvenidos.obtener(member.guild.id)

  const embed = new Discord.MessageEmbed()

    .setTitle('Bienvenido al servidor!')
    .setDescription(`Bienvenido **${member.user.username}**, espero que te lo pases muy bien`)
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter('Gracias por unirte :3')
    .setColor("RANDOM")

  client.channels.cache.get(canal).send(embed)

});
////////////////Despedidas////////////

const canaldespedidas = new db.crearDB("canaldespedidas")

client.on('guildMemberRemove', async (member) => {

  let canal = await canaldespedidas.obtener(member.guild.id)

  const embed = new Discord.MessageEmbed()

    .setTitle('Un miembro se ha ido!')
    .setDescription(`**${member.user.username}**, se fue del servidor :c`)
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter('F :c')
    .setColor("RANDOM")

  client.channels.cache.get(canal).send(embed)

});

/////////////////////////////////////

function get_substrings_between(text, start, end) {
  const results = [];
  const parts = text.split(start);
  for (let i = 1; i < parts.length; i++) {
    const endIndex = parts[i].indexOf(end);
    if (endIndex !== -1) {
      results.push(parts[i].slice(0, endIndex));
    }
  }
  return results;
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  let substringArray = get_substrings_between(message.content, ":", ":");
  let msg = message.content;
  if (!substringArray.length) return;

  substringArray.forEach(m => {
    let emoji = client.emojis.cache.find(x => x.name === m);
    var replace = `:${m}:`;
    var rexreplace = new RegExp(replace, 'g');

    if (emoji && !msg.split(" ").find(x => x === emoji.toString()) && !msg.includes(`<a${replace}${emoji.id}>`)) msg = msg.replace(rexreplace, emoji.toString());
  })


  if (msg === message.content) return;

  let webhook = await message.channel.fetchWebhooks();
  webhook = webhook.find(x => x.name === "NekoWaterNQN");

  if (!webhook) {
    webhook = await message.channel.createWebhook(`NekoWaterNQN`, {
      avatar: client.user.displayAvatarURL({ dynamic: true })
    });
  }

  await webhook.edit({
    name: message.member.nickname ? message.member.nickname : message.author.username,
    avatar: message.author.displayAvatarURL({ dynamic: true })
  })

  message.delete().catch(m => { })

  webhook.send(msg).catch(m => { });

  await webhook.edit({
    name: `awitaNQN`,
    avatar: client.user.displayAvatarURL({ dynamic: true })
  })


});
/////////////////////////////////

client.login(process.env.TOKEN);

console.log("[ Bot ] Toma awa#6300 Esta conectado!")
console.log("Estoy Listo!")