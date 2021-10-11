document.querySelector(".search").addEventListener("submit", async (event) => {
    event.preventDefault();

    let input = document.querySelector("#search_input").value;

    if(input != "") {
        clearInfo();
        showWarning("Carregando...");

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d7333fdd605694fb753d04609851a5e4&units=metric&lang=pt_br`;

        let result = await fetch(url);
        let json = await result.json();
        
        if(json.cod == 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                thermalSensation: json.main.feels_like,
                weatherIcon: json.weather[0].icon,
                weather: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning("Não encontramos esta localização");
        }
    }
});

function showInfo(json) {
    showWarning("");

    document.querySelector(".title").innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(".temp_info").innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector(".wind_info").innerHTML = `${json.windSpeed} <span>Km/h</span>`;

    document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${json.weatherIcon}@2x.png`);
    document.querySelector(".wind_point").style.transform = `rotate(${json.windAngle - 90}deg)`;
    document.querySelector(".weather").innerHTML = json.weather;
    document.querySelector(".thermal_sensation_info").innerHTML = `${json.thermalSensation} <sup>ºC</sup>`;

    document.querySelector(".result").style.display = "block";
}

function clearInfo() {
    showWarning("");
    document.querySelector(".result").style.display = "none";
}

function showWarning(warning) {
    document.querySelector(".warning").innerHTML = warning;
}