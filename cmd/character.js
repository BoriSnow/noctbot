const sql = require("sqlite");
sql.open("./mirrorrealm.sqlite");
exports.run = (bot, msg, [subcmd, mention, name, ...desc]) => {  //Uses node.js and discord.js.
  let info = desc.toString();
  info = info.split(',').join(" "); //converts desc(array) to a string
if (subcmd == "list")
{
  if (msg.mentions.members.size == 1) //If only a user is mentioned
  {
    sql.get(`SELECT name, desc FROM chars WHERE userID = "${msg.mentions.members.first().id}"`).then(row => { //Grab the name of that user's characters
      if (!row) returnmsg.reply("This user has no characters yet.");
      //return the name from multiple rows with the matching userID in an array
    })
  }
  if (!name)
    return msg.reply("Please enter the name of the character!");
  else
  {
    sql.get(`SELECT userID, desc FROM chars WHERE name = "name"`).then(row => { //Grab the users that have a character by that name
      if(!row) return msg.reply("No characters by that name were found...");
      //return the username of anyone who has a character by that name
    })
  }
  if(name && msg.mentions.members.size == 1)
  {
  sql.get(`SELECT name, desc FROM chars WHERE userID = "${msg.mentions.members.first().id}" AND name = "name"`).then(row => //Grab that specific character's details
    {
      if(!row) return msg.reply("No such character!");
      msg.channel.send(`${msg.mentions.members.first()}'s Character: \n` + `${row.name}` + `\n` + `${row.desc}`);
    });
  }
}
else if (msg.member.roles.some(r=>["Bio Approver"].includes(r.name)) ){
  const owner = msg.mentions.users.first();
  if(subcmd == "add")
  {
    if (!owner) return msg.reply("Please mention the owner of the character!");
    if (!desc) return msg.reply("Please enter the name and details of the character!");
    sql.get(`SELECT * FROM chars WHERE userID = "${msg.mentions.members.first().id}"`).then(row => {
    sql.run("INSERT INTO chars (userID, name, desc) VALUES (?, ?, ?)", [msg.mentions.members.first().id, name, info]);
    }).catch(() =>
    {
      console.error;
    });
  }
/*****************************************************/
  else if(subcmd == "del")
  {
    if(msg.mentions.members.size == 1 && name)
    {
      sql.get(`SELECT * FROM chars WHERE name = "name" AND userID = "${msg.mentions.members.first().id}"`).then(row => {
        if(!row) return msg.reply("There is no such character!");
        else
        {
          sql.run(`DELETE FROM chars WHERE userID = "${msg.mentions.members.first().id}" AND name = "name"`).catch(() => {
          console.error;
          console.log("Character successfuly deleted.");
          return msg.reply("Character was successfully deleted.");
          });
        }
      });
    }
    else
    {
      return msg.reply("Please specify a specific character to delete!!");
    }
  }
  /***************************************************/
  else if(subcmd == "edit")
  {
    if(msg.mentions.members.size == 1 && name && desc)
    {
      sql.get(`SELECT * FROM chars WHERE name = "name" AND userID = "${msg.mentions.members.first().id}"`).then(row => {
        if(!row) return msg.reply("There is no such character!");
        else
        {
          sql.run(`UPDATE chars SET desc = info WHERE name = "name" AND userID = "${msg.mentions.members.first().id}"`);
          //confirmation message
        }
      })
    }
  }
  else return msg.reply("Invalid subcommand! Use '<info char' for correct usage!");
}
  else return msg.reply("Invalid Permissions!");
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
