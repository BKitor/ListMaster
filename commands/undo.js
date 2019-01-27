const config=require("../config.json");
const listFuncs=require("../listFuncs.js");
const list=require("../list.json");
const remove=require("./remove.js");
const add=require("./add.js");
exports.run=(client, message, args)=>{
  if(list.list.indexOf(list.latestAddition[0])===-1){
    add.run(client, message, list.latestAddition);
  }else{
    remove.run(client, message, list.latestAddition);
  }
}
