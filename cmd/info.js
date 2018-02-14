exports.run = (bot, msg, params) => {
    if (!params[0]) {
      msg.channel.send("asciidoc", `= Command List =\n\n[Use ?help <commandname> for details]\n\n${bot.commands.map(c=>`${c.help.name}:: ${c.help.description}`).join("\n")}`);
  } else {
    let command = params[0];
    if(bot.commands.has(command)) {
      command = bot.commands.get(command);
      msg.channel.send("asciidoc", `= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name : "info",
  description: "The command you just used...",
  usage: "info {command}"
};
