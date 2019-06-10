exports.run=async(client, message, args)=>{
  await message.delete().catch(err=>console.error);
  process.exit(0);
}
