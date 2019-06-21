const listWrapper = require("../listFuncs.js").ListWrapper;

exports.run = async (client, message, args) => {
  args.forEach(listItem => {
    listWrapper.addListItem(message.channel, listItem)
    .then(console.log(`Added ${listItem}`));
  });
  message.delete(100)
}
