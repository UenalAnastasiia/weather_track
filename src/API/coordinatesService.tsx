export default class CoordinatesService {
    static cityName: string;

    static async fetchCoordinateAPI(name: string) {
        this.cityName = name;

        const data = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`
        );
    
        const jsonData = await data.json();
        return jsonData;
    }

    static getCityName() {
        return this.cityName
    }
}