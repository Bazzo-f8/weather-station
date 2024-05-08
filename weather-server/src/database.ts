import mongoose from 'mongoose';
import {City} from "../types/city";
import {CityModel} from "../entity/CityModel";
import {Hourly} from "../types/hourly";
import {Daily} from "../types/daily";
import {Current} from "../types/current";
import {FavouriteModel} from "../entity/favouriteModel";

export class Database {

    //region Start and Connect to db
    private uri : string = 'mongodb://admin:admin@mongodb:27017';
    //private uri : string = 'mongodb://admin:admin@localhost:27017';


    // Metodo di connessione al DB
    public connectToMongoDB = async () => {
        try {
            await mongoose.connect(this.uri);
            console.log('Connected to the MongoDB api-weather-frontend');
        } catch (error) {
            console.error('Error connecting to the MongoDB data-sender-docker:', error);
        }
    }

    // Metodo per chiudere la connessione al DB
    public closeConnection = async () => {
        mongoose.connection.close()
            .then(() => {
                console.log('Mongoose connection closed successfully');
            })
            .catch((error) => {
                console.error('Error closing Mongoose connection:', error);
            });
    }

    //endregion

    ////////////////////////////

    //region add City / Weather to db
    // Metodo per aggiungere una città al db
    public async addCityToDB(city: City | undefined): Promise<void> {
        try {
            if(typeof city === 'undefined') { return }
            const cityExists = await CityModel.exists({ name: city.name });

            if (!cityExists) {
                const newCity = new CityModel({
                    name: city.name,
                    lat: city.lat,
                    long: city.long,
                    timezone: city.timezone,
                    country: city.country,
                });
                await newCity.save();
                console.log(`City "${city.name}" added successfully!`);
            } else {
                console.log(`City "${city.name}" already exists. Skipping addition.`);
            }
        } catch (error) {
            console.error('Error adding city:', error);
        }
    }

