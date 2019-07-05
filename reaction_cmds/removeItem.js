const listWrapper = require("../listFuncs").ListWrapper;
exports.run=(client, messageReaction, args)=>{
    listWrapper.removeItemByMessage(messageReaction.message)
}