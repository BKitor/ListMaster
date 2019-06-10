const config = require("../config.json");
module.exports = (client, message) => {
  //Ignore all bots
  if (message.author.bot) return;
  if (message.channel.name !== config.allowedChanel) return;
  //Ignore messaes not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) {
    message.delete(100).catch(err => console.error);
    return;
  }
  console.log(`${message.content} recieved!`);
  //our standard argument/command name definitions.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  //grab the command data from the client.commands Enmap
  const cmd = client.message_cmds.get(command);
  //if that command doesn't exist, silently exit and do nothing
  if (!cmd) {
    message.delete(100).catch(err => console.error);
    return;
  }
  cmd.run(client, message, args);
}
