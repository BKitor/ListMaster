//Utility library
//TODO: Rewrite all imbeded links to the json file as a global constant
const fs = require("fs");

class ListWrapper {

  //this is a singleton!!!
  constructor() {
    if (!ListWrapper._instance) {
      this._list = JSON.parse(fs.readFileSync("./list.json"));
      ListWrapper.instance = this
    }
    return ListWrapper._instance
  }

  printList = (textChannel) => {
    for (i = 0; i < this._list.list.length; i++) {
      this.sendListItem(i, textChannel)
    }
    textChannel.send("done")
      .then(msg => this._list.doneFlake = msg.id);
    this._saveList()
  }

  moveDone = (textChannel) => {
    textChannel.fetchMessage(doneFlake)
      .then(msg => msg.delete());
    textChannel.send("done")
      .then(msg => this._list.doneFlake = msg.id);
    this._saveList();
  }


  reprintList = async (msg) => {
    await clearChat(msg);
    this.printList(msg.channel);
  }


  _saveList = async () => {
    fs.writeFile('./list.json', JSON.stringify(this._list), _finished);
  }

  sendListItem = (itemIndex, textChannel) => {
    textChannel.send((itemIndex + 1) + ". " + this._list.list[itemIndex])
      .then(message => {
        message.react("❌");
        this._list.listFlakes[itemIndex] = message.id;
      });
  }

  clearChat = async (textChannel) => {
    textChannel.bulkDelete(_list.listFlakes)
      .then((msgs) => this.moveDone(textChannel));
  }

  _finished = (err) => {
    if (err) console.error(err);
    console.log('File saved');
  }

  removeItemByIndex = async (index, textChannel) => {
    textChannel.fetchMessage(this._list.listFlakes[index])
      .then(message => {
        message.delete();
        this._list.list.splice(index, index);
        this._list.listFlakes.splice(index, index);
      })
      .catch((error) => {
        console.error(error);
        console.log("But it's okay");
      });
  }

  addListItem = async (textChannel) => {

  }

  removeItemByName = () => {

  }
}

const List = ListWrapper();
Object.freeze(List);

export default List;