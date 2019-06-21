const listWrapper = require("../listFuncs.js").ListWrapper;
exports.run=(client, message, args)=>{
  listWrapper.printList(message.channel);
  message.delete(100).catch(err=>console.error);
}
