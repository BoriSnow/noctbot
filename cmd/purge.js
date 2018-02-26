exports.run = (bot, msg, params = []) => {

  if(!msg.content.startsWith(config.adminPrefix)) return;

  if (msg.member.roles.some(r=>["Support Team", "Head Developer"].includes(r.name)) ){

const user = msg.mentions.users.first();
const amount = !!parseInt(msg.content.split(' ')[1]) ? parseInt(msg.content.split(' ')[1]) : parseInt(msg.content.split(' ')[2])
if (!amount) return msg.reply('Please specify number of messages to delete!');
if (!amount && !user) return msg.reply('Please specify a user and amount, or just an amount, of messages to purge!');
msg.channel.fetchMessages({
 limit: amount,
}).then((msgs) => {
 if (user) {
 const filterBy = user ? user.id : Client.user.id;
 msgs = msgs.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 msg.channel.bulkDelete(msgs).catch(error => console.log(error.stack));
});
  }
/*  msg.guild.channel.get(413058308438491156).send({embed: {
    color: 47237237,
  }})*/
else return("Invalid Permissions!");

};

exports.conf = {
  enabled: true,
  guildOnly: false,
};

exports.help = {
  name: "purge",
  description: "Destroys the evidence that those messages ever existed :)",
  usage: "purge {@user|number}/{number}"
};
