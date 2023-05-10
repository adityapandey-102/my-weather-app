import * as api from "./apicall"
import * as modules from "./modules"

export const tempratureCard = async (currentWeather) => {
    //Temprature Card ....
    mytemp.innerHTML = Math.floor(currentWeather.main.temp);
    weather.innerHTML = currentWeather.weather[0].main;
    countryCode.innerHTML = currentWeather.sys.country;
    const icon = await modules.weatherIcon(currentWeather.weather[0].main)
    const timePeriod = modules.getDayNight(currentWeather.sys.sunrise, currentWeather.sys.sunset, currentWeather.timezone)
    await modules.weatherIconImage(icon, "weatherImage", timePeriod);
    date.innerHTML = await modules.getDate(currentWeather.dt, currentWeather.timezone);
    windSpeed.innerHTML=currentWeather.wind.speed;
}

export const todaysHighlightCard = async (currentWeather, geoCode) => {
    //Todays Highlights---> Air Quality Index
    const air_quality_data = await api.getAirQuality(geoCode.lat, geoCode.lon);
    pm25.innerHTML = air_quality_data.list[0].components.pm2_5;
    so2.innerHTML = air_quality_data.list[0].components.so2;
    no2.innerHTML = air_quality_data.list[0].components.no2;
    o3.innerHTML = air_quality_data.list[0].components.o3;
    console.log(air_quality_data)
    const IndexBtnName = [
        { index: "Good", btnColour: "success" },
        { index: "Fair", btnColour: "success" },
        { index: "Moderate", btnColour: "warning" },
        { index: "Poor", btnColour: "danger" },
        { index: "Very Poor", btnColour: "danger" },]
    IndexBtn.innerHTML = IndexBtnName[Number(air_quality_data.list[0].main.aqi) - 1].index;
    IndexBtn.classList.add(`btn-outline-${IndexBtnName[Number(air_quality_data.list[0].main.aqi) - 1].btnColour}`)

    //Todays Highlights---> Sunrise & Sunset
    sunrise.innerHTML = await modules.getTime(currentWeather.sys.sunrise, currentWeather.timezone);
    sunset.innerHTML = await modules.getTime(currentWeather.sys.sunset, currentWeather.timezone);
    modules.webLoadImages();

    //Todays Highlights---> Lower Row
    pressure.innerHTML = currentWeather.main.pressure;
    humidity.innerHTML = currentWeather.main.humidity;
    feels_like.innerHTML = `${Math.floor(Number(currentWeather.main.feels_like))}`;
    const visibility_km = (data) => {
        let km = data / 1000;
        return `${km}`;
    };
    const visibility = visibility_km(Number(currentWeather.visibility));
    document.getElementById("visibility").innerText = visibility;
}

export const forecast = async (forecast) => {
    forecastCard.innerHTML = "";
    forecast.forEach(element => {
        const forecastLi = document.createElement("li");
        forecastLi.classList.add("tempLiItem");
        let date = modules.getShortDate(element.date, element.timezone);
        let day = modules.getDay(element.date, element.timezone);
        forecastLi.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${element.weatherType.icon}.png" alt="img" style="height: 40px;width:40px;align-items: center;">
        <h2 class="ms-3 d-inline">${Math.floor(element.temp)}</h2>
        <strong><sup><span style="font-size: 20px;">&deg;c</sup></span></strong>
        <p class="d-inline mx-2">${date}</p>
        <p class="d-inline mx-2">${day}</p>`;
        document.getElementById("forecastCard").appendChild(forecastLi);

    });
}

export const toadaysAt = async (forecast) => {
    todaysAtCard.innerHTML = "";
    forecast.forEach(element => {
        const TodaysAtLi = document.createElement("div");
        let classlist = ["tempLiItem2", "rounded-3", "col", "my-2", "mx-3"]
        classlist.forEach((element) => {
            TodaysAtLi.classList.add(element);
        }
        )
        TodaysAtLi.style = "border: 1px solid white;max-width: 150px;";
        let hours = modules.getHours(element.date, element.timezone);
        TodaysAtLi.innerHTML = `
      <div class="container" style="align-items: center;">
        <div class="my-2" style="text-align: center;">${hours}</div>
        <div class="my-2" style="align-items: center;"><img src="https://openweathermap.org/img/wn/${element.weatherType.icon}.png"
            style="height: 40px;width:50px;align-items: center;" alt="image"></div>
            <div>
            <h3 class="mb-4 d-inline">${Math.floor(element.temp)}</h3>
            <strong class="mb-3"><sup><span style="font-size: 20px;">&deg;c</sup></span></strong></div>
            </div>`;
        document.getElementById("todaysAtCard").appendChild(TodaysAtLi);

    });
}

export const showSpinner = (value,message) => {
    const Spinner = document.querySelector("#SpinnerBox");
    const DataBox = document.querySelector("#dataBox");
    if (value) {
        Message.innerHTML=message
        Spinner.style.display = "block";
        DataBox.style.display = "none";
    }
    else {
        Spinner.style.display = "none";
        DataBox.style.display = "block";
    }

}
