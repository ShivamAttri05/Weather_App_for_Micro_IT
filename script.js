document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'API_ID'; // Replace with your OpenWeather API key
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const weatherIcon = document.getElementById('weather-icon');

    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city === '') {
            alert('Please enter a city name');
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                weatherInfo.classList.remove('hidden');
                weatherInfo.classList.add('show');
                errorMessage.classList.add('hidden');

                cityName.textContent = data.name;
                temperature.textContent = `🌡 Temperature: ${data.main.temp}°C`;
                description.textContent = `☁ Description: ${data.weather[0].description}`;

                // Set weather icon
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                weatherIcon.src = iconUrl;
                weatherIcon.alt = data.weather[0].description;
            })
            .catch(error => {
                weatherInfo.classList.add('hidden');
                errorMessage.classList.remove('hidden');
                console.error('Error fetching weather data:', error);
            });
    });
})