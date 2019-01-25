module.exports = (client, message)=>{
  //Ignore all bots
  if(message.author.bot)return;
  //Ignore messaes not starting with the prefi (in config.json)
  if(message.content.indexOf(client.config.prefix)!== 0)return;
  //our standard argument/command name definitions.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  //grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);
  //if that command doesn't exist, silently exit and do nothing
  if(!cmd)return;
  cmd.run(client, message, args);
}
