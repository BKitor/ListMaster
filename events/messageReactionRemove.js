const config = require("../config.json")
module.exports = (client, messageReaction, user) => {
    cmdName = "";
    args = [];

    if (messageReaction.message.channel.name !== config.allowedChanel) return;

    //idealy it would be a mapping file, from emoji to cmd name, 
    switch (messageReaction.emoji.toString().codePointAt(0)) {
        case "❌".codePointAt(0):
            cmdName = "removeItem"
            break;
    }

    cmd = client.reaction_cmds.get(cmdName);
    if (!cmd) {
        return
    }
    cmd.run(client, messageReaction, args);
}