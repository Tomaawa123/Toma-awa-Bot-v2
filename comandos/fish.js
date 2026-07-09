const Discord = require ('discord.js');
const megadb = require ("megadb");
let eco = new megadb.crearDB ("economy");

module.exports = {
  name: "fish",
  alias: ["fishing"],

async run (client, message, args) {
  
    let server = message.guild.id
    let usuario = message.author.id
    let user = message.author.tag

    if (! eco.has (`${server}.${user}.cash`)) {
        eco.set (`${server}.${user}`, {cash: "1", bank: "1"});
    }

    var random = Math.floor (Math.random () * 180)
    console.log ("added"+ random + "to account" + user)

    const embed = new Discord.MessageEmbed ()

    .setAuthor ("Command fish!")
    .setDescription (user + "Has fished and won an amount of" + random)
    .setColor ("RANDOM")

    await eco.sumar (`${server}.${user}.cash`, random)

    message.channel.send (embed)

  }
}