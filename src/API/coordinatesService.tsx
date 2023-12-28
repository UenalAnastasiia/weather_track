export default class CoordinatesService {
    static async fetchCoordinateAPI(name: string) {
        const data = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`
        );
    
        const jsonData = await data.json();
        return jsonData;
    }
}