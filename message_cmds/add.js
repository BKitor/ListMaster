const listWrapper = require("../listFuncs.js").ListWrapper;

exports.run = async (client, message, args) => {
  console.log(args)
  console.log(args.length)
  if (args.length <= 1) {
    listWrapper.addListItem(message.channel, args[0])
  } else {
    listWrapper.addListOfItems(message.channel, args)
  }
  message.delete(100)
}
