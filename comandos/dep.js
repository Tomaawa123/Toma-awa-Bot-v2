const Discord = require ('discord.js');
const megadb = require ("megadb");
let eco = new megadb.crearDB ("economy");

module.exports = {
  name: "dep",
  alias: [],

async run (client, message, args) {
  
    let server = message.guild.id
    let usuario = message.author.id
    let user = message.author.tag

    const effective = await eco.get (`${server}.${user}.cash`);
    
    const bank = await eco.get (`${server}.${user}.bank`);

    if (isNaN (args [0])) {
        let solonumeros = new Discord.MessageEmbed ()
        .setAuthor (message.author.username, message.author.avatarURL ({dynamic: true}))
        .setDescription ("` 💰 | Put the amount you want to deposit to your Bank Account. ")
        .setColor ("RANDOM")
        .setFooter ("Accounts with a balance of" + cash)
        return message.channel.send (solonumeros)
    }

    if (args [0]> cash) {
        let nomayorque = new Discord.MessageEmbed ()
        .setAuthor (message.author.username, message.author.avatarURL ({dynamic: true}))
        .setDescription ("` 💰` | You can't deposit more than you have ")
        .setColor ('RANDOM')
        .setFooter ("Accounts with a balance of" + cash)
        return message.channel.send (nomayorque)
    }

    eco.sumar (`${server}.${user}.bank`, args [0]);
    eco.restar (`${server}.${user}.cash`, args [0]);

    let embed = new Discord.MessageEmbed ()
    .setAuthor (message.author.username, message.author.avatarURL ({dynamic: true}))
    .addField("` 💰💰` | You deposited: "+ args [0] +" 💰 in your Bank Account.", `Your Bank Balance is ${await eco.get (`${server}.${user}.bank`)}`)
    .setColor ("RANDOM")
    return message.channel.send(embed)

  }
}