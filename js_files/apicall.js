
const apikey="58fea8cbf10ad850701f9733d03122b5";
//58fea8cbf10ad850701f9733d03122b5 ==account1(ad)
//27e1a68599132aa3a4ad780f1d94183a ==account2(pr)

export const getWeather= async(lat,lon)=>{
     try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
       
        

    } catch (error) {
        console.error(error);
    }

}

export const getCityName=async(city)=>{
    try {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apikey}`;
        const response = await fetch(url);
        const result = await response.json();
        const code={
            lat: result[0].lat,
            lon:result[0].lon
        }
        return code;
        

    } catch (error) {
        console.log(error);
    }

}

export const getCityNames=async(city)=>{
    try {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=27e1a68599132aa3a4ad780f1d94183a`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
        

    } catch (error) {
        console.log(error);
    }

}

export const getAirQuality=async(lat,lon)=>{
    try {
        const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
        

    } catch (error) {
        console.error(error);
    }

}

export const get5dayForecast=async(lat,lon)=>{
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
        const response = await fetch(url);
        const result = await response.json();
        let forecast=[];
        let counter=0;
        for (let index = 0; index < result.list.length; index+=7) {
            counter++;
            if (counter>5) {
                break;
            }
            forecast.push({
                timezone:result.city.timezone,
                date: result.list[index].dt,
                temp: result.list[index].main.temp,
                weatherType: {
                    type:result.list[index].weather[0].main,
                    icon:result.list[index].weather[0].icon
                }

            });
            
        }
        return forecast;
        

    } catch (error) {
        console.error(error);
    }

}

export const getHourly=async(lat,lon)=>{
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&exclude=hourly&appid=${apikey}`;
        const response = await fetch(url);
        const result = await response.json();
        let forecast=[];
        for (let index = 0; index < 14; index++) {
            forecast.push({
                timezone:result.city.timezone,
                date: result.list[index].dt,
                temp: result.list[index].main.temp,
                weatherType: {
                    type:result.list[index].weather[0].main,
                    icon:result.list[index].weather[0].icon
                }

            });
            
        }
        return forecast;
        

    } catch (error) {
        console.error(error);
    }

}
