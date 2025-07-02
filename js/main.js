const apiKey = '32802c5d33be484b96f210347250107';
const baseUrl = 'http://api.weatherapi.com/v1';

const searchCountryInput = document.getElementById('searchCountryInput');
const submitCountryBtn = document.getElementById('submitCountryBtn');
const countryForcast = document.getElementById('countryForcast');
const conditionImg = document.getElementById('conditionImg');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed')
const windDirection = document.getElementById('windDirection');
const NextDayTempH = document.getElementById('NextDayTempH');
const NextDayTempL = document.getElementById('NextDayTempL');
const NextDayCondition = document.getElementById('NextDayCondition');
const NextDayImg = document.querySelectorAll('.forecast-item-tommorrow img')[0];
const afterNextDayImg = document.querySelectorAll('.forecast-item-after-tommorrow img')[0];
const afterNextDayTempH = document.getElementById('afterNextDayTempH');

const todayHeader = document.querySelector('.forecast-item-today .card-header');
const tomorrowHeader = document.querySelector('.forecast-item-tommorrow .card-header span');
const afterTomorrowHeader = document.querySelector('.forecast-item-after-tommorrow .card-header span');
async function getWeatherConditions(country = 'Cairo') {
    try {
        let data = await fetch(`${baseUrl}/forecast.json?key=${apiKey}&q=${country}&days=3&aqi=no&alerts=no`);
        if (data.status === 200) {
            data = await data.json();
            console.log(data);
            // current day
            const current = data.current;
            const todayForecast = data.forecast.forecastday[0];
            const tomorrowForecast = data.forecast.forecastday[1];
            const afterTomorrowForecast = data.forecast.forecastday[2];
            todayHeader.children[0].innerHTML = formatDay(todayForecast.date);
            todayHeader.children[1].innerHTML = formatDate(todayForecast.date);
            countryForcast.innerHTML = data.location.name;
            countryForcast.nextElementSibling.innerHTML = `${current.temp_c} oC`;
            conditionImg.setAttribute('src',`${current.condition.icon}`);
            conditionImg.nextElementSibling.innerHTML = `${current.condition.text}`;
            humidity.innerHTML = `${current.humidity}`;
            windSpeed.innerHTML = `${current.wind_kph}`;
            windDirection.innerHTML = `${current.wind_dir}`;
            // next day
            const tomorrow = data.forecast.forecastday[1].day;
            tomorrowHeader.innerHTML = formatDay(tomorrowForecast.date);
            NextDayTempH.innerHTML = `${tomorrow.maxtemp_c} oC`;
            NextDayTempH.nextElementSibling.innerHTML = `${tomorrow.mintemp_c} oC`;
            NextDayTempH.nextElementSibling.nextElementSibling.innerHTML = tomorrow.condition.text;
            NextDayImg.setAttribute('src',tomorrow.condition.icon);
            // after next day
            const afterTomorrow = data.forecast.forecastday[2].day;
            afterTomorrowHeader.innerHTML = formatDay(afterTomorrowForecast.date);
            afterNextDayTempH.innerHTML = `${afterTomorrow.maxtemp_c} oC`;
            afterNextDayTempH.nextElementSibling.innerHTML = `${afterTomorrow.mintemp_c} oC`;
            afterNextDayTempH.nextElementSibling.nextElementSibling.innerHTML = afterTomorrow.condition.text;
            afterNextDayImg.setAttribute('src',afterTomorrow.condition.icon);
        }
        else{
            console.log(data.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}
getWeatherConditions();
searchCountryInput.addEventListener('input',function(e){
    e.preventDefault();
    getWeatherConditions(searchCountryInput.value);
});
submitCountryBtn.addEventListener('click',function(e){
    e.preventDefault();
    getWeatherConditions(searchCountryInput.value);
    console.log(searchCountryInput.value);
});
function formatDay(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' }); // e.g. Monday
}
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }); // e.g. 30 June
}
//TODO: Disply current, tommorrow, after-tomorrow dates
//TODO: Tempratures for the 3 days
//TODO: 