const listWrapper = require('../listFuncs').ListWrapper;
exports.run=(client, message, args)=> {
    listWrapper.clsChat(message.channel);
    listWrapper.printList(message.channel);
    message.delete(100).catch(err=>console.error(err));
}