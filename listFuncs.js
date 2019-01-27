const fs = require("fs");
const list = require("./list.json");


const clearChat = async (msg)=>{
    let msgs;
    do{
      msgs = await msg.channel.fetchMessages({limit:50});
      msg.channel.bulkDelete(msgs).catch(console.error);
    }while(msgs.size>=2);
    console.log("cleared Chat");
}
exports.clearChat=clearChat;

const printList=(msg)=>{
    list.list.forEach((listItem, index)=>{
      msg.channel.send(index+1+". "+listItem);
    });
}
exports.printList=printList;

exports.reprintList=async (msg)=>{
  await clearChat(msg);
  printList(msg);
}

exports.saveList=()=>{
  fs.writeFile('list.json', JSON.stringify(list), finished);
  function finished(err){
    console.log('File saved');
  }
}
