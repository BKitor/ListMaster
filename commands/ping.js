exports.run = (client, message, args)=>{
  message.channel.send("Pong!").catch(console.error);
  message.delete(100).catch(err=>console.error);
}
