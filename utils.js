module.exports = {

    hello: function (message) {
        return message.channel.send(`Hello <@${message.author.id}>!`);
    },

    clan: function (data, message, Discord) {
        const embed = new Discord.RichEmbed();
        embed.setTitle("Clan Informations")
            .setDescription(data.description)
            .setColor("#22A7F0")
            .addField("Name", data.name)
            .addField("Players", `${data.memberCount}/50`)
            .addField("Score", data.score)
            .addField("Donations", data.donations)
            .addField("Required Trophies", data.requiredScore)
            .setThumbnail(data.badge.image);

        return message.channel.send({
            embed
        });
    },

    top: function (data, message, max, Discord) {
        const embed = new Discord.RichEmbed()
            .setTitle("Top Players")
            .setDescription(`${max} High ranked players`);
        for (let i = 0; i < data.length && i < max; i++) {
            embed.addField(
                `${i+1}. ${data[i].name}`,
                `\:trophy: ${data[i].trophies}`
            );
        }
        return message.channel.send({
            embed
        })
    },

    donations: function (data, message, Discord) {
        const embed = new Discord.RichEmbed()
            .setTitle("Top Donations Player")
            .setDescription("5 Best Donations Players");

        data.sort((a, b) => {
            return b.donations - a.donations
        });

        for (let i = 0; i < data.length && i < 5; i++) {
            embed.addField(
                `${i+1}. ${data[i].name}`,
                `\:gift: ${data[i].donations}`
            );
        }

        return message.channel.send({
            embed
        })
    },

    player: function (data, message, Discord) {
        const embed = new Discord.RichEmbed();
        embed.setTitle("Player Information")
            .setColor("#22A7F0")
            .addField("Name", `${data.name} - Level ${data.stats.level}`)
            .addField("Clan", `${data.clan.name} (${data.clan.role})`)
            .addField("Max trophies", `${data.stats.maxTrophies} \:trophy:`)
            .addField("Current trophies", `${data.trophies} \:trophy:`)
            .addField("Total donations", data.stats.totalDonations)
            .addField("Cards", `${data.stats.cardsFound}/81`)
            .addField("Favorite card", data.stats.favoriteCard.name)
            .addField("W/L/D", `${data.games.winsPercent*100}%/${data.games.lossesPercent*100}%/${data.games.drawsPercent*100}%`)
            .addField("Challenge max win", data.stats.challengeMaxWins)
            .addField("Challenge cards won", data.stats.challengeCardsWon)
            .addField("Tournament cards won", data.stats.tournamentCardsWon)
            .setThumbnail(data.clan.badge.image);

        return message.channel.send({
            embed
        });
    },

    chest: function (data, message, img, Discord) {
        const embed = new Discord.RichEmbed();
        embed.setTitle("Chest informations")
            .setColor("#22A7F0")
            .setDescription(`Next chest incoming for ${data.name}`)
            .addField("Giant", data.chestCycle.giant)
            .addField("Epic", data.chestCycle.epic)
            .addField("Magical", data.chestCycle.magical)
            .addField("Super Magical", data.chestCycle.superMagical)
            .addField("Legendary", data.chestCycle.legendary)
            .setThumbnail(img);

        return message.channel.send({
            embed
        });
    },

    help: function(message, Discord){
        const embed = new Discord.RichEmbed();
        embed.setTitle("Help")
            .setColor("#FABE58")
            .setDescription('Here the list of available commands')
            .addField("!help", "Display this help list")
            .addField("!hello", "Say hello to user")
            .addField("!clan <ID>", "Display information about clan. <ID> is facultative")
            .addField("!player <ID>", "Display informations about player <ID>")
            .addField("!top <max>", "Display top <max> players of clan (from 0 to 25)")
            .addField("!chest <ID>", "Display next chests incoming for player <ID>")
            .addField("!invite", "Invite Bandit to your server!")
            .addField("!Solo", "For help and updates!")
            .addField("!battle", "Who is ready to duel!?")
            .addField("!say <message>", "Says whatever you tell the bot to say!")
            .addField("!purge <number of messages to delete>", "Delete messages in bulk!")
            .addField("!kick <@player>", "Kicks the designated player!")
            .addField("!ban <@player>", "Bans the designated player!")
            .addField("!ping", "pong!")
            .addField("Need help or want to check out the discord server?", "bit.ly/VexeronBot")
            .addField("Want to check out the Bot Developers YouTube Channel?", "bit.ly/solohdyt")
        return message.channel.send({
            embed
        });
    },

    removeHash: function (arg) {
        return arg.replace('#', '');
    },

    errorCommand: function (message) {
        return message.channel.send(``);
    },

    errorOption: function (error, message) {
        return message.channel.send(`<@${message.author.id}>: ${error}!`);
    }

};