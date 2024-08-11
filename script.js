const container = document.querySelector('.container');
const searchB = document.querySelector('.searchBox button');
const weatherB = document.querySelector('.weatherBox');
const weatherD = document.querySelector('.weatherDetails');
const error404 = document.querySelector('.notFound');

searchB.addEventListener('click', () => {

    const APIKey = '12418639afacc38461871eee7d5ac1a5';
    const city = document.querySelector('.searchBox input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            container.style.height = '350px';
            weatherB.classList.remove('active');
            weatherD.classList.remove('active');
            error404.classList.add('active');
            return;
        }
        container.style.height = '450px';
        weatherB.classList.add('active');
        weatherD.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weatherBox img');
        const temperature = document.querySelector('.weatherBox .temperature');
        const description = document.querySelector('.weatherBox .description');
        const humidity = document.querySelector('.weatherDetails .humidity span');
        const wind = document.querySelector('.weatherDetails .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'assets/clear.png';
                break;

            case 'Rain':
                image.src = 'assets/rain.png';
                break;

            case 'Snow':
                image.src = 'assets/snow.png';
                break;

            case 'Clouds':
                image.src = 'assets/clouds.png';
                break;

            case 'Mist':
                image.src = 'assets/mist.png';
                break;

            case 'Haze':
                image.src = 'assets/haze.png';
                break;

            default:
                image.src = 'assets/sunny.png'
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });

});