const listFuncs = require("../listFuncs.js");
exports.run=(client, message, args)=>{
  listFuncs.printList(message.channel);
  message.delete(100).catch(err=>console.error);
}
