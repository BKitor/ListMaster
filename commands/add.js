const list = require("../list.json");
const listFuncs = require("../listFuncs.js");

exports.run=(client, message, args)=>{
  const tmpList=[];
  args.forEach(listItem=>{
    if(list.list.indexOf(listItem)==-1){
      list.list.push(listItem);
      tmpList.push(listItem);
    }
  });
  console.log(tmpList);
    if(tmpList.length!=0){
      list.latestAddition = tmpList;
      listFuncs.saveList();
      listFuncs.reprintList(message);
    }else{
      message.delete(100).catch(err=>console.error);
    }
}
