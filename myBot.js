//git is weird
const Discord = require("discord.js");
const fs = require('fs');
const config = require('./config.json');
const client = new Discord.Client();
const list = JSON.parse(fs.readFileSync('list.json'));

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if(message.author.bot||message.channel.name!=config.allowedChanel)return;
  message.delete(config.messageDeletetime).then(msg=>console.log(`deleted message from ${message.author.username} in ${message.channel.name}`)).catch(console.error);
  if(!message.content.startsWith(config.prefix))return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //add and item to the list
  if(command === 'add'){
    args.forEach((listItem)=>{
      list.list.push(listItem);
    });
    saveList();
    message.channel.send("okay").then(msg=>msg.delete(config.messageDeletetime));
    reprintList(message);
  }

  //clear the list
  if(command === 'clearlist'){
    list.list = [];
    saveList();
    reprintList();
  }

  //clear the chat
  if(command === 'clearposts'){
    const numElements = Number(args[0]);
    if(isNaN(numElements)){
      message.channel.send("make sure second element is a numer").then(msg=>msg.delete(config.messageDeletetime)).catch(console.error);
      return;
    };
    console.log(numElements);
    message.channel.bulkDelete(numElements+1);
  }

  if(command === 'remove'){
    args.forEach(listItem=>{
        const itemIndex = list.list.indexOf(listItem);
        if(listItem!=-1){
          list.list.splice(itemIndex, 1);
        }
    });
    saveList();
    reprintList(message);
  }

  if(command === 'reprintlist'){
    reprintList(message);
  }

  //print the list in chat
  if(command === 'printlist'){
    printList(message);
   }

  if(command === 'cls'){
    clearChat(message.channel);
   }

  if(command === 'help'||command === 'h'){
    message.channel.send(config.helpText).then(msg=>msg.delete(config.helpMSGDeleteTime))
  }

});

const clearChat= async (chan)=>{
  let msgs;
  do{
    msgs = await chan.fetchMessages({limit:50});
    chan.bulkDelete(msgs).catch(console.error);
  }while(msgs.size>=2);
  console.log("Removed Everything")
}

const printList=(msg)=>{
    list.list.forEach((listItem, index)=>{
      msg.channel.send(index+1 + ". "+listItem);
    });
}

const reprintList=async (msg)=>{
  await clearChat(msg.channel);
  printList(msg);
}

const saveList=()=>{
  fs.writeFile('list.json', JSON.stringify(list), finished);
  function finished(err){
     console.log('File saved');
   }
}

client.login(config.token);
