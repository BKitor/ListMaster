const listWrapper = require('../listFuncs').ListWrapper;

exports.run=async (client, message, args)=>{
    if (args.length <= 1){
        listWrapper.removeListItemByName(args[0], message.channel);
    }else{
        listWrapper.removeListOfItemsByName(args, message.channel);
    }
    message.delete(100)
}