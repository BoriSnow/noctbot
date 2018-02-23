const sql = require("sqlite");
sql.open("./char.sqlite");
exports.run = (bot, msg, [subcmd, mention, name, ...desc]) => {
  let info = desc.toString();
  info = info.split(',').join(" ");
if (subcmd == "list"){
if (!name){
return msg.reply("Please enter the name of the character!");
}
if (msg.mentions.members.size == 1) {
sql.get(`SELECT name, desc FROM chars WHERE userID = "${msg.mentions.members.first().id}"`);
}
if(name){
sql.get(`SELECT userID, desc FROM chars WHERE name = "name"`).then(row => {
  if(!row) return msg.reply("No characters by that name were found...");
})
}
if(name && msg.mentions.members.size == 1) {
sql.get(`SELECT name, desc FROM chars WHERE userID = "${msg.mentions.members.first().id}" AND name = "name"`).then(row => {
  if(!row) return msg.reply("No such character!");
msg.channel.send(`${msg.mentions.members.first()}'s Character: \n` + `${row.name}` + `\n` + `${row.desc}`);
});
}
}
else if (msg.member.roles.some(r=>["Bio Approver"].includes(r.name)) ){
  const owner = msg.mentions.users.first();
  if(subcmd == "add"){
    if (!owner) return msg.reply("Please mention the owner of the character!");
    if (!name || !desc) return msg.reply("Please enter the name and details of the character!");
    desc.join(" ");
    sql.get(`SELECT * FROM chars WHERE userID = "${msg.mentions.members.first().id}"`).then(row => {
    sql.run("INSERT INTO chars (userID, name, desc) VALUES (?, ?, ?)", [msg.mentions.members.first().id, name, info]);
  }).catch(() =>
  {
    console.error;
  });
  }
/*****************************************************/
  else if(subcmd == "del"){
    if(msg.mentions.members.size == 1 && name){
      sql.get(`SELECT * FROM chars WHERE name = "name" AND userID = "${msg.mentions.members.first().id}"`).then(row => {
        if(!row){
        return msg.reply("There is no such character!");
        }
        else{
          sql.run(`DELETE FROM chars WHERE userID = "${msg.mentions.members.first().id}" AND name = "name"`).catch(() =>
        {
          console.error;
          console.log("Character successfuly deleted.");
          return msg.reply("Character was successfully deleted.");
        });
        }
    });
  }
  else {
  return msg.reply("Please specify a specific character to delete!!");
    }}
  /***************************************************/
  else if(subcmd == "edit"){
    if(msg.mentions.members.size == 1 && name && desc){
      sql.get(`SELECT * FROM chars WHERE name = "name" AND userID = "${msg.mentions.members.first().id}"`).then(row => {
        if(!row){
          return msg.reply("There is no such character!");
        }
        else{
          sql.run(`UPDATE chars SET desc = info WHERE name = "name" AND userID = "${msg.mentions.members.first().id}"`);
        }
      })
    }
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
