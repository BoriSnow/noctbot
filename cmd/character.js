exports.run = (bot, msg, [subcmd, mention, ...name, ...description]) => {
if (msg.member.roles.has ("name", "Bio Approver")){
  const owner = msg.mentions.users.first();
  const rest =
  if(subcmd == "add"){
    if (!owner) return msg.reply("Please mention the owner of the character!");
    if (!name) return msg.reply("Please enter the name and details of the character!");
  }
  else if(subcmd == "del")return msg.reply("Dellllll!");{
if(!name)
  }
  else if(subcmd == "edit")return ("Editttttt!");//{

  //}
  else if(subcmd == "list")return ("Listtttt!");//{

  //}
  else{
    msg.reply("Invalid subcommand! Use '<info char' for correct usage!");
  }
//}
//  else{
  //  msg.reply("Invalid Permissions!");
//  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
};

exports.help = {
  name: "char",
  description: "Store them characters!",
  usage: "char {add(charname|description)/del(charname/@mention)/edit(charname|description)/list(charname/pagenumber)}"
};
