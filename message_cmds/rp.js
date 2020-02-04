const listWrapper = require("../listFuncs.js").ListWrapper;
exports.run=async(client, message, args)=>{
  listWrapper.reprintList(message.channel);
  message.delete(100);
}
