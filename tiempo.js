module.exports = async (ctx) => {
  // tiempo CIUDAD
  const ciudad = ctx.message.text.substring(7).trim();

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${process.env.OWM_API_KEY}&units=metric&lang=sp`
  );
  const {
    main: { temp, temp_min, temp_max, humidity },
  } = await response.json();

  ctx.reply(`El tiempo en ${ciudad}
    
    Temperatura: ${temp} °C
    Temp. Mín.: ${temp_min} °C
    Temp. Máx.: ${temp_max} °C
    Humedad: ${humidity} %
    `);
};
