const NodeGeocoder = require("node-geocoder");

module.exports = async (ctx) => {
  const direccion = ctx.message.text.substring(6).trim();

  const options = {
    provider: "google",
    apiKey: process.env.GOOGLE_API_KEY,
  };

  const geocoder = NodeGeocoder(options);

  try {
    const res = await geocoder.geocode(direccion);
    ctx.replyWithLocation(res[0].latitude, res[0].longitude);
  } catch (error) {
    ctx.reply(
      "Error. No se ha podido recuperar la posición o la dirección introducida no existe"
    );
  }
};