    // Metodo per aggiungere il meteo attuale ad una determinata città
    public async addCurrentToCity(city: City | undefined, weather : Current | undefined): Promise<void> {
        if (typeof city === 'undefined') {
            return; // If city is undefined, return early
        }

        try {
            // Use Mongoose's findOneAndUpdate method to find the city by name
            // and update the current array field by pushing the weather-frontend object
            await CityModel.findOneAndUpdate(
                { name: city.name }, // Find the city by name
                { $push: { weatherCurrent: weather } }, // Push the weather-frontend object to the current array
                { new: true } // Return the updated document
            );

            console.log('Current weather-frontend added to city successfully.');
        } catch (error) {
            console.error('Error adding current weather-frontend to city:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    // Metodo per aggiungere il meteo ad ore ad una determinata città
    public async addHourlyToCity(city: City | undefined, weather : Hourly | undefined): Promise<void> {
        if (typeof city === 'undefined') {
            return;
        }
        try {
            await CityModel.findOneAndUpdate(
                { name: city.name },
                { $push: { weatherHourly: weather } },
                { new: true }
            );
            console.log('Hourly weather-frontend added to city successfully.');
        } catch (error) {
            console.error('Error adding hourly weather-frontend to city:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    // Metodo per aggiungere il meteo di N giorni ad una determinata città
    public async addDailyToCity(city: City | undefined, weather : Daily | undefined): Promise<void> {
        if (typeof city === 'undefined') {
            return;
        }

        try {
            await CityModel.findOneAndUpdate(
                { name: city.name },
                { $push: { weatherDaily: weather } },
                { new: true }
            );

            console.log('Daily weather-frontend added to city successfully.');
        } catch (error) {
            console.error('Error adding daily weather-frontend to city:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    // Metodo per ottenere tutte le città salvate senza il meteo
    public async getAllCity() {

        try {
            // Use the find method to get all cities
            const cities = await CityModel.find({}).select('-weatherCurrent -weatherHourly -weatherDaily');

            // Log the cities to the console or do further processing
            console.log('All cities:', cities);

            // Return the list of cities if needed
            return cities;
        } catch (error) {
            console.error('Error getting all cities:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }
    //endregion

    ////////////////////////////

    //region user

    public async getUserByUsername(user : string) {
        try {
            // Use the find method to get all cities
            const userProfile = await CityModel.find({username: user}).select('-password');

            console.log('User profile:', userProfile);
            return userProfile;
        } catch (error) {
            console.error('Error getting all cities:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    public async addUserToFavourite(user : string) {
        try {
            const userProfile = await this.getUserByUsername(user)
            const newFavouriteUser = new FavouriteModel({
                //@ts-ignore
                user_id: userProfile._id,
                favourite: [],
            });
            await newFavouriteUser.save();
            console.log(`User "${user}" added successfully to favorite!`);
        } catch (error) {
            console.error('Error adding user to favourite:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    //endregion

    ////////////////////////////

    //region favourites

    public async addFavourite(user : string, city : City | undefined) {
        try {
            const cityFound = await this.getCityFromDb(city)

            await FavouriteModel.findOneAndUpdate(
                { username: user },
                        // @ts-ignore
                { $push: { favourite: cityFound._id } },
                { new: true }
            );

            console.log(`City added to favourite of ${user} successfully.`);
        } catch (error) {
            console.error('Error adding favourite to user:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    public async removeFavourite(user: string, city : City | undefined) {
        try {
            const cityFound = await this.getCityFromDb(city)
            await FavouriteModel.findOneAndUpdate(
                { username: user },
                // @ts-ignore
                { $pull: { favourite: cityFound._id } },
                { new: true }
            );

            console.log(`City removed from favourites of ${user} successfully.`);
        } catch (error) {
            console.error('Error removing favourite from user:', error);
            throw error;
        }
    }

    public async clearFavourites(user: string) {
        try {
            await FavouriteModel.findOneAndUpdate(
                { username: user },
                { $set: { favourite: [] } },
                { new: true }
            );

            console.log(`All favourites cleared for user ${user}.`);
        } catch (error) {
            console.error('Error clearing favourites for user:', error);
            throw error;
        }
    }

    public async getFavourites(user: string) {
        try {
            const favourites = await FavouriteModel.findOne({ username: user }).populate('favourite').exec();

            if (!favourites) {
                console.log(`No favourites found for user ${user}.`);
                return [];
            }
            //@ts-ignore
            return favourites.favourite;
        } catch (error) {
            console.error('Error getting favourites for user:', error);
            throw error;
        }
    }


    //endregion

    ////////////////////////////

    //region searchCity

    // Metodo per recuperare una determinata citta tramite il nome
    public async getCityWeatherFromDb(cityToFind: City | undefined) {
        try {
            // @ts-ignore
            const city = await CityModel.findOne({ name: cityToFind.name, namecountry: cityToFind.namecountry, region: cityToFind.region }).select('-weatherCurrent -weatherHourly -weatherDaily').exec();

            if (city) {
                console.log('City found in the database');
                return city; // Return the found city
            } else {
                console.log('City not found in the database.');
                return null; // Return null if city is not found
            }
        } catch (error) {
            console.error('Error fetching city from the database:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    // Metodo per ottenere una citta per citta
    public async getCityFromDb(cityToFind: City | undefined) {
        try {
            // @ts-ignore
            const city = await CityModel.findOne({ name: cityToFind.name, namecountry: cityToFind.namecountry, region: cityToFind.region }).exec();

            if (city) {
                console.log('City found in the database');
                return city; // Return the found city
            } else {
                console.log('City not found in the database.');
                return null; // Return null if city is not found
            }
        } catch (error) {
            console.error('Error fetching city from the database:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    // Metodo per recuperare una determinata citta tramite l'id
    public async getCityFromDbByID(id: string | undefined) {
        try {
            // Use Mongoose's findOne method to search for a city by name
            const city = await CityModel.findOne({ _id: id }).exec();

            if (city) {
                console.log('City found in the database');
                return city; // Return the found city
            } else {
                console.log('City not found in the database.');
                return null; // Return null if city is not found
            }
        } catch (error) {
            console.error('Error fetching city from the database:', error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }

    //endregion

    ////////////////////////////

    //region User Auth

    //endregion

}
