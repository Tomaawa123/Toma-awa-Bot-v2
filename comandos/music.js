const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "music",
    alias: [""],

run: async(client, message, args) => {

  function wait(ms){
            let start = new Date().getTime();
            let end = start;
            while(end < start + ms) {
              end = new Date().getTime();
           }
         }
  
const prompt = await message.channel.send(`Loading music...`);
  await wait(1000);
     await  prompt.edit('...');

    
 }
 
}