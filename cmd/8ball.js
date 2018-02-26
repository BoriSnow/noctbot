exports.run = (bot, msg, [a, b]) => {
  if(!a) return msg.reply("Do you think the fates can read your mind?");
  if(!b){
  let answer = Math.floor(Math.random()*truth.length);
  msg.channel.send("The fates have answered you. Your fate has been chosen...:" +
"\n" + truth[answer]);
truth = [
  "No",
  "Yes",
  "Bring me chicken nuggets and we shall discuss...",
  "Perhaps",
  "Maybe",
  "...",
  "What sort of pathetic question is this?",
  "I'm tired. Go ask me later",
  "Clouds... so many clouds..."
]
}
if(b){
  let choose = Math.floor(Math.random()*select.length);
  msg.channel.send("The fates have answered you. Your fate has been chosen...:" +
"\n" + select[choose]);
  select = [
    "Left",
    "Right",
    "A",
    "B",
    "I can't decide either.",
    "...",
    "Ask someone else to choose",
    "I'm just a bot!",
    "Bring me an electrical outlet and we'll talk...",
    "SLEEP MODE ENGAGED... ASK ME LATER...",
  ]
}};

exports.conf = {
  enables: true,
  guildOnly: false,
};

exports.help = {
  name: "8ball",
  description: "Gaze into the mystical 8ball... The fates shall answer thee...",
  usage: "8ball {Question}"
};
