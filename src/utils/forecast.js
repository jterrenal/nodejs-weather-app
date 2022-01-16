const request = require("request");
const forecast = (lat, long, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=e99aab0118bd8c4da2d20ae62540a7e0&query=${lat},${long}&units=f`;

	request({ url, json: true }, (error, res) => {
		if (error) {
			callback("No network access", undefined);
		} else if (res.body.error) {
			callback("No results. Try searching again", undefined);
		} else {
			const { temperature, feelslike, pressure } = res.body.current;
			const weatherType = res.body.current.weather_descriptions[0];
			callback(undefined, {
				temperature,
				feelslike,
				pressure,
				weatherType,
			});
			// console.log(`
			// 			Weather Forecast for today
			// 			Place Name: ${res.body.location.name}
			// 			Weather type: ${res.body.current.weather_descriptions[0]}.
			// 			Temperature: ${temperature}.
			// 			Feels like: ${feelslike} degrees
			// 			Pressure: ${pressure}`);
		}
	});
};

module.exports = forecast;
