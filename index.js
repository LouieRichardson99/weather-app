const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fetch = require("node-fetch");

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.post('/weather', (req, res) => {
    const API_KEY = process.env.API_KEY;

    fetchData();

    async function fetchData() {
        let location = req.body.location;

        let response = await 
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`);
        
        if (response.ok) {
            let json = await response.json();
            console.log(json.main.temp)
            res.redirect('/')
        } else {
            console.log('Error: ', response)
        }
    };
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});