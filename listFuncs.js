//Utility library
//TODO: Rewrite all imbeded links to the json file as a global constant
const fs = require("fs");

class ListWrapper {
  //this is a singleton!!!
  constructor() {

    if ((!fs.existsSync("./list.json")) || (fs.readFileSync("./list.json").length === 0)) {
      console.log("Creating list.json")
      const fileContents = `{ "list": [], "listFlakes":[], "latestAddition": [], "doneFlake":"" }`;
      fs.writeFileSync("./list.json", fileContents)
    }

    if (!ListWrapper._instance) {
      this._list = JSON.parse(fs.readFileSync("./list.json"));
      ListWrapper.instance = this
    }
    return ListWrapper._instance
  }

  clsChat = async (textChannel) => {
    textChannel.bulkDelete(50);
  }

  moveDone = async (textChannel) => {
    if (this._list.doneFlake) {
      textChannel.fetchMessage(this._list.doneFlake)
        .then(msg => msg.delete())
        .catch((err) => console.log("no done flake"));
    }
    textChannel.send("done")
      .then(msg => this._list.doneFlake = msg.id);
  }

  printList = async (textChannel) => {
    for (var i = 0; i < this._list.list.length; i++) {
      await this.sendListItem(i, textChannel);
    }
    await this.moveDone(textChannel);
    this._saveList();
  }

  clearChat = async (textChannel) => {
    textChannel.bulkDelete(this._list.listFlakes)
      .catch((err) => console.log("bulk didn't go"));

    textChannel.bulkDelete([this._list.doneFlake])
      .catch((err) => console.log('done didn"t go'));
  }

  reprintList = async (channel) => {
    await this.clearChat(channel);
    this.printList(channel);
  }

  _saveList = async () => {
    console.log("save Called")
    fs.writeFile('./list.json', JSON.stringify(this._list), (err) => {
      if (err) console.log(err);
      else console.log("File Saved")
    });
  }

  sendListItem = async (itemIndex, textChannel) => {
    const msg = await textChannel.send((itemIndex + 1) + ". " + this._list.list[itemIndex])
    msg.react("❌").catch((err) => console.log(err));
    this._list.listFlakes[itemIndex] = msg.id;
  }

  removeItemByMessage = async (message) => {
    const itemIndex = await this._list.listFlakes.indexOf(message.id.toString())
    await this._list.listFlakes.splice(itemIndex, 1)
    await this._list.list.splice(itemIndex, 1)
    this._saveList()
    message.delete(message.id)
  }

  removeItemByIndex = async (index, textChannel) => {
    fetchedMsg = await textChannel.fetchMessage(this._list.listFlakes[index])
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

  removeListItemByName = async (name, channel) => {
    const itemIndex = await this._list.list.indexOf(name)
    channel.bulkDelete([this._list.listFlakes[itemIndex]]);
    await this._list.listFlakes.splice(itemIndex, 1);
    await this._list.list.splice(itemIndex, 1);
    this._saveList();
  }

  removeListOfItemsByName = async (nameList, channel) => {
    const itemFlakes = []

    for(var i=0; i<nameList.length; i++){
      const elementIndex = this._list.list.indexOf(nameList[i])
      if(elementIndex === -1){continue}
      await itemFlakes.push(this._list.listFlakes[elementIndex]);
      this._list.list.splice(elementIndex, 1)
      this._list.listFlakes.splice(elementIndex, 1) 
    }

    channel.bulkDelete(itemFlakes)
    this._saveList()
  }

  addListItem = async (textChannel, itemName) => {
    if (!(await this.containsItem(itemName))) {
      this._list.list.push(itemName);
      await this.sendListItem(this._list.list.length - 1, textChannel);
      await this.moveDone(textChannel);
      this._saveList();
    }
  }

  addListOfItems = async (textChannel, listOfItems) => {
    console.log(listOfItems[1])
    var cnt = 0
    for (var i = 0; i < listOfItems.length; i++) {
      if (!(await this.containsItem(listOfItems[i]))) {
        this._list.list.push(listOfItems[i]);
        cnt++
      }
    }
    for (; cnt > 0; cnt--) {
      this.sendListItem(this._list.list.length - cnt, textChannel)
    }
    this.moveDone(textChannel);
    this._saveList();
  }

  containsItem = async (string) => {
    return !(this._list.list.indexOf(string) == -1)
  }

  nukeList = async () => {
    this._list.list = [];
    this._list.listFlakes = [];
    this._list.doneFlake = "";
    this._saveList();
  }
}

const listWrapper = new ListWrapper();
Object.freeze(listWrapper);

module.exports.ListWrapper = listWrapper