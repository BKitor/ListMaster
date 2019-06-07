//Utility library
const fs = require("fs");
const list = require("./list.json");

const clearChat = async (msg) => {
  let msgs;
  do {
    msgs = await msg.channel.fetchMessages({ limit: 50 });
    msg.channel.bulkDelete(msgs).catch(console.error);
  } while (msgs.size >= 2);
  console.log("cleared Chat");
}
exports.clearChat = clearChat;

const printList = (textChannel) => {
  for (i = 0; i < list.list.length; i++) {
    this.sendListItem(i, textChannel)
  }
  textChannel.send("done");
}
exports.printList = printList;

exports.reprintList = async (msg) => {
  await clearChat(msg);
  printList(msg.channel);
}

exports.saveList = async () => {
  fs.writeFile('list.json', JSON.stringify(list), finished);
}

function finished(err) {
  if (err) console.error(err);
  console.log('File saved');
}

exports.sendListItem = (itemIndex, textChannel) => {
  textChannel.send(itemIndex + 1 + ". " + list.list[itemIndex])
    .then(message => message.react("❌"));
}