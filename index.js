import * as api from "./js_files/apicall"
import * as modules from "./js_files/modules"
import * as render from "./js_files/renderFunctions"

export const getRender = async (cityCode) => {
  const geoCode = cityCode;
  const currentWeather = await api.getWeather(geoCode.lat, geoCode.lon)

  let setcityName = document.querySelectorAll(".cityName");
  setcityName.forEach((element) => {
    element.innerHTML = currentWeather.name;
  })

  render.tempratureCard(currentWeather);
  render.todaysHighlightCard(currentWeather, geoCode);

  const forecastdata = await api.get5dayForecast(geoCode.lat, geoCode.lon)   //5 Days ForeCast data
  render.forecast(forecastdata)
  render.toadaysAt(await api.getHourly(geoCode.lat, geoCode.lon));

}

const currentLocationOps = async () => {

  await modules.currentLocation();
  setTimeout(() => {
    if (!JSON.parse(localStorage.getItem("coordinates"))) {
      getRender({ lon: 77.2219, lat: 28.6517 })
      setTimeout(() => {
        render.showSpinner(false,"Ops! Seems like you didn't given the location permission");
      }, 4000);
      // alert("Timeout for geoloaction, we are providing dummy location utill you allow for location permission")
    }
  }, 10000)


}


if (!localStorage.getItem("coordinates")) {
  render.showSpinner(true,"Kindly Allow the location permission:");
  currentLocationOps();
}
else if (localStorage.getItem("coordinates")) {
  getRender(JSON.parse(localStorage.getItem("coordinates")));
}
else {
  getRender({ lon: 77.2219, lat: 28.6517 });
}


submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const geoCode = await api.getCityName(city.value);
  getRender(geoCode);
})



//Current Location button funtionality
const handleCurrLocBtn = () => {
  currentLocationOps();
}

currentLocationbtn.addEventListener("click", handleCurrLocBtn)
//....>>>>>>

//Search Suggestion box functions----
const searchBoxSuggestion = (city) => {   //This is search suggestion box li item creater.
  try {
    searchUl.innerHTML = "";
    city.forEach(element => {
      const SearchLi = document.createElement("li");
      SearchLi.classList.add("cityLiItem");
      SearchLi.innerHTML = `
    <img src="/images/icons8-location-50.png" alt="ig" style="height : 20px; width:20px; display:inline-block;">
    <div style="display:inline-block">
    <p class="licityName" style="font-size:18px; margin-bottom:0px;">${element.name}</p>
    <p style="font-size:14px; margin-bottom:0px;">${element.state} ${element.country}</p>
    <span class="lat" style="display:none;">${element.lat}</span>
    <span class="lon" style="display:none;">${element.lon}</span>
    </div>
    <hr>
    `
      document.getElementById("searchUl").appendChild(SearchLi);
      // SearchLi.addEventListener("click",handleClick(this))

    });
  } catch (error) {
    console.log(error);
  }
}

const searchSuggestionFunctions = () => {
  const list = document.querySelectorAll(".cityLiItem");
  list.forEach((listItem) => {
    listItem.addEventListener("click", () => {
      const geoCode = {
        lon: listItem.querySelector(".lon").innerText,
        lat: listItem.querySelector(".lat").innerText
      }
      city.value = listItem.querySelector(".licityName").innerText;
      getRender(geoCode)
      city.value = "";
      searchUl.innerHTML = ""
      document.getElementById("searchBox").style.display = "none";

    })

  })
}

city.addEventListener("keyup", async () => {
  if (city.value !== "") {
    searchBoxSuggestion(await api.getCityNames(city.value))
    document.getElementById("searchBox").style.display = "block";
    searchSuggestionFunctions();
  }

})

function clickSearchBox() {

  //Handles search suggestion box to make it display
  if (city.value !== ""){
    document.getElementById("searchBox").style.display = "block";
  }
}
function onleaveSearchBox() {

  //Closes the suggestion box after mouse leaves
  document.getElementById("searchBox").style.display = "none";
}

city.addEventListener("click", clickSearchBox);
onleave.addEventListener("mouseleave", onleaveSearchBox)

//....>>>>>>



