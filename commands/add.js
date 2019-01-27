const list = require("../list.json");
const listFuncs = require("../listFuncs.js");

exports.run=(client, message, args)=>{
  args.forEach(listItem=>{
    list.list.push(listItem);
  });
    listFuncs.saveList();
    listFuncs.reprintList(message);
}
