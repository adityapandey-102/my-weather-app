import { AnimatedWeatherIcon } from "animated-weather-icon"
import { getRender } from "../app";
import { showSpinner } from "./renderFunctions";


export const weatherIcon = async (weather) => {
    let icon = "Clear";
    switch (weather) {
        case "Haze": "Clear"
            break;
        case "Clouds": icon = "Cloudy"
            break;
        case "Rain": icon = "Rain"
            break;
        case "Snow": icon = "Snow"
            break;
        case "Drizzle": icon = "Sleet"
            break;
        case "Fog": icon = "Fog"
            break;
        case "Mist": icon = "Fog"
            break;
        case "Dust": icon = "Fog"
            break;
        case "Tornado": icon = "Wind"
            break;
        default: icon = "Clear"
    }

    return icon;

}

export const weatherIconImage = async (icontype, id, timeType) => {
    const renderTarget = document.getElementById(`${id}`);
    renderTarget.innerHTML = "";
    const icon = new AnimatedWeatherIcon(renderTarget);
    await icon.setType(icontype, timeType);

}



export const webLoadImages = async () => {
    weatherIconImage("Clear", "sunriseImage", "Day")
    weatherIconImage("Clear", "sunsetImage", "Night")
}

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export const getDate = (timeUnix, timezone) => {
    const code = new Date((timeUnix + timezone) * 1000);
    const day = days[code.getUTCDay()];
    const date = code.getUTCDate();
    const month = months[code.getUTCMonth()];

    return `${day}, ${date} ${month}`;

}
export const getDayNight = (rise, set, timezone) => {
    const sunrise=new Date((rise + timezone) * 1000).getUTCHours();
    const sunset=new Date((set + timezone) * 1000).getUTCHours();
    const hours = new Date().getHours()
    const isDayTime = hours > sunrise && hours < sunset;
    if (isDayTime === true) {
        return 'Day';
    } else {
        return 'Night';
    }

}

export const getDay = (timeUnix, timezone) => {
    const code = new Date((timeUnix + timezone) * 1000);
    const day = days[code.getUTCDay()];

    return `${day}`;

}

export const getShortDate = (timeUnix, timezone) => {
    const code = new Date((timeUnix + timezone) * 1000);
    const date = code.getUTCDate();
    const month = months[code.getUTCMonth()];

    return `${date} ${month}`;

}

export const getHours = (timeUnix, timezone) => {
    const code = new Date((timeUnix + timezone) * 1000);
    const hours = code.getUTCHours();
    const period = hours >= 12 ? "PM" : "AM";

    return `${hours >= 12 ? (hours - 12) : (hours === 0 ? 12 : hours)} ${period}`;


}


export const getTime = (timeUnix, timezone) => {
    const code = new Date((timeUnix + timezone) * 1000);
    const hours = code.getUTCHours();
    const minutes = code.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    return `${hours >= 12 ? (hours - 12) : (hours === 0 ? 12 : hours)}:${minutes} ${period}`;

}



export const currentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

}


const showPosition = (position) => {
    const currentLocationcode = { lat: position.coords.latitude, lon: position.coords.longitude }
    localStorage.setItem("coordinates", JSON.stringify(currentLocationcode));
    getRender(currentLocationcode);
    setTimeout(() => {
        showSpinner(false,"Kudos! We get the permission, your screen will update soon:");

    }, 4000);


}

const showError = (error) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert(`You denied request! Kindly allow permission or you can use (Current Location) button to get live weather forecast or If you have "Blocked" the permission kindly go to site setting and change the permission.`)
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}
