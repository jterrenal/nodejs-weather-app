const request = require("request");

const geoCode = (address, callback) => {
	const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiZm91cmdyYW1tZXJzIiwiYSI6ImNreTBwczY3aTAzZDYyb2xkZXo0dHMyNmUifQ.C2kQnrcHY5VPSbYJkWSF3A&limit=1`;

	request({ url: geoURL, json: true }, (error, res) => {
		if (error) {
			callback("Unable to connect to location services", undefined);
		} else if (res.body.features.length === 0) {
			callback("Unable to find location. Try another search", undefined);
		} else {
			callback(undefined, {
				longitude: res.body.features[0].center[0],
				latitude: res.body.features[0].center[1],
				location: res.body.features[0].place_name,
			});
		}
	});
};

module.exports = geoCode;
