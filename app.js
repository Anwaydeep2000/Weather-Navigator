let weather = {
    apikey: "*********",
    fetchweather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city + "&units=metric&appid="
            + this.apikey)
            .then((response) => {
                if (!response.ok) {
                  alert("Weather not found!");
                  throw new Error("Weather not found!");
                }
                return response.json();
              })
              .then((data) => this.showweather(data));
    },
    showweather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search:
        function () {
            this.fetchweather(document.querySelector(".search_bar").value);
        }
};

document.querySelector(".search button")
    .addEventListener("click", function () {
        weather.search();
    });

document.querySelector(".search_bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
weather.fetchweather("Bengaluru")
