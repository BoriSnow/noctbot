const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const sql = require("sqlite");
sql.open("./mirrorrealm.sqlite");

bot.commands = new Discord.Collection();
fs.readdir("./cmd/", (err, files) => {
  if(err) console.error(err);
  console.log(`Loading ${files.length} commands...`);
  files.forEach(f=>{
    let props = require(`./cmd/${f}`);
    console.log(`Loading Command: ${props.help.name}. :ok_hand:`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", () => {
  console.log("Ready!");
  bot.user.setActivity("<info for help!");
});

bot.on("message", msg => {
  if (!msg.content.startsWith(config.prefix)&&!msg.content.startsWith(config.adminPrefix)||msg.author.bot) return;
  let args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();
  let params = msg.content.split(" ").slice(1); //removes command
  let cmd = bot.commands.get(command);
  if(cmd) {
    cmd.run(bot, msg, args, params);
  }
});

bot.on("error", console.error);
bot.on("warn", console.warn);

bot.login(config.token);

/**Todo:
  *Levels
  *Currency(ask rose for name of currency)
  > bank {bal|give|buy|spawn(head dev)|}
  *>Config {prefix|logs|} - me
  **/
