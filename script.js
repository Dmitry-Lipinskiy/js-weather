const API_KEY = "1c99c168e5f32cae7dc01015c0038525";
const API_URL = "https://api.openweathermap.org";
const inputSearch = document.querySelector(".search");
const btnSearch = document.querySelector(".btn-search");
const btnToday = document.querySelector(".btn-today");
const btnFiveDays = document.querySelector(".btn-fiveDays");
const containerContent = document.querySelector(".container-content");
const containerForecast = document.querySelector(".container-forecast");
const containerHourly = document.querySelector(".container-hourly");
const errorContainer = document.querySelector(".error-container");

let lang = "en";

function getCityName() {
    return inputSearch.value;
}

function getWeatherToday() {
    return fetch(`${API_URL}/data/2.5/weather?q=${getCityName()}&limit=1&appid=${API_KEY}&units=metric&lang=${lang}`)
        .then((response) => response.json())
        // .then((data) => {
        //     console.log(data);
        // });
}

// ==================================================================

inputSearch.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {

        // code for enter
        containerForecast.innerHTML = "";
        containerHourly.innerHTML = "";

        btnToday.classList.remove("today-class");
        btnFiveDays.classList.remove("fiveDays-class");

        getWeatherToday()
            .then((data) => {
                // console.log(data);
                showWeatherToday(data)
            })
            .catch((error) => {
                showError();
            })

        // ============================================================== 

        btnFiveDays.addEventListener("click", function() {
            containerContent.innerHTML = "";
            containerHourly.innerHTML = "";

            btnFiveDays.classList.add("fiveDays-class");
            btnToday.classList.remove("today-class");

            getWeatherForecastDays()
                .then((data) => {
                    // console.log(data);
                    getSortedForecastDays(data.list);
                    weatherForDay(data.list);
                    // console.log(data.list);
                });
        });

        // ================================================================

        btnToday.addEventListener("click", function() {
            containerForecast.innerHTML = "";
            containerHourly.innerHTML = "";

            btnToday.classList.add("today-class");
            btnFiveDays.classList.remove("fiveDays-class");

            getWeatherToday()
                .then((data) => {
                    // console.log(data);
                    showWeatherToday(data)
                });
        });
    }
});

// ==================================================================

btnSearch.addEventListener("click", function() {
    containerForecast.innerHTML = "";
    containerHourly.innerHTML = "";

    btnToday.classList.remove("today-class");
    btnFiveDays.classList.remove("fiveDays-class");

    getWeatherToday()
        .then((data) => {
            // console.log(data);
            showWeatherToday(data)
        })
        .catch((error) => {
            showError();
        })

    // ============================================================== 

    btnFiveDays.addEventListener("click", function() {
        containerContent.innerHTML = "";
        containerHourly.innerHTML = "";

        btnFiveDays.classList.add("fiveDays-class");
        btnToday.classList.remove("today-class");

        getWeatherForecastDays()
            .then((data) => {
                // console.log(data);
                getSortedForecastDays(data.list);
                weatherForDay(data.list);
                // console.log(data.list);
            });
    });

    // ================================================================

    btnToday.addEventListener("click", function() {
        containerForecast.innerHTML = "";
        containerHourly.innerHTML = "";

        btnToday.classList.add("today-class");
        btnFiveDays.classList.remove("fiveDays-class");

        getWeatherToday()
            .then((data) => {
                // console.log(data);
                showWeatherToday(data)
            });
    });

});


function showWeatherToday(data) {
    let date = data.dt;
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;

    let weatherToday = "";
    weatherToday = `
        <div class="content-block">
            <div class="content-header">
                <div class="header-name">CURRENT WEATHER</div>
                <div class="header-city-name">${data.name}</div>
                <div class="header-date">${todayDate(date)}</div>
            </div>
            <div class="content-info">
                <div class="info-weather">
                    <div class="info-weather-image">
                        <img class="img-weather" src="${getWeatherIcon(data.weather[0].icon)}" alt="">
                    </div>
                    <div class="info-weather-text">${data.weather[0].description}</div>
                </div>
                <div class="info-temperature">
                    <div class="info-temperature-header">${Math.round(data.main.temp)}<sup>o</sup>C</div>
                    <div class="info-temperature-text">Real Feel ${Math.round(data.main.feels_like)}<sup>o</sup></div>
                </div>
                <div class="info-day-hours">
                    <table>
                        <tr>
                            <td>Sunrise:</td>
                            <td>${todaySunrise(sunrise)}</td>
                        </tr>
                        <tr>
                            <td>Sunset:</td>
                            <td>${todaySunset(sunset)}</td>
                        </tr>
                        <tr>
                            <td>Duration:</td>
                            <td>${todayDuration(sunset, sunrise)} hr</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `
    containerContent.innerHTML = weatherToday;
}

function getWeatherIcon(data) {
    let iconId = data;
    let iconUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    return iconUrl;
}

function todayDate(date) {
    let day = new Date(date * 1000).getDate();
    if (day < 10) {
        day = "0" + day;
    }

    let month = new Date(date * 1000).getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }

    let year = new Date(date * 1000).getFullYear();

    return day + "." + month + "." + year;
}

function todaySunrise(sunrise) {
    let hoursSunrise = new Date(sunrise * 1000).getHours();
    if (hoursSunrise < 10) {
        hoursSunrise = "0" + hoursSunrise;
    }

    let minutesSunrise = new Date(sunrise * 1000).getMinutes();
    if (minutesSunrise < 10) {
        minutesSunrise = "0" + minutesSunrise;
    }

    return hoursSunrise + ":" + minutesSunrise;
}

