# ListMaster

Listmaster is a discord bot writen using the `discord.js` framework for tracking items in a list in it's own Channel.

After installing run:

`npm update`

To install the required packages. Next add a `config.json` file in the root of the app, and populate it with this:

```
{
	"token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	"prefix":"!",
	"allowedChanel":"grocery_list",
	"messageDeletetime":100,
	"helpText":"all commands are prefixd by ! \n!add item1 item2 ... - adds items to the list \n!remove item1 item2 ... - removes items from the list \n!clearlist - clears the list" ,
	"helpMSGDeleteTime":30000
}
```

Replace the token with your bot's discord token, and allowed channel can be set to the chanel the bot will operate in. 
