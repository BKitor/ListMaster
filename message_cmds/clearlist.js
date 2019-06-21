const listWrapper = require("../listFuncs.js").ListWrapper;

exports.run = (client, message, args)=>{
  listWrapper.nukeList();
  listWrapper.clearChat(message.channel);
}
