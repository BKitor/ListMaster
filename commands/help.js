const config=require("../config.json");
exports.run=(client, message, args)=>{
  message.channel.send(config.helpText).then(msg=>msg.delete(config.helpMSGDeleteTime));
}
