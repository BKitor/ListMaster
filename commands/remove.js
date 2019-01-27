const list = require("../list.json");
const listFuncs = require("../listFuncs.js");

exports.run=(client, message, args)=>{
  const tmpList = [];
  args.forEach(listItem=>{
    const itemIndex = list.list.indexOf(listItem);
    if(itemIndex!=-1){
      list.list.splice(itemIndex, 1);
      tmpList.push(listItem);
    }
  });
  if(tmpList.length != 0){
    list.latestAddition = tmpList;
    listFuncs.saveList();
    listFuncs.reprintList(message);
  }else{
    message.delete(100).catch(err=>console.error);
  }
}
