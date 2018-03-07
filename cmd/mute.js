exports.run = (bot, msg, params = []) => {
  if(!msg.content.startsWith(">")) return;
  if (msg.member.roles.some(r=>["Support Team", "Head Developer"].includes(r.name)))
  {
    const muteRole = msg.guild.roles.find("name", "Muted");
    if(msg.mentions.members.size === 0) return msg.reply("Please mention a user to mute");
    const muteMember = msg.mentions.members.first();
    if(muteMember.member.roles.has ("name", "Muted")) return msg.reply("This user already has the Muted role!");
    else{
      muteMember.addRole(muteRole).catch(console.error).then(member => {
        msg.channels.get(413058308438491156).send({embed: {
          color : 140245155,
          description : `${member.user.username} was warned`,
          timestamp: new Date()
        }});
        msg.reply(`${member.user.username} was successfully muted.`);
      })
    }
  }
else return("Invalid Permissions!");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
};

exports.help = {
  name: "mute",
  description: "Sews together someone's mouth so they can't speak. :x",
  usage: "mute {@user}"
};
