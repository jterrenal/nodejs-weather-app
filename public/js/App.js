console.log("Client side Javascript is loaded!");

// fetch("http://puzzle.mead.io/puzzle")
// 	.then((res) => res.json())
// 	.then((data) => console.log(data));

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const data = document.querySelector("#data");

// const fetchData = (city) => {};

// messageOne.textContent = "From Javascript";

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const location = search.value;

	messageOne.textContent = "Fetching Data";

	fetch(`http://localhost:3000/weather?address=${location}`)
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				messageOne.textContent = data.location;
			}
			// data.textContent = data.forecast;
			// console.log(data.location);
		});
});
