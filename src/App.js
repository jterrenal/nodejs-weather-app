const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { query } = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public/index.html"));

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
console.log(viewsPath);

const app = express();

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); //Static Webpage

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Enter Address to continue",
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			} else {
				forecast(latitude, longitude, (error, forecastData) => {
					// const { weatherType, temperature, feelslike, pressure } = forecastData;
					if (error) {
						return console.log(error);
					}

					console.log(location);
					console.log(forecastData);
					res.send({
						location,
						longitude: longitude,
						latitude: latitude,
						forecastData,
						// temperature,
						// weatherType,
						// feelslike,
						// pressure,
						// placeName: forecastData.body.location.name,
					});
				});
			}
		}
	);
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		names: "Jeek",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		img: "img/avatar.png",
		names: "Jeeks",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "This is the help page",
		message:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ad, ipsa error modi eum dignissimos.",
		names: "Jeek",
	});
});

app.get("/help/*", (req, res) => {
	res.render("404handler", {
		message: "Help article not found",
	});
});

app.get("/about/*", (req, res) => {
	res.render("404handler", {
		message: "About article not found",
	});
});
app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}

	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get("*", (req, res) => {
	res.render("404handler", {
		message: "Page not found",
	});
});
