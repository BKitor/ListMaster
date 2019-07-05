exports.run = (client, message, args)=>{
  message.channel.send("Pong!")
  .then((msg)=>msg.delete(100));
  message.delete(100).catch(err=>console.error);
}
