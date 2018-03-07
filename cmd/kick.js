exports.run = (bot, msg, [mention, ...reason]) => {
if(!msg.content.startsWith(">")) return;
if (msg.member.roles.some(r=>["Support Team", "Super Admin", "Head Developer"].includes(r.name)) )
{
  if(msg.mentions.members.size == 0) return msg.reply("Please mention a user to kick");
  const kickMember = msg.mentions.members.first();
  kickMember.send("You were kicked from **The Mirror Realm** for: " + reason);
  kickMember.kick(reason.join(" ")).then(member => {
  msg.reply(`${member.user.username} was succesfully kicked.`);
    msg.channels.get(413058308438491156).send({embed: {
      color : 23512038,
      description : `${member.user.username} was kicked`,
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
  name: "kick",
  description: "Activates the almighty KICKSTICK!",
  usage: "kick {@user|reason}"
};
