exports.run = (bot, msg, [mention, ...reason]) => {

  if (msg.member.roles.some(r=>["Support Team", "Super Admin", "Head Developer"].includes(r.name)) ){

if(msg.mentions.members.size == 0)
 return msg.reply("Please mention a user to warn!");

const warnMember = msg.mentions.members.first();
  warnMember.send("You were warned for: " + reason).then( member => {
  msg.reply(`${member.user.username} was warned.`);
    msg.channels.get(413058308438491156).send({embed: {
      color : 23725092,
      description : `${member.user.username} was warned`,
      timestamp: new Date()
    }});
  });
}
else return msg.reply("Invalid Permissions!");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
};

exports.help = {
  name: "warn",
  description: "Tells someone when they did a wrong.",
  usage: "warn {@user|reason}"
};
