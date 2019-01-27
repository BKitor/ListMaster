const list = require("../list.json");
const listFuncs = require("../listFuncs.js");

exports.run=(client, message, args)=>{
  args.forEach(listItem=>{
    const itemIndex = list.list.indexOf(listItem);
    if(listItem!=-1){
      list.list.splice(itemIndex, 1);
    }
  });
    listFuncs.saveList();
    listFuncs.reprintList(message);
}
