const sql = require("sqlite");
sql.open("./char.sqlite");
exports.run = (bot, msg, [subcmd, mention, name, desc]) => {
if (subcmd == "list"){
if (!name){
return msg.reply("Please enter the name of the character!");
}
if (msg.mentions.members.size == 1) {
  //find characters with that userID
}
if(name){
  //find characters with that name
}
if(name && msg.mentions.members.size == 1) {
  //find that specific character
}
}
else if (msg.member.roles.some(r=>["Bio Approver"].includes(r.name)) ){
  const owner = msg.mentions.users.first();
  if(subcmd == "add"){
    if (!owner) return msg.reply("Please mention the owner of the character!");
    if (!name || !desc) return msg.reply("Please enter the name and details of the character!");
    sql.get(`SELECT * FROM chars WHERE userID = "${msg.mentions.members.first().id}"`).then(row => {
    sql.run("INSERT INTO chars (userID, name, desc) VALUES (?, ?, ?)", [msg.mentions.members.first().id, name, desc]);
  }).catch(() =>
  {
    console.error;
  });
  }
/*****************************************************/
  else if(subcmd == "del"){
    if (!name) return msg.reply("Please enter the character's name you wish to delete!");
    if(msg.mentions.members.size !== 0 && name){
      // delete that specific character
    }
        if(msg.mentions.members.size !== 0){
        sql.run(`DELETE FROM chars WHERE userID = "${msg.mentions.members.first().id}"`).catch(() =>
      {
        console.error;
        console.log("Number of rows deleted: " + result.affectedRows);
      });  // delete all of that person's characters
        }
  else {
    sql.get(`SELECT* FROM chars WHERE name = mention"`).then(row)
    //find and list owners and names that match it
  }
  }
  /***************************************************/
  else if(subcmd == "edit"){
  }
  else{
    msg.reply("Invalid subcommand! Use '<info char' for correct usage!");
  }
}
  else{
  msg.reply("Invalid Permissions!");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
};

exports.help = {
  name: "char",
  description: "Store them characters!",
  usage: "char add{mention|name|description} del {mention/name} edit {name|new description} list {name/page number}"
};
