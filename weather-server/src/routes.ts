import {apiWeather} from "./apiWeather";
import {apiGeoLoc} from "./apiGeoLoc";
import {Database} from "./database"
import express from 'express';
import {Hourly} from "../types/hourly";
import {City} from "../types/city";

const router = express.Router();

const db = new Database();
db.connectToMongoDB()

const searchCity = async (value : string): Promise<any>  => {
    console.log('Searching city:', value);

    const city = await geoLoc.getLatLon(value);
    console.log(city);
    //await db.addCityToDB(city)
    return city
}

const weather = new apiWeather();
const geoLoc = new apiGeoLoc();



// per ottenere le citta
router.get('/search-city',async (req, res) => {
    const value  = req.query.value+""; // Accessing query parameters
    const city = await searchCity(value);
    res.json(city);
});

//region Api per prendere il meteo
router.get('/current', async (req, res) => {
    try {
        const city : City = JSON.parse(req.query.city+""); // Accessing query parameters
        await db.addCityToDB(city)
        const data = await weather.getCurrent(city?.lat, city?.long); // Fetch data using the Axios client
        await db.addCurrentToCity(city, data)
        res.json(data); // Send the data as JSON response
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/hourly', async (req, res) => {
    try {
        const num_days = req.query.num_days+"";
        const city : City = JSON.parse(req.query.city+""); // Accessing query parameters
        await db.addCityToDB(city)
        const data : Hourly | undefined = await weather.getHourly(city?.lat, city?.long, num_days); // Fetch data using the Axios client
        await db.addHourlyToCity(city, data)
        res.json(data); // Send the data as JSON response
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/daily', async (req, res) => {
    try {
        const num_days = req.query.num_days+"";
        const city : City = JSON.parse(req.query.city+""); // Accessing query parameters
        await db.addCityToDB(city)
        const data = await weather.getDaily(city?.lat, city?.long, num_days); // Fetch data using the Axios client
        await db.addDailyToCity(city, data)
        res.json(data); // Send the data as JSON response
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//endregion

//region user

router.post('/profile/addCity', async (req, res) => {
    const { city } = req.body;
    //db.addCityToFavourites(city)
})

router.post('/profile/login', async (req, res) => {
    const { city } = req.body;
    //db.addCityToFavourites(city)
})

router.post('/profile/register', async (req, res) => {
    const { city } = req.body;
    //db.addCityToFavourites(city)
})

router.post('/profile/logout', async (req, res) => {
    const { city } = req.body;
    //db.addCityToFavourites(city)
})

router.post('/profile/isauth', async (req, res) => {
    const { city } = req.body;
    //db.addCityToFavourites(city)
})







//endregion

//region Cercare la citta

// per ottenere la citta nel db cercando per nome
router.get('/db-city',async (req, res) => {
    const { value } = req.body;
    // Process the city data (e.g., query weather-frontend API)
    console.log('Searching city:', value);
    const temp = await geoLoc.getLatLon(value);
    // @ts-ignore
    let cityDb = await db.getCityFromDb(temp.name);
    console.log(cityDb);

    res.json(cityDb);
});

// per ottenere la citta nel db cercando per id
router.get('/search-id',async (req, res) => {
    const { id } = req.body;
    // Process the city data (e.g., query weather-frontend API)
    console.log('Searching city:', id);
    // @ts-ignore
    let cityDb = await db.getCityFromDbByID(id);
    console.log(cityDb);

    res.json(cityDb);
});

// per ottenere la citta nel db cercando per nome
router.get('/get-cities',async (req, res) => {

    // @ts-ignore
    let cities = await db.getAllCity();
    console.log(cities);

    res.json(cities);
});

//endregion


module.exports = router;
