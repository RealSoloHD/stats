const Discord = require('discord.js');
const axios = require('axios');
const conf = require('./conf.json');
const express = require('express');
const app = express();

const Utils = require('./utils.js');

const bot = new Discord.Client();
const clanTag = conf.clanTag;

let request = axios.create({
    headers: {
        'auth': conf.apiKey
    }
});

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setPresence({ game: { name: 'with depression', type: "streaming", url: "https://www.twitch.tv/monstercat"}}); 
});



bot.on('message', message => {
    if (message.content.substring(0, 1) == '!') {
        let args = message.content.substring(1).split(' ');
        let instruction = args[0];

        let option = (args[1] !== undefined) ? args[1] : null;

        switch (instruction) {
            case 'hello':
                Utils.hello(message);
                break;
            case 'clan':
                if (option) {
                    option = Utils.removeHash(option);
                    request.get(`http://api.cr-api.com/clan/${option}`)
                        .then(res => {
                            Utils.clan(res.data, message, Discord);
                        })
                        .catch(err => {
                            Utils.errorOption("Bad clan ID", message);
                        })
                } else {
                    request.get(`http://api.cr-api.com/clan/${clanTag}`)
                        .then(res => {
                            Utils.clan(res.data, message, Discord);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                break;
            case 'top':
                if (option) {
                    if (option >= 1 && option <= 25) {
                        request.get(`http://api.cr-api.com/clan/${clanTag}`)
                            .then(res => {
                                Utils.top(res.data.members, message, option, Discord);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else {
                        Utils.errorOption("Bad option for top (max 25 players)", message);
                    }
                } else {
                    request.get(`http://api.cr-api.com/clan/${clanTag}`)
                        .then(res => {
                            Utils.top(res.data.members, message, 5, Discord);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
                break;
            case 'donations':
                request.get(`http://api.cr-api.com/clan/${clanTag}`)
                    .then(res => {
                        Utils.donations(res.data.members, message, Discord);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                break;
            case 'player':
                if (option) {
                    option = Utils.removeHash(option);
                    request.get(`http://api.cr-api.com/player/${option}`)
                        .then(res => {
                            Utils.player(res.data, message, Discord);
                        })
                        .catch(err => {
                            Utils.errorOption("Bad player ID", message);
                        })
                } else {
                    Utils.errorOption("You need to specify a player ID", message);
                }
                break;
            case 'chest':
                if (option) {
                    option = Utils.removeHash(option);
                    const chestId = chestIDs[Math.floor(Math.random() * (chestIDs.length - 0 + 1))];
                    const chestImgUrl = `http://www.clashapi.xyz/images/chests/${chestId}.png`;
                    request.get(`http://api.cr-api.com/player/${option}`)
                        .then(res => {
                            Utils.chest(res.data, message, chestImgUrl, Discord);
                        })
                        .catch(err => {
                            Utils.errorOption("Bad player ID", message);
                        })
                } else {
                    Utils.errorOption("You need to specify a player ID", message);
                }
                break;
            case 'help':
                Utils.help(message, Discord);
                break;
            default:
                Utils.errorCommand(message);
        }
    }
});

/* Init chests id names */
let chestIDs = [
    "wooden-chest",
    "silver-chest",
    "golden-chest",
    "crown-chest",
    "magical-chest",
    "giant-chest",
    "super-magical-chest",
    "epic-chest",
    "legendary-chest",
    "lightning-chest",
    "fortune-chest",    "kings-chest"
];

bot.login(conf.token);
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Our app is running on http://localhost:' + port);
});

setInterval(() => {
 http.get('https://murmuring-citadel-27537.herokuapp.com/');
}, 900000);

const client = new Discord.Client();



// Here we load the config.json file that contains our token and our prefix values. 

const config = require("./config.json");

// config.token contains the bot's token

// config.prefix contains the message prefix.









bot.on("message", async message => {

  // This event will run on every single message received, from any channel or DM.

  

  // It's good practice to ignore other bots. This also makes your bot ignore itself

  // and not get into a spam loop (we call that "botception").

  if(message.author.bot) return;

  

  // Also good practice to ignore any message that does not start with our prefix, 

  // which is set in the configuration file.

  if(message.content.indexOf(config.prefix) !== 0) return;

  

  // Here we separate our "command" name, and our "arguments" for the command. 

  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:

  // command = say

  // args = ["Is", "this", "the", "real", "life?"]

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

  

  // Let's go with a few common example commands! Feel free to delete or change those.

  

  if(command === "ping") {

    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.

    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)

    const m = await message.channel.send("Ping?");

    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);

  }

if(command === "invite") {
    const m = await message.channel.send("Getting invite!");
    m.edit(`Click this link to invite me: http://bit.ly/BanditInvite`);

  }

if(command === "battle") {
    const m = await message.channel.send("@everyone");
    m.edit(`Who wants to battle?`);

  }

if(command === "solo") {
    const m = await message.channel.send("Need help?");
    m.edit(`Click the link: http://bit.ly/VexeronBot or http://bit.ly/solohdyt`);

  }

  

  if(command === "say") {

    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 

    // To get the "message" itself we join the `args` back into a string with spaces: 

    const sayMessage = args.join(" ");

    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.

    message.delete().catch(O_o=>{}); 

    // And we get the bot to say the thing: 

    message.channel.send(sayMessage);

  }

  

  if(command === "kick") {

    // This command must be limited to mods and admins. In this example we just hardcode the role names.

    // Please read on Array.some() to understand this bit: 

    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?

    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )

      return message.reply("Sorry, you don't have permissions to use this!");

    

    // Let's first check if we have a member and if we can kick them!

    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.

    // We can also support getting the member by ID, which would be args[0]

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);

    if(!member)

      return message.reply("Please mention a valid member of this server");

    if(!member.kickable) 

      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    

    // slice(1) removes the first part, which here should be the user mention or ID

    // join(' ') takes all the various parts to make it a single string.

    let reason = args.slice(1).join(' ');

    if(!reason) reason = "No reason provided";

    

    // Now, time for a swift kick in the nuts!

    await member.kick(reason)

      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));

    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);



  }

  

  if(command === "ban") {

    // Most of this command is identical to kick, except that here we'll only let admins do it.

    // In the real world mods could ban too, but this is just an example, right? ;)

    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )

      return message.reply("Sorry, you don't have permissions to use this!");

    

    let member = message.mentions.members.first();

    if(!member)

      return message.reply("Please mention a valid member of this server");

    if(!member.bannable) 

      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");



    let reason = args.slice(1).join(' ');

    if(!reason) reason = "No reason provided";

    

    await member.ban(reason)

      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));

    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);

  }

  

  if(command === "purge") {

    // This command removes all messages from all users in the channel, up to 100.

    

    // get the delete count, as an actual number.

    const deleteCount = parseInt(args[0], 10);

    

    // Ooooh nice, combined conditions. <3

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)

      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    

    // So we get our messages, and delete them. Simple enough, right?

    const fetched = await message.channel.fetchMessages({count: deleteCount});

    message.channel.bulkDelete(fetched)

      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

  }

});



bot.login(config.token);
