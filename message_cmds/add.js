const listFuncs = require("../listFuncs.js");

exports.run = (client, message, args) => {
  const tmpList = [];
  args.forEach(listItem => {
    if (list.list.indexOf(listItem) == -1) {
      list.list.push(listItem);
      tmpList.push(listItem);
    }
  });
  console.log(tmpList);
  if (tmpList.length != 0) {
    list.latestAddition = tmpList;
    listFuncs.saveList();
    for (i = tmpList.length; i > 0; i--) {
      listFuncs.sendListItem(list.list.length - i, message.channel)
    }
  }
  message.delete(100).catch(err => console.error);
}
