const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
/*const fs = require("fs");*/

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix)||message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  switch(command){
    case "help":
    message.channel.send("List of Commands...");
    break;
    case "ping":
    message.channel.send("pong!`(${message.createdTimestamp - msg.createdTimestamp}ms)`");
    break;
    default:
    message.channel.send("Invalid command entered!");
    break;
  }
});

client.login(config.token);
