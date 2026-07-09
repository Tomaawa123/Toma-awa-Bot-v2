const Discord = require("discord.js");
const ms = require("ms")
module.exports = {
  name: "hack",
  aliases: ["hax"],
  run: async(client, message, args) => {
    const hacked = message.mentions.users.first();
    const user = message.mentions.users.first();
    if(user == client.users.cache.get(message.author.id))
    {
      return message.channel.send(" ok, You are hacked Pick someone else")
    }
            function wait(ms){
            let start = new Date().getTime();
            let end = start;
            while(end < start + ms) {
              end = new Date().getTime();
           }
         }

if(!user)
{
  return message.reply("Who to hack? Please Mention him");
}
const prompt = await message.channel.send(`Hacking ${user ? hacked.username : hacked} now...`);
    
   await wait(2700);
     await  prompt.edit('Finding discord login...');
     await wait(2700);
     await  prompt.edit(`Found:\n**Email**: \`${hacked.username}***@gmail.com\`\n**Password**: \`*******\``);
     await  wait(3700);
     await  prompt.edit('Fetching dms');
     await  wait(3700);
     await prompt.edit('Listing most common words...');
     await  wait(2700);
     await  prompt.edit(`Injecting virus into discriminator #${hacked.discriminator}`);
    await  wait(3700);
     await  prompt.edit('Virus injected');
     await  wait(3700);
    
   await prompt.edit('Finding IP address');
    await wait(5000);
   await  prompt.edit('Spamming email...');
   await wait(6700);
   await  prompt.edit('Selling data to facebook...');
  await   wait(3700);
  let embed = new Discord.MessageEmbed()
  .setDescription(`A Dangerous and very ORIGINAL HACKING of ${user ? hacked.username : hacked} is just completed`)
  .setImage("https://cdn.discordapp.com/attachments/987833585480388649/989693557692575795/hacker_1.gif");
  await prompt.delete
   await  message.channel.send(embed);
    

  }
}