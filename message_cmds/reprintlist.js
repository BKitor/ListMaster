const listFuncs = require("../listFuncs.js");
exports.run=(client, message, args)=>{
  listFuncs.reprintList(message);
}
