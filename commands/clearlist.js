const list = require("../list.json");
const listFuncs = require("../listFuncs.js");

exports.run=(client, message, args)=>{
  list.latestAddition = list.list;
  list.list = [];
  listFuncs.saveList();
  listFuncs.reprintList(message);
}
