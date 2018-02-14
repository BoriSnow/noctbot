exports.run = (bot, msg, params = []) => {

  if (msg.member.roles.some(r=>["Support Team", "Head Dev"].includes(r.name)) ){
    const muteRole = msg.guild.roles.find("name", "Muted");

if(msg.mentions.members.size === 0)
return msg.reply("Please mention a user to mute");

    const muteMember = msg.mentions.members.first();
if(muteMember.member.roles.has ("name", "Muted")) return msg.reply("This user already has the Muted role!");
else{
    muteMember.addRole(muteRole).catch(console.error);
    msg.reply(`${member.user.username} was successfully muted.`);
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
  description: "Sews together someone's mouth so they can't speak. :mute:",
  usage: "mute {@user}"
};
