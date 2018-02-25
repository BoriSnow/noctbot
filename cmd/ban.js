exports.run = (bot, msg, [mention, ...reason]) => {

  if (msg.member.roles.some(r=>["Super Admin", "Head Developer"].includes(r.name)) ){

if(msg.mentions.members.size == 0)
 return msg.reply("Please mention a user to ban!");

const banMember = msg.mentions.members.first();
  banMember.send("You were banned from **The Mirror Realm** for: " + reason);
  banMember.ban(reason.join(" ")).then(member => {
    msg.channels.get(413058308438491156).send({embed: {
      color : 2372121,
      description : `${member.user.username} was banned`,
      timestamp: new Date()
    }});
  msg.reply(`${member.user.username} was succesfully banned.`);
});
}
else return msg.reply("Invalid Permissions!");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
};

exports.help = {
  name: "ban",
  description: "Activates the almighty BANHAMMER!",
  usage: "ban {@user|reason}"
};
