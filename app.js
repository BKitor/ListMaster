//TODO:display message when bot successfully restarted
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const ListWrapper = require("./listFuncs.js")

const client = new Discord.Client();
const config = require("./config.json");
client.config = config;

client.ListWrapper = ListWrapper;
client.reaction_cmds = new Enmap();
client.message_cmds = new Enmap();

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});


fs.readdir("./message_cmds/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./message_cmds/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load message_cmd ${commandName}`);
    client.message_cmds.set(commandName, props);
  });
});


fs.readdir("./reaction_cmds", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./reaction_cmds/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load reaction_cmd ${commandName}`);
    client.reaction_cmds.set(commandName, props);
  })
});

client.login(process.env.DISCORD_TOKEN);