function todaySunset(sunset) {
    let hoursSunset = new Date(sunset * 1000).getHours();
    if (hoursSunset < 10) {
        hoursSunset = "0" + hoursSunset;
    }

    let minutesSunset = new Date(sunset * 1000).getMinutes();
    if (minutesSunset < 10) {
        minutesSunset = "0" + minutesSunset;
    }

    return hoursSunset + ":" + minutesSunset;
}

function todayDuration(sunset, sunrise) {
    let hoursDuration = Math.trunc((sunset - sunrise) / 3600);

    let minutesDuration = Math.round((((sunset - sunrise) / 3600) - hoursDuration) * 60);
    if (minutesDuration < 10) {
        minutesDuration = "0" + minutesDuration;
    }

    return hoursDuration + ":" + minutesDuration;
}

// ===========================================================================================

function getWeatherForecastDays() {
    return fetch(`${API_URL}/data/2.5/forecast?q=${getCityName()}&appid=${API_KEY}&units=metric&lang=${lang}`)
        .then((response) => response.json())
}


function getSortedForecastDays(data) {
    let fiveDays = [];
    fiveDays.push(data[0]);

    for (let i = 1; i < data.length; i++) {
        if (data[i].dt_txt.includes("15:00:00") && data[0].dt_txt.split(" ")[0] !== data[i].dt_txt.split(" ")[0]) {
            fiveDays.push(data[i]);
        }
    }

    if (fiveDays.length > 5) {
        fiveDays.shift();
    }

    // console.log(fiveDays);
    showWeatherForecastDays(fiveDays);
}

function showWeatherForecastDays(fiveDays) {
    let weatherFiveDays = "";
    weatherFiveDays += `<div class="container-forecast-five">`;

    for (let day of fiveDays) {
        weatherFiveDays += `
            <div class="forecast-block" data-date="${day.dt_txt.split(" ")[0]}">
                <div class="forecast-week-day">${dayOfWeek(day.dt)}</div>
                <div class="forecast-date">${dayOfMonth(day.dt)}</div>
                <div class="forecast-image"><img src="${getWeatherIcon(day.weather[0].icon)}" alt=""></div>
                <div class="forecast-temperature">${Math.round(day.main.temp)}<sup>o</sup>C</div>
                <div class="forecast-description">${day.weather[0].description}</div>
            </div>
        `;
    }

    weatherFiveDays += `</div>`;

    containerForecast.innerHTML = weatherFiveDays;
}

function dayOfWeek(day) {
    let daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    let numDay = new Date(day * 1000).getDay();
    return daysOfWeek[numDay];
}

function dayOfMonth(day) {
    let daysOfMonth = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let numMonth = new Date(day * 1000).getMonth();
    let numberDay = new Date(day * 1000).getDate();
    if (numberDay < 10) {
        numberDay = "0" + numberDay;
    }
    return daysOfMonth[numMonth] + " " + numberDay;
}

//=================================================================================


function weatherForDay(data) {
    // console.log(data);
    let daysBlock = document.querySelectorAll(".forecast-block");
    for (let day of daysBlock) {
        day.addEventListener("click", function() {
            let timeDay = [];

            for (let time of data) {
                if (this.dataset.date === time.dt_txt.split(" ")[0]) {
                    timeDay.push(time);
                }
            }
            // console.log(timeDay);
            showWeatherTimeDay(timeDay);
        });
    }
}

function showWeatherTimeDay(timeDay) {
    let weatherTimeDay = "";
    weatherTimeDay += `
        <div class="hourly-day-modal">
            <div class="hourly-day">
                <div class="hourly-day-name">
                    <div class="hourly-day-header">HOURLY</div>
                    <div><button class="button-close">&times;</button></div>
                </div>
                <div class="hourly-day-content">
                    <div class="day-content-name">
                        <div class="day-name">${dayOfWeek(timeDay[0].dt)}</div>
                        <div class="zero-block">
                            <img src="${getWeatherIcon(timeDay[0].weather[0].icon)}" alt="">
                        </div>
                        <div class="hourly-forecast">Forecast</div>
                        <div class="hourly-temp">Temp (<sup>o</sup>C)</div>
                        <div class="hourly-real-feel">RealFeel</div>
                        <div class="hourly-wind">Wind (km/h)</div>
                    </div>
    `;

    for (let time of timeDay) {
        weatherTimeDay += `
                    <div class="day-content-info">
                        <div class="info-time">${timeOfDay(time.dt_txt)}</div>
                        <div class="info-image"><img src="${getWeatherIcon(time.weather[0].icon)}" alt=""></div>
                        <div class="info-forecast">${time.weather[0].description}</div>
                        <div class="info-temp">${Math.round(time.main.temp)}<sup>o</sup></div>
                        <div class="info-real-feel">${Math.round(time.main.feels_like)}<sup>o</sup></div>
                        <div class="info-wind">${windSpeed(time.wind.speed)}</div>
                    </div>
        `;
    }

    weatherTimeDay += `
                    </div>
                </div>
            </div>
        </div>
    `;
    containerHourly.innerHTML = weatherTimeDay;

    let buttonClose = document.querySelector(".button-close");
    buttonClose.addEventListener("click", function() {
        containerHourly.innerHTML = "";
    })
}

function timeOfDay(day) {
    return day.slice(11, 16);
}

function windSpeed(speed) {
    return Math.round((speed * 3600) / 1000);
}

function showError() {
    let errorMessage = "";
    errorMessage = `
        <div class="error-block">
            <div class="error-message">
                <div><button class="error-button">&times;</button></div>
                <div class="error-header">404</div>
                <div class="error-text">City not found</div>
            </div>
        </div>
    `;
    errorContainer.innerHTML = errorMessage;

    let errorButton = document.querySelector(".error-button");
    errorButton.addEventListener("click", function() {
        errorContainer.innerHTML = "";
    })
}