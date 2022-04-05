const api = {
	key: '486a7dceff36934a00e8daaa99a9630e',
	baseUrl: 'http://api.openweathermap.org/data/2.5/'
};

const searchBox = document.getElementById('search-box');
searchBox.addEventListener('keypress', setKey);

function setKey(e) {
	if (e.keyCode == 13) {
		getResults(searchBox.value);
	}
}

function getResults(value) {
	fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${api.key}`)
		.then((res) => res.json())
		.then(displayResults);
}

function displayResults(weather) {
	if (searchBox.value == '') {
		const modalContainer = document.querySelector('.modal-container');
		modalContainer.classList.add('show-modal');

		const okeyBtn = document.querySelector('.btn-ok');
		okeyBtn.addEventListener('click', (e) => {
			e.preventDefault();
			modalContainer.classList.remove('show-modal');
		});
	} else {
		let city = document.querySelector('.location .city');
		city.innerHTML = `${weather.name}, ${weather.sys.country}`;

		let today = new Date();

		let date = document.querySelector('.location .date');
		date.innerHTML = dateBuilder(today);

		let temp = document.querySelector('.current .temp');
		temp.innerHTML = `${Math.round(weather.main.temp)}<span> °C </span>`;

		let weather_el = document.querySelector('.current .weather');
		weather_el.innerHTML = weather.weather[0].main;

		let hiLow = document.querySelector('.hi-low');
		hiLow.innerHTML = `Min ${Math.round(weather.main.temp_min)} °C / Max ${Math.round(weather.main.temp_max)} °C`;
	}
}

function dateBuilder(date) {
	let months = [
		'Ianuarie',
		'Februarie',
		'Martie',
		'Aprilie',
		'Mai',
		'Iunie',
		'Iulie',
		'August',
		'Septembrie',
		'Octombrie',
		'Noiembrie',
		'Decembrie'
	];

	let days = [ 'Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica' ];

	let day = days[date.getDay()];
	let datee = date.getDate();
	let month = months[date.getMonth()];
	let year = date.getFullYear();

	return `${day} ${datee} ${month} ${year}`;
}
