exports.run = (bot, msg, params = []) => {
  msg.channel.send('Ping?')
    .then(message => {
      message.edit(`Pong! (took: ${message.createdTimestamp - msg.createdTimestamp}ms)`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: "ping",
  description: "Play Ping Pong...?",
  usage: "ping"
};
