# ListMaster

Listmaster is a discord bot writen using the `discord.js` framework for tracking items in a list in it's own Channel.

After installing run:

`npm update`

To install the required packages. Next add a `config.json` file in the root of the app, and populate it with this:

```
{
	"prefix":"!",
	"allowedChanel":"grocery_list",
	"messageDeletetime":100
}
```

Allowed channel can be set to the chanel the bot will operate in, prefix is the identifier for the bot, messageDeletetime is how long a message will apear for before the bot deletes it.


The bot's api token is set as an environment variable, 
DISCORD_TOKEN="***yourToken***"
