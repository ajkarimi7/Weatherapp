window.addEventListener("load", () => {
    let lon;
    let lat;
    let tempratureDescription = document.querySelector(".temperature-description");
    let tempratureDegree = document.querySelector(".temperature-degree");
    let locationArea = document.querySelector(".location-area");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b6c5d884130600e5720e1637e5c9c19e&units=imperial`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                const {temp} = data.main;
                const {description} = data.weather[0];
                const {icon} = data.weather[0];
                

                //Set DOM elements from the API
                tempratureDegree.textContent = temp;
                tempratureDescription.textContent = description;
                locationArea.textContent = data.name;
                
                // Formula for Celsius
                let celsius = (temp - 32) * (5 / 9);

                // Set Icon
                setIcons(icon, document.querySelector(".icon"));

                //Change temperature to C/F
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        tempratureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        tempratureDegree.textContent = temp;
                    }
                })

                
            });
        });
    } 
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});