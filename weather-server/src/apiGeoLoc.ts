import axios from "axios";
import {City} from "../types/city";

export class apiGeoLoc {
    // api per ottenere le informazioni(lat lon e altro) di una determinata città
    public getLatLon = async (city : string): Promise<any> => {
        try {
            // chiamata axios per geolocalizzare
            const { data: result } = await axios.get(
                `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=20&language=en&format=json`
            );
            let arr = [];

            if (result) {
                for (let city of result.results) {
                    arr.push({
                        name: city.name,
                        lat: city.latitude,
                        long: city.longitude,
                        timezone: city.timezone,
                        country: city.country,
                        region: city.admin1,
                    })
                }

                return arr;
            } else {
                console.log("City not found");
                return undefined;
            }
        } catch (e) {
            console.log(e);
        }
    };
}

