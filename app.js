let locationInput = document.getElementById('location-input'),
    locationSpan = document.getElementById('location'),
    tempSpan = document.getElementById('temperature');

const API_KEY = process.env.API_KEY;

const storeLocation = () => {
    let location = locationInput.value;
    fetchData(location);
};

async function fetchData(location) {
    let response = await 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    
    if (response.ok) {
        let json = await response.json();
        console.log(json.main.temp)
    } else {
        console.log('Error: ', response.status)
    }
};
