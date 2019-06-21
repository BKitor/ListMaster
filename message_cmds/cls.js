const listWrapper = require('../listFuncs').ListWrapper;
exports.run=(client, message, agrs)=>{
    listWrapper.clsChat(message.channel);
}