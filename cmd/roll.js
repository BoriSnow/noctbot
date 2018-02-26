exports.run = (bot, msg, [face, count]) => {
  let rolls = new Array (count);
  let amount = 0;
  if(!face) return msg.reply("Please specify how many sides there are!");
  if(!count) {
    count = 1;
  }
  for (var i = 0; i < count; i++) {
  let  random = Math.floor(Math.random()*face) + 1;
  rolls[i] = random;
  amount += rolls[i];
  }
  let roll = rolls.toString();
  roll = roll.split(',').join(" + ");
  msg.channel.send(roll + " = " + amount);
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
};

exports.help = {
  name: "roll",
  description: "Roll an imaginary giant dice!",
  usage: "roll {#d #r} WHERE #d is the number of faces AND #r is the number of rolls"
};
