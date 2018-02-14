const sql = require("sqlite");
sql.open("./char.sqlite");
exports.run = (bot, msg, [subcmd, mention, name, ...description]) => {
if (subcmd == "list"){

}
else if (msg.member.roles.some(r=>["Support Team", "Super Admin", "Head Dev"].includes(r.name)) ){
  const owner = msg.mentions.users.first();
  if(subcmd == "add"){
    if (!owner) return msg.reply("Please mention the owner of the character!");
    if (!name) return msg.reply("Please enter the name and details of the character!");
    sql.get(`SELECT * FROM scores WHERE userID = "${msg.mentions.users.first().id}"`).then(row =>
  {
    if (!row)
  {
    sql.run("INSERT INTO scores (userID, char, desc) VALUES (?, ?, ?)", [msg.mentions.users.first().id, name, description]);
  }
  else {
    row.char = name;
    row.desc = description;
  }}).catch(() =>
  {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS scores (userID TEXT, name TEXT, desc TEXT)").then(() =>
    {
      sql.run("INSERT INTO scores (userID, name, desc) VALUES (?, ?, ?)", [msg.mentions.users.first().id, name , description]);
    });
  });
  }

  else if(subcmd == "del"){
  }
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
