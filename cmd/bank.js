const sql = require("sqlite");
sql.open("./mirrorrealm.sqlite");
exports.run = (bot, msg, [subcmd, mention, amt]) =>
{
  if(msg.members.roles.some(r=>["Roleplayer"].includes(r.name)))
  {
    if(subcmd=="bal") bankBal;
    if(subcmd=="give") bankGive;
    if(subcmd=="buy") bankBuy;
    if(subcmd == "spawn") bankSpawn;
    //------BANK BAL------
    function bankBal ()
    {
      sql.run(`SELECT * FROM currency WHERE userID = "${msg.author.id}"`).then(row => {
        return msg.reply(`Your current balance is: "${row.bal}"`);
      })
    }
    //------BANK GIVE------
    function bankGive ()
    {
      sql.run(`SELECT * FROM currency WHERE userID = "${msg.author.id}"`).then(row => {
        let withdraw = (amt - `${row.bal}`);
        sql.run(`UPDATE currency SET bal = "withdraw" WHERE userID = "${msg.author.id}"`);
      })
      sql.run(`SELECT * FROM currency WHERE userID = "${msg.mentions.members.first().id}"`).then(row => {
        let deposit = (amt + `${row.bal}`);
        sql.run(`update currency SET bal = "deposit" WHERE userID = "${msg.mentions.memers.first().id}"`);
      })
    }
    //------BANK BUY------
    function bankBuy ()
    {
      sql.run(`SELECT * FROM shop WHERE itemID = "mention"`).then(row => {
        if(!row) return msg.reply("That item does not exist.");
        let confirm = Math.floor(Math.random()*9000) + 1000;
        let auth = msg.author.id;
        msg.channel.send(`"${row.name}" costs "${row.price}. Please enter "` + confirm + " to confirm your purchase").then(() => {
          msg.channel.awaitMessages(response => response.content === confirm, {
            max: 1,
            time: 30000,
            errors: ['time'],
          }).then((collected) => {
            sql.run(`SELECT * FROM currency WHERE userID = "${msg.author.id}"`).then(row => {
              sql.run(`SELECT * FROM store WHERE itemID = "mention"`).then(row => {
                let cost = `${row.bal}` - (`${row.cost}` * amt);
                sql.run(`UPDATE currency SET bal = `)
              msg.channel.send(`Your current balance is now: "${row.bal}"`);
             })
            })
          }).catch(() => {
            msg.channel.send("Time ran out.")
          });
        });
      });
    }
    //------BANK SPAWN------
      function bankSpawn ()
      {
        if(msg.mentions.roles.some(r=>["Head Developer", "Super Admin"].includes(r.name)))
        {
          if(!mention) return msg.reply("Please specify the amount of gold you wish to spawn.");
          sql.run(`SELECT * FROM currency WHERE userID = "${msg.author.id}"`).then(row => {
            let spawn = (mention + `${row.bal}`);
            sql.run(`UPDATE curency SET bal = spawn WHERE userID = "${msg.author.id}"`);
          });
        }
      else return msg.reply("Invalid Permissions!");
      }
  }
  else return msg.reply("Invalid Persmissions!");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
};

exports.help = {
  name: "bank bal",
  description: "Money!",
  usage: "bank bal{-} give{mention|amount} spawn{amount} buy{item|amount}"
};
