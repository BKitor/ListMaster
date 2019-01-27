const listFuncs = require("../listFuncs.js");
exports.run=(client, message, args)=>{
  listFuncs.printList(message);
  message.delete(100).catch(err=>console.error);
}
