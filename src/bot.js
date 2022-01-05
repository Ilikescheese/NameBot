const Discord = require("discord.js");
const bot = new Discord.Client();

// !!! Token !!!
const token = "";
bot.login(token);

bot.on("ready", () => {
	setInterval(chkNicks, 3000); //Every 3secs
});

function invalidString(string) {
	for (let i = 0; i < string.length; i++)
		if (string.charCodeAt(i) > 255)
			return true;
	return false;
}

function chkNicks() {
	let date = new Date();

	const guild = bot.guilds.cache.get(""); //my guild
	guild.members.fetch().then((members) => {
		members.forEach((guildMember, key) => {
			if (!guildMember.hasPermission("ADMINISTRATOR")) 
				if (invalidString(guildMember.displayName))
					guildMember.setNickname("<no name>");
		});
	}).catch((err) => { console.log(err); });
}