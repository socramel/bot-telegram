module.exports = async (ctx) => {
  console.log(ctx.message);
  await ctx.reply("Hola Mundo Bot!");
  await ctx.replyWithDice();
};
