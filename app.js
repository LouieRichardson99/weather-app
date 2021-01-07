let locationInput = document.getElementById('location-input'),
    apiKey = '2a4a351361d2545eb9d07ee37c7a0085';

const storeLocation = () => {
    let location = locationInput.value;
    fetchData(location);
};

async function fetchData(location) {
    let response = await 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    
    if (response.ok) {
        let json = await response.json();
        console.log(json)
    } else {
        console.log('Error: ', response.status)
    }
};
