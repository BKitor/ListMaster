const config=require("./help_text.json");
exports.run=(client, message, args)=>{
  message.channel.send(config.helpText)
  .then(msg=>msg.delete(config.helpMSGDeleteTime));
  message.delete(100).catch(err=>console.error);
}
