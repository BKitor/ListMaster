const listWrapper = require("../listFuncs.js").ListWrapper;

exports.run = async (client, message, args)=>{
  listWrapper.clearChat(message.channel);
  message.delete(100);
}
