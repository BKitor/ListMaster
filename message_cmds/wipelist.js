const listWrapper = require("../listFuncs.js").ListWrapper;

exports.run = async (client, message, args)=>{
  await listWrapper.clearChat(message.channel);
  await listWrapper.nukeList();
  listWrapper.reprintList(message.channel);
  message.delete(100)
}
