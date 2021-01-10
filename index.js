const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const hbs = require('express-handlebars');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.engine('hbs', hbs( {
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/'
}));


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/weather', (req, res) => {
    const API_KEY = process.env.API_KEY;

    fetchData();

    async function fetchData() {
        let location = req.body.location;
        
        try {
            let response = await
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`);
            let json = await response.json();
            res.render('index', {
                weatherMsg: true,
                location: `${json.name}, ${json.sys.country}`,
                temperature: json.main.temp + '°',
                weather: json.weather[0].main,
                weatherIcon: `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
            });
        } catch (error) {
            res.render('index', {
                errorMsg: true,
                error: "Sorry I didn't understand that. Please try again"
            });
        };
    };
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});