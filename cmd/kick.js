exports.run = (bot, msg, [mention, ...reason]) => {

if (msg.member.roles.some(r=>["Support Team", "Super Admin", "Head Dev"].includes(r.name)) ){

if(msg.mentions.members.size == 0)
 return msg.reply("Please mention a user to kick");

  const kickMember = msg.mentions.members.first();
  kickMember.send("You were kicked from **The Mirror Realm** for: " + reason);
  kickMember.kick(reason.join(" ")).then(member => {
  msg.reply(`${member.user.username} was succesfully kicked.`);
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
