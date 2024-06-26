import {apiWeather} from "../src/apiWeather";
import {apiGeoLoc} from "../src/apiGeoLoc";
import {Database} from "../src/database"
import express from 'express';
import {Hourly} from "../types/hourly";
import {City} from "../types/city";
import passport from "passport";
import authRouter from "./auth";
import profileRouter from "./profile";


const router = express.Router();

const db = new Database();
db.connectToMongoDB()

const searchCity = async (value : string): Promise<any>  => {
    console.log('Searching city:', value);

    const city = await geoLoc.getLatLon(value);
    console.log(city);
    //await db.addCityToDB(city)
    // //@ts-ignore
    // city.forEach(async (cityData) => {
    //     try {
    //         await db.addCityToDB(cityData);
    //         console.log(`City "${cityData.name}" saved successfully.`);
    //     } catch (error) {
    //         console.error('Error saving city:', error);
    //     }
    // });
    return city
}

const weather = new apiWeather();
const geoLoc = new apiGeoLoc();



// per ottenere le citta
router.get('/search-city',async (req, res) => {
    const value  = req.query.value+""; // Accessing query parameters
    const cities = await searchCity(value);
    res.json(cities);
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

//region Api per lo user

router.use('/auth', authRouter)

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).send({
        message: "Succesful",
    });
});

router.use('/profile', profileRouter)

//endregion

//region Api per cercare la citta

// per ottenere il meteo di una citta cercando per citta
router.get('/get-city-weather',async (req, res) => {
    try {
        const city: City = JSON.parse(req.query.city + ""); // Accessing query parameters
        // Process the city data (e.g., query weather-frontend API)
        // @ts-ignore
        let cityDb = await db.getCityWeatherFromDb(city)
        console.log(cityDb);

        res.json(cityDb);
    }catch (error){
        console.log(error)
        throw error
    }
});

// per ottenere tutte le citta salvate
router.get('/get-cities',async (req, res) => {
    try {
        // @ts-ignore
        let cities = await db.getAllCity();
        console.log(cities);

        res.json(cities);
    }catch(error){
        console.log(error)
        throw error
    }
});

//endregion


module.exports = router;
